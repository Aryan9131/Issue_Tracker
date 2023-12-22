// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the Mongoose schema for the "Issue" model
const issueSchema = new mongoose.Schema({
    // Name of the issue
    issue_name: {
        type: String,
        required: true // Field is required
    },
    // Type of the issue
    issue_type: {
        type: String,
        required: true 
    },
    // Description of the issue
    description: {
        type: String,
        required: true 
    },
    // Reference to the associated project (using its ObjectId)
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' // Reference to the "Project" model
    },
    // Reference to the user associated with the issue (using its ObjectId)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the "User" model
    }
},
// Additional configuration options for the schema
{
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Creating the Mongoose model for the "Issue" schema
const Issue = mongoose.model('Issue', issueSchema);

// Exporting the "Issue" model to be used in other parts of the application
module.exports = Issue;
