import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const location = useLocation();

  // If not logged in → redirect to login with redirect info
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
