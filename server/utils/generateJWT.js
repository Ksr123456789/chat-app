import jwt from "jsonwebtoken";

export const generateJWTandSetCookie = (newuser, res) => {
  const token = jwt.sign({ id: newuser._id }, process.env.TOKEN, {
    expiresIn: `15d`,
  });
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    })
    .json({
      _id: newuser._id,
      fullName: newuser.fullName,
      userName: newuser.userName,
      gender: newuser.gender,
      profilePic: newuser.profilePic,
    });
};
