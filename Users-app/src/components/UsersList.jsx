import { UserRow } from "./UserRow";

export function UsersList({ users, handlerRemoveUser }) {
  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>email</th>
          <th>update</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow handlerRemoveUser={handlerRemoveUser} key={user.id} user={user}></UserRow>
        ))}
      </tbody>
    </table>
  );
}
