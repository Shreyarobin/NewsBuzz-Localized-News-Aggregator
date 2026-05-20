import express from "express";
import Feed from "../models/feedModel.js";
import IngestionLog from "../models/ingestionLogModel.js";
import { fetchFeeds } from "../services/feedFetcher.js";

const router = express.Router();

// =======================
// POST: Add a new RSS feed LOC 7 
// =======================
router.post("/add", async (req, res) => {
  try {
    const { name, url, category } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: "Feed name and URL are required." });
    }

    // Check if the feed already exists
    const existingFeed = await Feed.findOne({ url });
    if (existingFeed) {
      return res.status(400).json({ message: "Feed already exists." });
    }

    // Save the new feed
    const newFeed = new Feed({ name, url, category });
    await newFeed.save();

    res.status(201).json({
      success: true,
      message: "Feed added successfully!",
      feed: newFeed,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding feed",
      error: error.message,
    });
  }
});

// =======================
// GET: Get all feeds
// =======================
router.get("/", async (req, res) => {
  try {
    const feeds = await Feed.find();
    res.status(200).json({ success: true, feeds });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching feeds",
      error: error.message,
    });
  }
});

// ==================================
// GET: Manually trigger feed fetching
// ==================================
router.get("/fetch-now", async (req, res) => {
  try {
    await fetchFeeds();
    res.json({ success: true, message: "Feeds fetched successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching feeds",
      error: error.message,
    });
  }
});

// ==================================
// GET: View ingestion logs (LOC-10)
// ==================================
router.get("/logs", async (req, res) => {
  try {
    const logs = await IngestionLog.find().sort({ startedAt: -1 });
    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching logs",
      error: error.message,
    });
  }
});

export default router;