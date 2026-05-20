// src/frontend/src/GlobalFeed.jsx
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";

export default function GlobalFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const res = await fetch("http://localhost:4000/api/news", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const ct = (res.headers.get("content-type") || "").toLowerCase();
        const text = await res.text();

        if (!ct.includes("application/json")) {
          // silently log for debugging, but DO NOT show any UI message
          console.error("GlobalFeed: non-JSON response:", text.slice(0, 1000));
          if (!cancelled) setArticles([]); // keep feed empty
          setLoading(false);
          return;
        }

        const data = JSON.parse(text);

        if (!res.ok) {
          console.error("GlobalFeed API error:", data);
          if (!cancelled) setArticles([]);
          setLoading(false);
          return;
        }

        if (!cancelled) setArticles(data.articles || []);
      } catch (err) {
        // silent in UI, but keep console trace
        console.error("GlobalFeed fetch error:", err);
        if (!cancelled) setArticles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>Loading latest news…</div>;
  if (!articles.length) return null; // <-- NO visible message when empty/failure

  return (
    <section>
      <h2>Latest News</h2>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
        {articles.map((a) => (
          <ArticleCard key={a._id} article={a} />
        ))}
      </div>
    </section>
  );
}
