// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the Mongoose schema for the "User" model
const userSchema = new mongoose.Schema({
    // Name of the user
    name: {
        type: String,
        required: true // Field is required
    },
    // Email of the user
    email: {
        type: String,
        required: true // Field is required
    },
    // Password of the user
    password: {
        type: String,
        required: true // Field is required
    }
},
// Additional configuration options for the schema
{
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Creating the Mongoose model for the "User" schema
const User = mongoose.model('User', userSchema);

// Exporting the "User" model to be used in other parts of the application
module.exports = User;
