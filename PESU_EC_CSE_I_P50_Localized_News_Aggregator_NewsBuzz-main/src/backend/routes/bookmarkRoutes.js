import express from "express";
import { addBookmark, removeBookmark, getBookmarks } from "../controllers/bookmarkController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // or the name you use

const router = express.Router();

router.post("/", authMiddleware, addBookmark);
router.delete("/:articleId", authMiddleware, removeBookmark);
router.get("/", authMiddleware, getBookmarks);

export default router;
