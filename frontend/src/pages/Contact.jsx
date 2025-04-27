import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("Your message has been sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="container my-5 py-5">
      <h1 className="text-center fw-bold mb-4" style={{ color: "#9c4dcc" }}>
        Contact Us
      </h1>

      {/* Contact Form Section */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* add .contact-form to hook your purple button styles */}
          <form
            onSubmit={handleSubmit}
            className="contact-form bg-light p-4 rounded-3 shadow-sm"
          >
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-bold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-control"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="form-control"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label fw-bold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                className="form-control"
                required
              ></textarea>
            </div>

            <div className="d-grid gap-2">
              {/* remove btn-primary so our .contact-form button CSS kicks in */}
              <button type="submit" className="btn btn-lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          {status && (
            <div className="mt-3 alert alert-success">
              {status}
            </div>
          )}
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 text-center">
          <h3 className="fw-bold mb-3" style={{ color: "#6a1b9a" }}>
            Or Reach Us At
          </h3>
          <p className="lead mb-4 text-secondary">
            We'd love to hear from you! Drop us a message or contact us using the details below.
          </p>

          <div className="d-flex justify-content-center gap-4">
            <div>
              <i className="fa fa-map-marker-alt" style={{ fontSize: "1.5rem", color: "#9c4dcc" }}></i>
              <p className="text-secondary">123 Street, City, Country</p>
            </div>
            <div>
              <i className="fa fa-phone" style={{ fontSize: "1.5rem", color: "#9c4dcc" }}></i>
              <p className="text-secondary">+123 456 7890</p>
            </div>
            <div>
              <i className="fa fa-envelope" style={{ fontSize: "1.5rem", color: "#9c4dcc" }}></i>
              <p className="text-secondary">contact@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
