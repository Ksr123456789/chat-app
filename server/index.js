import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messgeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config();
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(console.log(`db is connected`))
  .catch((e) => console.log(e));

app.use(
  cors({
    origin: "http://localhost:5173", // Replace this with the origin of your frontend application
    credentials: true, // Allow cookies to be sent with the request
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/message`, messageRoutes);
app.use(`/api/v1/users`, userRoutes);

server.listen(8080, () => {
  console.log(`server is on`);
});
