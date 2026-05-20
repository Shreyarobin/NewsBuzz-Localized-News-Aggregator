import express from "express";
import Article from "../models/articleModel.js";
import { incrementViews } from "../controllers/articleController.js";

const router = express.Router();

/* ============================================================
   Utility: Detect Location using keywords in article title
=============================================================== */
function detectLocation(text) {
  if (!text || typeof text !== "string") return "unknown";

  const locations = [
    "India", "USA", "United States", "UK", "China",
    "Delhi", "Mumbai", "Bengaluru", "Karnataka",
    "London", "Europe", "Asia", "New York", "Washington"
  ];

  const t = text.toLowerCase();
  for (const loc of locations) {
    if (t.includes(loc.toLowerCase())) return loc;
  }

  return "unknown";
}

/* ============================================================
   ⭐ LOC-14 — FILTER NEWS BY TOPIC, DATE & LOCATION
=============================================================== */
router.get("/filter", async (req, res) => {
  try {
    const { topic, startDate, endDate, location } = req.query;

    let articles = await Article.find({}).sort({ publishedDate: -1 });

    let filtered = articles.filter((a) => {
      let ok = true;

      if (topic && topic !== "All") {
        const artTopic = (a.category || "").toLowerCase();
        ok = ok && artTopic.includes(topic.toLowerCase());
      }

      const detected = detectLocation(`${a.title} ${a.summary}`);
      a._detectedLocation = detected;

      if (location && location.trim() !== "") {
        ok = ok && detected.toLowerCase().includes(location.toLowerCase());
      }

      if (startDate) {
        ok = ok && new Date(a.publishedDate) >= new Date(startDate);
      }

      if (endDate) {
        ok = ok && new Date(a.publishedDate) <= new Date(endDate);
      }

      return ok;
    });

    const results = filtered.map(a => {
      const obj = a.toObject ? a.toObject() : a;
      return {
        ...obj,
        location: a._detectedLocation || "unknown"
      };
    });

    res.status(200).json({
      success: true,
      count: results.length,
      articles: results,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error applying filters",
      error: error.message,
    });
  }
});

/* ============================================================
   CATEGORY GROUPING
=============================================================== */
router.get("/categories", async (req, res) => {
  try {
    const categorized = await Article.aggregate([
      { $group: { _id: "$category", articles: { $push: "$$ROOT" } } }
    ]);

    res.status(200).json({
      success: true,
      data: categorized,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categorized news",
      error: error.message,
    });
  }
});

/* ============================================================
   TRENDING NEWS
=============================================================== */
router.get("/trending/latest", async (req, res) => {
  try {
    const latestTrending = await Article.findOne({ isTrending: true })
      .sort({ detectedAt: -1 });

    return res.status(200).json(latestTrending || {});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching latest trending news",
      error: error.message,
    });
  }
});

/* ============================================================
   VIEW COUNT UPDATE (Correct)
=============================================================== */
router.post("/:id/view", incrementViews);

export default router;
