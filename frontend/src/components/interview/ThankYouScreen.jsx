import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <div className="mb-4">
                <div
                  className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  ✓
                </div>
              </div>
              <h1 className="display-6 mb-3">Thank You!</h1>
              <p className="lead mb-4">
                Your application has been successfully submitted.
              </p>
              <p className="text-muted mb-4">
                We'll review your application and get back to you soon. A confirmation email has been sent to your registered email address.
              </p>
              <button
                onClick={() => navigate("/")}
                className="btn btn-outline-primary px-4 py-2"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
