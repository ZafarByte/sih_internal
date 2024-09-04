const mongoose = require('mongoose');

// Define the Alumni schema
const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String, // Path to the profile picture
        default: ''
    },
    degree: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    currentEmployer: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Alumni model from the schema
const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
