const mongoose = require('mongoose');

// Define the Alumni schema
const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
        required: true,
        trim: true
    },
    profilePicture: {
        type: String, // this will store the file path of the uploaded image
        required: false
    },
    degree: {
        type: String,
        required: true,
        trim: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    stream: {
        type: String,
        required: true,
        trim: true
    },
    currentEmployer: {
        type: String,
        required: true,
        trim: true
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: false,
        trim: true
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema and export it
const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
