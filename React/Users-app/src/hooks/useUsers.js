import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { findAll, remove, save, show, update } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

const initialErrors = {
  name: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);

  const [errors, setErrors] = useState(initialErrors);

  const { login, handlerLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      dispatch({ type: "load", payload: result.data });
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getUser = async (id) => {
    const result = await show(id);
    return result;
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;
    const type = user.id == 0 ? "add" : "update";
    let response;

    try {
      if (type == "add") {
        response = await save(user);
      } else if (type == "update") {
        response = await update(user);
      }

      dispatch({ type, payload: response.data });
      Swal.fire(
        user.id == 0 ? "Usuario creado" : "Usuario actualizado",
        user.id == 0
          ? "El usuario ha sido con exito"
          : "El usuario ha sido actualizado con exito",
        "success"
      );
      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      if (error.response?.status == 400) {
        setErrors(error.response?.data);
      } else if (
        error.response?.status == 500 &&
        error.response?.data?.message.includes("constraint")
      ) {
        if (error.response?.data?.message.includes("UK_username"))
          setErrors({ username: "El username ya existe" });
        if (error.response?.data?.message.includes("UK_email"))
          setErrors({ email: "El email ya existe" });
        console.log(errors);
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveUser = (id) => {
    if (!login.isAdmin) return;
    Swal.fire({
      title: "Esta seguro ?",
      text: "No seras capaz de revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await remove(id);
          dispatch({ type: "remove", payload: id });
          Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerUserSelected = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
    setErrors({});
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelected,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
    getUser,
  };
};
