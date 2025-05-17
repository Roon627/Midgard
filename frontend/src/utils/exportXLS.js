import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportToExcelXLS(applications, job) {
  const workbook = new ExcelJS.Workbook();
  const jobTitle = job?.title || "Applicants";

  // ========== SHEET 1: SUMMARY ==========
  const summarySheet = workbook.addWorksheet("Summary");

  summarySheet.mergeCells("A1:J1");
  const instructionCell = summarySheet.getCell("A1");
  instructionCell.value = "HR Notes: You may enter remarks in the last column. Review Islamic and personality data for alignment.";
  instructionCell.font = { italic: true, color: { argb: "FF6A1B9A" } };
  instructionCell.alignment = { vertical: "middle", horizontal: "left" };

  summarySheet.columns = [
    { key: "name", width: 25 },
    { key: "jobTitle", width: 25 },
    { key: "appliedAt", width: 22 },
    { key: "id", width: 22 },
    { key: "phone", width: 15 },
    { key: "email", width: 25 },
    { key: "islamicScore", width: 15 },
    { key: "personalityCategory", width: 22 },
    { key: "traits", width: 35 },
    { key: "remarks", width: 20 },
  ];

  summarySheet.insertRow(2, [
    "Full Name",
    "Job Title",
    "Applied At",
    "National ID / Passport",
    "Phone",
    "Email",
    "Islamic Score",
    "Personality Category",
    "Traits Summary",
    "Remarks",
  ]);

  applications.forEach(app => {
    const traitScores = app.traitScores || {};

    // ✅ Improved Islamic score fallback
    let islamicScore = "";
    if (typeof app.islamicScore === "number") {
      islamicScore = `${app.islamicScore}/10`;
    } else if (Array.isArray(app.answers)) {
      const islamicAnswers = app.answers.filter(a =>
        (a.section === "Islamic" || a.question?.toLowerCase()?.includes("allah")) &&
        typeof a.score === "number"
      );
      islamicScore = `${islamicAnswers.length}/10`;
    } else {
      islamicScore = "N/A";
    }

    // ✅ Improved personality category fallback
    const personalityCategory = app.personalityCategory || app.traitSummary?.category || "N/A";

    if (islamicScore === "0/10" || personalityCategory === "N/A") {
      console.warn("Missing data for:", app.name, { islamicScore, personalityCategory, answers: app.answers });
    }

    const traitsSummary = Object.entries(traitScores)
      .map(([trait, score]) => `${trait}: ${score}`)
      .join(", ");

    summarySheet.addRow({
      name: app.name || "",
      jobTitle,
      appliedAt: new Date(app.createdAt).toLocaleString(),
      id: app.nationalId || app.passport || "",
      phone: app.phoneNumber || "",
      email: app.email || "",
      islamicScore,
      personalityCategory,
      traits: traitsSummary,
      remarks: "",
    });
  });

  summarySheet.getRow(2).eachCell(cell => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF9C4DCC" },
    };
  });

  // ========== SHEET 2: TRAIT BREAKDOWN ==========
  const traitsSheet = workbook.addWorksheet("Trait Breakdown");

  traitsSheet.mergeCells("A1:L1");
  const topCell = traitsSheet.getCell("A1");
  topCell.value = "HR Notes: Scores below 10 are red. Scores above 30 are green. Percentages help gauge strength areas.";
  topCell.font = { italic: true, color: { argb: "FF6A1B9A" } };
  topCell.alignment = { vertical: "middle", horizontal: "left" };

  const traitKeys = ["Conscientiousness", "Neuroticism", "Openness", "Stability", "LeadershipStyle"];
  const maxScore = 40;

  traitsSheet.columns = [
    { key: "name", width: 25 },
    { key: "jobTitle", width: 25 },
    ...traitKeys.flatMap(trait => [
      { key: trait, width: 18 },
      { key: `${trait}_percent`, width: 18 }
    ])
  ];

  traitsSheet.insertRow(2, [
    "Full Name",
    "Job Title",
    ...traitKeys.flatMap(trait => [
      trait,
      `${trait} (%)`
    ])
  ]);

  const traitScoresMatrix = [];

  applications.forEach(app => {
    const scores = app.traitScores || {};
    const row = {
      name: app.name || "",
      jobTitle,
    };

    traitKeys.forEach(trait => {
      const raw = scores[trait] || 0;
      const percent = (raw / maxScore) * 100;
      row[trait] = raw;
      row[`${trait}_percent`] = `${percent.toFixed(1)}%`;
    });

    traitsSheet.addRow(row);
    traitScoresMatrix.push(row);
  });

  traitsSheet.getRow(2).eachCell(cell => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF9C4DCC" },
    };
  });

  traitKeys.forEach((trait, i) => {
    const colIndex = 3 + i * 2;
    traitsSheet.getColumn(colIndex).eachCell((cell, rowNumber) => {
      if (rowNumber <= 2) return;
      const score = parseInt(cell.value);
      if (score < 10) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFCCCC" },
        };
      } else if (score > 30) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFCCFFCC" },
        };
      }
    });
  });

  const averageRow = {
    name: "Average",
    jobTitle: "",
  };

  traitKeys.forEach(trait => {
    const total = traitScoresMatrix.reduce((sum, row) => sum + (parseInt(row[trait]) || 0), 0);
    const avg = total / traitScoresMatrix.length;
    averageRow[trait] = avg.toFixed(1);
    averageRow[`${trait}_percent`] = `${((avg / maxScore) * 100).toFixed(1)}%`;
  });

  traitsSheet.addRow(averageRow);
  traitsSheet.lastRow.eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFDDEEFF" },
    };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${jobTitle}_Applicants.xlsx`);
}
