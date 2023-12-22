// Importing required models
const Project = require('../models/project');
const User = require('../models/user');
const Issue = require('../models/issue');

// Controller function for the home route
module.exports.home = async function (req, res) {
    // Checking if the user is authenticated
    if (req.isAuthenticated()) {
        // Fetching all projects associated with the logged-in user
        const allProjects = await Project.find({ user: req.user.id });

        // Fetching top issues associated with the logged-in user and populating the associated project details
        const topIssues = await Issue.find({ user: req.user.id }).populate('project_id').limit(3);

        // Checking if both project and topIssues data are successfully retrieved
        if (allProjects && topIssues) {
            // Rendering the home view with the retrieved data
            return res.render('home', {
                allProjects: allProjects,
                topIssues: topIssues
            });
        }
    } else {
        // Rendering the home view for non-authenticated users
        return res.render('home');
    }
}
