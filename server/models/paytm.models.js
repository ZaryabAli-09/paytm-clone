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
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Ensure the password is not returned by default in queries
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    strict: true, // Ensures only fields defined in the schema are saved
  }
);

const User = mongoose.model("User", UserSchema);

export { User };
