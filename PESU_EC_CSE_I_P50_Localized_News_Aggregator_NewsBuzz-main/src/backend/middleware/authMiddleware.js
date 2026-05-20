// src/backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Auth middleware (default export)
 * - Extracts Bearer token from Authorization header
 * - Verifies JWT and attaches user (without password) to req.user
 * - Returns 401 / 404 / 400 with JSON messages on failure
 */
export default async function authMiddleware(req, res, next) {
  try {
    // Extract token from several possible locations
    const authHeader = req.headers.authorization || req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Attach user (exclude password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    // JWT verify error is often JsonWebTokenError or TokenExpiredError
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
