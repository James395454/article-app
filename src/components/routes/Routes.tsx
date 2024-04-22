import { Route, Routes as RoutesContainer } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { Auth } from "src/pages/auth/Auth";
import { PrivateRoute } from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { fetchAllUsers, fetchCurrentUser } from "src/store/auth/auth";
import { useEffect } from "react";

export const Routes = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllUsers());
  }, []);

  return (
    <RoutesContainer>
      <Route path="/login" element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </RoutesContainer>
  );
};
