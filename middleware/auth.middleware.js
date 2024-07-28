import { User } from "../models/user.models.js";
import  jwt  from 'jsonwebtoken';

export const isAuthenTicated = async (res, req, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(404).json({
      success: false,
      message: "login first",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
