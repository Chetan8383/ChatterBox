import express from "express";
import { isLoggedIn } from '../middleware/auth.js';
import { login, logout, signup, updateProfile, chechAuth } from "../controllers/auth.js";
const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put('/update-profile', isLoggedIn, updateProfile);

router.get('/check', isLoggedIn, chechAuth);

export default router;