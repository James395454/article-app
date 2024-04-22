import { USER } from "src/common/constants";
import { Auth } from "src/pages/auth/Auth";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  const storedUser = localStorage.getItem(USER);
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isUserAuthenticated = !!currentUser;
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
