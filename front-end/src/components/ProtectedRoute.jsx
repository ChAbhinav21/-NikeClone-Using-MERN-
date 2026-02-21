import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/AuthSlice";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, redirectIfAuth = false }) {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();  // Get the current location (where user tried to go)

  // If user is logged in and trying to access login/signup
  if (redirectIfAuth && currentUser) {
    // Redirect them to the page they originally wanted to go to, or home by default
    return <Navigate to="/home" replace />;
  }

  // If user is NOT logged in and trying to access a protected route
  if (!redirectIfAuth && !currentUser) {
    // Redirect to login with the path they were trying to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;  // If no redirect needed, render children (the protected page)
}