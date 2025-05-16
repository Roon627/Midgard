import React, { useEffect, useState } from "react";
import { API_URL } from "../data/api";
import { Link } from "react-router-dom";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log("🔎 Fetching from:", `${API_URL}/jobs`);

    fetch(`${API_URL}/jobs`)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response type: Not JSON");
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid jobs response");
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setJobs([]);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const getTimeRemaining = (expiryDate) => {
    if (!expiryDate) return { expired: true };
    const expiry = new Date(expiryDate);
    const totalSeconds = Math.floor((expiry - currentTime) / 1000);
    if (totalSeconds <= 0) return { expired: true };

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, expired: false };
  };

  const filteredJobs = Array.isArray(jobs)
    ? jobs
        .filter((job) => {
          const { expired } = getTimeRemaining(job.expiresAt);
          return !expired;
        })
        .filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  return (
    <div className="career-page-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="container py-4" style={{ flex: "1 0 auto" }}>
        <h1 className="text-center mb-4">Explore Exciting Career Opportunities</h1>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading && (
          <div className="text-center my-5">
            <div className="spinner-border" style={{ color: "#9c4dcc" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            Error loading jobs. Please try again later.
          </div>
        )}

        {!isLoading && !error && filteredJobs.length === 0 && (
          <p className="text-center text-muted">No job listings available currently.</p>
        )}

        <div className="careers-job-list">
          {filteredJobs.map((job) => {
            const timeRemaining = getTimeRemaining(job.expiresAt);

            return (
              <div key={job.id} className="career-job-card">
                <h5 className="text-center">{job.title}</h5>

                <p className="text-muted small" style={{ minHeight: "60px" }}>
                  {job.description.length > 120
                    ? `${job.description.substring(0, 120)}...`
                    : job.description}
                </p>

                <div className="my-3">
                  <div className="text-center">
                    <div className="small text-muted mb-1">⏳ Time Remaining:</div>
                    <div className="d-flex justify-content-center gap-2">
                      {["days", "hours", "minutes", "seconds"].map((unit) => (
                        <div key={unit} className="bg-light rounded p-1 text-center">
                          <div className="fw-bold">{timeRemaining[unit]}</div>
                          <div className="small">{unit}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mt-3">
                  <Link to={`/interview/${job.id}`}>
                    <button className="btn btn-gradient w-100">Apply Now</button>
                  </Link>
                  <Link to={`/jobs/${job.id}`}>
                    <button className="btn btn-outline-primary w-100">View Details</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
