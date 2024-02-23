import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const UsersPage = () => {

  const {page} = useParams();

  const { users, visibleForm, isLoading, paginator, handlerOpenForm, getUsers } = useUsers();

  // const {login} = useContext(AuthContext);
  const { login } = useAuth();

  useEffect(() => {
    getUsers(page);
  }, [,page]);

  if (isLoading) {
    return (
      <>
        <div className="container my-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {!visibleForm || <UserModalForm></UserModalForm>}
      <div className="container my-4">
        <h2>Users App</h2>
        <div className="row">
          <div className="col">
            {visibleForm || !login.isAdmin || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Usuario
              </button>
            )}
            {users.length == 0 ? (
              <div className="alert alert-warning">
                No hay usuarios en el sistema
              </div>
            ) : (
              <>
                <UsersList></UsersList>
                <Paginator url="/users/page" paginator={paginator}></Paginator>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
