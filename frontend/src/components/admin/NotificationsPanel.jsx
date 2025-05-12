import React, { useEffect, useState } from "react";
import { API_URL } from "../../data/api";
import "./NotificationsPanel.css";

function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${API_URL}/notifications`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`
          }
        });
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "application": return "📄";
      case "job": return "💼";
      case "system": return "🛠️";
      case "submission": return "📬";
      default: return "🔔";
    }
  };

  const filtered = filter === "all"
    ? notifications
    : notifications.filter(n => n.type === filter);

  return (
    <div className="notifications-panel card p-3 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="notifications-title mb-0">Recent Updates</h4>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="application">Applications</option>
          <option value="job">Jobs</option>
          <option value="submission">Submissions</option>
          <option value="system">System</option>
        </select>
      </div>

      <ul className="notifications-list list-unstyled">
        {filtered.length === 0 ? (
          <li className="text-muted">No notifications available.</li>
        ) : (
          filtered.map((note) => (
            <li key={note.id} className={`notification-item d-flex align-items-start ${note.type}`}>
              <div className="notification-icon me-2">{getIcon(note.type)}</div>
              <div className="notification-details">
                <div className="notification-message">{note.message}</div>
                <small className="notification-time text-muted">
                  {new Date(note.createdAt).toLocaleString()}
                </small>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default NotificationsPanel;
