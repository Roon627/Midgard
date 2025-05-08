import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function calculateIslamicScore(answers = []) {
  const first10 = answers.slice(0, 10);
  return first10.filter(
    (a) =>
      a &&
      typeof a === "object" &&
      a.answer &&
      a.correctAnswer &&
      a.answer.trim().toLowerCase() === a.correctAnswer.trim().toLowerCase()
  ).length;
}

function formatTraitScores(traits = {}) {
  return Object.entries(traits)
    .map(([trait, value]) => `${trait}: ${value}`)
    .join(", ");
}

// ✅ MULTI-APPLICATION EXPORT (AdminDashboard)
export function exportToPdf(applications, fileName) {
  const doc = new jsPDF({ orientation: "landscape" });

  applications.forEach((app, index) => {
    if (index !== 0) doc.addPage();

    const fullName = app.name || "N/A";
    const email = app.email || "N/A";
    const phone = app.phoneNumber || "N/A";
    const id = app.nationalId || app.passport || "N/A";
    const jobTitle = app.jobTitle || "N/A";
    const submittedAt = app.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A";
    const answers = app.questionAnswers || app.answers || [];
    const islamicScore = calculateIslamicScore(answers);
    const personalityScore = app.personalityScore ?? "—";
    const scoreCategory = app.scoreCategory || "—";
    const traitScores = app.traitScores || {};

    // Header
    doc.setTextColor(156, 77, 204);
    doc.setFontSize(18);
    doc.text("Midgard Application Report", 14, 20);
    doc.setDrawColor(156, 77, 204);
    doc.line(14, 22, 280, 22);

    // Applicant info
    autoTable(doc, {
      startY: 26,
      head: [["Field", "Value"]],
      body: [
        ["Name", fullName],
        ["Email", email],
        ["Phone", phone],
        ["ID/Passport", id],
        ["Job Title", jobTitle],
        ["Submitted At", submittedAt],
        ["Islamic Knowledge", `${islamicScore}/10`],
        ["Personality Score", personalityScore],
        ["Personality Category", scoreCategory],
        ["Trait Breakdown", formatTraitScores(traitScores)],
      ],
      styles: { fontSize: 10 },
      theme: "grid",
      headStyles: {
        fillColor: [156, 77, 204],
        textColor: 255,
      },
    });

    // Questions & Answers
    const answerRows = Array.isArray(answers)
      ? answers.map((item, i) => [
          `Q${i + 1}: ${item.question || "—"}`,
          item.answer ?? "—",
          item.correctAnswer ?? "—",
        ])
      : [];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Question", "Candidate Answer", "Correct Answer"]],
      body: answerRows,
      styles: { fontSize: 10 },
      theme: "striped",
      headStyles: {
        fillColor: [156, 77, 204],
        textColor: 255,
      },
    });
  });

  doc.save(fileName);
}

// ✅ SINGLE APPLICATION EXPORT (Applications.jsx)
export function exportSingleApplicationPdf(application, jobTitle) {
  const doc = new jsPDF({ orientation: "landscape" });

  const fullName = application.name || "N/A";
  const email = application.email || "N/A";
  const phone = application.phoneNumber || "N/A";
  const id = application.nationalId || application.passport || "N/A";
  const submittedAt = application.createdAt ? new Date(application.createdAt).toLocaleString() : "N/A";
  const answers = application.questionAnswers || application.answers || [];
  const islamicScore = calculateIslamicScore(answers);
  const personalityScore = application.personalityScore ?? "—";
  const scoreCategory = application.scoreCategory || "—";
  const traitScores = application.traitScores || {};

  doc.setTextColor(156, 77, 204);
  doc.setFontSize(18);
  doc.text("Midgard Application Report", 14, 20);
  doc.setDrawColor(156, 77, 204);
  doc.line(14, 22, 280, 22);

  autoTable(doc, {
    startY: 26,
    head: [["Field", "Value"]],
    body: [
      ["Name", fullName],
      ["Email", email],
      ["Phone", phone],
      ["ID/Passport", id],
      ["Job Title", jobTitle || "N/A"],
      ["Submitted At", submittedAt],
      ["Islamic Knowledge", `${islamicScore}/10`],
      ["Personality Score", personalityScore],
      ["Personality Category", scoreCategory],
      ["Trait Breakdown", formatTraitScores(traitScores)],
    ],
    styles: { fontSize: 10 },
    theme: "grid",
    headStyles: {
      fillColor: [156, 77, 204],
      textColor: 255,
    },
  });

  const answerRows = Array.isArray(answers)
    ? answers.map((item, i) => [
        `Q${i + 1}: ${item.question || "—"}`,
        item.answer ?? "—",
        item.correctAnswer ?? "—",
      ])
    : [];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Question", "Candidate Answer", "Correct Answer"]],
    body: answerRows,
    styles: { fontSize: 10 },
    theme: "striped",
    headStyles: {
      fillColor: [156, 77, 204],
      textColor: 255,
    },
  });

  doc.save(`${application.name.replace(/\s+/g, "_")}_report.pdf`);
}
