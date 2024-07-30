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

router.post("/signup", signUpController);
router.post("/login", logInController);
router.post("/logout", logOutController);

router.get("/me", isAuthenTicated, async (req, res, next) => {
  try {
    getMyProfile(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/all", isAuthenTicated, getAllUsers);

export default router;
