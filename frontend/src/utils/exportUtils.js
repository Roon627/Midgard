// exportUtils.js

// Export applications data to CSV
export function exportToCsv(data, filename) {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...data.map(row =>
        headers.map(fieldName => JSON.stringify(row[fieldName] ?? "")).join(",")
      ),
    ];
  
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Export applications data to PDF
  export function exportToPdf(data, filename) {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default();
        const headers = Object.keys(data[0]);
  
        const rows = data.map(row => headers.map(field => row[field] ?? ""));
  
        doc.autoTable({
          head: [headers],
          body: rows,
        });
  
        doc.save(filename);
      });
    });
  }
  