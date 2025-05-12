import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { API_URL } from "../../data/api";
import "../../styles/DocumentViewer.css";

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "🖼️";
  if (ext === "pdf") return "📄";
  if (["doc", "docx"].includes(ext)) return "📃";
  return "📁";
};

const formatFileSize = (size) => {
  if (!size) return "";
  const kb = size / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(1)} KB`;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown time";
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const downloadFileWithAuth = async (file, folderName, setIsDownloading) => {
  const token = localStorage.getItem("adminToken");
  const fileUrl = `${API_URL.replace("/api", "")}/uploads/${folderName}/${file.name}`;

  setIsDownloading(true);
  try {
    const res = await fetch(fileUrl, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include"
    });

    if (!res.ok) {
      console.warn(`Fetch responded with ${res.status} for ${file.name}`);
      throw new Error(`Server responded with ${res.status}`);
    }

    const blob = await res.blob();

    if (blob.type === "text/html") {
      const text = await blob.text();
      console.error("HTML error page returned instead of file:", text.slice(0, 200));
      throw new Error("Unexpected server response. Are you authenticated?");
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (err) {
    console.error("Error downloading file:", err);
    if (!err.message.includes("aborted")) {
      alert(`Download error: ${err.message}`);
    }
  } finally {
    setIsDownloading(false);
  }
};

const downloadAllFilesAsZip = async (files, folderName, setIsDownloadingAll) => {
  const token = localStorage.getItem("adminToken");
  setIsDownloadingAll(true);

  const zip = new JSZip();
  const folder = zip.folder(folderName);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const fileUrl = `${API_URL.replace("/api", "")}/uploads/${folderName}/${file.name}`;
    try {
      const res = await fetch(fileUrl, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include"
      });

      if (!res.ok) throw new Error(`Download failed: ${res.status}`);

      const blob = await res.blob();
      if (blob.type === "text/html") {
        console.warn("Received HTML instead of file for:", file.name);
        failCount++;
        continue;
      }

      folder.file(file.name, blob);
      successCount++;
    } catch (err) {
      console.error(`Failed to fetch ${file.name}:`, err);
      failCount++;
    }
  }

  if (successCount === 0) {
    alert("Failed to download any files.");
    setIsDownloadingAll(false);
    return;
  }

  try {
    const content = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });

    saveAs(content, `${folderName}.zip`);

    if (failCount > 0) {
      alert(`Downloaded ${successCount} files. Failed to download ${failCount} files.`);
    }
  } catch (err) {
    console.error("Error creating zip:", err);
    alert("Failed to create zip file.");
  } finally {
    setIsDownloadingAll(false);
  }
};

const DocumentViewer = ({ files = [], applicantName = "user", nationalId = "id" }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  if (!files.length) return <p className="text-muted">No documents uploaded.</p>;

  const folderName = `${applicantName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${nationalId}`;

  return (
    <div className="document-list mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="text-secondary mb-0">Uploaded Documents</h6>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => downloadAllFilesAsZip(files, folderName, setIsDownloadingAll)}
          disabled={!files.length || isDownloadingAll}
        >
          {isDownloadingAll ? 'Creating ZIP...' : 'Download All'}
        </button>
      </div>

      <ul className="list-group">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div style={{ maxWidth: "70%" }}>
              <span className="me-2">{getFileIcon(file.name)}</span>
              <span className="file-name text-truncate fw-semibold">{file.name}</span>
              <div className="text-muted small">
                {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => downloadFileWithAuth(file, folderName, setIsDownloading)}
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentViewer;
