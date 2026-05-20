import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./login.jsx";
import Register from "./register.jsx";
import RoleManager from "./RoleManager.jsx";
import AdminReports from "./AdminReport.jsx";
import AdminAnalytics from "./AdminAnalytics.jsx";
import NewsFilter from "./NewsFilter.jsx";   //  NEW for LOC-14
import Dashboard from "./Dashboard.jsx";
import Bookmarks from "./Bookmarks.jsx";
// ⭐ NEW: LOC-7 - Manage Feeds
import ManageFeeds from "./ManageFeeds.jsx";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      {/* NAVIGATION BAR */}
      <nav
        style={{
          padding: "1rem",
          background: "#f5f5f5",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Manage Roles</Link>
        <Link to="/admin/reports">Admin Reports</Link>
        <Link to="/admin/analytics">Admin Analytics</Link>
        <Link to="/news/filter">Filter News</Link>
        {/* ⭐ NEW: LOC-7 - Manage Feeds link (show only to admins/editors) */}
        {token && <Link to="/manage-feeds">Manage Feeds</Link>}
        <Link to="/dashboard">Dashboard</Link>
        {token && <Link to="/bookmarks">Bookmarks</Link>}
      </nav>
      <div style={{ marginTop: "2rem" }}>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Admin Role Manager */}
          <Route
            path="/admin"
            element={token ? <RoleManager /> : <Navigate to="/login" replace />}
          />
          {/* Protected Admin Reports Page */}
          <Route
            path="/admin/reports"
            element={
              token ? <AdminReports /> : <Navigate to="/login" replace />
            }
          />
          {/* Protected Admin Analytics Page */}
          <Route
            path="/admin/analytics"
            element={
              token ? <AdminAnalytics /> : <Navigate to="/login" replace />
            }
          />
          {/* Filter News Page */}
          <Route path="/news/filter" element={<NewsFilter />} />
          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          {/* Bookmarks route */}
          <Route
            path="/bookmarks"
            element={token ? <Bookmarks /> : <Navigate to="/login" replace />}
          />
          {/* ⭐ NEW: LOC-7 Updated frontend for loc-7 - Manage Feeds route (protected for editors/admins) */}
          <Route
            path="/manage-feeds"
            element={
              token ? <ManageFeeds /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;