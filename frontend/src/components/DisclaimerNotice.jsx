import React, { useEffect } from "react";

export default function DisclaimerNotice({ onAccept }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1rem" }}
    >
      <div className="card shadow-sm border-0 w-100" style={{ maxWidth: "720px" }}>
        <div className="card-header bg-primary text-white p-4 text-center">
          <h2 className="mb-0">Important Application Notice</h2>
        </div>
        <div className="card-body px-4 py-4 py-md-5">
          <p className="lead mb-4">
            Thank you for your interest in joining our team. Before proceeding with your application,
            please carefully review the following terms.
          </p>

          <div className="alert alert-warning">
            <strong>Note:</strong> Each candidate is permitted to apply for a specific job position <strong>only once</strong>.<br />
            Submitting multiple applications for the same position will result in disqualification to ensure fairness in our hiring process.
          </div>

          <p className="text-muted mb-2">
            By clicking <strong>"I Understand & Continue"</strong>, you confirm that:
          </p>
          <ul className="text-muted">
            <li>You have not previously applied for this specific job posting.</li>
            <li>The information and documents you provide are truthful and verifiable.</li>
            <li>Duplicate or fraudulent applications will be automatically rejected.</li>
          </ul>

          <div className="d-grid mt-4">
            <button
              onClick={onAccept}
              className="btn btn-primary py-2"
              aria-label="Accept disclaimer and proceed to application"
            >
              I Understand & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
