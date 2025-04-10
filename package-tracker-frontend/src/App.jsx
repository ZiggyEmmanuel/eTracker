import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./context/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/package/:trackingNumber"
              element={<PackageDetailPage />}
            />{" "}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            {/* New Route */}
            <Route path="/login/" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
