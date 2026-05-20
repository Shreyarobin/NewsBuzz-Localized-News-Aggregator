import React, { useEffect, useState } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const res = await axios.get(`${apiBase}/api/admin/reports`);
      setReports(res.data.reports || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feed Ingestion Reports</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Started</th>
              <th>Status</th>
              <th>Feeds Processed</th>
              <th>Total Parsed</th>
              <th>Total Added</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.startedAt).toLocaleString()}</td>
                <td>{r.status}</td>
                <td>{r.totals?.feedsProcessed}</td>
                <td>{r.totals?.totalParsed}</td>
                <td>{r.totals?.totalAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
