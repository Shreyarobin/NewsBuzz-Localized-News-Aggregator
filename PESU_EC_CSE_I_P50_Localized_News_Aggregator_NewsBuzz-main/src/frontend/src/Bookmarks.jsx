import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

export default function Bookmarks() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      if (!token) { 
        setArticles([]); 
        setLoading(false); 
        return; 
      }
      try {
        const res = await fetch("http://localhost:4000/api/bookmarks", { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        const data = await res.json();
        if (data.success) setArticles(data.articles || []);
      } catch (e) {
        console.error("load bookmarks", e);
      } finally { 
        setLoading(false); 
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading saved articles…</div>;
  if (!articles.length) return <div>No saved articles yet.</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your saved articles</h2>
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
        {articles.map(a => <ArticleCard key={a._id} article={a} />)}
      </div>
    </div>
  );
}
