import express from "express";
import { personalizedSuggestions } from "../controllers/suggestionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, personalizedSuggestions);

export default router;
