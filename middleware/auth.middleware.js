import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const isAuthenTicated = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login First",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user from the database
    req.user = await User.findById(decoded._id).select("-password"); // Exclude password

    // Check if user exists
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
