const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateRegisterInput(data) {


   let errors = {};





   data.name = !isEmpty(data.name) ? data.name : '';
   data.email = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';
   data.password2 = !isEmpty(data.password2) ? data.password2 : '';
   data.location = !isEmpty(data.location) ? data.location : '';
   data.age = !isEmpty(data.age) ? data.age : '';





   if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters';
   }

   if (Validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
   }
   if (Validator.isEmpty(data.email)) {
      errors.email = ' Email field is required';
   }
   if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
   }
   if (Validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
   }
   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 Characters';
   }
   //Increase the strength of the password
   /*  if (!Validator.matches(data.password, {
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})"
       })) {
       errors.password = "Use at least 1 lowercase, 1 uppercase alphabets and 1numeric, special string and six characters long ";
    } */
   if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm password field is required';
   }
   if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Password must match';
   }
   if (Validator.isEmpty(data.location)) {
      errors.location = 'Please give us your location'
   }
   if (!Validator.isInt(data.age, { min: 18 })) {
      errors.age = 'You must be 18+ before you can view this Site';
   }
   if (Validator.isEmpty(data.age)) {
      errors.age = 'Age field is required';
   }
   return {
      errors,
      isValid: isEmpty(errors)
   };

};