import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../data/api";
import { questionSets } from "../data/questions"; // Import the question sets

export default function Interview() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Basic User Information
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    currentlyWorking: "",
    email: "",
    phone: "",
  });

  // Interview State
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [files, setFiles] = useState({});
  const [started, setStarted] = useState(false); // Track interview status
  const [error, setError] = useState("");
  const [uploadDone, setUploadDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Shuffle function to randomize the questions
  const shuffleArray = (array) => {
    const arrayCopy = [...array]; // Create a copy to avoid mutating the original
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Swap elements
    }
    return arrayCopy;
  };

  // Initialize questions when interview starts
  useEffect(() => {
    if (started) {
      // Combine questions from all question sets
      const allQuestions = questionSets.flatMap(set => set.questions);
      
      // Shuffle and select 20 random questions
      const randomQuestions = shuffleArray(allQuestions).slice(0, 20);
      
      // Ensure we have questions before setting state
      if (randomQuestions.length > 0) {
        setQuestions(randomQuestions);
        
        // Initialize answers object with empty values
        const initialAnswers = {};
        randomQuestions.forEach((_, index) => {
          initialAnswers[index] = "";
        });
        setAnswers(initialAnswers);
      } else {
        setError("Failed to load questions. Please try again.");
      }
    }
  }, [started]);

  // Timer effect
  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;
    
    const timer = setInterval(() => setTimeLeft((t) => {
      if (t <= 1) {
        clearInterval(timer);
        setSubmitted(true); // Auto-submit when time runs out
        return 0;
      }
      return t - 1;
    }), 1000);
    
    return () => clearInterval(timer);
  }, [started, timeLeft, submitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleFileChange = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const handleStartInterview = () => {
    // Combine firstName and lastName into a single 'name' field
    const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
    
    // Make sure nationality and other fields are being passed
    const submissionData = {
      jobId,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      nationality: userInfo.nationality,
      currentlyWorking: userInfo.currentlyWorking,
      email: userInfo.email,
      phone: userInfo.phone,
      answers: answers,
      documents: files,
    };

    const requiredFields = ['firstName', 'lastName', 'nationality', 'email'];
    const missingFields = requiredFields.filter(field => !userInfo[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setStarted(true);
    setError(""); // Clear error
  };

  const handleUploadAndSubmit = async () => {
    const required = ["cv", "certificates", "idCard"];
    const missing = required.filter(r => !files[r]);
    
    if (missing.length > 0) {
      setError(`Missing required documents: ${missing.join(', ')}`);
      return;
    }

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      // Check if the upload was successful
      if (!uploadRes.ok) {
        throw new Error(`Failed to upload documents: ${uploadRes.statusText}`);
      }

      const uploaded = await uploadRes.json();
      
      // Check if files were successfully uploaded
      if (!uploaded || !uploaded.uploaded) {
        throw new Error('No files uploaded successfully.');
      }

      const docMap = {};
      uploaded.uploaded.forEach(({ original, stored }) => {
        docMap[original.split(".")[0].toLowerCase()] = stored;
      });

      const submission = {
        jobId: parseInt(jobId),
        answers: Object.values(answers),
        documents: docMap,
        userInfo,
      };

      // Send application data to the server
      const res = await fetch(`${API_URL}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit application: ${res.statusText}`);
      }

      setUploadDone(true);
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
    }
  };

  // Pre-interview form
  if (!started) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white p-4">
                <h2 className="text-center mb-0">Start Your Interview</h2>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-3">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="text-center">
                        <div 
                          className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${
                            currentStep === step ? 'bg-primary text-white' : 'bg-light'
                          }`}
                          style={{ width: '40px', height: '40px' }}
                        >
                          {step}
                        </div>
                        <small className={currentStep === step ? 'fw-bold' : 'text-muted'}>
                          {step === 1 ? 'Personal Info' : step === 2 ? 'Interview' : 'Documents'}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              
                <form onSubmit={(e) => { e.preventDefault(); handleStartInterview(); }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name*</label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                        className="form-control"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name*</label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        className="form-control"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address*</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="form-control"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        className="form-control"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Nationality*</label>
                      <input
                        type="text"
                        value={userInfo.nationality}
                        onChange={(e) => setUserInfo({ ...userInfo, nationality: e.target.value })}
                        className="form-control"
                        placeholder="Enter your nationality"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Currently Employed?</label>
                      <select
                        value={userInfo.currentlyWorking}
                        onChange={(e) => setUserInfo({ ...userInfo, currentlyWorking: e.target.value })}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                  
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary py-2">
                      Begin Interview
                    </button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      You'll have 10 minutes to complete the interview once started.
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Document upload form
  if (submitted && !uploadDone) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white p-4">
                <h2 className="text-center mb-0">Upload Required Documents</h2>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-3">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="text-center">
                        <div 
                          className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${
                            step === 3 ? 'bg-primary text-white' : 'bg-light'
                          }`}
                          style={{ width: '40px', height: '40px' }}
                        >
                          {step}
                        </div>
                        <small className={step === 3 ? 'fw-bold' : 'text-muted'}>
                          {step === 1 ? 'Personal Info' : step === 2 ? 'Interview' : 'Documents'}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              
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
                    <label className="form-label fw-bold">Certificates / Diplomas *</label>
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
                    <label className="form-label">Police Report (if applicable)</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, "policeReport")} 
                      className="form-control"
                      accept=".pdf,.jpg,.jpeg,.png" 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Other Supporting Documents</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, "other")} 
                      className="form-control"
                      accept=".pdf,.jpg,.jpeg,.png" 
                    />
                  </div>
                  
                  {error && <div className="alert alert-danger">{error}</div>}
                  
                  <div className="d-grid mt-4">
                    <button onClick={handleUploadAndSubmit} className="btn btn-primary py-2">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Thank you page
  if (uploadDone) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <div className="mb-4">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
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
  }

  // Interview questions
  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">Interview Questions</h2>
            <div className="timer bg-white text-primary px-3 py-1 rounded-pill">
              <i className="fa fa-clock-o me-2"></i>
              Time left: {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        
        <div className="card-body p-4">
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center">
                  <div 
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${
                      step === 2 ? 'bg-primary text-white' : 'bg-light'
                    }`}
                    style={{ width: '40px', height: '40px' }}
                  >
                    {step}
                  </div>
                  <small className={step === 2 ? 'fw-bold' : 'text-muted'}>
                    {step === 1 ? 'Personal Info' : step === 2 ? 'Interview' : 'Documents'}
                  </small>
                </div>
              ))}
            </div>
          </div>
          
          <div className="alert alert-warning">
            <div className="d-flex">
              <div className="me-2">
                <i className="fa fa-exclamation-triangle"></i>
              </div>
              <div>
                <strong>Important:</strong> You have {Math.floor(timeLeft / 60)} minutes and {timeLeft % 60} seconds remaining. 
                The form will be automatically submitted when the timer expires.
              </div>
            </div>
          </div>
          
          <div className="question-container">
            {questions.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading questions...</p>
              </div>
            ) : (
              questions.map((q, i) => (
                <div className="question mb-4 p-3 border rounded bg-light" key={i}>
                  <p className="fw-bold mb-3">Q{i + 1}: {q.question}</p>
                  <div className="options">
                    {q.options && q.options.map((opt, idx) => (
                      <div key={idx} className="form-check mb-2">
                        <input
                          id={`q${i}-opt${idx}`}
                          type="radio"
                          name={`question-${i}`}
                          value={opt}
                          checked={answers[i] === opt}
                          onChange={(e) => handleChange(i, e.target.value)}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`q${i}-opt${idx}`}>
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="d-grid mt-4">
            <button 
              onClick={() => setSubmitted(true)} 
              className="btn btn-primary py-2"
              disabled={questions.length === 0}
            >
              Submit Answers and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
