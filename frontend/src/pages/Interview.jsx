import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../data/api";
import { islamicKnowledge } from "../data/Questions/islamic.js";
import personalityAssessment from "../data/Questions/personality.js";
import nationalities from "../data/countries.json";
import DisclaimerNotice from "../components/DisclaimerNotice";
import PersonalInfoForm from "../components/interview/PersonalInfoForm";
import DocumentUploadForm from "../components/interview/DocumentUploadForm";
import InterviewQuestions from "../components/interview/InterviewQuestions";
import ThankYouScreen from "../components/interview/ThankYouScreen";
import AssessmentNotice from "../components/interview/AssessmentNotice";
import { validatePassportNumber } from "../utils/passportValidators";

export default function Interview() {
  const { jobId } = useParams();

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
  const [personalityQs, setPersonalityQs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [questionAnswerPairs, setQuestionAnswerPairs] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [files, setFiles] = useState({});
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const [uploadDone, setUploadDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(false);
  const [idValidationInProgress, setIdValidationInProgress] = useState(false);
  const idValidationTimeoutRef = useRef(null);

  useEffect(() => {
    if (nationalitySearch.trim() === "") {
      setFilteredNationalities([]);
    } else {
      setFilteredNationalities(
        nationalities
          .filter(n =>
            n.name.toLowerCase().includes(nationalitySearch.toLowerCase())
          )
          .slice(0, 10)
      );
    }
  }, [nationalitySearch]);

  useEffect(() => {
    if (started) {
      const shuffledIslamic = shuffleArray(islamicKnowledge).slice(0, 10);

      const sets = Object.values(personalityAssessment.sets);
      const randomSet = shuffleArray(sets)[0];
      const shuffledPersonality = shuffleArray(randomSet).slice(0, 20);

      setIslamicQuestions(shuffledIslamic);
      setPersonalityQs(shuffledPersonality);

      // Debug: Log islamicQuestions to verify data
      console.log("Islamic Questions:", shuffledIslamic);

      const allQuestions = [...shuffledIslamic, ...shuffledPersonality];
      const initialPairs = allQuestions.map((q, index) => ({
        question: q.question,
        answer: "",
        correctAnswer: q.correctAnswer || "",
        type: index < 10 ? "islamic" : "personality"
      }));

      setQuestionAnswerPairs(initialPairs);
      const initialAnswers = {};
      allQuestions.forEach((_, index) => {
        initialAnswers[index] = "";
      });
      setAnswers(initialAnswers);

      setCurrentStep(3);
    }
  }, [started]);

  useEffect(() => {
    if (currentStep < 3 || submitted || timeLeft <= 0) return;
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
  }, [currentStep, submitted, timeLeft]);

  useEffect(() => {
    return () => {
      if (idValidationTimeoutRef.current) clearTimeout(idValidationTimeoutRef.current);
    };
  }, []);

  const shuffleArray = (array) => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
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
      setError(`${key} file is too large. Max 5MB.`);
      return;
    }
    setFiles({ ...files, [key]: file });
    setError("");
  };

  const checkPreviousApplication = async (identifierType, identifierValue, skipValidation = false) => {
    if (skipValidation || !identifierValue) return false;
    if (identifierType === 'nationalId' && (!identifierValue.startsWith('A') || identifierValue.length < 2)) return false;
    setCheckingApplication(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/submissions/check-application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: parseInt(jobId), identifierType, identifierValue })
      });
      const data = await res.json();
      if (data.exists) {
        setAlreadyApplied(true);
        setError("You have already applied for this position.");
        return true;
      }
      setAlreadyApplied(false);
      return false;
    } catch (err) {
      console.error("Check app error:", err);
      setError("Failed to check. Try again.");
      return false;
    } finally {
      setCheckingApplication(false);
    }
  };

  const handleIdentifierChange = (e, field) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, [field]: value });
    setAlreadyApplied(false);
    if (idValidationTimeoutRef.current) clearTimeout(idValidationTimeoutRef.current);
    if (!value || value.length < 3) {
      setIdValidationInProgress(false);
      return;
    }
    if (field === 'passport' && userInfo.nationality) {
      const { valid, message } = validatePassportNumber(userInfo.nationality, value);
      if (!valid) {
        setError(message);
        return;
      } else setError("");
    }
    setIdValidationInProgress(true);
    idValidationTimeoutRef.current = setTimeout(() => {
      const identifierType = field === 'nationalId' ? 'nationalId' : 'passport';
      checkPreviousApplication(identifierType, value);
      setIdValidationInProgress(false);
    }, 500);
  };

  const handleStartInterview = async () => {
    if (!navigator.onLine) return setError("You're offline.");
    const isMaldivian = userInfo.nationality === "Maldives";
    const idField = isMaldivian ? 'nationalId' : 'passport';
    const requiredFields = ['firstName', 'lastName', 'nationality', 'email', idField];
    const missing = requiredFields.filter(f => !userInfo[f]);
    if (missing.length > 0) return setError(`Missing fields: ${missing.join(', ')}`);
    if (isMaldivian && !userInfo.nationalId.startsWith('A')) return setError("ID must start with A.");
    if (!isMaldivian) {
      const { valid, message } = validatePassportNumber(userInfo.nationality, userInfo.passport);
      if (!valid) return setError(message);
    }
    if (alreadyApplied) return setError("Already applied.");
    const idType = isMaldivian ? 'nationalId' : 'passport';
    const idVal = isMaldivian ? userInfo.nationalId : userInfo.passport;
    const exists = await checkPreviousApplication(idType, idVal);
    if (exists) return;
    setCurrentStep(2);
    setError("");
  };

  const handleDocumentSubmission = () => {
    const required = ["cv", "certificates", "idCard", "policeReport"];
    const missing = required.filter(r => !files[r]);
    if (missing.length > 0) return setError(`Missing documents: ${missing.join(', ')}`);
    setCurrentStep(2.5);
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
        formData.append('nationalId', userInfo.nationalId);
      } else {
        formData.append('passport', userInfo.passport);
      }
      const submissionData = questionAnswerPairs.map(pair => ({
        question: pair.question,
        answer: pair.answer,
        correctAnswer: pair.correctAnswer || "",
        score: null
      }));
      formData.append("questionAnswers", JSON.stringify(submissionData));
      if (files.cv) formData.append("resume", files.cv);
      if (files.certificates) formData.append("certificates", files.certificates);
      if (files.idCard) formData.append("id_card", files.idCard);
      if (files.policeReport) formData.append("police_report", files.policeReport);
      if (files.references) formData.append("reference_documents", files.references);
      const res = await fetch(`${API_URL}/submissions`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to submit.");
      setUploadDone(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Submit failed.");
    }
  };

  if (!acceptedDisclaimer) return <DisclaimerNotice onAccept={() => setAcceptedDisclaimer(true)} />;
  if (uploadDone) return <ThankYouScreen />;
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
                <PersonalInfoForm
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  nationalitySearch={nationalitySearch}
                  setNationalitySearch={setNationalitySearch}
                  showNationalityDropdown={showNationalityDropdown}
                  setShowNationalityDropdown={setShowNationalityDropdown}
                  filteredNationalities={filteredNationalities}
                  alreadyApplied={alreadyApplied}
                  error={error}
                  idValidationInProgress={idValidationInProgress}
                  checkingApplication={checkingApplication}
                  handleIdentifierChange={handleIdentifierChange}
                  handleStartInterview={handleStartInterview}
                  checkPreviousApplication={checkPreviousApplication}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <DocumentUploadForm
        files={files}
        handleFileChange={handleFileChange}
        handleDocumentSubmission={handleDocumentSubmission}
        error={error}
      />
    );
  }

  if (currentStep === 2.5) {
    return <AssessmentNotice onStart={() => setStarted(true)} />;
  }

  return (
    <InterviewQuestions
      islamicQuestions={islamicQuestions}
      personalityQuestions={personalityQs}
      answers={answers}
      handleChange={handleChange}
      timeLeft={timeLeft}
      step={currentStep}
      setStep={setCurrentStep}
      handleUploadAndSubmit={() => {
        setSubmitted(true);
        handleUploadAndSubmit();
      }}
    />
  );
}