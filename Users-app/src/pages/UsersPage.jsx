
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";

export const UsersPage = ({
    users,
    userSelected,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelected,
    handlerOpenForm,
    handlerCloseForm,
  }) => {

  return (
    <>
      {!visibleForm || (
        <UserModalForm
          userSelected={userSelected}
          handlerAddUser={handlerAddUser}
          handlerCloseForm={handlerCloseForm}
        ></UserModalForm>
      )}
      <div className="container my-4">
        <h2>Users App</h2>
        <div className="row">
          {/* {!visibleForm || (
            <div className="col">
              <UserForm
                initialUserForm={userSelected}
                handlerAddUser={handlerAddUser}
                handlerClose={handlerCloseForm}
              ></UserForm>
            </div>
          )} */}
          <div className="col">
            {visibleForm || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Usuario
              </button>
            )}
            {users.length == 0 ? (
              <div className="alert alert-warning">
                {" "}
                No hay usuarios en el sistema
              </div>
            ) : (
              <UsersList
                handlerRemoveUser={handlerRemoveUser}
                handlerUserSelected={handlerUserSelected}
                users={users}
              ></UsersList>
            )}
          </div>
        </div>
      </div>
    </>
  );
};