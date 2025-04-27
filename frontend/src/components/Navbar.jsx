import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaBriefcase, FaPhoneAlt, FaInfoCircle, FaLock, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  // Check if the path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        {/* Logo Section */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/Logo.png"
            alt="Logo"
            className="me-2"
            style={{
              height: "40px",
              transition: "all 0.3s ease",
              filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.3))"
            }}
            onMouseOver={(e) => e.target.style.filter = "drop-shadow(0px 0px 8px rgba(255,255,255,0.5))"}
            onMouseOut={(e) => e.target.style.filter = "drop-shadow(0px 0px 5px rgba(255,255,255,0.3))"}
          />
          <span className="brand-text">
            YourBrand
          </span>
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setExpanded(!expanded)}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <FaBars style={{ fontSize: "1.2rem" }} />
        </button>

        {/* Links Section */}
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {[ 
              { path: "/", name: "Home", icon: <FaHome /> }, 
              { path: "/careers", name: "Careers", icon: <FaBriefcase /> },
              { path: "/contact", name: "Contact", icon: <FaPhoneAlt /> },
              { path: "/about", name: "About", icon: <FaInfoCircle /> }
            ].map((item) => (
              <li className="nav-item mx-1" key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center justify-content-center position-relative ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="me-2" style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive(item.path) && (
                    <span 
                      className="position-absolute" 
                      style={{
                        height: "3px",
                        width: "50%",
                        background: "white",
                        bottom: "2px",
                        borderRadius: "10px",
                        opacity: "0.7",
                        left: "25%"
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin Access Button */}
          <button
            onClick={() => navigate("/admin/login")}
            className="btn btn-light d-flex align-items-center ms-lg-3 px-3 py-2"
          >
            <FaLock className="me-2" /> Admin Access
          </button>
        </div>
      </div>
    </nav>
  );
}
