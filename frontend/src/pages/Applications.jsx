import { useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { exportSingleApplication } from "../utils/exportHelpers";
import { fetchApplicantDocuments } from "../utils/fileHelpers";
import DocumentViewer from "../components/admin/DocumentViewer";
import Modal from "../components/common/Modal";
import "../styles/Applications.css";
import "../styles/modal.css";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocApp, setSelectedDocApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const [appsRes, jobsRes] = await Promise.all([
        fetch(`${API_URL}/submissions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/jobs?all=true`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const appsData = await appsRes.json();
      const jobsData = await jobsRes.json();

      if (!Array.isArray(jobsData)) throw new Error("Invalid jobs data");

      setApplications(appsData);
      setJobs(jobsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading applications:", error);
      setJobs([]);
      setApplications([]);
      setIsLoading(false);
    }
  };

  const findJobTitle = (jobId) => {
    const job = jobs.find((j) => j.id == jobId);
    return job ? job.title : `Deleted Job (ID: ${jobId})`;
  };

  const exportApplication = (application, format) => {
    exportSingleApplication({
      application,
      jobTitle: findJobTitle(application.jobId),
      format,
    });
  };

  const calculateIslamicScore = (answers = []) => {
    const first10 = answers.slice(0, 10);
    const correctCount = first10.filter(
      (a) =>
        a &&
        typeof a === "object" &&
        a.answer &&
        a.correctAnswer &&
        a.answer.trim().toLowerCase() === a.correctAnswer.trim().toLowerCase()
    ).length;
    return `${correctCount}/10`;
  };

  const handleLoadDocuments = async (app) => {
    const docs = await fetchApplicantDocuments(app.id);
    setDocuments(docs);
    setSelectedDocApp(app);
  };

  return (
    <div className="applications-wrapper">
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <>
          <div className="d-none d-md-block">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td className={!jobs.find(j => j.id == app.jobId) ? "text-muted fst-italic" : ""}>
                      {findJobTitle(app.jobId)}
                    </td>
                    <td>{new Date(app.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1" onClick={() => setSelectedApp(app)}>View</button>
                      <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => handleLoadDocuments(app)}>Documents</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplication(app, "pdf")}>PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-block d-md-none">
            {applications.map((app) => (
              <div key={app.id} className="mobile-app-card shadow-sm mb-3 rounded p-3 bg-white">
                <h6 className="mb-2">{app.name}</h6>
                <p className="mb-1"><strong>Email:</strong> {app.email}</p>
                <p className="mb-1"><strong>Job:</strong> {findJobTitle(app.jobId)}</p>
                <p className="mb-1"><strong>Submitted:</strong> {new Date(app.createdAt).toLocaleString()}</p>
                {app.personalityScore != null && (
                  <>
                    <p className="mb-1 text-primary"><strong>Score:</strong> {app.personalityScore}</p>
                    <p className="mb-1 text-muted"><strong>Category:</strong> {app.scoreCategory}</p>
                  </>
                )}
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => setSelectedApp(app)}>View</button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleLoadDocuments(app)}>Documents</button>
                  <button className="btn btn-outline-success btn-sm" onClick={() => exportApplication(app, "csv")}>CSV</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => exportApplication(app, "pdf")}>PDF</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedApp && (
        <Modal title="Application Details" onClose={() => setSelectedApp(null)}>
          <h6 className="text-primary">Personal Info</h6>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Name:</strong> {selectedApp.name}</li>
            <li className="list-group-item"><strong>Email:</strong> {selectedApp.email}</li>
            <li className="list-group-item"><strong>Phone:</strong> {selectedApp.phoneNumber}</li>
            <li className="list-group-item">
              <strong>{selectedApp.nationalId ? "National ID" : "Passport"}:</strong>{" "}
              {selectedApp.nationalId || selectedApp.passport || "—"}
            </li>
            <li className="list-group-item"><strong>Job Title:</strong> {findJobTitle(selectedApp.jobId)}</li>
            <li className="list-group-item"><strong>Submitted At:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</li>
            <li className="list-group-item">
              <strong>Islamic Knowledge:</strong> {calculateIslamicScore(selectedApp.answers)}
            </li>
            {selectedApp.personalityScore != null && (
              <>
                <li className="list-group-item"><strong>Personality Score:</strong> {selectedApp.personalityScore}</li>
                <li className="list-group-item"><strong>Score Category:</strong> {selectedApp.scoreCategory}</li>
              </>
            )}
            {selectedApp.traitScores && typeof selectedApp.traitScores === "object" && (
              <li className="list-group-item">
                <strong>Trait Breakdown:</strong>
                <ul className="mt-2 mb-0">
                  {Object.entries(selectedApp.traitScores).map(([trait, value]) => (
                    <li key={trait}>
                      <span className="badge bg-secondary me-2">{trait}:</span> {value}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>

          <h6 className="text-primary mt-4">Interview Answers</h6>
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
                    {answer.points != null && (
                      <span className="text-info ms-3">
                        <strong>Points:</strong> {answer.points}
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
        </Modal>
      )}

      {selectedDocApp && (
        <Modal title={`Documents for ${selectedDocApp.name}`} onClose={() => { setSelectedDocApp(null); setDocuments([]); }}>
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <DocumentViewer
              files={documents}
              applicantName={selectedDocApp.name}
              nationalId={selectedDocApp.nationalId || selectedDocApp.passport}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
