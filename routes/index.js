// Import the Express framework
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

// Import the home controller
const homeController = require('../controllers/home_controller');

// Define a route for the home page
router.get('/', homeController.home);

// Use the '/user' route for user-related routes
router.use('/user', require('./user'));

// Use the '/project' route for project-related routes
router.use('/project', require('./project'));

// Export the router to make it available for other files
module.exports = router;
