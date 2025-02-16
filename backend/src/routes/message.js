import express from 'express'
import { isLoggedIn } from '../middleware/auth.js';
import { getUserSideBar, getMessages, sendMessage } from '../controllers/message.js'

const router = express.Router()

router.get('/users', isLoggedIn, getUserSideBar);
router.get('/:id', isLoggedIn, getMessages);


router.post('/send/:id', isLoggedIn, sendMessage)


export default router;
