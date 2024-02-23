import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { UserProvider } from "../context/UserProvider";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRoutes = () => {
  // const { login } = useContext(AuthContext);
  const { login } = useAuth();
  return (
    <>
      {/* <UserProvider> */}
        <Navbar></Navbar>
        <Routes>
          <Route path="users" element={<UsersPage></UsersPage>} />
          <Route path="users/page/:page" element={<UsersPage></UsersPage>} />
          {!login.isAdmin || (
            <>
              <Route
                path="users/register"
                element={<RegisterPage></RegisterPage>}
              />
              <Route
                path="users/edit/:id"
                element={<RegisterPage></RegisterPage>}
              />
            </>
          )}
          <Route path="/*" element={<Navigate to="/users"></Navigate>}></Route>
        </Routes>
      {/* </UserProvider> */}
    </>
  );
};
