import React from "react";
import PersonalizedSuggestions from "./PersonalizedSuggestions.jsx";
import GlobalFeed from "./GlobalFeed.jsx"; // ⭐ added

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Here are news suggestions tailored for you.</p>
      <hr />

      {/* Personalized news (LOC-15) */}
      <PersonalizedSuggestions />

      <hr style={{ margin: "2rem 0" }} />

      {/* Latest news for all users (Tier A) */}
      <GlobalFeed />
    </div>
  );
};

export default Dashboard;
