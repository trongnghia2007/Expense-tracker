const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

// Register User
exports.registerUser = async (req, res) => {
    // console.log("DEBUG BODY:", req.body); 
    const { fullName, email, password, profileImageUrl } = req.body || {};

    if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields." });
    }


    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
                user: existingUser,      // object user cũ
                id: existingUser._id     // id user cũ
            });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        const { password: pwd, ...userData } = user.toObject();
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                ...userData,
                token: generateToken(user),
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}


// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }
    try {
        // Find user by email and password
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const { password: pwd, ...userData } = user.toObject();
        res.status(200).json({
            message: "User logged in successfully.",
            user: {
                ...userData,
                token: generateToken(user),
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
}
