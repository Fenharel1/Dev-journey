import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { useUsers } from "../hooks/useUsers";
import { UserProvider } from "../context/UserProvider";

export const UserRoutes = () => {

  return (
    <>
      <UserProvider>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="users"
            element={
              <UsersPage
              ></UsersPage>
            }
          />
          <Route
            path="users/register"
            element={
              <RegisterPage
              ></RegisterPage>
            }
          />
          <Route
            path="users/edit/:id"
            element={
              <RegisterPage
              ></RegisterPage>
            }
          />
          <Route path="/*" element={<Navigate to="/users"></Navigate>}></Route>
        </Routes>{" "}
      </UserProvider>
    </>
  );
};
