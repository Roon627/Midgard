import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer py-3" style={{ backgroundColor: "#1e3a8a", position: "relative", zIndex: "1" }}>
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* Copyright */}
          <p className="text-light mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="social-icons d-flex gap-3">
            <a 
              href="https://www.facebook.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              style={{ 
                width: '36px', 
                height: '36px', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.twitter.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              style={{ 
                width: '36px', 
                height: '36px', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <FaTwitter />
            </a>
            <a 
              href="https://www.linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              style={{ 
                width: '36px', 
                height: '36px', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <FaLinkedinIn />
            </a>
            <a 
              href="https://www.instagram.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon d-flex justify-content-center align-items-center rounded-circle"
              style={{ 
                width: '36px', 
                height: '36px', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
