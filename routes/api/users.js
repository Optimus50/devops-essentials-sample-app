const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load User model
const User = require('../../models/Users');

//Load input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



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


//@Test GET api/users/login
//@desc  Login user
//@access Public
router.get('/login', (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);
   //Check validation
   if (!isValid) {
      return res.status(400).json(errors);
   }
   const email = req.body.email;
   const password = req.body.password;

   //Find user by email in Db
   User.findOne({ email })
      .then(user => {
         if (!user) {
            errors.email = 'User not Found';
            return res.status(404).json(errors);
         }
         //check password
         bcrypt.compare(password, user.password)
            .then(isMatch => {
               if (isMatch) {
                  //user matched
                  const payload = { id: user.id, name: user.name }; //create JWT Payload

                  //sign Token
                  jwt.sign(
                     payload,
                     keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                           sucess: true,
                           token: 'Bearer ' + token
                        });
                     }
                  );
               } else {
                  errors.password = ' Password incorrect';
                  return res.status(400).json(errors);
               }
            })
            .catch(err => console.log(err, 'err in comparison'))
      })
      .catch(err => console.log(err, 'err in Login'))
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
   '/current',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      res.json({
         id: req.user.id,
         name: req.user.name,
         email: req.user.email,
         age: req.user.age,
         location: req.user.location

      });
   }
);

module.exports = router;