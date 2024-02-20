import { LoginPage } from "./auth/pages/LoginPage";
import { useAuth } from "./auth/hooks/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";

export const UsersApp = () => {
  const { login, handlerLogin, handlerLogout } = useAuth();

  return (
    <Routes>
      {login.isAuth ? (
        <Route
          path="/*"
          element={
            <UserRoutes
              login={login}
              handlerLogout={handlerLogout}
            ></UserRoutes>
          }
        ></Route>
      ) : (
        <>
          <Route
            path="/login"
            element={<LoginPage handlerLogin={handlerLogin}></LoginPage>}
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
