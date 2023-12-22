// Import the Express framework
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

// Import the project controller
const projectController = require('../controllers/projects_controller');

// Define routes for project-related actions

// Route to create a new project
router.post('/create', projectController.create);

// Route to edit/update a project
router.post('/edit-project', projectController.updateProject);

// Route to delete a project by ID
router.get('/delete/:id', projectController.deleteProject);

// Route to create a new issue for a specific project
router.post('/create-issue/:id', projectController.createIssue);

// Route to edit/update an issue
router.post('/edit-issue', projectController.updateIssue);

// Route to delete an issue by ID
router.get('/delete-issue/:id', projectController.deleteIssue);

// Route to get all issues
router.get('/all-issues', projectController.allIssues);

// Export the router to make it available for other files
module.exports = router;
