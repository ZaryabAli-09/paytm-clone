import express from "express";
import bcryptjs from "bcryptjs";
import { User, Account } from "../models/paytm.models.js";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const savedUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await savedUser.save();

    savedUser.password = undefined;

    // creating account for user and adding initial balance to it
    const addInitialBalanceToAccount = new Account({
      userId: savedUser._id,
      balance: 1 + Math.random() * 10000,
    });

    await addInitialBalanceToAccount.save();

    res.status(201).json({
      user: savedUser,
      account: addInitialBalanceToAccount,
      message: "User signup succesfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
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

    const userAccount = await Account.findOne({ userId: isUserExisted._id });

    res.status(201).cookie("token", token, { httpOnly: true }).json({
      user: isUserExisted,
      account: userAccount,
      token,
      message: "User signup succesfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

router.put("/update", verifyUser, async (req, res) => {
  const { username, email, password } = req.body;
  const user = req.user;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

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
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

router.get("/bulk", verifyUser, async (req, res, next) => {
  const filter = req.query.filter || "";

  try {
    let users = await User.find({
      $or: [
        {
          username: {
            $regex: filter,
          },
        },
      ],
    });

    users = users.map((user) => {
      user.password = undefined;
      return user;
    });

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

export default router;
