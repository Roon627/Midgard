import React from "react";
import StepTracker from "../common/StepTracker";

const InterviewQuestions = ({
  islamicQuestions,
  personalityQuestions,
  answers,
  handleChange,
  timeLeft,
  handleUploadAndSubmit,
  step,
  setStep
}) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const renderIslamic = () => (
    <>
      <h3 className="mb-4 pb-2 border-bottom">Islamic Knowledge</h3>
      {islamicQuestions.map((q, i) => (
        <div className="question-card card mb-3 shadow-sm" key={i}>
          <div className="card-body">
            <h5 className="card-title mb-3">
              Question {i + 1}: {q.question}
            </h5>
            <div className="options">
              {q.options?.map((opt, idx) => (
                <div
                  key={idx}
                  className="form-check mb-2 p-2 rounded question-option"
                >
                  <input
                    id={`islamic-q${i}-opt${idx}`}
                    type="radio"
                    name={`islamic-question-${i}`}
                    value={opt.text}
                    checked={answers[i] === opt.text}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`islamic-q${i}-opt${idx}`}
                  >
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
        <h3 className="mb-4 pb-2 border-bottom">
          Personality Assessment - Page {page}
        </h3>
        {questions.map((q, i) => {
          const questionIndex = offset + i;
          return (
            <div className="question-card card mb-3 shadow-sm" key={questionIndex}>
              <div className="card-body">
                <h5 className="card-title mb-3">
                  Question {questionIndex + 1}: {q.question}
                </h5>
                <div className="options">
                  {q.options?.map((opt, idx) => (
                    <div
                      key={idx}
                      className="form-check mb-2 p-2 rounded question-option"
                    >
                      <input
                        id={`personality-q${questionIndex}-opt${idx}`}
                        type="radio"
                        name={`personality-question-${questionIndex}`}
                        value={opt.text}
                        checked={answers[questionIndex] === opt.text}
                        onChange={(e) => handleChange(questionIndex, e.target.value)}
                        className="form-check-input"
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`personality-q${questionIndex}-opt${idx}`}
                      >
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
    <div className="container py-4">
      <div className="card shadow-sm border-0">
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
          <div className="alert alert-warning">
            <strong>Important:</strong> You have{" "}
            {Math.floor(timeLeft / 60)} minutes and {timeLeft % 60} seconds remaining.
            The form will be automatically submitted when the timer expires.
          </div>

          <div className="question-container mb-5">
            {step === 3 && renderIslamic()}
            {step === 4 && renderPersonalityPage(1)}
            {step === 5 && renderPersonalityPage(2)}
          </div>

          <div className="d-grid mt-4">
            {step < 5 ? (
              <button
                type="button" // ✅ added type to prevent implicit submit
                onClick={() => setStep(step + 1)}
                className="btn btn-gradient-next py-2"
              >
                Next →
              </button>
            ) : (
              <button
                type="button" // ✅ added type to prevent implicit submit
                onClick={handleUploadAndSubmit}
                className="btn btn-success py-2"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
