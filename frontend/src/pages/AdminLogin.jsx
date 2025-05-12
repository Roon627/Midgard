import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../data/api";
import "../styles/AdminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent duplicate submissions
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setIsLoading(true);
    console.log('Login attempt:', { username, url: `${API_URL}/admin/login` });

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => {
        throw new Error("Invalid JSON response from server");
      });

      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        console.log('Login successful, token:', data.token);
        navigate("/admin/dashboard");
      } else {
        console.log('Login failed:', { status: res.status, data });
        setError(data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card shadow">
        <div className="admin-login-header">
          <h2>Welcome User</h2>
          <p className="admin-login-subtitle">Login to continue</p>
        </div>

        <form className="admin-login-body" onSubmit={handleSubmit} noValidate>
          <div className="admin-login-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="admin-login-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password visibility"
                disabled={isLoading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button type="submit" className="admin-login-btn" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}