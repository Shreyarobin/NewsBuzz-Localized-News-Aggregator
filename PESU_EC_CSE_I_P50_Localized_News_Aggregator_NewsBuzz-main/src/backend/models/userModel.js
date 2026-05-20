import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Reader", "Editor", "Admin"],
      default: "Reader",
    },

    // ⭐ NEW FIELD — User Bookmarks (LOC-18)
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
