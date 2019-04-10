const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



//Bring in Routes
const users = require('./routes/api/users')
const todo = require('./routes/api/todo')
const profile = require('./routes/api/profile')

const app = express();


//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database configuration
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
   .connect(db, { useNewUrlParser: true })
   .then(() => console.log('MongoDB is Connected'))
   .catch(err => console.log(err, ' There was an Error during connection'));




//Passoport middleware for private routes
//app.use(passport.initialize());

//Passport config
//require('./config/passport')(passport);
//Use Routes
app.use('/api/users', users);
app.use('/api/todo', todo);
app.use('/api/profile', profile);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(` Server running on port ${port}`));