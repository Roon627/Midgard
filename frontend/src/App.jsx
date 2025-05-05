import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';                      // Global styles
import './App.css';                        // App-specific styles
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome

// Pages & Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Interview from "./pages/Interview";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminSettings from "./pages/AdminSettings";

// 🔐 Admin route protection
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1 main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/interview/:jobId" element={<Interview />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 🔐 Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/submissions"
              element={
                <ProtectedAdminRoute>
                  <AdminSubmissions />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedAdminRoute>
                  <AdminSettings />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
