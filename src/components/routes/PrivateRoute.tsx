import { USER } from "src/common/constants";
import { Outlet, Navigate } from "react-router-dom";

// Navigate users to login page if they are not authenticated
export const PrivateRoute = () => {
  const storedUser = localStorage.getItem(USER);
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isUserAuthenticated = !!currentUser;
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
