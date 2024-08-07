import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import Errorhandler from "../utils/errorHandler.js";

// register
// someone comes again
export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    // ! change later
    if (user) return next(new Errorhandler("User already exists", 400));

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    sendCookie(user, res, "Signup successfully", 201);
  } catch (error) {
    next(error);
  }
};

// someone new sign in
export const logInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Include password in the query result

    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new Errorhandler("User not exists", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Errorhandler("Invalid credentials", 400));

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
export const logOutController = () => (req, res) => {
  res.status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENV == "Development" ? " lax" : "none",
      secure: process.env.NODE_ENV == "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getMyProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "User not authenticated" });
  }
  await res.status(200).json({
    success: true,
    user: req.user,
  });
};

