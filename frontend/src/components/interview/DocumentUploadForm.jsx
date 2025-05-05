import React from "react";
import StepTracker from "../common/StepTracker";

const DocumentUploadForm = ({ files, handleFileChange, handleDocumentSubmission, error }) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white p-4">
              <h2 className="text-center mb-0">Upload Required Documents</h2>
            </div>
            <div className="card-body p-4">

              {/* Centralized Step Tracker */}
              <StepTracker currentStep={2} />

              <div className="alert alert-info">
                <div className="d-flex">
                  <div className="me-2">
                    <i className="fa fa-info-circle"></i>
                  </div>
                  <div>
                    Please upload all required documents marked with an asterisk (*).
                    Supported file formats: PDF, JPEG, PNG (max 5MB per file).
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label fw-bold">CV / Resume *</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "cv")}
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                  />
                  <div className="form-text">Your most recent and updated curriculum vitae</div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Certificates *</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "certificates")}
                    className="form-control"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="form-text">Academic and professional certificates</div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">ID Card / Passport *</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "idCard")}
                    className="form-control"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="form-text">Government-issued identification</div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Police Report *</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "policeReport")}
                    className="form-control"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="form-text">Police clearance certificate</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Reference Documents</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "references")}
                    className="form-control"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="form-text">Letters of recommendation or references</div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-grid mt-4">
                  <button onClick={handleDocumentSubmission} className="btn btn-primary py-2">
                    Continue to Interview
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
