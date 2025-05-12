import React from "react";

const steps = [
  "Personal Info",
  "Document Upload",
  "Interview 1",
  "Interview 2",
  "Interview 3",
];

const StepTracker = ({ currentStep }) => {
  return (
    <div className="step-tracker d-flex justify-content-between align-items-center mb-4 px-2">
      {steps.map((label, index) => (
        <div key={index} className="text-center" style={{ flex: 1, position: "relative" }}>
          <div
            className={`rounded-circle mx-auto mb-1 d-flex align-items-center justify-content-center ${
              currentStep === index + 1
                ? "bg-primary text-white"
                : currentStep > index + 1
                ? "bg-success text-white"
                : "bg-light text-muted"
            }`}
            style={{
              width: "36px",
              height: "36px",
              fontWeight: "bold",
              zIndex: 1
            }}
          >
            {index + 1}
          </div>
          <div
            style={{ fontSize: "0.8rem" }}
            className={
              currentStep === index + 1
                ? "fw-semibold"
                : currentStep > index + 1
                ? "text-success"
                : "text-muted"
            }
          >
            {label}
          </div>
          {index < steps.length - 1 && (
            <div
              className="position-absolute top-50 start-100 translate-middle-y"
              style={{
                height: "2px",
                width: "100%",
                background:
                  currentStep > index + 1 ? "#198754" : "#dee2e6",
                left: "50%",
                zIndex: 0
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepTracker;
