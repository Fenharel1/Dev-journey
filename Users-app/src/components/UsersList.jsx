import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";

export function UsersList() {

  const { users } = useContext(UserContext)

  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>email</th>
          <th>update</th>
          <th>update route</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={{...user,password:''}}></UserRow>
        ))}
      </tbody>
    </table>
  );
}
