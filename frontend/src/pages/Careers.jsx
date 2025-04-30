import React, { useEffect, useState } from "react";
import { API_URL } from "../data/api";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch jobs from API
  useEffect(() => {
    fetch(`${API_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Timer calculation
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

  // Filter: hide expired + match search
  const filteredJobs = jobs
    .filter((job) => {
      const { expired } = getTimeRemaining(job.expiresAt);
      return !expired;
    })
    .filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="career-page-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="container py-4" style={{ flex: "1 0 auto" }}>
        <h1 className="text-center mb-4">Explore Exciting Career Opportunities</h1>

        {/* Search Box */}
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

        {/* Loading Spinner */}
        {isLoading && (
          <div className="text-center my-5">
            <div className="spinner-border" style={{ color: "#9c4dcc" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center">
            Error loading jobs. Please try again later.
          </div>
        )}

        {/* No Jobs */}
        {!isLoading && !error && filteredJobs.length === 0 && (
          <p className="text-center text-muted">No job listings available currently.</p>
        )}

        {/* Job Cards */}
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

                {/* Countdown */}
                <div className="my-3">
                  <div className="text-center">
                    <div className="small text-muted mb-1">⏳ Time Remaining:</div>
                    <div className="d-flex justify-content-center gap-2">
                      <div className="bg-light rounded p-1 text-center">
                        <div className="fw-bold">{timeRemaining.days}</div>
                        <div className="small">days</div>
                      </div>
                      <div className="bg-light rounded p-1 text-center">
                        <div className="fw-bold">{timeRemaining.hours}</div>
                        <div className="small">hrs</div>
                      </div>
                      <div className="bg-light rounded p-1 text-center">
                        <div className="fw-bold">{timeRemaining.minutes}</div>
                        <div className="small">min</div>
                      </div>
                      <div className="bg-light rounded p-1 text-center">
                        <div className="fw-bold">{timeRemaining.seconds}</div>
                        <div className="small">sec</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apply Now */}
                <a href={`/interview/${job.id}`}>
                  <button className="btn-apply w-100">Apply Now</button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
