import React, { useEffect } from "react";
import { CheckCircle, Hourglass } from "lucide-react";

const AssessmentNotice = ({ onStart }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1rem" }}
    >
      <div className="card shadow-lg border-0 text-center w-100" style={{ maxWidth: "720px" }}>
        {/* Header */}
        <div className="bg-primary text-white py-4 px-3 rounded-top">
          <h2 className="mb-1">Get Ready to Begin 🚀</h2>
          <p className="mb-0 small">
            You’re about to start your official candidate assessment
          </p>
        </div>

        {/* Body */}
        <div className="card-body px-4 py-4 py-md-5">
          <p className="fw-semibold mb-3" style={{ fontSize: "1.125rem" }}>
            This short assessment will help us understand your background and working style.
          </p>
          <p className="text-muted mb-4">
            It’s designed to evaluate your knowledge and personality to ensure a great fit with our team and culture.
          </p>

          {/* Checklist */}
          <div className="bg-light border-start border-4 border-purple p-3 rounded mb-4 text-start">
            <h5 className="fw-bold text-purple mb-3">What to Expect:</h5>

            <ul className="list-unstyled mb-0">
              <li className="d-flex align-items-start mb-2">
                <CheckCircle className="me-2 text-success mt-1" size={18} />
                <div>
                  <strong>Islamic Knowledge Assessment</strong><br />
                  <small className="text-muted">10 multiple-choice questions covering fundamentals</small>
                </div>
              </li>

              <li className="d-flex align-items-start mb-2">
                <CheckCircle className="me-2 text-success mt-1" size={18} />
                <div>
                  <strong>Personality Assessment – Part 1</strong><br />
                  <small className="text-muted">10 situational questions to understand your mindset</small>
                </div>
              </li>

              <li className="d-flex align-items-start">
                <CheckCircle className="me-2 text-success mt-1" size={18} />
                <div>
                  <strong>Personality Assessment – Part 2</strong><br />
                  <small className="text-muted">10 final questions to complete the profile</small>
                </div>
              </li>
            </ul>
          </div>

          {/* Timer Notice */}
          <div className="text-muted d-flex align-items-center justify-content-center small mb-4">
            <Hourglass size={16} className="me-2 text-primary" />
            The assessment is timed. Make sure you’re in a quiet space and fully ready before starting.
          </div>

          {/* Button */}
          <button
            onClick={onStart}
            className="btn btn-gradient px-4 py-2 fw-semibold shadow-sm rounded-pill"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentNotice;
