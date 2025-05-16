import React from "react";
import "../styles/ExpJobs.css";

export default function ExpiringJobsPanel({ jobs }) {
  const today = new Date();

  const getDaysLeft = (dateStr) => {
    const expiry = new Date(dateStr);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const expiringJobs = jobs.filter((job) => {
    const daysLeft = getDaysLeft(job.expiresAt);
    return daysLeft >= 0 && daysLeft <= 7;
  });

  if (expiringJobs.length === 0) return null;

  return (
    <div className="expiring-jobs-panel card mb-4">
      <h5 className="mb-3">⚠️ Expiring Jobs (Next 7 Days)</h5>
      <ul className="list-group">
        {expiringJobs.map((job) => (
          <li
            key={job.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{job.title}</strong>
              <div className="text-muted small">
                Expires on {new Date(job.expiresAt).toLocaleDateString()}
              </div>
            </div>
            <span className="badge bg-warning text-dark">
              {getDaysLeft(job.expiresAt)} days left
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
