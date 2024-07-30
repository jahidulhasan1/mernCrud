import { Task } from "../models/task.models.js";
import Errorhandler from "../utils/errorHandler.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.state(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const readPost = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new Errorhandler("invalid id", 400));
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "update post successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return next(new Errorhandler("invalid id", 400));
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "delete post successfully",
  });
};
