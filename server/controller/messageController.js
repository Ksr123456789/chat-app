import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    if (message === "")
      return res.status(400).json({ error: "can't send empty message" });

    let conversation = await Conversation.findOne({
      particpants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await new Conversation({
        particpants: [senderId, receiverId],
      });
    }

    const newMessage = await new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
      await Promise.all([conversation.save(), newMessage.save()]);
    }

    // socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`error in sendMessage controller`, error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      particpants: { $all: [senderId, receiverId] },
    }).populate("messages"); // .populate is used to replace references (ObjectId) with actual data from referenced documents

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(`error in receive messages controller`, error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
