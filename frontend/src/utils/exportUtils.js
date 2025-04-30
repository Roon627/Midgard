import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Export applications data to CSV
export function exportToCsv(data, filename) {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map(row =>
      headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
    )
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

// Export to PDF (multiple applications)
export function exportToPdf(data, filename) {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }
  
  // Create a new PDF in portrait mode, A4 size
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  
  // Add a title to the document
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`Job Applications Report`, 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 27);
  doc.text(`Total Applications: ${data.length}`, 20, 32);
  
  // Process each application
  let yPosition = 40;
  
  for (let i = 0; i < data.length; i++) {
    const app = data[i];
    
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Application header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Application #${i + 1}: ${app.name || "Unnamed Applicant"}`, 20, yPosition);
    yPosition += 8;
    
    // Personal Info Table
    const personalInfo = [
      ["Name", app.name || "N/A"],
      ["Email", app.email || "N/A"],
      ["Phone", app.phoneNumber || "N/A"],
      ["National ID", app.nationalId || "N/A"],
      ["Job Title", app.jobTitle || "N/A"],
      ["Submitted At", new Date(app.createdAt || app.submittedAt || new Date()).toLocaleString()]
    ];
    
    autoTable(doc, {
      startY: yPosition,
      head: [["Field", "Value"]],
      body: personalInfo,
      theme: "grid",
      styles: { 
        fontSize: 10,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: { 
        fillColor: [156, 77, 204],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 'auto' }
      },
      margin: { left: 20, right: 20 }
    });
    
    yPosition = doc.lastAutoTable.finalY + 10;
    
    // Parse and Format Answers
    let answers = [];
    try {
      // Log to debug what we're dealing with
      console.log("Application data:", app);
      
      // Try multiple possible property names for answers
      if (app.Answers) {
        answers = typeof app.Answers === "string" ? JSON.parse(app.Answers) : app.Answers;
      } else if (app.answers) {
        answers = typeof app.answers === "string" ? JSON.parse(app.answers) : app.answers;
      } else if (app.interviewAnswers) {
        answers = typeof app.interviewAnswers === "string" ? JSON.parse(app.interviewAnswers) : app.interviewAnswers;
      }
      
      // If we still don't have answers, try searching all properties for array-like content
      if (!answers || answers.length === 0) {
        for (const key in app) {
          if (app[key] && typeof app[key] === 'string' && app[key].includes('[') && app[key].includes(']')) {
            try {
              const possibleAnswers = JSON.parse(app[key]);
              if (Array.isArray(possibleAnswers) && possibleAnswers.length > 0 && 
                  (possibleAnswers[0].question || possibleAnswers[0].answer)) {
                answers = possibleAnswers;
                break;
              }
            } catch (e) {
              // Not valid JSON, continue searching
            }
          } else if (Array.isArray(app[key]) && app[key].length > 0 && 
                    (app[key][0].question || app[key][0].answer)) {
            answers = app[key];
            break;
          }
        }
      }
    } catch (e) {
      console.error("Error parsing answers:", e);
      answers = [];
    }
    
    if (Array.isArray(answers) && answers.length > 0) {
      // Add a title for the answers section
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Assessment Answers", 20, yPosition);
      yPosition += 5;
      
      const formatted = answers.map((ans, i) => {
        const question = ans.question || "N/A";
        const selectedAnswer = ans.selected || ans.answer || "N/A";
        const correctAnswer = ans.correctAnswer || "—";
        
        return [
          `Q${i + 1}`,
          question,
          selectedAnswer,
          correctAnswer
        ];
      });
      
      autoTable(doc, {
        startY: yPosition,
        head: [["#", "Question", "Candidate's Answer", "Correct Answer"]],
        body: formatted,
        theme: "striped",
        styles: { 
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak'
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 80 },
          2: { cellWidth: 40 },
          3: { cellWidth: 40 }
        },
        headStyles: { 
          fillColor: [156, 77, 204],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        margin: { left: 20, right: 20 },
        didDrawCell: (data) => {
          // Force text to wrap in cells
          if (data.section === 'body' && data.column.index === 1) {
            data.cell.styles.overflow = 'linebreak';
          }
        }
      });
      
      yPosition = doc.lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(11);
      doc.text("No assessment answers submitted.", 20, yPosition);
      yPosition += 10;
    }
    
    // Add a separator if not the last application
    if (i < data.length - 1) {
      doc.setDrawColor(200);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 15;
      
      // Add a new page if we're close to the bottom
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    }
  }
  
  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
  }
  
  doc.save(filename);
}