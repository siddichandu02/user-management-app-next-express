const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup function
exports.signup = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName, gender } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
            gender
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Signin function
exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Profile function - Get user profile
exports.profile = async (req, res) => {
    try {
        const userId = req.userId;  // Set by auth middleware
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }  // Exclude password from response
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update user profile
exports.updateUser = async (req, res) => {
    try {
        const userId = req.userId;  // Set by auth middleware
        const { username, email, firstName, lastName, gender } = req.body;

        // Update user information
        await User.update(
            { username, email, firstName, lastName, gender },
            { where: { id: userId } }
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.userId;

        // Delete user
        await User.destroy({ where: { id: userId } });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
