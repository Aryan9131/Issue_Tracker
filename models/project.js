// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the Mongoose schema for the "Project" model
const projectSchema = new mongoose.Schema({
    // Name of the project's author
    author_name: {
        type: String,
        required: true // Field is required
    },
    // Name of the project
    project_name: {
        type: String,
        required: true // Field is required
    },
    // Description of the project
    description: {
        type: String,
        required: true // Field is required
    },
    // Reference to the user associated with the project (using its ObjectId)
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    // Array of issues associated with the project (using their ObjectIds)
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue' // Reference to the "Issue" model
        }
    ]
},
// Additional configuration options for the schema
{
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Creating the Mongoose model for the "Project" schema
const Project = mongoose.model('Project', projectSchema);

// Exporting the "Project" model to be used in other parts of the application
module.exports = Project;
