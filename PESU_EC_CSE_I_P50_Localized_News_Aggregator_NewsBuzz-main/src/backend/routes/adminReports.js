// Updated during User Story 13 final commit


// src/backend/routes/adminReports.js
import express from "express";
import IngestionReport from "../models/ingestionReportModel.js";
// import { protect } from "../middleware/authMiddleware.js"; // uncomment when ready

const router = express.Router();

// Temporary simple admin-only check (replace later with real protect middleware)
const adminOnly = (req, res, next) => {
  // If you have real auth, replace this with JWT validation
  next();
};

// ✅ GET all ingestion reports
router.get("/reports", adminOnly, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
    const reports = await IngestionReport.find()
      .sort({ startedAt: -1 })
      .limit(limit);
    res.status(200).json({ success: true, reports });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching reports",
      error: err.message,
    });
  }
});

// ✅ GET one report by ID
router.get("/reports/:id", adminOnly, async (req, res) => {
  try {
    const report = await IngestionReport.findById(req.params.id);
    if (!report)
      return res.status(404).json({ success: false, message: "Report not found" });
    res.status(200).json({ success: true, report });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching report",
      error: err.message,
    });
  }
});

export default router;
