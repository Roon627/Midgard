import { useEffect, useState } from "react";
import { API_URL } from "../data/api";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/submissions`)
      .then((res) => res.json())
      .then(setSubmissions)
      .catch((err) => console.error("Error loading submissions:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: "#007bff" }}>Applicant Submissions</h1>
      
      {submissions.length === 0 ? (
        <p className="text-center">No submissions yet.</p>
      ) : (
        submissions.map((submission, idx) => (
          <div key={idx} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{submission.name}</h5>
              <p><strong>National ID:</strong> {submission.nationalId}</p>

              <p><strong>Answers:</strong></p>
              <ol>
                {submission.answers.map((answer, i) => (
                  <li key={i}>{answer}</li>
                ))}
              </ol>

              <p><strong>Documents:</strong></p>
              <ul>
                {Object.entries(submission.documents).map(([key, file]) => (
                  <li key={key}>
                    {key}: <a href={`http://localhost:4000/uploads/${file}`} target="_blank" rel="noreferrer">View</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
