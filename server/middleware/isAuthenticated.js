import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: `unauthorized user ${token} ` });
    }

    const decoded = jwt.verify(token, process.env.TOKEN);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`error in authenticated middleware, ${error}`);
    res.status(500).json({ error: "internal server error" });
  }
};
