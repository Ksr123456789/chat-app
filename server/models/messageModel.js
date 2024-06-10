import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: `User`, // This establishes a reference to the User model
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: `User`, // This establishes a reference to the User model
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
