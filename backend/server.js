const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Models
const User = require('./models/user');
const Alumni = require('./models/Alumni'); // Import the Alumni model

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable for JWT secret

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500' // Update to match your frontend's origin
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the storage engine for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for file uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp to ensure uniqueness
    }
});

// Initialize the upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    }
});


// Connect to MongoDB
mongoose.connect('mongodb+srv://zafargayas3101:zafar3101@cluster0.6sigmjk.mongodb.net/Alumni', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// User Routes
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in /api/register:', error); // Added debug log
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Request body:', req.body); // Debug log

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in /api/login:', error); // Added debug log
        res.status(500).json({ message: 'Server error', error });
    }
});
//alumni route
app.post('/api/alumni/register', upload.single('profilePicture'), async (req, res) => {
    const { name, email, password, dob, phone, degree, graduationYear, stream, currentEmployer, jobTitle, bio } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newAlumni = new Alumni({
            name,
            email,
            password: hashedPassword,
            dob,
            phone,
            profilePicture,
            degree,
            graduationYear,
            stream,
            currentEmployer,
            jobTitle,
            bio
        });

        await newAlumni.save();
        res.status(201).json({ message: 'Alumni registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering alumni', error });
    }
});
app.post('/api/alumni/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Request body:', req.body); // Debug log

    try {
        // Check if user exists
        const user = await Alumni.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in /api/login:', error); // Added debug log
        res.status(500).json({ message: 'Server error', error });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
