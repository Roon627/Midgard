import { API_URL } from "../data/api"; // adjust path if needed

export const fetchApplicantDocuments = async (submissionId) => {
  try {
    const token = localStorage.getItem("adminToken"); // Ensure it uses admin token
    const res = await fetch(`${API_URL}/submissions/${submissionId}/documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!res.ok) throw new Error("Failed to fetch documents");
    return await res.json();
  } catch (err) {
    console.error("Error fetching documents:", err);
    return [];
  }
};
