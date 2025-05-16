import { useState } from "react";
import { API_URL } from "../../data/api";
import salaryRanges from "../../data/salaryRanges";
import jobLocations from "../../data/locations";

export default function AddJob({ onJobCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    qualifications: "",
    experience: "",
    salaryRange: "",
    location: "",
    expiresAt: ""
  });

  const [salaryCurrency, setSalaryCurrency] = useState("MVR");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (e.target.tagName === "TEXTAREA") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create job");
      onJobCreated();
    } catch (error) {
      console.error("Job creation error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <div className="form-group mb-3">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control auto-expand"
          required
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          className="form-control auto-expand"
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="form-control auto-expand"
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="qualifications"
          placeholder="Qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className="form-control auto-expand"
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="form-control auto-expand"
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Currency</label>
          <select
            className="form-select"
            value={salaryCurrency}
            onChange={(e) => {
              setSalaryCurrency(e.target.value);
              setFormData(prev => ({ ...prev, salaryRange: "" }));
            }}
          >
            <option value="MVR">MVR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Location</option>
            {jobLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Select Salary Range</label>
        <select
          name="salaryRange"
          value={formData.salaryRange}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select Salary Range</option>
          {salaryRanges[salaryCurrency].map((range, index) => (
            <option key={index} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div className="form-group mb-4">
        <label className="form-label">Expiration Date</label>
        <input
          type="datetime-local"
          name="expiresAt"
          value={formData.expiresAt}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-gradient">
          Create Job
        </button>
      </div>
    </form>
  );
}
