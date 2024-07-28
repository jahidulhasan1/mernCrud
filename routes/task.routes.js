import express from "express";
import {
  createPost,
  deletePost,
  readPost,
  updatePost,
} from "../controllers/task.controller.js";
import { isAuthenTicated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenTicated, createPost);

router.get("/read", isAuthenTicated, readPost);

router.put("/update/:id", isAuthenTicated, updatePost);

router.delete("/delete/:id", isAuthenTicated, deletePost);

export default router;
