import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export function UserRow({ user }) {
  // const { handlerRemoveUser, handlerUserSelected } = useContext(UserContext);
  const { handlerRemoveUser, handlerUserSelected } = useUsers();
  // const { login } = useContext(AuthContext);
  const { login } = useAuth();
  return (
    <tr>
      <td> {user.id} </td>
      <td> {user.username} </td>
      <td> {user.email} </td>
      {!login.isAdmin || (
        <>
          <td>
            <button
              onClick={(e) => handlerUserSelected({ ...user, password: "" })}
              type="button"
              className="btn btn-secondary btn-sm"
            >
              update
            </button>
          </td>
          <td>
            <NavLink
              className="btn btn-secondary btn-sm"
              to={"/users/edit/" + user.id}
            >
              update route
            </NavLink>
          </td>
          <td>
            <button
              onClick={(e) => handlerRemoveUser(user.id)}
              type="button"
              className="btn btn-danger btn-sm"
            >
              remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
