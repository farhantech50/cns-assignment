import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
  getUsers,
} from "../controller/auth.controller.js";
import { authenticate, adminAllowed } from "../middleware/protect.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getAllUsers", authenticate, getUsers);

router.post("/signup", authenticate, adminAllowed, signupUser);

export default router;
