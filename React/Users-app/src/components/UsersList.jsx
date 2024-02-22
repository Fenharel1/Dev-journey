import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export function UsersList() {
  const { users } = useContext(UserContext);
  const { login } = useContext(AuthContext);

  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>email</th>
          {!login.isAdmin || (
            <>
              <th>update</th>
              <th>update route</th>
              <th>remove</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={{ ...user, password: "" }}></UserRow>
        ))}
      </tbody>
    </table>
  );
}
