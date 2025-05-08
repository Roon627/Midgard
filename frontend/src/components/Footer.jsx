import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer py-3 bg-primary position-relative" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* Copyright */}
          <p className="text-light mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} Midgard. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="social-icons d-flex gap-3">
            <a 
              href="https://www.facebook.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.twitter.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://www.linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a 
              href="https://www.instagram.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}