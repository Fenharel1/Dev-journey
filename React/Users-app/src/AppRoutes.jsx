import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { useAuth } from "./auth/hooks/useAuth";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  // const {login} = useContext(AuthContext);
  // const {login} = useAuth();
  const {isAuth} = useSelector(state => state.auth)
  return (
    <Routes>
      {isAuth ? (
        <Route
          path="/*"
          element={
            <UserRoutes
            ></UserRoutes>
          }
        ></Route>
      ) : (
        <>
          <Route
            path="/login"
            element={
            <LoginPage></LoginPage>
          }
          ></Route>
          <Route
            path="/*"
            element={ <Navigate to="/login"></Navigate> }
          ></Route>
        </>
      )}
    </Routes>
  );
}