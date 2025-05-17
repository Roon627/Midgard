// components/admin/EditJob.jsx
import { useState, useEffect } from "react";
import salaryRanges from "../../data/salaryRanges";
import jobLocations from "../../data/locations";

export default function EditJob({ job, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...job });
  const [salaryCurrency, setSalaryCurrency] = useState("MVR");

  useEffect(() => {
    if (job) {
      setFormData({ ...job });
      if (job.salaryRange?.includes("USD")) {
        setSalaryCurrency("USD");
      } else {
        setSalaryCurrency("MVR");
      }
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (e.target.tagName === "TEXTAREA") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!job) return null;

  return (
    <form onSubmit={handleSubmit} className="edit-job-form">
      {/* --- General Info --- */}
      <h5 className="mb-3 text-purple fw-semibold">📝 General Information</h5>
      <div className="form-group mb-3">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-3">
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description || ""}
          onChange={handleChange}
          className="form-control auto-expand"
          required
        />
      </div>

      {/* --- Role Details --- */}
      <h5 className="mb-3 mt-4 text-purple fw-semibold">📌 Role Details</h5>
      <textarea
        name="responsibilities"
        placeholder="Responsibilities"
        value={formData.responsibilities || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <textarea
        name="requirements"
        placeholder="Requirements"
        value={formData.requirements || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <textarea
        name="qualifications"
        placeholder="Qualifications"
        value={formData.qualifications || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <textarea
        name="experience"
        placeholder="Experience"
        value={formData.experience || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />

      {/* --- Salary & Location --- */}
      <h5 className="mb-3 mt-4 text-purple fw-semibold">💰 Salary & Location</h5>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Currency</label>
          <select
            className="form-select"
            value={salaryCurrency}
            onChange={(e) => {
              setSalaryCurrency(e.target.value);
              setFormData((prev) => ({ ...prev, salaryRange: "" }));
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
            value={formData.location || ""}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Location</option>
            {jobLocations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Select Salary Range</label>
        <select
          name="salaryRange"
          value={formData.salaryRange || ""}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select Salary Range</option>
          {salaryRanges[salaryCurrency].map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* --- Expiration --- */}
      <h5 className="mb-3 mt-4 text-purple fw-semibold">📅 Job Expiry</h5>
      <div className="form-group mb-4">
        <label className="form-label">Expiration Date</label>
        <input
          type="datetime-local"
          name="expiresAt"
          value={formData.expiresAt || ""}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}
