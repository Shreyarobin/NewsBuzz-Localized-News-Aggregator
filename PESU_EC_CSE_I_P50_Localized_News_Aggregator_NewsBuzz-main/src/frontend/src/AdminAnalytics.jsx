import React, { useEffect, useState } from "react";
const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function AdminAnalytics() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const [catRes, artRes] = await Promise.all([
        fetch(`${apiBase}/api/analytics/categories`).then((res) => res.json()),
        fetch(`${apiBase}/api/analytics/articles`).then((res) => res.json()),
      ]);
      setCategories(catRes.categories || []);
      setArticles(artRes.articles || []);
    } catch {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Analytics</h2>

      {/* MOST READ CATEGORIES */}
      <h3 style={{ marginTop: 30 }}>Most Read Categories</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Views</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, idx) => (
            <tr key={idx}>
              <td>{c._id && c._id.trim() !== '' ? c._id : 'Sports'}</td>
              <td>{c.totalViews}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ARTICLE ENGAGEMENT */}
      <h3 style={{ marginTop: 40 }}>Article Engagement</h3>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, idx) => (
            <tr key={idx}>
              <td>{a.title}</td>
              <td>{a.category && a.category.trim() !== '' ? a.category : 'Sports'}</td>
              <td>{a.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}