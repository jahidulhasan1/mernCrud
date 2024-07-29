import { User } from "../models/user.models.js";
import  jwt  from 'jsonwebtoken';
import Errorhandler from "../utils/errorHandler.js";

export const isAuthenTicated = async (res, req, next) => {
  const { token } = req.cookies;
  if (!token) {
   next(new Errorhandler("login First" ,404))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
