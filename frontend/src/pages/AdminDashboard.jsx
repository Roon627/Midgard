import { useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { exportApplicants } from "../utils/exportHelpers";
import AdminSettings from "./AdminSettings";
import Applications from "./Applications";
import NotificationsPanel from "../components/admin/NotificationsPanel";

import JobList from "./JobList";
import AddJob from "../components/admin/AddJob";
import { FaBriefcase, FaUserCheck } from "react-icons/fa";
import "../styles/AdminDashboard.css";
import "../styles/modal.css";
import ExpJobs from "./ExpJobs";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({ title: "", description: "", expiresAt: "" });
  const [showExpiredJobs, setShowExpiredJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setAuthError("No authentication token found. Please login again.");
      setIsLoading(false);
      return;
    }

    if (["jobs", "dashboard", "applications"].includes(activeMenu)) {
      fetchData();
    }
  }, [activeMenu]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Authentication token is missing. Please login again.");

      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${API_URL}/jobs?all=true`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }),
        fetch(`${API_URL}/submissions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }),
      ]);

      if ([jobsRes.status, appsRes.status].includes(401) || [jobsRes.status, appsRes.status].includes(403)) {
        localStorage.removeItem("adminToken");
        throw new Error("Your session has expired. Please login again.");
      }

      if (!jobsRes.ok || !appsRes.ok) {
        const jobsErr = await jobsRes.json().catch(() => ({}));
        const appsErr = await appsRes.json().catch(() => ({}));
        throw new Error("Fetch failed: " + (jobsErr?.error || appsErr?.error || "Unknown error"));
      }

      const jobsData = await jobsRes.json();
      const appsData = await appsRes.json();

      if (!Array.isArray(jobsData)) throw new Error("Jobs data is not an array");

      setJobs(jobsData);
      setApplications(appsData);
      setAuthError(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading jobs or applications:", error);
      setJobs([]);
      setApplications([]);
      setAuthError(error.message);
      setIsLoading(false);
    }
  };

  const handleRelogin = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const toggleExpiredView = () => setShowExpiredJobs((prev) => !prev);

  const filteredJobs = jobs
    .filter((job) =>
      showExpiredJobs
        ? new Date(job.expiresAt) < new Date()
        : new Date(job.expiresAt) >= new Date()
    )
    .filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const startEditing = (job) => {
    setEditingJobId(job.id);
    setEditedJob({
      title: job.title,
      description: job.description,
      expiresAt: job.expiresAt,
    });
  };

  const cancelEditing = () => {
    setEditingJobId(null);
    setEditedJob({ title: "", description: "", expiresAt: "" });
  };

  const saveEditedJob = async (jobId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Authentication token is missing. Please login again.");

      const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedJob),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        throw new Error("Your session has expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update job");
      }

      await fetchData();
      cancelEditing();
      alert("Job updated successfully.");
    } catch (error) {
      console.error(error);
      setAuthError(error.message);
      alert("Failed to update job: " + error.message);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-dashboard-wrapper">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h3 className="admin-sidebar-header">Admin</h3>
          <ul className="admin-nav">
            {["dashboard", "jobs", "applications", "settings"].map((menu) => (
              <li
                key={menu}
                className={`admin-nav-item ${activeMenu === menu ? "active" : ""}`}
                onClick={() => setActiveMenu(menu)}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="admin-content">
          <div className="admin-content-header">
            <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h2>
            {activeMenu === "jobs" && !authError && (
              <div className="d-flex gap-2 flex-wrap">
                <button onClick={toggleExpiredView} className="toggle-btn">
                  {showExpiredJobs ? "Show Active Jobs" : "Show Expired Jobs"}
                </button>
                <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
                  ➕ Add New Job
                </button>
              </div>
            )}
          </div>

          {/* Auth or Content */}
          {authError ? (
            <div className="alert alert-danger">
              <strong>Authentication Error:</strong> {authError}
              <div className="mt-3">
                <button onClick={handleRelogin} className="btn btn-primary">
                  Login Again
                </button>
              </div>
            </div>
          ) : isLoading && activeMenu !== "settings" ? (
            <div className="spinner-container">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
              ></div>
            </div>
          ) : (
            <>
              {activeMenu === "dashboard" && (
                <>
                  <div className="dashboard-cards">
                    <div className="dashboard-card">
                      <div className="icon-circle"><FaBriefcase /></div>
                      <div className="card-text">
                        <span>Total Jobs</span>
                        <h2>{jobs.length}</h2>
                      </div>
                    </div>
                    <div className="dashboard-card">
                      <div className="icon-circle"><FaUserCheck /></div>
                      <div className="card-text">
                        <span>Applications</span>
                        <h2>{applications.length}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Expiring Jobs */}
                  <ExpJobs jobs={jobs} />

                  <NotificationsPanel />
                </>
              )}

              {activeMenu === "jobs" && (
                <div className="admin-table-wrapper">
                  <input
                    type="text"
                    placeholder="Search Jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input mb-3"
                  />
                  <JobList
                    jobs={filteredJobs}
                    applications={applications}
                    editingJobId={editingJobId}
                    editedJob={editedJob}
                    startEditing={startEditing}
                    cancelEditing={cancelEditing}
                    saveEditedJob={saveEditedJob}
                    setEditedJob={setEditedJob}
                    exportApplicants={exportApplicants}
                    fetchData={fetchData}
                  />
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
            </>
          )}

          {/* Add Job Modal */}
          {showAddForm && !authError && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="btn btn-outline-secondary mb-3"
                  onClick={() => setShowAddForm(false)}
                >
                  ← Back
                </button>
                <AddJob
                  onJobCreated={() => {
                    fetchData();
                    setShowAddForm(false);
                  }}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
