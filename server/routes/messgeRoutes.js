import Router from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getMessages, sendMessage } from "../controller/messageController.js";

const router = Router();

router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/get/:id", isAuthenticated, getMessages);

export default router;
