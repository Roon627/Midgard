// utils/exportHelpers.js
import { exportToPdf, exportSingleApplicationPdf } from "./exportPdf.js";
import { exportToExcelXLS } from "./exportXLS.js";

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

  if (format === "xls") {
    exportToExcelXLS(jobApplicants, job);
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

  if (format === "pdf") {
    exportSingleApplicationPdf(application, jobTitle, `application_${application.name.replace(/\s+/g, "_")}.pdf`);
  }
}
