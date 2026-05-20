import express from "express";
import Article from "../models/articleModel.js";

const router = express.Router();

// Placeholder: GET /api/news
router.get('/', async (req, res) => {
  // In future, fetch and return parsed RSS items, categories and search data
  res.json({ message: 'News API placeholder', items: [] });
});

export const incrementArticleView = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Not found" });
    }
    article.views = (article.views || 0) + 1;
    await article.save();
    res.json({ message: "View updated", views: article.views });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default router;