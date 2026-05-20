import Article from "../models/articleModel.js";
import IngestionLog from "../models/ingestionLogModel.js";

// Most-read categories
export const getMostReadCategories = async (req, res) => {
  try {
    const result = await Article.aggregate([
      { $group: { _id: "$category", totalViews: { $sum: "$views" } } },
      { $sort: { totalViews: -1 } },
    ]);

    res.status(200).json({ success: true, categories: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Article engagement
export const getArticleEngagement = async (req, res) => {
  try {
    const result = await Article.find({}, "title category views")
      .sort({ views: -1 });

    res.status(200).json({ success: true, articles: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ingestion logs
export const getIngestionStats = async (req, res) => {
  try {
    const logs = await IngestionLog.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};