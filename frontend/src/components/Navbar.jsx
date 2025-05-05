import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaPhoneAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/careers", name: "Careers", icon: <FaBriefcase /> },
    { path: "/contact", name: "Contact", icon: <FaPhoneAlt /> },
    { path: "/about", name: "About", icon: <FaInfoCircle /> },
  ];

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <nav className={`navbar-custom ${scrolled ? "navbar-scrolled" : ""}`} aria-label="Main navigation">
      <div className="container d-flex align-items-center justify-content-between w-100 position-relative">
        <div className="navbar-brand">
          <Link to="/" className="d-flex align-items-center">
            <span className="brand-text animated-brand">Midgard</span>
          </Link>
        </div>

        <button
          className="mobile-nav-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          onKeyDown={(e) => handleKeyDown(e, () => setExpanded((prev) => !prev))}
          aria-label="Toggle navigation"
          aria-expanded={expanded}
          aria-controls="mobile-nav-menu"
        >
          {expanded ? <FaTimes /> : <FaBars />}
        </button>

        <div
          id="mobile-nav-menu"
          className={`navbar-nav ${expanded ? "open" : ""}`}
          role="menu"
        >
          {navItems.map((item) => (
            <div className="nav-item mx-1" key={item.path}>
              <Link
                to={item.path}
                className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center justify-content-center position-relative ${
                  isActive(item.path) ? "active" : ""
                }`}
                onClick={() => setExpanded(false)}
                role="menuitem"
              >
                <span className="me-2" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <span className="active-indicator" aria-hidden="true" />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
