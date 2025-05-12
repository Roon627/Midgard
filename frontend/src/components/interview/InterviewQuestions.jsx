import React, { useEffect, useState, useRef } from "react";
import StepTracker from "../common/StepTracker";
import "../../styles/Interview.css";

const InterviewQuestions = ({
  islamicQuestions,
  personalityQuestions,
  answers,
  handleChange,
  timeLeft,
  handleUploadAndSubmit,
  step,
  setStep,
  isSubmitting,
  setUploadDone // from Interview.jsx
}) => {
  const [isPageComplete, setIsPageComplete] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [visibilityWarning, setVisibilityWarning] = useState(false);
  const [showDisabledReason, setShowDisabledReason] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [slideOut, setSlideOut] = useState(false);

  const containerRef = useRef();
  const topRef = useRef();
  const tabExitCount = useRef(0);
  const tabHiddenSince = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [step]);

  useEffect(() => {
    const keyCheck = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J"))
      ) {
        alert("Developer tools are not allowed.");
        e.preventDefault();
      }
    };
    const preventContextMenu = (e) => e.preventDefault();

    document.addEventListener("keydown", keyCheck);
    document.addEventListener("contextmenu", preventContextMenu);
    return () => {
      document.removeEventListener("keydown", keyCheck);
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        tabHiddenSince.current = new Date();
        tabExitCount.current += 1;
        if (tabExitCount.current > 3) {
          alert("Too many tab switches. Assessment ended.");
          window.location.href = "/careers";
        }
      } else if (document.visibilityState === "visible") {
        const now = new Date();
        if (tabHiddenSince.current && now - tabHiddenSince.current > 5 * 60 * 1000) {
          alert("You were away too long. Assessment ended.");
          window.location.href = "/careers";
        }
        tabHiddenSince.current = null;
        setVisibilityWarning(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const offset = step === 3 ? 0 : step === 4 ? 10 : 20;
    const count = step === 3 ? 10 : 10;
    const complete = Array.from({ length: count }).every(
      (_, i) => answers[offset + i]?.answer
    );
    setIsPageComplete(complete);
  }, [answers, step]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = async () => {
    if (!isPageComplete || !isOnline) {
      setShowDisabledReason(true);
      setTimeout(() => setShowDisabledReason(false), 3000);
      return;
    }

    try {
      setUploadStatus("uploading");
      await handleUploadAndSubmit();
      setUploadStatus("done");
      setTimeout(() => setSlideOut(true), 1000);
      setTimeout(() => setUploadDone(true), 1800); // tells Interview.jsx to show ThankYouScreen
    } catch (error) {
      setUploadStatus("idle");
      console.error("Upload failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleNextClick = () => {
    if (!isPageComplete || !isOnline) {
      setShowDisabledReason(true);
      setTimeout(() => setShowDisabledReason(false), 3000);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const renderIslamic = () => (
    <>
      <h3 className="mb-4 pb-2 border-bottom">Islamic Knowledge</h3>
      {islamicQuestions.map((q, i) => (
        <div className="question-card card mb-3 shadow-sm" key={i}>
          <div className="card-body">
            <h5 className="card-title mb-3">Question {i + 1}: {q.question}</h5>
            <div className="options">
              {q.options?.map((opt, idx) => (
                <div key={idx} className="form-check mb-2 p-2 rounded question-option">
                  <input
                    id={`islamic-q${i}-opt${idx}`}
                    type="radio"
                    name={`islamic-question-${i}`}
                    value={opt.text}
                    checked={answers[i]?.answer === opt.text}
                    onChange={() => handleChange(i, opt.text, opt.points)}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={`islamic-q${i}-opt${idx}`}>
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const renderPersonalityPage = (page) => {
    const offset = islamicQuestions.length + (page - 1) * 10;
    const questions = personalityQuestions.slice((page - 1) * 10, page * 10);

    return (
      <>
        <h3 className="mb-4 pb-2 border-bottom">Personality Assessment - Page {page}</h3>
        {questions.map((q, i) => {
          const questionIndex = offset + i;
          return (
            <div className="question-card card mb-3 shadow-sm" key={questionIndex}>
              <div className="card-body">
                <h5 className="card-title mb-3">Question {questionIndex + 1}: {q.question}</h5>
                <div className="options">
                  {q.options?.map((opt, idx) => (
                    <div key={idx} className="form-check mb-2 p-2 rounded question-option">
                      <input
                        id={`personality-q${questionIndex}-opt${idx}`}
                        type="radio"
                        name={`personality-question-${questionIndex}`}
                        value={opt.text}
                        checked={answers[questionIndex]?.answer === opt.text}
                        onChange={() => handleChange(questionIndex, opt.text, opt.points, opt.traits || {})}
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={`personality-q${questionIndex}-opt${idx}`}>
                        {opt.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="container py-4" ref={containerRef}>
      <div ref={topRef}></div>
      <div className={`card shadow-sm border-0 ${slideOut ? "slide-out-left" : ""}`}>
        <div className="card-header bg-primary text-white p-3 d-flex justify-content-between">
          <h2 className="m-0">Interview Questions</h2>
          <div className="timer bg-white text-primary px-3 py-1 rounded-pill">
            <i className="fa fa-clock-o me-2"></i>
            Time left: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="px-4 pt-4">
          <StepTracker currentStep={step} />
        </div>

        <div className="card-body p-4">
          {!isOnline && (
            <div className="alert alert-danger">
              <strong>You're offline:</strong> Internet connection is required.
            </div>
          )}

          {(visibilityWarning || tabExitCount.current > 2) && (
            <div className="alert alert-info">
              <strong>Heads up:</strong> Avoid switching tabs or going inactive.
            </div>
          )}

          {showDisabledReason && (
            <div className="alert alert-warning">
              Complete all questions and ensure you're online.
            </div>
          )}

          <div className="alert alert-warning">
            <strong>Time left:</strong> {formatTime(timeLeft)}
          </div>

          <div className="question-container mb-5">
            {step === 3 && renderIslamic()}
            {step === 4 && renderPersonalityPage(1)}
            {step === 5 && renderPersonalityPage(2)}
          </div>

          <div className="d-grid mt-4">
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextClick}
                className="btn btn-gradient py-2 fw-semibold shadow-sm"
                disabled={!isPageComplete || !isOnline}
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className={`btn btn-gradient py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center ${
                  uploadStatus === "done" ? "bounce-in" : ""
                }`}
                disabled={uploadStatus !== "idle"}
              >
                {uploadStatus === "uploading" ? (
                  <>
                    <span className="loader" />
                    Uploading documents...
                  </>
                ) : uploadStatus === "done" ? (
                  <>
                    <span className="me-2">✅</span>
                    Uploaded!
                  </>
                ) : (
                  "Submit Answers"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
