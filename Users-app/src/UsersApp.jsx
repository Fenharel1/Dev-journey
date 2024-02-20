import { useReducer } from "react";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersList";
import { usersReducer } from "./reducers/usersReducer";

const initialUsers = [
  {
    id: 1,
    username: "pepe",
    password: "123",
    email: "pepe@correo.com",
  },
];

export const UsersApp = () => {

  const [users, dispatch] = useReducer(usersReducer, initialUsers)

  const handlerAddUser = (user) => {
    dispatch({type: 'add', payload: user})
  }

  const handlerRemoveUser = (id) => {
    dispatch({type: 'remove', payload: id})
  }

  return (
    <div className="container my-4">
      <h2>Users App</h2>
      <div className="row">
        <div className="col">
          <UserForm handlerAddUser={handlerAddUser} ></UserForm>
        </div>
        <div className="col">
          <UsersList handlerRemoveUser={handlerRemoveUser} users={users}></UsersList>
        </div>
      </div>
    </div>
  );
};
