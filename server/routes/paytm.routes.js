import express from "express";
import bcryptjs from "bcryptjs";
import { User } from "../models/paytm.models.js";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const savedUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await savedUser.save();

    savedUser.password = undefined;

    res.status(201).json({
      user: savedUser,
      message: "User signup succesfully",
    });
  } catch (error) {
    res.status(error.statusCode || 501).json({
      message: "Internal server error" || error.message,
    });
  }
});

router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || email === "" || !password || password === "") {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isUserExisted = await User.findOne({ email });
    if (!isUserExisted) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const passwordCheck = bcryptjs.compareSync(
      password,
      isUserExisted.password
    );
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: isUserExisted._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    isUserExisted.password = undefined;

    res.status(201).cookie("token", token, { httpOnly: true }).json({
      user: isUserExisted,
      token,
      message: "User signup succesfully",
    });
  } catch (error) {
    res.status(501).json({
      message: "Internal server error" || error.message,
    });
  }
});

router.put("/user/update", verifyUser, async (req, res) => {
  const { username, email, password } = req.body;
  const user = req.user;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Hash the password if it's provided
    const hashedPassword = await bcryptjs.hash(password, 10);

    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Internal server error" || error.message,
    });
  }
});
export default router;