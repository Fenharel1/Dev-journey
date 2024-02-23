import { useContext, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { useParams } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { useUsers } from "../hooks/useUsers";

export function RegisterPage() {
  // const { initialUserForm, getUser } = useContext(UserContext);
  const { initialUserForm, getUser } = useUsers();
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const {id} = useParams()

  const getUserToEdit = async () => {
    if(id){
      const userToFind = await getUser(id);
      if(userToFind) setUserSelected(userToFind.data)
    }
  }

  useEffect(()=>{
    getUserToEdit();
  }, [id])

  return (
    <div className="container my-4">
      <h4>{ userSelected.id > 0 ? 'Editar usuario' : 'Registro de usuarios'}</h4>
      <div className="row">
        <div className="col">
          <UserForm
            userSelected={userSelected}
          ></UserForm>
        </div>
      </div>
    </div>
  );
}
