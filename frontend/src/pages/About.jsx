import React from "react";
import { FaCheckCircle, FaUsers, FaLightbulb, FaChartLine } from "react-icons/fa";

export default function About() {
  return (
    <div className="container my-5 py-4">
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 fw-bold mb-4">About Us</h1>
          <p className="lead text-secondary mb-4">
            We provide smart digital hiring solutions for modern companies,
            transforming how businesses find and nurture talent.
          </p>
          <div className="d-flex justify-content-center">
            <hr className="w-25" style={{ height: "3px", opacity: "1", background: "linear-gradient(90deg, #1e3a8a 0%, #4f46e5 100%)" }} />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <h2 className="fw-bold mb-4">Our Story</h2>
          <p>
            Founded in 2015, our company began with a simple mission: to bridge the gap between talented individuals and forward-thinking companies. What started as a small team of recruitment specialists has grown into a comprehensive digital hiring platform serving clients worldwide.
          </p>
          <p>
            Over the years, we've helped thousands of businesses streamline their recruitment processes, reduce hiring costs, and find candidates who not only match their skill requirements but also align with their company culture and values.
          </p>
          <p>
            Our team combines expertise in human resources, technology, and data analytics to create solutions that address the evolving challenges of the modern workplace. We believe that the right hiring decisions can transform organizations, and we're committed to empowering our clients to make those decisions with confidence.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="row mb-5 py-4 bg-light rounded-3">
        <div className="col-lg-10 mx-auto">
          <h2 className="fw-bold mb-4">Our Values</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="d-flex">
                <div className="me-3">
                  <FaUsers size={24} style={{ color: "#4f46e5" }} />
                </div>
                <div>
                  <h4 className="fw-bold">People First</h4>
                  <p>
                    We believe in the potential of people and organizations to achieve remarkable things when the right matches are made. Every feature we develop and service we provide is designed with this principle in mind.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="me-3">
                  <FaLightbulb size={24} style={{ color: "#4f46e5" }} />
                </div>
                <div>
                  <h4 className="fw-bold">Innovation</h4>
                  <p>
                    We continuously explore new technologies and methodologies to improve our platform. By staying at the forefront of innovation, we ensure our clients can adapt to changing hiring landscapes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="me-3">
                  <FaCheckCircle size={24} style={{ color: "#4f46e5" }} />
                </div>
                <div>
                  <h4 className="fw-bold">Integrity</h4>
                  <p>
                    Transparency, honesty, and ethical practices are non-negotiable aspects of our business. We build lasting relationships with our clients based on mutual trust and respect.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="me-3">
                  <FaChartLine size={24} style={{ color: "#4f46e5" }} />
                </div>
                <div>
                  <h4 className="fw-bold">Results-Driven</h4>
                  <p>
                    We measure our success by the outcomes we deliver. Our focus remains on creating tangible value for our clients through efficient hiring processes and quality candidate matches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <h2 className="fw-bold mb-4">Our Leadership Team</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* Team Member 1 */}
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: "120px", height: "120px" }}>
                    <span className="text-secondary fw-bold" style={{ fontSize: "2rem" }}>JD</span>
                  </div>
                  <h5 className="card-title fw-bold">Jane Doe</h5>
                  <p className="text-secondary mb-2">CEO & Co-Founder</p>
                  <p className="card-text">
                    With over 15 years of experience in HR technology, Jane leads our company vision and strategic initiatives.
                  </p>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: "120px", height: "120px" }}>
                    <span className="text-secondary fw-bold" style={{ fontSize: "2rem" }}>JS</span>
                  </div>
                  <h5 className="card-title fw-bold">John Smith</h5>
                  <p className="text-secondary mb-2">CTO & Co-Founder</p>
                  <p className="card-text">
                    A technology visionary with a background in AI and machine learning, John oversees our platform development.
                  </p>
                </div>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: "120px", height: "120px" }}>
                    <span className="text-secondary fw-bold" style={{ fontSize: "2rem" }}>AW</span>
                  </div>
                  <h5 className="card-title fw-bold">Amanda Wilson</h5>
                  <p className="text-secondary mb-2">Chief Product Officer</p>
                  <p className="card-text">
                    Amanda brings deep insights into user experience and product development to create intuitive hiring solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row py-5 text-center bg-gradient" style={{ background: "linear-gradient(90deg, #1e3a8a 0%, #4f46e5 100%)", borderRadius: "8px" }}>
        <div className="col-md-4 mb-3 mb-md-0">
          <h2 className="text-white fw-bold display-4">500+</h2>
          <p className="text-white opacity-75">Global Clients</p>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <h2 className="text-white fw-bold display-4">50,000+</h2>
          <p className="text-white opacity-75">Successful Placements</p>
        </div>
        <div className="col-md-4">
          <h2 className="text-white fw-bold display-4">35+</h2>
          <p className="text-white opacity-75">Countries Served</p>
        </div>
      </div>
    </div>
  );
}