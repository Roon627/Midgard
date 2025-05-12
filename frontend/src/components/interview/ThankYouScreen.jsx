import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";

const ThankYouScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1rem" }}
    >
      <div
        className="card border-0 shadow-lg text-center w-100"
        style={{ maxWidth: "500px" }}
      >
        <div
          className="card-body px-4 py-4 py-md-5" // ← Responsive padding
        >
          {/* Success Icon */}
          <div
            className="mb-4 d-flex align-items-center justify-content-center mx-auto rounded-circle bg-success text-white"
            style={{ width: 80, height: 80 }}
          >
            <CheckCircle size={36} />
          </div>

          {/* Heading */}
          <h1 className="display-6 mb-3" style={{ color: "#6a1b9a" }}>
            Thank You!
          </h1>

          {/* Message */}
          <p className="lead mb-3">Your application has been successfully submitted.</p>

          <div className="bg-white border rounded p-3 mb-4">
            <p className="mb-1 text-secondary">
              Your application is now under review.
              We'll contact you via your provided contact details if you're selected for the next stage.
            </p>
            <div className="d-flex align-items-center text-muted small mt-2">
              <Mail size={16} className="me-2 text-primary" />
              A confirmation has been sent to your email address.
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="btn btn-gradient d-inline-flex align-items-center px-4 py-2 fw-semibold shadow-sm rounded"
          >
            <ArrowLeft size={16} className="me-2" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
