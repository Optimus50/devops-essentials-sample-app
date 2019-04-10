const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

//Load User model
const User = require('../../models/Users');

//Load input Validation
const validateRegisterInput = require('../../validation/register');



//@Test GET
//@desc Testing the route
//@state Public
router.get('/test', (req, res) => res.json({
   message: 'done'
}));

//@Test POST api/users/register
//@desc  Register user
//@access Public
router.post('/register', (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);

   //Check for validation
   if (!isValid) {
      return res.status(400).json(errors)
   }
   User.findOne({ email: req.body.email })
      .then(user => {
         if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors)
         } else {
            const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               password: req.body.password,
               age: req.body.age,
               location: req.body.location
            });

            //encrypt the password
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                     .save()
                     .then(user => res.json(user))
                     .catch(err => console.log(err))
               });
            });

         }
      })
      .catch(err => console.log(err, 'error in userFindOne'))
});


module.exports = router;