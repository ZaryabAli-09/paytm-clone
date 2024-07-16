import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username cannot be more than 50 characters long"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    strict: true, // Ensures only fields defined in the schema are saved
  }
);

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      min: [0, "Balance cannot be negative"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    strict: true, // Ensures only defined fields in the schema are saved
    versionKey: false, // Hides the __v (version) field
  }
);
const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

export { User, Account };
