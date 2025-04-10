import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    // Redirect to home if authenticated but not admin
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
