import React, { useState, useEffect } from "react";

export default function ArticleCard({ article, showBookmark = true }) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:4000/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success) {
          const exists = (data.articles || []).some(a => a._id === article._id);
          setSaved(exists);
        }
      } catch (e) {
        // silent
      }
    }
    checkSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save articles.");
      return;
    }
    setBusy(true);
    try {
      if (!saved) {
        const res = await fetch("http://localhost:4000/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ articleId: article._id })
        });
        const data = await res.json();
        if (data.success) setSaved(true);
      } else {
        // ✅ FIXED: Changed backtick position
        const res = await fetch(`http://localhost:4000/api/bookmarks/${article._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setSaved(false);
      }
    } catch (err) {
      console.error("bookmark error", err);
      alert("Could not update bookmark. Check console.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article style={{ padding: "1rem", borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <h3 style={{ margin: "0 0 .5rem" }}>{article.title}</h3>
      <p style={{ margin: 0 }}>{article.summary || (article.content ? article.content.slice(0, 120) + "…" : "")}</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".6rem", alignItems: "center" }}>
        <small style={{ color: "#666" }}>{article.category || "General"}</small>
        {showBookmark && (
          <button onClick={handleSave} disabled={busy} style={{ cursor: "pointer" }}>
            {saved ? "🔖 Saved" : "🔖 Save"}
          </button>
        )}
      </div>
    </article>
  );
}