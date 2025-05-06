import { useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { useNavigate } from "react-router-dom";
import "../styles/AdminSettings.css";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("smtp");
  const [settings, setSettings] = useState({
    smtp_host: "",
    smtp_port: "",
    smtp_username: "",
    smtp_password: "",
    sender_email: "",
    sender_name: "",
    email_subject: "",
    email_body: "",
    admin_notification_email: ""
  });
  const [password, setPassword] = useState("");
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testStatus, setTestStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "smtp") fetchSettings();
    fetchAdminStatus();
  }, [activeTab]);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/email-settings`);
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchAdminStatus = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/admin/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok && data?.user?.username) {
        setCurrentUser(data.user.username);
      } else {
        console.error("Failed to fetch admin status:", data.message);
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveSMTPSettings = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/email-settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setMessage("SMTP Settings saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save SMTP settings.");
    } finally {
      setSaving(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail) return setTestStatus("Please enter a test email address.");
    try {
      const res = await fetch(`${API_URL}/email-settings/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail })
      });
      if (!res.ok) throw new Error("Failed to send test email");
      setTestStatus("Test email sent successfully!");
    } catch (error) {
      console.error(error);
      setTestStatus("Failed to send test email.");
    }
  };

  const resetPassword = async () => {
    if (!password) return setMessage("Please enter a new password.");

    const token = localStorage.getItem("adminToken");
    if (!token) return setMessage("Not authenticated. Please log in again.");

    try {
      const res = await fetch(`${API_URL}/admin/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (!res.ok) throw new Error("Failed to reset password");
      setMessage("Admin password updated successfully!");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to reset password.");
    }
  };

  const addNewAdmin = async () => {
    if (!newAdmin.username || !newAdmin.password)
      return setMessage("Username and password required.");
    try {
      const res = await fetch(`${API_URL}/admin/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add admin.");
      setMessage("✅ New admin created!");
      setNewAdmin({ username: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding admin.");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="row admin-settings p-3 p-md-4">
      {/* Sidebar */}
      <div className="col-12 col-md-3 border-end mb-4 mb-md-0">
        <div className="list-group">
          <div className="list-group-item disabled small">
            Logged in as: <strong>{currentUser ?? "Not logged in"}</strong>
          </div>
          <button className={`list-group-item list-group-item-action ${activeTab === "smtp" ? "active bg-primary text-white" : ""}`} onClick={() => setActiveTab("smtp")}>
            SMTP Setup
          </button>
          <button className={`list-group-item list-group-item-action ${activeTab === "password" ? "active bg-primary text-white" : ""}`} onClick={() => setActiveTab("password")}>
            Reset Password
          </button>
          <button className={`list-group-item list-group-item-action ${activeTab === "newadmin" ? "active bg-primary text-white" : ""}`} onClick={() => setActiveTab("newadmin")}>
            Add New Admin
          </button>
          <button className="list-group-item list-group-item-action text-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="col-12 col-md-9">
        <h3 className="text-primary mb-4">Admin Settings</h3>
        {message && <div className={`alert ${message.includes("success") || message.includes("✅") ? "alert-success" : "alert-danger"}`}>{message}</div>}

        {activeTab === "smtp" && (
          <>
            <div className="row g-3">
              {["smtp_host", "smtp_port", "smtp_username", "smtp_password", "sender_email", "sender_name"].map((key) => (
                <div className="col-12 col-md-6" key={key}>
                  <label className="form-label text-capitalize">{key.replace(/_/g, " ")}</label>
                  <input
                    type={key.includes("password") ? "password" : key.includes("port") ? "number" : "text"}
                    name={key}
                    value={settings[key]}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              ))}
              <div className="col-12">
                <label className="form-label">Email Subject</label>
                <input type="text" name="email_subject" value={settings.email_subject} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Email Body Template</label>
                <textarea name="email_body" value={settings.email_body} onChange={handleChange} rows="4" className="form-control"></textarea>
              </div>
              <div className="col-12">
                <label className="form-label">Admin Notification Email</label>
                <input type="email" name="admin_notification_email" value={settings.admin_notification_email} onChange={handleChange} className="form-control" />
              </div>
            </div>

            <div className="mt-4 d-flex flex-column flex-md-row justify-content-between gap-3">
              <div className="w-100 d-flex flex-column flex-md-row gap-2">
                <input type="email" className="form-control" placeholder="Test email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} />
                <button className="btn btn-outline-primary" onClick={sendTestEmail}>Send Test</button>
              </div>
              <button className="btn btn-primary px-4 py-2" onClick={saveSMTPSettings} disabled={saving}>
                {saving ? "Saving..." : "Save SMTP Settings"}
              </button>
            </div>
            {testStatus && <div className="alert mt-3 alert-info">{testStatus}</div>}
          </>
        )}

        {activeTab === "password" && (
          <>
            <div className="mb-3">
              <label className="form-label">New Admin Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
            </div>
            <div className="text-end">
              <button className="btn btn-primary px-4" onClick={resetPassword}>Reset Password</button>
            </div>
          </>
        )}

        {activeTab === "newadmin" && (
          <>
            <div className="mb-3">
              <label className="form-label">New Username</label>
              <input type="text" className="form-control" value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} placeholder="Enter username" />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} placeholder="Enter password" />
            </div>
            <div className="text-end">
              <button className="btn btn-success" onClick={addNewAdmin}>Create Admin</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
