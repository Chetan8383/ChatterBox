import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { generateToken } from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    const { fullname, password, email } = req.body;
    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 character" })
        }
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'email already exists' });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })

        if (newUser) {
            //jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });
        } else {
            res.status(400).json({ message: 'Invalid User data' });
        }
    } catch (error) {
        console.log('ERROR in Signup page', error.message);
        res.status(500).json({ message: 'internal server error' });
    }
};

export const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email })

        const isPassordCorrect = await bcrypt.compare(password, user.password)
        if (!user || !isPassordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilepic: user.profilepic,
        });

    } catch (error) {
        console.log('ERROR in login page', error.message)
        res.status(500).json({ message: 'internal server error' });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: 'logged out successfully' })
    } catch (error) {
        console.log("ERROR in logout", error.message);
        res.status(500).json({ message: 'internal server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if (!profilepic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilepic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const chechAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('ERROR in chechAuth Controller', error.message);
        res.status(500).json({ message: 'internal server error' });
    }
};