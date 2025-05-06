import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaPhoneAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/careers", name: "Careers", icon: <FaBriefcase /> },
    { path: "/contact", name: "Contact", icon: <FaPhoneAlt /> },
    { path: "/about", name: "About", icon: <FaInfoCircle /> },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="brand-text">Midgard</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-desktop">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile toggle button */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={expanded}
        >
          {expanded ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${expanded ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            onClick={() => setExpanded(false)}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
