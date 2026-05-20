import Article from "../models/articleModel.js";

export async function incrementViews(req, res) {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    article.views = (article.views || 0) + 1;
    await article.save();

    return res.status(200).json({
      success: true,
      message: "View updated",
      views: article.views,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update view count",
      error: error.message,
    });
  }
}
