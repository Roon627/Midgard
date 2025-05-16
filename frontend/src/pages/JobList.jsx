import React, { useState } from "react";
import "../styles/JobList.css";
import { API_URL } from "../data/api";

export default function JobList({
  jobs,
  applications,
  editingJobId,
  editedJob,
  startEditing,
  cancelEditing,
  saveEditedJob,
  setEditedJob,
  exportApplicants,
  fetchData
}) {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const countApplicants = (jobId) =>
    applications.filter((a) => a.jobId === jobId).length;

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to permanently delete this job?")) return;
    try {
      await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  const handleVisibilityToggle = async (jobId, newVisibility) => {
    try {
      await fetch(`${API_URL}/jobs/${jobId}/visibility`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ visible: newVisibility }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to update visibility.");
    }
  };

  const toggleDescription = (jobId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const formatDescription = (jobId, description) => {
    if (!description) return "";
    if (expandedDescriptions[jobId]) {
      return description;
    } else {
      return description.length > 80 ? `${description.slice(0, 80)}...` : description;
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="d-none d-md-block">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="title-col">Title</th>
              <th className="description-col">Description</th>
              <th className="expires-col">Expires</th>
              <th className="applicants-col">Applicants</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="title-cell">
                  {editingJobId === job.id ? (
                    <input
                      value={editedJob.title}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, title: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    job.title
                  )}
                </td>
                <td className="description-cell">
                  {editingJobId === job.id ? (
                    <textarea
                      value={editedJob.description}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, description: e.target.value })
                      }
                      rows={3}
                      className="form-control"
                    />
                  ) : (
                    <div className="description-wrapper">
                      <div className={`description-text ${expandedDescriptions[job.id] ? 'expanded' : ''}`}>
                        {formatDescription(job.id, job.description)}
                      </div>
                      {job.description && job.description.length > 80 && (
                        <button 
                          className="expand-btn" 
                          onClick={() => toggleDescription(job.id)}
                        >
                          {expandedDescriptions[job.id] ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td className="expires-cell">
                  {editingJobId === job.id ? (
                    <input
                      type="datetime-local"
                      value={editedJob.expiresAt}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, expiresAt: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    new Date(job.expiresAt).toLocaleDateString()
                  )}
                </td>
                <td className="applicants-cell">{countApplicants(job.id)}</td>
                <td className="actions-cell">
                  {editingJobId === job.id ? (
                    <div className="edit-actions">
                      <button className="btn btn-success btn-sm me-1" onClick={() => saveEditedJob(job.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <div className="action-row">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => startEditing(job)}>Edit</button>
                        <button className="btn btn-warning btn-sm" onClick={() => handleVisibilityToggle(job.id, job.visible ? 0 : 1)}>
                          {job.visible ? "Hide" : "Show"}
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
                      </div>
                      <div className="action-row">
                        <button className="btn btn-outline-success btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: "csv" })}>Export CSV</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: "pdf" })}>Export PDF</button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="d-block d-md-none">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h5>{job.title}</h5>
            
            <div className="job-card-content">
              <div className="job-description-section">
                <p className="label">Description:</p>
                <div className="job-description">
                  <div className={`description-text ${expandedDescriptions[job.id] ? 'expanded' : ''}`}>
                    {formatDescription(job.id, job.description)}
                  </div>
                  {job.description && job.description.length > 100 && (
                    <button 
                      className="expand-btn mobile" 
                      onClick={() => toggleDescription(job.id)}
                    >
                      {expandedDescriptions[job.id] ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="job-detail">
                <p className="label">Expires:</p>
                <p className="value">{new Date(job.expiresAt).toLocaleDateString()}</p>
              </div>
              
              <div className="job-detail">
                <p className="label">Applicants:</p>
                <p className="value">{countApplicants(job.id)}</p>
              </div>
            </div>

            <div className="job-card-actions">
              <div className="actions-row">
                <button className="btn btn-outline-primary btn-sm" onClick={() => startEditing(job)}>Edit</button>
                <button className="btn btn-warning btn-sm" onClick={() => handleVisibilityToggle(job.id, job.visible ? 0 : 1)}>
                  {job.visible ? "Hide" : "Show"}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
              <div className="actions-row">
                <button className="btn btn-outline-success btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: "csv" })}>CSV</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: "pdf" })}>PDF</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
