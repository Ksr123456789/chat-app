import User from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("error in getUserForSideBar:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const users = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("error in getUserForSideBar:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
