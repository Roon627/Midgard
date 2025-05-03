// utils/exportPdf.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ✅ MULTI-APPLICATION EXPORT (AdminDashboard)
export function exportToPdf(applications, fileName) {
  const doc = new jsPDF();

  applications.forEach((app, index) => {
    const fullName = app.name || "N/A";
    const email = app.email || "N/A";
    const phone = app.phoneNumber || "N/A";
    const id = app.nationalId || app.passport || "N/A";
    const jobTitle = app.jobTitle || "N/A";
    const submittedAt = app.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A";

    if (index !== 0) doc.addPage();

    // Header
    doc.setTextColor(156, 77, 204);
    doc.setFontSize(18);
    doc.text("Midgard Application Report", 14, 20);
    doc.setDrawColor(156, 77, 204);
    doc.line(14, 22, 196, 22);

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
      ],
      styles: { fontSize: 10 },
      theme: "grid",
      headStyles: {
        fillColor: [156, 77, 204],
        textColor: 255,
      },
    });

    // Questions & Answers
    const questionData = app.questionAnswers || app.answers || [];
    const answerRows = Array.isArray(questionData)
      ? questionData.map((item, i) => [
          `Q${i + 1}: ${item.question || "—"}`,
          item.answer || "—",
          item.correctAnswer || "—",
        ])
      : [];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Question", "Candidate Answer", "Correct Answer"]],
      body: answerRows,
      styles: { fontSize: 10, cellWidth: "wrap" },
      theme: "striped",
      headStyles: {
        fillColor: [156, 77, 204],
        textColor: 255,
      },
    });
  });

  doc.save(fileName);
}

// SINGLE APPLICATION EXPORT (Applications.jsx)
export function exportSingleApplicationPdf(application, jobTitle) {
  const doc = new jsPDF();
  const fullName = application.name || "N/A";
  const email = application.email || "N/A";
  const phone = application.phoneNumber || "N/A";
  const id = application.nationalId || application.passport || "N/A";
  const submittedAt = application.createdAt ? new Date(application.createdAt).toLocaleString() : "N/A";

  doc.setTextColor(156, 77, 204);
  doc.setFontSize(18);
  doc.text("Midgard Application Report", 14, 20);
  doc.setDrawColor(156, 77, 204);
  doc.line(14, 22, 196, 22);

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
    ],
    styles: { fontSize: 10 },
    theme: "grid",
    headStyles: {
      fillColor: [156, 77, 204],
      textColor: 255,
    },
  });

  const questionData = application.questionAnswers || application.answers || [];
  const answerRows = Array.isArray(questionData)
    ? questionData.map((item, i) => [
        `Q${i + 1}: ${item.question || "—"}`,
        item.answer || "—",
        item.correctAnswer || "—",
      ])
    : [];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Question", "Candidate Answer", "Correct Answer"]],
    body: answerRows,
    styles: { fontSize: 10, cellWidth: "wrap" },
    theme: "striped",
    headStyles: {
      fillColor: [156, 77, 204],
      textColor: 255,
    },
  });

  doc.save(`${application.name.replace(/\s+/g, "_")}_report.pdf`);
}
