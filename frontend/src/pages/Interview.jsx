import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../data/api";
import { islamicKnowledge } from "../data/Questions/islamic.js";
import { personalityAnswers } from "../data/Questions/personality.js";
import personalityOptions from "../data/personalityoptions.json";
import nationalities from "../data/countries.json";
import DisclaimerNotice from "../components/DisclaimerNotice";

export default function Interview() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // All hooks FIRST (before any returns)
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    currentlyWorking: "",
    email: "",
    phone: "",
    nationalId: "",
    passport: "",
  });
  const [nationalitySearch, setNationalitySearch] = useState("");
  const [filteredNationalities, setFilteredNationalities] = useState([]);
  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
  const [islamicQuestions, setIslamicQuestions] = useState([]);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [questionAnswerPairs, setQuestionAnswerPairs] = useState([]); // New state to store questions and answers
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [files, setFiles] = useState({});
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const [uploadDone, setUploadDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(false);

  // Add new state for ID validation
  const [idValidationInProgress, setIdValidationInProgress] = useState(false);
  const idValidationTimeoutRef = useRef(null);

  // Filter nationalities based on search input
  useEffect(() => {
    if (nationalitySearch.trim() === "") {
      setFilteredNationalities([]);
    } else {
      setFilteredNationalities(
        nationalities.filter(nat =>
          nat.toLowerCase().includes(nationalitySearch.toLowerCase())
        ).slice(0, 10)
      );
    }
  }, [nationalitySearch]);

  // Initialize questions when interview starts
  useEffect(() => {
    if (started) {
      // Select 10 random Islamic questions
      const shuffledIslamic = shuffleArray(islamicKnowledge).slice(0, 10);
      setIslamicQuestions(shuffledIslamic);

      // Select 10 random personality questions and add options
      const shuffledPersonality = shuffleArray(personalityAnswers).slice(0, 10).map(q => ({
        question: q.question,
        options: personalityOptions.map(opt => opt.text)
      }));
      setPersonalityQuestions(shuffledPersonality);

      // ✅ FIX: Combine questions
      const allQuestions = [...shuffledIslamic, ...shuffledPersonality];

      // Initialize question-answer pairs
      const initialPairs = allQuestions.map((q, index) => ({
        question: q.question,
        answer: "",
        correctAnswer: q.correctAnswer || "",
        type: index < shuffledIslamic.length ? "islamic" : "personality"
      }));
      setQuestionAnswerPairs(initialPairs);

      // Initialize answers for input handling
      const initialAnswers = {};
      allQuestions.forEach((_, index) => {
        initialAnswers[index] = "";
      });
      setAnswers(initialAnswers);

      setAnswers(initialAnswers);
      }
    }, [started]);

  // Timer countdown effect
  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (idValidationTimeoutRef.current) {
        clearTimeout(idValidationTimeoutRef.current);
      }
    };
  }, []);

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
    setQuestionAnswerPairs(prev => {
      const newPairs = [...prev];
      newPairs[index] = { ...newPairs[index], answer: value };
      return newPairs;
    });
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError(`${key} file is too large. Maximum allowed size is 5MB.`);
      return;
    }
    setFiles({ ...files, [key]: file });
    setError(""); // clear error on valid file
  };

  // Enhanced check for previous application - now with debounce
  const checkPreviousApplication = async (identifierType, identifierValue, skipValidation = false) => {
    // Don't check if validation is skipped or value is empty
    if (skipValidation || !identifierValue) {
      return false;
    }

    // For Maldivian ID specifically - verify it starts with 'A' before checking
    if (identifierType === 'nationalId' && (!identifierValue.startsWith('A') || identifierValue.length < 2)) {
      return false;
    }

    setCheckingApplication(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/submissions/check-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: parseInt(jobId),
          identifierType,
          identifierValue
        }),
      });

      const data = await response.json();

      if (data.exists) {
        setAlreadyApplied(true);
        setError("You have already applied for this position. You cannot apply again with the same ID.");
        return true;
      } else {
        setAlreadyApplied(false);
        return false;
      }
    } catch (err) {
      console.error("Error checking previous application:", err);
      setError("Failed to check application status. Please try again.");
      return false;
    } finally {
      setCheckingApplication(false);
    }
  };

  // Handle user input for ID/passport with debounced validation
  const handleIdentifierChange = (e, field) => {
    const value = e.target.value;

    // Update state immediately
    setUserInfo({ ...userInfo, [field]: value });
    setAlreadyApplied(false);

    // Clear previous timeout
    if (idValidationTimeoutRef.current) {
      clearTimeout(idValidationTimeoutRef.current);
    }

    // Skip validation for very short inputs
    if (!value || value.length < 3) {
      setIdValidationInProgress(false);
      return;
    }

    // Set validation in progress
    setIdValidationInProgress(true);

    // Debounce the validation check (wait 500ms after typing stops)
    idValidationTimeoutRef.current = setTimeout(() => {
      const identifierType = field === 'nationalId' ? 'nationalId' : 'passport';
      checkPreviousApplication(identifierType, value);
      setIdValidationInProgress(false);
    }, 500);
  };

  const handleStartInterview = async () => {
    if (!navigator.onLine) {
      setError("You're currently offline. Please check your internet connection.");
      return;
    }

    const isMaldivian = userInfo.nationality === "Maldives";
    const idFieldName = isMaldivian ? 'nationalId' : 'passport';
    const requiredFields = ['firstName', 'lastName', 'nationality', 'email', idFieldName];
    const missingFields = requiredFields.filter(field => !userInfo[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Check if Maldivian ID starts with 'A'
    if (isMaldivian && (!userInfo.nationalId.startsWith('A') || userInfo.nationalId.length < 2)) {
      setError("For Maldivian citizens, ID must start with 'A' followed by your ID number.");
      return;
    }

    // Do one final check for already applied
    if (alreadyApplied) {
      setError("You have already applied for this position. You cannot apply again with the same ID.");
      return;
    }

    // One more check to ensure there's no race condition
    const identifierType = isMaldivian ? 'nationalId' : 'passport';
    const identifierValue = isMaldivian ? userInfo.nationalId : userInfo.passport;

    const hasApplied = await checkPreviousApplication(identifierType, identifierValue);
    if (hasApplied) {
      return;
    }

    setCurrentStep(2);
    setError("");
  };

  const handleDocumentSubmission = () => {
    const required = ["cv", "certificates", "idCard", "policeReport"];
    const missing = required.filter(r => !files[r]);

    if (missing.length > 0) {
      setError(`Missing required documents: ${missing.join(', ')}`);
      return;
    }

    setStarted(true);
    setCurrentStep(3);
    setError("");
  };

  const handleUploadAndSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('jobId', parseInt(jobId));
      formData.append('name', `${userInfo.firstName} ${userInfo.lastName}`);
      formData.append('email', userInfo.email);
      formData.append('phoneNumber', userInfo.phone || '');

      if (userInfo.nationality === "Maldives") {
        formData.append('nationalId', userInfo.nationalId || '');
      } else {
        formData.append('passport', userInfo.passport || '');
      }

      // Prepare question-answer pairs with scored personality answers
      const submissionData = questionAnswerPairs.map((pair, index) => {
        const answer = pair.answer;
        const correct = pair.correctAnswer || "";
        if (pair.type === "personality") {
          const option = personalityOptions.find(opt => opt.text === answer);
          return {
            question: pair.question,
            answer,
            correctAnswer: correct,
            score: option ? option.points : 0
          };
        }
        return {
          question: pair.question,
          answer,
          correctAnswer: correct,
          score: null
        };
      });


      formData.append('questionAnswers', JSON.stringify(submissionData));

      if (files.cv) formData.append('resume', files.cv);
      if (files.certificates) formData.append('certificates', files.certificates);
      if (files.idCard) formData.append('id_card', files.idCard);
      if (files.policeReport) formData.append('police_report', files.policeReport);
      if (files.references) formData.append('reference_documents', files.references);

      const res = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to submit application: ${res.statusText}`);
      }

      setUploadDone(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit. Please try again.");
    }
  };

  // Now render the component based on current state
  if (!acceptedDisclaimer) {
    return <DisclaimerNotice onAccept={() => setAcceptedDisclaimer(true)} />;
  }

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

  if (currentStep === 1) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white p-4">
                <h2 className="text-center mb-1">Let's Get to Know You!</h2>
                <p className="text-center text-light small mt-1 mb-0">
                  Please tell us a little about yourself before we begin.
                </p>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-3">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="text-center">
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep === step ? 'bg-primary text-white' : 'bg-light'
                            }`}
                          style={{ width: '40px', height: '40px' }}
                        >
                          {step}
                        </div>
                        <small className={currentStep === step ? 'fw-bold' : 'text-muted'}>
                          {step === 1 ? 'Personal Info' : step === 2 ? 'Documents' : 'Interview'}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>

                {alreadyApplied && (
                  <div className="alert alert-warning mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-exclamation-triangle me-2"></i>
                      <div>
                        <strong>Already Applied</strong>
                        <p className="mb-0">You have already applied for this position. Each applicant can only apply once per job posting.</p>
                      </div>
                    </div>
                  </div>
                )}

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
                        disabled={alreadyApplied}
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
                        disabled={alreadyApplied}
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
                        disabled={alreadyApplied}
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
                        disabled={alreadyApplied}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Nationality*</label>
                      <div className="position-relative">
                        <input
                          type="text"
                          value={nationalitySearch}
                          onChange={(e) => {
                            setNationalitySearch(e.target.value);
                            setShowNationalityDropdown(true);
                          }}
                          onClick={() => setShowNationalityDropdown(true)}
                          className="form-control"
                          placeholder="Search nationality"
                          required
                          disabled={alreadyApplied}
                        />
                        {showNationalityDropdown && filteredNationalities.length > 0 && (
                          <div
                            className="position-absolute w-100 mt-1 border rounded bg-white z-index-dropdown"
                            style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}
                          >
                            {filteredNationalities.map((nat, index) => (
                              <div
                                key={index}
                                className="p-2 cursor-pointer hover-bg-light border-bottom"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setUserInfo({ ...userInfo, nationality: nat });
                                  setNationalitySearch(nat);
                                  setShowNationalityDropdown(false);
                                  // Clear existing ID/passport when nationality changes
                                  setUserInfo(prev => ({
                                    ...prev,
                                    nationality: nat,
                                    nationalId: "",
                                    passport: ""
                                  }));
                                  setAlreadyApplied(false);
                                  setError("");
                                }}
                              >
                                {nat}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {userInfo.nationality && (
                        <div className="form-text text-success">
                          Selected: {userInfo.nationality}
                        </div>
                      )}
                    </div>

                    {userInfo.nationality === "Maldives" ? (
                      <div className="col-md-6">
                        <label className="form-label">National ID* (Must start with 'A')</label>
                        <div className="input-group">
                          <input
                            type="text"
                            value={userInfo.nationalId}
                            onChange={(e) => handleIdentifierChange(e, 'nationalId')}
                            className={`form-control ${alreadyApplied ? 'is-invalid' : userInfo.nationalId && !alreadyApplied && userInfo.nationalId.startsWith('A') ? 'is-valid' : ''}`}
                            placeholder="Enter your National ID (A123456)"
                            pattern="A.*"
                            title="ID must start with letter A"
                            required
                            disabled={alreadyApplied}
                          />
                          {idValidationInProgress && (
                            <span className="input-group-text">
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                          )}
                        </div>
                        {alreadyApplied ? (
                          <div className="invalid-feedback d-block">
                            You have already applied for this position with this National ID.
                          </div>
                        ) : (
                          <small className="form-text text-muted">
                            For Maldivian citizens, ID must start with 'A'
                          </small>
                        )}
                      </div>
                    ) : userInfo.nationality ? (
                      <div className="col-md-6">
                        <label className="form-label">Passport Number*</label>
                        <div className="input-group">
                          <input
                            type="text"
                            value={userInfo.passport}
                            onChange={(e) => handleIdentifierChange(e, 'passport')}
                            className={`form-control ${alreadyApplied ? 'is-invalid' : userInfo.passport && !alreadyApplied ? 'is-valid' : ''}`}
                            placeholder="Enter your Passport Number"
                            required
                            disabled={alreadyApplied}
                          />
                          {idValidationInProgress && (
                            <span className="input-group-text">
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                          )}
                        </div>
                        {alreadyApplied && (
                          <div className="invalid-feedback d-block">
                            You have already applied for this position with this Passport Number.
                          </div>
                        )}
                      </div>
                    ) : null}

                    <div className="col-md-6">
                      <label className="form-label">Currently Employed?</label>
                      <select
                        value={userInfo.currentlyWorking}
                        onChange={(e) => setUserInfo({ ...userInfo, currentlyWorking: e.target.value })}
                        className="form-select"
                        disabled={alreadyApplied}
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {error && !alreadyApplied && <div className="alert alert-danger mt-3">{error}</div>}

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary py-2"
                      disabled={alreadyApplied || checkingApplication || idValidationInProgress}
                    >
                      {checkingApplication ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Checking application status...
                        </>
                      ) : (
                        'Continue to Documents'
                      )}
                    </button>
                  </div>

                  {alreadyApplied && (
                    <div className="d-grid mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/")}
                      >
                        Return to Job Listings
                      </button>
                    </div>
                  )}

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      You'll have 10 minutes to complete the interview after uploading documents.
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

  if (currentStep === 2) {
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
                          className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep === step ? 'bg-primary text-white' : 'bg-light'
                            }`}
                          style={{ width: '40px', height: '40px' }}
                        >
                          {step}
                        </div>
                        <small className={currentStep === step ? 'fw-bold' : 'text-muted'}>
                          {step === 1 ? 'Personal Info' : step === 2 ? 'Documents' : 'Interview'}
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
  }

  // Default case: Interview step
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
                    className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${currentStep === step ? 'bg-primary text-white' : 'bg-light'
                      }`}
                    style={{ width: '40px', height: '40px' }}
                  >
                    {step}
                  </div>
                  <small className={currentStep === step ? 'fw-bold' : 'text-muted'}>
                    {step === 1 ? 'Personal Info' : step === 2 ? 'Documents' : 'Interview'}
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
            {islamicQuestions.length === 0 && personalityQuestions.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading questions...</p>
              </div>
            ) : (
              <>
                <div className="section mb-5">
                  <h3 className="mb-4 pb-2 border-bottom">Islamic Knowledge</h3>
                  {islamicQuestions.map((q, i) => (
                    <div className="card mb-3 shadow-sm" key={i}>
                      <div className="card-body">
                        <h5 className="card-title mb-3">Question {i + 1}: {q.question}</h5>
                        <div className="options">
                          {q.options && q.options.map((opt, idx) => (
                            <div key={idx} className="form-check mb-2 p-2 rounded hover-bg-light" style={{ transition: 'background-color 0.2s' }}>
                              <input
                                id={`islamic-q${i}-opt${idx}`}
                                type="radio"
                                name={`islamic-question-${i}`}
                                value={opt}
                                checked={answers[i] === opt}
                                onChange={(e) => handleChange(i, e.target.value)}
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor={`islamic-q${i}-opt${idx}`}>
                                {opt}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section mb-5">
                  <h3 className="mb-4 pb-2 border-bottom">Personality Assessment</h3>
                  {personalityQuestions.map((q, i) => {
                    const questionIndex = i + islamicQuestions.length;
                    return (
                      <div className="card mb-3 shadow-sm" key={questionIndex}>
                        <div className="card-body">
                          <h5 className="card-title mb-3">Question {questionIndex + 1}: {q.question}</h5>
                          <div className="options">
                            {q.options && q.options.map((opt, idx) => (
                              <div key={idx} className="form-check mb-2 p-2 rounded hover-bg-light" style={{ transition: 'background-color 0.2s' }}>
                                <input
                                  id={`personality-q${i}-opt${idx}`}
                                  type="radio"
                                  name={`personality-question-${i}`}
                                  value={opt}
                                  checked={answers[questionIndex] === opt}
                                  onChange={(e) => handleChange(questionIndex, e.target.value)}
                                  className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor={`personality-q${i}-opt${idx}`}>
                                  {opt}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="d-grid mt-4">
            <button
              onClick={() => { setSubmitted(true); handleUploadAndSubmit(); }}
              className="btn btn-primary py-2"
              disabled={islamicQuestions.length === 0 || personalityQuestions.length === 0}
            >
              Submit Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}