import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateJWTandSetCookie } from "../utils/generateJWT.js";

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ error: "password doesn't match" });

    const userExist = await User.findOne({ userName });
    if (userExist)
      return res.status(400).json({ error: "username already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newuser = new User({
      //created a new instance of a Mongoose model. means that the newuser object exists only in your Node.js application's memory and has not yet been stored in the database.
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newuser) {
      await newuser.save(); //save() on the newuser object triggers Mongoose to insert the document into the MongoDB database.
      generateJWTandSetCookie(newuser, res);
    }
  } catch (error) {
    console.log(`error in register controller, ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isCorrectPassword)
      return res.status(400).json({ error: "incorrect password or userName" });

    generateJWTandSetCookie(user, res);
  } catch (error) {
    console.log(`error in login controller, ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "logged out successfully" });
  } catch (error) {
    console.log(`error in logout controller, ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};
