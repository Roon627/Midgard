import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to /admin/dashboard
    navigate("/admin/dashboard");
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Redirecting...</span>
        </div>
        <div className="text-muted">Redirecting to admin dashboard...</div>
      </div>
    </div>
  );
}
