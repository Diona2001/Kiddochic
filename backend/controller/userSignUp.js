const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    console.log("req.body",req.body)

    // Validate input fields
    if (!firstName) {
      return res.status(400).json({
        message: "Please provide first name",
        error: true,
        success: false,
      });
    }

    if (!lastName) {
      return res.status(400).json({
        message: "Please provide last name",
        error: true,
        success: false,
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        error: true,
        success: false,
      });
    }

    // Validate phone number (starts with 6, 7, 8, or 9 and has 10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Please provide a valid phone number that starts with 6, 7, 8, or 9 and has 10 digits",
        error: true,
        success: false,
      });
    }

    // Check if user already exists with the provided email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        error: true,
        success: false,
      });
    }

    // Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // If password hashing fails
    if (!hashPassword) {
      throw new Error("Something went wrong while hashing the password");
    }

    // Prepare user data for saving
    const payload = {
      firstName,
      lastName,
      email,
      role : "GENERAL",
      password: hashPassword, // Save hashed password
      phoneNumber,
    };

    // Create a new user
    const newUser = new userModel(payload);

    // Save the user to the database
    const saveUser = await newUser.save();

    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      error: false,
      success: true,
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (err) {
    // Handle any errors
    res.status(500).json({
      message: err.message || "An error occurred during registration",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
