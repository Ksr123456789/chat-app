import Router from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getAllUsers, getUser } from "../controller/userController.js";
const router = Router();

router.get(`/all`, isAuthenticated, getAllUsers);
router.get(`/one`, isAuthenticated, getUser);

export default router;
