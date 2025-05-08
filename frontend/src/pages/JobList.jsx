import React from "react";
import "../styles/JobList.css";

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
}) {
  const countApplicants = (jobId) => applications.filter(a => a.jobId === jobId).length;

  return (
    <>
      {/* Desktop Table */}
      <div className="d-none d-md-block">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Expires</th>
              <th>Applicants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>
                  {editingJobId === job.id ? (
                    <input
                      value={editedJob.title}
                      onChange={e => setEditedJob({ ...editedJob, title: e.target.value })}
                    />
                  ) : (
                    job.title
                  )}
                </td>
                <td>
                  {editingJobId === job.id ? (
                    <input
                      value={editedJob.description}
                      onChange={e => setEditedJob({ ...editedJob, description: e.target.value })}
                    />
                  ) : (
                    job.description.slice(0, 40) + "..."
                  )}
                </td>
                <td>
                  {editingJobId === job.id ? (
                    <input
                      type="datetime-local"
                      value={editedJob.expiresAt}
                      onChange={e => setEditedJob({ ...editedJob, expiresAt: e.target.value })}
                    />
                  ) : (
                    new Date(job.expiresAt).toLocaleDateString()
                  )}
                </td>
                <td>{countApplicants(job.id)}</td>
                <td>
                  {editingJobId === job.id ? (
                    <>
                      <button className="btn btn-success btn-sm me-1" onClick={() => saveEditedJob(job.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline-primary btn-sm me-1" onClick={() => startEditing(job)}>Edit</button>
                      <button className="btn btn-outline-success btn-sm me-1" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: 'csv' })}>CSV</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: 'pdf' })}>PDF</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="d-block d-md-none">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h5>{job.title}</h5>
            <p><strong>Description:</strong> {job.description.slice(0, 100)}...</p>
            <p><strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}</p>
            <p><strong>Applicants:</strong> {countApplicants(job.id)}</p>

            <div className="job-card-actions">
              <button className="btn btn-outline-primary btn-sm" onClick={() => startEditing(job)}>Edit</button>
              <button className="btn btn-outline-success btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: 'csv' })}>CSV</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplicants({ jobId: job.id, applications, jobs, format: 'pdf' })}>PDF</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
