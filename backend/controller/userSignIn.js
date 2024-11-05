const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')


// Hardcoded admin credentials
const adminCredentials = {
    email: 'admin@gmail.com',   // Hardcoded admin email
    password: 'admin1234'    // Hardcoded admin password (can hash it too)
};
async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false,
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false,
            });
        }

        // Check if the user is an admin (by comparing the hardcoded credentials)
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Create a token for the admin
            const tokenData = { email: adminCredentials.email };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            return res.status(200).json({
                message: "Admin login successful",
                error: false,
                success: true,
                token, // Return the generated token for admin
                user: {
                    email: adminCredentials.email,
                    name: "Admin",  // Hardcoded admin name
                },
            });
        }


        // Find user by email
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not Found",
                error: true,
                success: false,
            });
        }

        // Check if the password matches
        const checkPassword = await bcrypt.compare(password, existingUser.password);

        console.log("check password", checkPassword);

        if (checkPassword) {
            // Data to be stored in the JWT token (e.g., user ID and email)
            const tokenData = {
                id: existingUser._id,
                email: existingUser.email,
            };
           const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        return res.status(200).json({
                message: "Login successful",
                error: false,
                success: true,
                token, // Return the generated token
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    name: existingUser.name,
                },
            });
        } else {
            return res.status(401).json({
                message: "Incorrect password",
                error: true,
                success: false,
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;