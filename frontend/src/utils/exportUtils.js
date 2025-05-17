export function exportToCsv(data, filename) {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = [
    "Name",
    "Email",
    "Phone",
    "ID / Passport",
    "Job Title",
    "Submitted At"
  ];

  const rows = data.map(app => [
    app.name || "",
    app.email || "",
    app.phoneNumber || "",
    app.nationalId || app.passport || "",
    app.jobTitle || "Unknown Job",
    new Date(app.createdAt || app.submittedAt || "").toLocaleString()
  ]);

  const csvContent = [headers.join(","), ...rows.map(row => row.map(field => `"${field}"`).join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
