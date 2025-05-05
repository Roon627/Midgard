import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';  // Import global styles
import './App.css';    // Component-specific styles
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS for grid system, buttons, etc.
import 'font-awesome/css/font-awesome.min.css';  // Font Awesome for social media icons

// Import your components and pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/AdminSettings";
import AdminLogin from "./pages/AdminLogin";
import AdminSubmissions from "./pages/AdminSubmissions";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer"; // Import Footer Component

function App() {
  return (
    <Router>
      <div className="app-wrapper d-flex flex-column min-vh-100" style={{ backgroundColor: "#ffffff" }}>
        <Navbar />
        
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/interview/:jobId" element={<Interview />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/submissions" element={<AdminSubmissions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </div>

        <Footer /> {/* Always at bottom */}
      </div>
    </Router>
  );
}

export default App;
