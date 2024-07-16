import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { Account, User } from "../models/paytm.models.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/get-balance", verifyUser, async (req, res) => {
  const userId = req.user._id;
  try {
    const accountBalance = await Account.findOne({ userId });

    if (!accountBalance) {
      return res.status(404).json({
        message: "Account not found for this user",
      });
    }

    res.status(200).json({
      message: "Balance retrieved successfully",
      balance: accountBalance,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

router.post("/tranfer-balance", verifyUser, async (req, res) => {
  const { to, amount } = req.body;
  const userId = req.user._id;
  if (!to || !amount) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  if (amount <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than zero",
    });
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const fromAccount = await Account.findOne({ userId }).session(session);
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!fromAccount || !toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "One or both accounts not found",
      });
    }

    if (fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient funds",
      });
    }

    await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(
      session
    );

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    const toUser = await User.findOne({ _id: to });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `${amount}$ successfully transfered to ${toUser.username} `,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

export default router;
