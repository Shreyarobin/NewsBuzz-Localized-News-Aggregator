import React, { useState } from "react";
import axios from "axios";

const apiBase = "http://localhost:4000";

export default function NewsFilter() {
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleFilter = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/news/filter`, {
        params: {
          topic,
          location,
          startDate,
          endDate
        },
      });
      setResults(res.data.articles || []);
      setMessage("");
    } catch (err) {
      console.error("Filter error:", err);
      setMessage("Error fetching results.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Filter News by Topic, Date, Location</h2>

      {/* FILTER FORM */}
      <div style={{ marginBottom: "20px" }}>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="">Select Topic</option>
          <option value="Technology">Technology</option>
          <option value="World">World</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
          

        </select>

        <input
          type="text"
          placeholder="Enter Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={handleFilter} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>

      {/* RESULTS */}
      {message && <p>{message}</p>}

      <div>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((article) => (
            <div
              key={article._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <p><strong>Category:</strong> {article.category}</p>
              <p><strong>Location:</strong> {article.location}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(article.publishedDate).toLocaleDateString()}
              </p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}