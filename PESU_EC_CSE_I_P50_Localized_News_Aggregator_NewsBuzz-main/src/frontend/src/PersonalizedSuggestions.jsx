// src/frontend/src/PersonalizedSuggestions.jsx
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";

export default function PersonalizedSuggestions() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null); // user-friendly message

  useEffect(() => {
    async function load() {
      setLoading(true);
      setNotice(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setNotice("Please log in to see personalized suggestions.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/suggestions", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        // Inspect content-type before parsing
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        console.log("Suggestions response:", res.status, ct);

        const bodyText = await res.text();

        if (!ct.includes("application/json")) {
          // Response is not JSON (likely an HTML error or index page).
          console.error("Suggestions endpoint returned non-JSON response:", bodyText.slice(0, 1000));
          setNotice("Could not load personalized suggestions (server returned unexpected response).");
          setArticles([]); // fallback
          setLoading(false);
          return;
        }

        // Safe JSON parse
        const data = JSON.parse(bodyText);

        if (!res.ok) {
          console.error("Suggestions API error:", data);
          setNotice(data.message || `Error loading suggestions (${res.status})`);
          setArticles([]);
          setLoading(false);
          return;
        }

        setArticles(data.articles || []);
      } catch (err) {
        console.error("Fetch error for suggestions:", err);
        setNotice("Failed to load personalized suggestions. Check console for details.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div>Loading suggestions...</div>;
  if (notice) return <div style={{ color: "#444" }}>{notice}</div>;
  if (!articles.length) return <div>No personalized suggestions yet.</div>;

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Your Personalized News</h2>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
        {articles.map((a) => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </div>
    </section>
  );
}
