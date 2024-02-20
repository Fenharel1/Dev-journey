import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from 'sweetalert2'

const initialUsers = [
  {
    id: 1,
    username: "pepe",
    password: "123",
    email: "pepe@correo.com",
  },
];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);

  const handlerAddUser = (user) => {
    const type = user.id == 0 ? "add" : "update";
    dispatch({ type, payload: user });
    setUserSelected(initialUserForm);
    Swal.fire(
      user.id == 0 ? 'Usuario creado' : 'Usuario actualizado',
      user.id == 0 ? 'El usuario ha sido con exito': 'El usuario ha sido actualizado con exito',
      'success'
    )
  };

  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: 'Esta seguro ?',
      text: 'No seras capaz de revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar !'
    }).then((res)=>{
      if(res.isConfirmed) {
        dispatch({ type: "remove", payload: id });
        Swal.fire(
          'Eliminado',
          'El usuario ha sido eliminado',
          'success'
        )
      }
    })
  };

  const handlerUserSelected = (user) => {
    setUserSelected({ ...user });
  };

  return {
    users,
    userSelected,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelected,
  };
};
