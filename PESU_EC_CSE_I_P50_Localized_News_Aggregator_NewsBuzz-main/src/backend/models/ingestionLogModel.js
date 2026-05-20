import mongoose from "mongoose";

const ingestionLogSchema = new mongoose.Schema({
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date },
  status: {
    type: String,
    enum: ["success", "partial", "failed"],
    default: "success",
  },
  totalFeeds: { type: Number, default: 0 },
  totalArticlesFetched: { type: Number, default: 0 },
  error: { type: String, default: "" },
});

export default mongoose.model("IngestionLog", ingestionLogSchema);