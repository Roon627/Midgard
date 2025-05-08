import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";

const ThankYouScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="card border-0 shadow-lg" style={{ maxWidth: "500px", width: "100%", margin: "1rem" }}>
        <div className="card-body p-5 text-center">
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

          {/* Lead Message */}
          <p className="lead mb-3">
            Your application has been successfully submitted.
          </p>

          {/* Modern Confirmation Box */}
          <div className="bg-white border rounded p-3 mb-4">
            <p className="mb-1 text-secondary">
              Your application is now under review. We'll notify you about the next steps shortly.
            </p>
            <div className="d-flex align-items-center text-muted small mt-2">
              <Mail size={16} className="me-2 text-primary" />
              A confirmation has been sent to your email address.
            </div>
          </div>

          {/* Gradient Button */}
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
