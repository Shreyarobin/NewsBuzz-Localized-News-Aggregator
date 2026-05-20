import express from "express";
import {
  getMostReadCategories,
  getArticleEngagement,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/categories", getMostReadCategories);
router.get("/articles", getArticleEngagement);

export default router;
