import { UserRow } from "./UserRow";

export function UsersList({ users, handlerRemoveUser, handlerUserSelected }) {
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
          <UserRow handlerUserSelected={handlerUserSelected} handlerRemoveUser={handlerRemoveUser} key={user.id} user={{...user,password:''}}></UserRow>
        ))}
      </tbody>
    </table>
  );
}
