import React from "react";
import { FaCheckCircle, FaRocket, FaLightbulb, FaHourglassHalf } from "react-icons/fa";

const AssessmentNotice = ({ onStart }) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 assessment-card">
            <div className="card-header assessment-card-header text-center py-4">
              <h2 className="mb-2">Get Ready to Begin <FaRocket className="ms-2" /></h2>
              <p className="mb-0">You're about to start your official candidate assessment</p>
            </div>
            <div className="card-body text-center py-4">
              <div className="mb-4">
                <FaLightbulb className="text-warning mb-3" style={{ fontSize: "2.5rem" }} />
                <p className="lead fw-bold">
                  This short assessment will help us understand your background and working style.
                </p>
                <p className="text-muted">
                  It’s designed to evaluate your knowledge and personality to ensure a great fit with our team and culture.
                </p>
              </div>

              <div className="assessment-steps p-3 mb-4 rounded">
                <h5 className="mb-3 assessment-steps-title">What to Expect:</h5>
                <ul className="list-unstyled text-start mb-0">
                  <li className="d-flex align-items-center mb-3">
                    <FaCheckCircle className="text-success me-3" />
                    <div>
                      <strong>Islamic Knowledge Assessment</strong>
                      <p className="mb-0 small text-muted">10 multiple-choice questions covering fundamentals</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <FaCheckCircle className="text-success me-3" />
                    <div>
                      <strong>Personality Assessment – Part 1</strong>
                      <p className="mb-0 small text-muted">10 situational questions to understand your mindset</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <FaCheckCircle className="text-success me-3" />
                    <div>
                      <strong>Personality Assessment – Part 2</strong>
                      <p className="mb-0 small text-muted">10 final questions to complete the profile</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="time-notice d-flex align-items-center justify-content-center mb-4">
                <FaHourglassHalf className="text-secondary me-2" />
                <p className="mb-0 text-muted">
                  The assessment is timed. Make sure you’re in a quiet space and fully ready before starting.
                </p>
              </div>

              <button
                className="btn btn-gradient px-5 py-3 fs-5 fw-bold"
                onClick={onStart}
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentNotice;
