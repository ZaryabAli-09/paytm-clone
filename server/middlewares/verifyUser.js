import jwt from "jsonwebtoken";
import { User } from "../models/paytm.models.js";
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (!decodedToken) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // Optionally, find the user from the database if needed
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export { verifyUser };
