import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";

export const UsersApp = () => {
  const {login} = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
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
};
