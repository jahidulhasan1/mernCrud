import express from "express";
import {
  getAllUsers,
  signUpController,
  logOutController,
  logInController,
  getMyProfile,
} from "../controllers/user.controllers.js";
import { isAuthenTicated } from "../middleware/auth.middleware.js";

const router = express.Router();

// register
router.get("/all", getAllUsers);
router.post("/signup", signUpController);
router.post("/login", logInController);
router.post("/logout", logOutController);

router.get("/me", isAuthenTicated, getMyProfile);

export default router;
