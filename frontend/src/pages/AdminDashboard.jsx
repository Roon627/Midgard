// AdminDashboard.jsx
import { useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { exportToCsv, exportToPdf } from "../utils/exportUtils";
import AdminSettings from "./AdminSettings"; 
import Applications from "./Applications"; 
import '../App.css';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({ title: "", description: "", expiresAt: "" });
  const [showExpiredJobs, setShowExpiredJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newJob, setNewJob] = useState({ title: "", description: "", expiresAt: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (activeMenu === "jobs" || activeMenu === "dashboard" || activeMenu === "applications") {
      fetchData();
    }
  }, [activeMenu]);

  const fetchData = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${API_URL}/jobs`).then(res => res.json()),
        fetch(`${API_URL}/submissions`).then(res => res.json()),
      ]);
      setJobs(jobsRes);
      setApplications(appsRes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const toggleExpiredView = () => setShowExpiredJobs(!showExpiredJobs);

  const filteredJobs = jobs
    .filter(job => {
      const isExpired = new Date(job.expiresAt) < new Date();
      return showExpiredJobs ? isExpired : !isExpired;
    })
    .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const startEditing = (job) => {
    setEditingJobId(job.id);
    setEditedJob({ title: job.title, description: job.description, expiresAt: job.expiresAt });
  };

  const cancelEditing = () => {
    setEditingJobId(null);
    setEditedJob({ title: "", description: "", expiresAt: "" });
  };

  const saveEditedJob = async (jobId) => {
    try {
      await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedJob),
      });
      await fetchData();
      cancelEditing();
      alert("Job updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update job.");
    }
  };

  const createNewJob = async () => {
    if (!newJob.title || !newJob.description || !newJob.expiresAt) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error("Failed to create job");

      await fetchData();
      setNewJob({ title: "", description: "", expiresAt: "" });
      setShowAddForm(false);
      alert("Job created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating job.");
    }
  };

  const exportApplicants = (jobId, format) => {
    const jobApplicants = applications.filter(app => app.jobId === jobId);
    if (format === 'csv') exportToCsv(jobApplicants, `job_${jobId}_applications.csv`);
    if (format === 'pdf') exportToPdf(jobApplicants, `job_${jobId}_applications.pdf`);
  };

  return (
    <div className="admin-dashboard-wrapper">
      <aside className="admin-sidebar shadow-sm rounded-3">
        <h3 className="admin-sidebar-header">Admin</h3>
        <ul className="admin-nav">
          {["dashboard", "jobs", "applications", "settings"].map(menu => (
            <li
              key={menu}
              className={`admin-nav-item ${activeMenu === menu ? "active" : ""}`}
              onClick={() => setActiveMenu(menu)}
              style={{ cursor: "pointer" }}
            >
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <div className="admin-content">
        <div className="admin-content-header d-flex justify-content-between align-items-center">
          <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h2>
          {activeMenu === "jobs" && (
            <div className="d-flex gap-2">
              <button onClick={toggleExpiredView} className="toggle-btn">
                {showExpiredJobs ? "Show Active Jobs" : "Show Expired Jobs"}
              </button>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary">
                {showAddForm ? "Cancel" : "Add New Job"}
              </button>
            </div>
          )}
        </div>

        {isLoading && (activeMenu !== "settings") ? (
          <div className="spinner-container">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          </div>
        ) : (
          <div>
            {activeMenu === "dashboard" && (
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <h5 className="mb-2">Total Jobs</h5>
                  <h2>{jobs.length}</h2>
                </div>
                <div className="dashboard-card">
                  <h5 className="mb-2">Applications</h5>
                  <h2>{applications.length}</h2>
                </div>
              </div>
            )}

            {activeMenu === "jobs" && (
              <div className="admin-table-wrapper">
                {showAddForm && (
                  <div className="card p-3 mb-3">
                    <h5>Add New Job</h5>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Job Title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                    <textarea
                      className="form-control mb-2"
                      placeholder="Job Description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      rows="3"
                    ></textarea>
                    <input
                      type="datetime-local"
                      className="form-control mb-2"
                      value={newJob.expiresAt}
                      onChange={(e) => setNewJob({ ...newJob, expiresAt: e.target.value })}
                    />
                    <button className="btn btn-success" onClick={createNewJob}>Submit</button>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Search Jobs..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="search-input mb-3"
                  style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)" }}
                />
                <table className="admin-table">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Expires</th>
                      <th>Applicants</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map(job => {
                      const applicantCount = applications.filter(a => a.jobId === job.id).length;
                      return (
                        <tr key={job.id} className="align-middle">
                          <td>{editingJobId === job.id ? <input value={editedJob.title} onChange={e => setEditedJob({ ...editedJob, title: e.target.value })} /> : job.title}</td>
                          <td>{editingJobId === job.id ? <input value={editedJob.description} onChange={e => setEditedJob({ ...editedJob, description: e.target.value })} /> : job.description.substring(0, 40) + "..."}</td>
                          <td>{editingJobId === job.id ? <input type="datetime-local" value={editedJob.expiresAt} onChange={e => setEditedJob({ ...editedJob, expiresAt: e.target.value })} /> : new Date(job.expiresAt).toLocaleDateString()}</td>
                          <td>{applicantCount}</td>
                          <td>
                            {editingJobId === job.id ? (
                              <>
                                <button className="btn btn-success btn-sm me-1" onClick={() => saveEditedJob(job.id)}>Save</button>
                                <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-outline-primary btn-sm me-1" onClick={() => startEditing(job)}>Edit</button>
                                <button className="btn btn-outline-success btn-sm me-1" onClick={() => exportApplicants(job.id, 'csv')}>CSV</button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplicants(job.id, 'pdf')}>PDF</button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {activeMenu === "applications" && (
              <div className="admin-table-wrapper">
                <Applications />
              </div>
            )}

            {activeMenu === "settings" && (
              <div className="admin-settings-wrapper">
                <AdminSettings />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
