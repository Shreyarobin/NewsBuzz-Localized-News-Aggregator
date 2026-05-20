// src/backend/services/suggestionService.js

import Article from "../models/articleModel.js";

export async function getPersonalizedSuggestions(user) {
  const interests = user.interests || [];

  // If user has no interests stored, return generic latest 10 articles
  if (interests.length === 0) {
    return await Article.find().limit(10);
  }

  // If user has interests, fetch matching category articles
  return await Article.find({
    category: { $in: interests }
  }).limit(10);
}
