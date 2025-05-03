// utils/exportHelpers.js
import { exportToCsv } from "./exportUtils.js";
import { exportToPdf, exportSingleApplicationPdf } from "./exportPdf.js";

/**
 * Export multiple applicants for a job (AdminDashboard).
 * @param {Object} params - { jobId, applications, jobs, format }
 */
export function exportApplicants({ jobId, applications, jobs, format }) {
  if (!Array.isArray(applications)) {
    console.error("Expected applications to be an array, got:", typeof applications);
    return;
  }

  const job = jobs.find(j => j.id === jobId);
  const jobTitle = job ? job.title : "Unknown Job";
  const jobApplicants = applications.filter(app => app.jobId === jobId);

  if (format === "csv") {
    const data = jobApplicants.map(app => ({
      Name: app.name,
      Email: app.email,
      Phone: app.phoneNumber,
      NationalID: app.nationalId || app.passport,
      JobTitle: jobTitle,
      SubmittedAt: app.createdAt || app.submittedAt,
      Answers: JSON.stringify(app.answers),
    }));
    exportToCsv(data, `job_${jobId}_applications.csv`);
  }

  if (format === "pdf") {
    exportToPdf(jobApplicants, `job_${jobId}_applications.pdf`, jobTitle);
  }
}

/**
 * Export a single applicant (Applications.jsx).
 * @param {Object} params - { application, jobTitle, format }
 */
export function exportSingleApplication({ application, jobTitle, format }) {
  if (!application || typeof application !== "object") {
    console.error("Invalid application object");
    return;
  }

  if (format === "csv") {
    const exportData = {
      Name: application.name,
      Email: application.email,
      Phone: application.phoneNumber,
      NationalID: application.nationalId || application.passport,
      JobTitle: jobTitle,
      SubmittedAt: application.createdAt || application.submittedAt,
      Answers: JSON.stringify(application.answers),
    };
    exportToCsv([exportData], `application_${application.name.replace(/\s+/g, "_")}.csv`);
  }

  if (format === "pdf") {
    exportSingleApplicationPdf(application, jobTitle, `application_${application.name.replace(/\s+/g, "_")}.pdf`);
  }
}
