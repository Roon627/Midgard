import { API_URL } from "../data/api";

export async function submitInterview({
  jobId,
  userInfo,
  questionAnswerPairs,
  files,
  setUploadDone,
  setError
}) {
  try {
    const traitScores = {};
    let totalPoints = 0;

    questionAnswerPairs.forEach((q) => {
      if (q.type === "personality" && q.traits) {
        for (const trait in q.traits) {
          traitScores[trait] = (traitScores[trait] || 0) + q.traits[trait];
          totalPoints += q.traits[trait];
        }
      }
    });

    let scoreCategory = "";
    if (totalPoints >= 80) scoreCategory = "Excellent fit for leadership/strategic roles";
    else if (totalPoints >= 60) scoreCategory = "Good fit for structured, team-based roles";
    else if (totalPoints >= 40) scoreCategory = "Some alignment; may need guidance";
    else scoreCategory = "May not align well with company culture";

    const formData = new FormData();
    formData.append("jobId", parseInt(jobId));
    formData.append("name", `${userInfo.firstName} ${userInfo.lastName}`);
    formData.append("email", userInfo.email);
    formData.append("phoneNumber", userInfo.phone || "");
    if (userInfo.nationality === "Maldives") {
      formData.append("nationalId", userInfo.nationalId);
    } else {
      formData.append("passport", userInfo.passport);
    }

    const submissionData = questionAnswerPairs.map(pair => ({
      question: pair.question,
      answer: pair.answer,
      correctAnswer: pair.correctAnswer || "",
      score: null,
      points: pair.points || null,
      type: pair.type,
      traits: pair.traits || null
    }));

    formData.append("questionAnswers", JSON.stringify(submissionData));
    formData.append("personalityScore", totalPoints);
    formData.append("scoreCategory", scoreCategory);
    formData.append("traitScores", JSON.stringify(traitScores));

    if (files.cv) formData.append("resume", files.cv);
    if (files.certificates) formData.append("certificates", files.certificates);
    if (files.idCard) formData.append("id_card", files.idCard);
    if (files.policeReport) formData.append("police_report", files.policeReport);
    if (files.references) formData.append("reference_documents", files.references);

    const res = await fetch(`${API_URL}/submissions`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to submit.");
    setUploadDone(true);
  } catch (err) {
    console.error(err);
    setError(err.message || "Submit failed.");
  }
}
