// src/backend/models/ingestionReportModel.js
import mongoose from "mongoose";

const FeedSummarySchema = new mongoose.Schema({
  feedId: { type: mongoose.Schema.Types.ObjectId, ref: "Feed", required: false },
  name: String,
  url: String,
  parsedCount: { type: Number, default: 0 },
  addedCount: { type: Number, default: 0 },
  error: { type: String, default: null }
});

const IngestionReportSchema = new mongoose.Schema({
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date },
  status: { type: String, enum: ["success", "partial", "failed"], default: "success" },
  totals: {
    feedsProcessed: { type: Number, default: 0 },
    totalParsed: { type: Number, default: 0 },
    totalAdded: { type: Number, default: 0 }
  },
  feedSummaries: [FeedSummarySchema],
  meta: { type: Object, default: {} }
});

export default mongoose.model("IngestionReport", IngestionReportSchema);
