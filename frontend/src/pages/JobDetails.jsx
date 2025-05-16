import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/api";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setError(err);
        setIsLoading(false);
      });
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          Could not load job details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: "960px" }}>
      <div className="bg-white shadow rounded p-4">
        <h2 className="mb-3 fw-bold">{job.title}</h2>
        <div className="text-muted mb-1">📍 {job.location || "Remote"}</div>
        <div className="text-muted mb-4">🗓️ Expires on {new Date(job.expiresAt).toLocaleDateString()}</div>

        {job.description && (
          <Section title="Job Description" content={job.description} />
        )}

        {job.responsibilities && (
          <Section title="Responsibilities" content={job.responsibilities} />
        )}

        {job.requirements && (
          <Section title="Requirements" content={job.requirements} />
        )}

        {job.qualifications && (
          <Section title="Qualifications" content={job.qualifications} />
        )}

        {job.experience && (
          <Section title="Experience" content={job.experience} />
        )}

        {job.salaryRange && (
          <Section title="Salary" content={job.salaryRange} />
        )}

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
          <Link to={`/interview/${job.id}`}>
            <button className="btn btn-primary px-4">Apply Now</button>
          </Link>
          <Link to="/careers">
            <button className="btn btn-outline-secondary">← Back to Careers</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, content }) => (
  <div className="mb-4">
    <h5 className="fw-semibold border-bottom pb-1 mb-2">{title}</h5>
    <p style={{ whiteSpace: "pre-line" }} className="text-muted mb-0">{content}</p>
  </div>
);

export default JobDetails;
