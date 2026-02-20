import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/AuthSlice";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, redirectIfAuth = false }) {
  const currentUser = useSelector(selectCurrentUser);

  // If user is logged in and trying to access login/signup
  if (redirectIfAuth && currentUser) {
    return <Navigate to="/home" replace />;
  }

  // If user is NOT logged in and trying to access protected route
  if (!redirectIfAuth && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
