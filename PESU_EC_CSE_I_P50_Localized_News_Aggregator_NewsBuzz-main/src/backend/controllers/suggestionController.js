// src/backend/controllers/suggestionController.js
import { getPersonalizedSuggestions } from "../services/suggestionService.js";

export async function personalizedSuggestions(req, res) {
  try {
    const user = req.user; // provided by authMiddleware
    const articles = await getPersonalizedSuggestions(user);
    return res.status(200).json({ success: true, articles });
  } catch (err) {
    console.error("Error in personalizedSuggestions:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
