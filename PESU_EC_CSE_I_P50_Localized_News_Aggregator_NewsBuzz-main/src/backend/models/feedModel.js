import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, default: "General" },
  dateAdded: { type: Date, default: Date.now }
});

export default mongoose.model("Feed", feedSchema);
