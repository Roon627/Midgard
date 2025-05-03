import { useState, useEffect } from "react";
import { API_URL } from "../data/api";

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
    admin_notification_email: "" // ✅ Added new field
  });

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testStatus, setTestStatus] = useState("");

  useEffect(() => {
    if (activeTab === "smtp") {
      fetchSettings();
    }
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
    if (!testEmail) {
      setTestStatus("Please enter a test email address.");
      return;
    }
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
    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  return (
    <div className="row admin-settings p-4">
      {/* Mini Menu */}
      <div className="col-md-3 border-end">
        <div className="list-group">
          <button className={`list-group-item list-group-item-action ${activeTab === "smtp" ? "active bg-primary text-white" : ""}`} onClick={() => setActiveTab("smtp")}>
            SMTP Setup
          </button>
          <button className={`list-group-item list-group-item-action ${activeTab === "password" ? "active bg-primary text-white" : ""}`} onClick={() => setActiveTab("password")}>
            Reset Password
          </button>
        </div>
      </div>

      {/* Active Content */}
      <div className="col-md-9">
        <h3 className="text-primary mb-4">Admin Settings</h3>

        {message && (
          <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>{message}</div>
        )}

        {activeTab === "smtp" && (
          <>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">SMTP Host</label>
                <input type="text" name="smtp_host" value={settings.smtp_host} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">SMTP Port</label>
                <input type="number" name="smtp_port" value={settings.smtp_port} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">SMTP Username</label>
                <input type="text" name="smtp_username" value={settings.smtp_username} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">SMTP Password</label>
                <input type="password" name="smtp_password" value={settings.smtp_password} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sender Email</label>
                <input type="email" name="sender_email" value={settings.sender_email} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sender Name</label>
                <input type="text" name="sender_name" value={settings.sender_name} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Email Subject</label>
                <input type="text" name="email_subject" value={settings.email_subject} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label">Email Body Template</label>
                <textarea name="email_body" value={settings.email_body} onChange={handleChange} rows="5" className="form-control"></textarea>
                <small className="text-muted">Use [LAST_NAME] as placeholder for user's last name.</small>
              </div>

              {/* ✅ New admin notification email field */}
              <div className="col-12">
                <label className="form-label">Admin Notification Email</label>
                <input
                  type="email"
                  name="admin_notification_email"
                  value={settings.admin_notification_email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. hr@midgard.com"
                />
                <small className="text-muted">This email will receive admin alerts (e.g. new submissions).</small>
              </div>
            </div>

            <div className="text-end mt-4 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email to send test"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
                <button className="btn btn-outline-primary" onClick={sendTestEmail}>
                  Send Test Email
                </button>
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
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="text-end">
              <button className="btn btn-primary px-4" onClick={resetPassword}>
                Reset Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
