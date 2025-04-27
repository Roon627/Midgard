import React from "react";
import { FaServer, FaCogs, FaShieldAlt, FaChartBar } from "react-icons/fa";

export default function About() {
  return (
    <div className="page-wrapper d-flex flex-column">
      <div className="container my-5 py-4 flex-grow-1">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-4 fw-bold mb-4">About Midgard</h1>
            <p className="lead text-secondary mb-4">
              Midgard builds resilient digital ecosystems — delivering integrated solutions for businesses scaling into the future.
            </p>
            <div className="d-flex justify-content-center">
              <hr
                className="w-25"
                style={{
                  height: "3px",
                  opacity: "1",
                  background: "linear-gradient(90deg, #9c4dcc 0%, #6a1b9a 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <h2 className="fw-bold mb-4">Our Journey</h2>
            <p>
              Founded by visionary technologists, Midgard began with a mission: architect seamless digital systems that empower enterprises to innovate without limits. From our roots in backend infrastructure, we've evolved into a complete platform offering scalable cloud services, cybersecurity frameworks, and intelligent analytics.
            </p>
            <p>
              As a tech monolith, we lead industries by creating secure, high-performance architectures that adapt with the speed of global business. Our infrastructure powers corporations, governments, and next-gen startups alike — always reliable, always ready for tomorrow.
            </p>
            <p>
              With a commitment to technical excellence, innovation, and trusted partnerships, Midgard stands at the forefront of shaping the connected world.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="row mb-5 py-4">
          <div className="col-lg-10 mx-auto">
            <h2 className="fw-bold mb-4">Our Core Values</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="d-flex">
                  <div className="me-3">
                    <FaServer size={24} style={{ color: "#9c4dcc" }} />
                  </div>
                  <div>
                    <h4 className="fw-bold">Infrastructure Mastery</h4>
                    <p>
                      We engineer systems with zero downtime, maximum scalability, and bulletproof reliability — because infrastructure is the foundation of innovation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex">
                  <div className="me-3">
                    <FaCogs size={24} style={{ color: "#9c4dcc" }} />
                  </div>
                  <div>
                    <h4 className="fw-bold">Relentless Innovation</h4>
                    <p>
                      Technology never stands still — and neither do we. We invest heavily in R&D to stay ahead of disruption, designing next-generation solutions before they're needed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex">
                  <div className="me-3">
                    <FaShieldAlt size={24} style={{ color: "#9c4dcc" }} />
                  </div>
                  <div>
                    <h4 className="fw-bold">Security First</h4>
                    <p>
                      In an interconnected world, trust is everything. We embed advanced security protocols and privacy layers across every service we offer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex">
                  <div className="me-3">
                    <FaChartBar size={24} style={{ color: "#9c4dcc" }} />
                  </div>
                  <div>
                    <h4 className="fw-bold">Data-Driven Impact</h4>
                    <p>
                      Every decision we make — and empower our clients to make — is grounded in data, analytics, and actionable intelligence.
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
            <h2 className="fw-bold mb-4">Our Leadership</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {/* Team Member 1 */}
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center"
                      style={{ width: "120px", height: "120px" }}
                    >
                      <span className="text-secondary fw-bold" style={{ fontSize: "2rem" }}>
                        AR
                      </span>
                    </div>
                    <h5 className="card-title fw-bold">Aria Rivera</h5>
                    <p className="text-secondary mb-2">CEO & Vision Architect</p>
                    <p className="card-text">
                      Aria crafts Midgard's strategic roadmap, blending business insight with deep technological foresight to build lasting ecosystems.
                    </p>
                  </div>
                </div>
              </div>
              {/* Team Member 2 */}
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center"
                      style={{ width: "120px", height: "120px" }}
                    >
                      <span className="text-secondary fw-bold" style={{ fontSize: "2rem" }}>
                        LM
                      </span>
                    </div>
                    <h5 className="card-title fw-bold">Leo Mitchell</h5>
                    <p className="text-secondary mb-2">CTO & Systems Engineer</p>
                    <p className="card-text">
                      Leo leads our engineering teams, driving platform performance, resiliency, and modernization at every layer.
                    </p>
                  </div>
                </div>
              </div>
              {/* Team Member 3 */}
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div
                      className="rounded-circle bg-light mx-auto mb-3 d-flex justify-content-center align-items-center"
                      style={{ width: "120px", height: "120px" }}
                    >
                      <span className="text-secondary fw-bold" style={{ fontSize: "2rem" }}>
                        SK
                      </span>
                    </div>
                    <h5 className="card-title fw-bold">Sophia Khan</h5>
                    <p className="text-secondary mb-2">Chief Security Officer</p>
                    <p className="card-text">
                      Sophia pioneers our cybersecurity initiatives, ensuring Midgard remains a fortress in an era of evolving digital threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="row py-5 text-center bg-gradient"
          style={{
            background: "linear-gradient(90deg, #9c4dcc 0%, #6a1b9a 100%)",
            borderRadius: "8px",
          }}
        >
          <div className="col-md-4 mb-3 mb-md-0">
            <h2 className="text-white fw-bold display-4">1000+</h2>
            <p className="text-white opacity-75">Enterprise Clients</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h2 className="text-white fw-bold display-4">1M+</h2>
            <p className="text-white opacity-75">Users Supported</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-white fw-bold display-4">50+</h2>
            <p className="text-white opacity-75">Global Data Centers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
