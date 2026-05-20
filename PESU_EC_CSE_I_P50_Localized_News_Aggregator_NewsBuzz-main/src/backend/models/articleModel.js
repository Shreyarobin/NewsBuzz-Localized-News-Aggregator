import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    summary: String,

    category: {
      type: String,
      enum: [
        "Technology",
        "Politics",
        "Sports",
        "Entertainment",
        "Business",
        "World",
        "Health",
        "Science",
        "Other",
      ],
      default: "Other",
    },

    // ⭐ Added for analytics (US12)
    views: {
      type: Number,
      default: 0,
    },

    source: String,
    publishedDate: Date,
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
