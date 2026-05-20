import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

// ❗ Replace named import with default import
import authMiddleware from "../middleware/authMiddleware.js";

import User from "../models/userModel.js";

const router = express.Router();

// 📝 Register user
router.post("/register", registerUser);

// 🔑 Login user
router.post("/login", loginUser);

// 👑 Update role (Admin only)
// ❗ Replace "protect" with "authMiddleware"
router.put("/update-role", authMiddleware, async (req, res) => {
  try {
    // Ensure only Admins can modify roles
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { userId, newRole } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = newRole;
    await user.save();

    res.json({ success: true, message: `Role updated to ${newRole}` });
  } catch (error) {
    console.error("❌ Role update failed:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
