import User from "../models/userModel.js";
import Article from "../models/articleModel.js";

export async function addBookmark(req, res) {
  try {
    const userId = req.user._id;
    const { articleId } = req.body;
    if (!articleId) return res.status(400).json({ success: false, message: "articleId required" });

    const article = await Article.findById(articleId).select("_id title");
    if (!article) return res.status(404).json({ success: false, message: "Article not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.bookmarks.some(id => id.toString() === articleId)) {
      return res.status(200).json({ success: true, message: "Already bookmarked" });
    }

    user.bookmarks.push(article._id);
    await user.save();

    return res.json({ success: true, message: "Bookmarked", articleId: article._id });
  } catch (err) {
    console.error("addBookmark error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeBookmark(req, res) {
  try {
    const userId = req.user._id;
    const { articleId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.bookmarks = user.bookmarks.filter(id => id.toString() !== articleId);
    await user.save();

    return res.json({ success: true, message: "Bookmark removed" });
  } catch (err) {
    console.error("removeBookmark error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function getBookmarks(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
      path: "bookmarks",
      select: "title summary category createdAt"
    });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({ success: true, articles: user.bookmarks || [] });
  } catch (err) {
    console.error("getBookmarks error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
