import { useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { exportSingleApplication } from "../utils/exportHelpers";
import '../App.css';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, jobsRes] = await Promise.all([
        fetch(`${API_URL}/submissions`).then(res => res.json()),
        fetch(`${API_URL}/jobs`).then(res => res.json())
      ]);
      setApplications(appsRes);
      setJobs(jobsRes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading applications:", error);
      setIsLoading(false);
    }
  };

  const findJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "Unknown Job";
  };

  const exportApplication = (application, format) => {
    exportSingleApplication({
      application,
      jobTitle: findJobTitle(application.jobId),
      format
    });
  };

  return (
    <div className="container py-4">
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{findJobTitle(app.jobId)}</td>
                  <td>{new Date(app.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => setSelectedApp(app)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => exportApplication(app, "csv")}
                    >
                      Export CSV
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => exportApplication(app, "pdf")}
                    >
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {selectedApp && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Application Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedApp(null)} />
              </div>
              <div className="modal-body">
                <h6 className="text-primary">Personal Info</h6>
                <ul className="list-group mb-4">
                  <li className="list-group-item"><strong>Name:</strong> {selectedApp.name}</li>
                  <li className="list-group-item"><strong>Email:</strong> {selectedApp.email}</li>
                  <li className="list-group-item"><strong>Phone:</strong> {selectedApp.phoneNumber}</li>
                  <li className="list-group-item"><strong>National ID:</strong> {selectedApp.nationalId}</li>
                  <li className="list-group-item"><strong>Job Title:</strong> {findJobTitle(selectedApp.jobId)}</li>
                  <li className="list-group-item"><strong>Submitted At:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</li>
                </ul>

                <h6 className="text-primary">Interview Answers</h6>
                <div className="list-group">
                  {Array.isArray(selectedApp.answers) && selectedApp.answers.map((answer, index) => (
                    <div key={index} className="list-group-item">
                      {typeof answer === "object" ? (
                        <>
                          <strong>Q{index + 1}:</strong> {answer.question || "Question not available"} <br />
                          <span className="text-success"><strong>Candidate's Answer:</strong> {answer.answer || answer.selected || "—"}</span><br />
                          {answer.correctAnswer && (
                            <span className="text-muted">
                              <strong>Correct Answer:</strong> {answer.correctAnswer}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <strong>Q{index + 1}:</strong> <span className="text-success">Candidate's Answer:</span> {answer}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
