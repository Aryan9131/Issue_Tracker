// Importing required models
const User = require('../models/user');
const Project = require('../models/project');
const Issue = require('../models/issue');

// Controller function for rendering sign-up page
module.exports.signUp = function (req, res) {
    // Checking if the user is already authenticated
    if (req.isAuthenticated()) {
        // Redirecting to the home page if authenticated
        return res.redirect('/');
    } else {
        // Rendering the user sign-up view for non-authenticated users
        return res.render('user_sign_up');
    }
}

// Controller function for rendering sign-in page
module.exports.signIn = function (req, res) {
    // Checking if the user is already authenticated
    if (req.isAuthenticated()) {
        // Redirecting to the home page if authenticated
        return res.redirect('/');
    } else {
        // Rendering the user sign-in view for non-authenticated users
        return res.render('user_sign_in');
    }
}

// Controller function for creating a new user
module.exports.createUser = async function (req, res) {
    try {
        // Creating a new user with the provided user details
        const newUser = new User(req.body);

        // Saving the new user to the database
        await newUser.save();

        // Rendering the user sign-in view after successful sign-up
        return res.render('user_sign_in', {
            title: 'SignIn'
        });
    } catch (error) {
        // Handling errors during user sign-up
        console.log("Error while signing-up user : ", error);
        return;
    }
}

// Controller function for creating a new session (user login)
module.exports.createSession = async function (req, res) {
    // Redirecting to the home page after successful login
    return res.redirect('/');
}

// Controller function for destroying the user session (logout)
module.exports.destroySession = function (req, res, next) {
    // Logging out the user and handling errors if any
    req.logout(function (err) {
        if (err) {
            console.log("Error while logging out user:", err);
            return next(err);
        }

        // Redirecting to the home page after successful logout
        return res.redirect('/');
    });
}
