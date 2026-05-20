import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import feedRoutes from "./routes/feedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminReports.js";
import newsRoutes from "./routes/newsRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

// Personalized Suggestions (LOC-15)
import suggestionRoutes from "./routes/suggestionRoutes.js";

// Bookmarks (LOC-18)
import bookmarkRoutes from "./routes/bookmarkRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================
//          ROUTES
// ============================

app.use("/api/feeds", feedRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/analytics", analyticsRoutes);

// LOC-15
app.use("/api/suggestions", suggestionRoutes);

// LOC-18
app.use("/api/bookmarks", bookmarkRoutes);

// ============================
//     MongoDB Connection
// ============================

// ❗ IMPORTANT FIX:
// Avoid connecting to MongoDB during GitHub CI tests
if (process.env.NODE_ENV !== "test") {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGODB_TEST_URI ||
    "mongodb://localhost:27017/newsDB";

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));
} else {
  console.log("Skipping MongoDB connection in test mode.");
}

// ============================
//      Start server
// ============================

const PORT = process.env.PORT || 4000;

// ❗ Prevent server from running during tests
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for Jest/Supertest
export default app;
