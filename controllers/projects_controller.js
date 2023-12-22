// Importing required models
const Project = require('../models/project');
const Issue = require('../models/issue');
const User = require('../models/user');

// Controller function for creating a new project
module.exports.create = async function (req, res) {
    // Checking if the user is authenticated
    if (req.isAuthenticated()) {
        // Creating a new project with the provided details
        const newProject = new Project({
            author_name: req.body.author_name,
            project_name: req.body.project_name,
            description: req.body.description,
            user: req.user.id
        });

        // Saving the new project to the database
        await newProject.save();

        // Redirecting to the home page
        return res.redirect('/');
    } else {
        // Redirecting to the sign-in page for non-authenticated users
        return res.redirect('/user/sign-in');
    }
}

// Controller function for deleting a project
module.exports.deleteProject = async function (req, res) {
    // Deleting the project by its ID
    const project = await Project.deleteOne({ _id: req.params.id });

    // Checking if the project is successfully deleted
    if (project) {
        // Deleting all issues associated with the project
        await Issue.deleteMany({ project_id: req.params.id });

        // Redirecting back to the previous page
        return res.redirect('back');
    } else {
        console.log("Error while Deleting Project ");
        return res.redirect('back');
    }
}

// Controller function for deleting an issue
module.exports.deleteIssue = async function (req, res) {
    // Finding the issue by its ID
    const issue = await Issue.findOne({ _id: req.params.id });

    // Checking if the issue is found
    if (issue) {
        // Extracting the project ID associated with the issue
        const projectId = issue.project_id;

        // Removing the issue ID from the project's issues array
        const updated = await Project.findByIdAndUpdate(projectId, { $pull: { issues: req.params.id } });

        // Deleting the issue by its ID
        const delIssue = await Issue.findByIdAndDelete(req.params.id);

        // Redirecting back to the previous page
        return res.redirect('back');
    } else {
        console.log("Error while Deleting Issue ");
        return res.redirect('back');
    }
}

// Controller function for creating a new issue
module.exports.createIssue = async function (req, res) {
    // Checking if the user is authenticated
    if (req.isAuthenticated()) {
        try {
            // Finding the project by its ID
            const project = await Project.findOne({ _id: req.body.project_id });

            // Checking if the project is found
            if (project) {
                // Creating a new issue with the provided details
                const newIssue = new Issue({
                    issue_name: req.body.issue_name,
                    project_id: req.body.project_id,
                    issue_type: req.body.issue_type,
                    description: req.body.description,
                    user: req.user.id
                });

                // Saving the new issue to the database
                await newIssue.save();

                // Adding the new issue's ID to the project's issues array
                project.issues.push(newIssue._id);
                project.save();

                // Redirecting to the home page
                if (newIssue) {
                    return res.redirect('/');
                }
            }
        } catch (error) {
            console.log("Error while Creating Issue : ", error);
            return res.redirect('/');
        }
    } else {
        // Rendering the user sign-in view for non-authenticated users
        return res.render('user_sign_in');
    }
}

// Controller function for updating a project
module.exports.updateProject = async function (req, res) {
    // Updating the project by its ID with the provided details
    const updatedProject = await Project.findByIdAndUpdate(req.body.project_id, {
        author_name: req.body.author_name,
        project_name: req.body.project_name,
        description: req.body.description
    });

    // Redirecting back to the previous page
    return res.redirect('back');
}

// Controller function for updating an issue
module.exports.updateIssue = async function (req, res) {
    // Updating the issue by its ID with the provided details
    const updatedIssue = await Issue.findByIdAndUpdate(req.body.issue_id, req.body);

    // Redirecting back to the previous page
    return res.redirect('back');
}

// Controller function for retrieving all issues
module.exports.allIssues = async function (req, res) {
    // Fetching all issues and populating the associated project details
    const allIssues = await Issue.find().populate('project_id');

    // Checking if issues are successfully retrieved
    if (allIssues) {
        // Rendering the view with the retrieved issues data
        return res.render('allIssues', {
            title: 'Issues',
            allIssues: allIssues
        });
    }
}
