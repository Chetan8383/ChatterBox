import User from '../models/user.js'
import message from '../models/message.js';
import cloudinary from '../lib/cloudinary.js';
import { io, getRecieversSocketId } from '../lib/socket.js';

export const getUserSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filterUsers);

    } catch (error) {
        console.log('ERROR in getUserSideBar', error.message);
        res.status(500).json({ message: 'internal server error' })
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log('ERROR in getMessages', error.message);
        res.status(500).json({ message: 'internal server error' })
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // socket.io
        const recieverSocketid = getRecieversSocketId(receiverId);
        if (recieverSocketid) {
            io.to(recieverSocketid).emit("new Message", newMessage)
        }
        // 

        res.status(200).json(newMessage)
    } catch (error) {
        console.log('ERROR in sendMessage controllers', error.message);
        res.status(500).json({ message: 'internal server error' });
    }
}