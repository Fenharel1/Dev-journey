import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { findAll, findAllPages, remove, save, show, update } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { initialUserForm, addUser, removeUser, updateUser, load, onUserSelectedForm, onOpenForm, onCloseForm, loadError } from '../store/slices/users/usersSlice'
import { useAuth } from '../auth/hooks/useAuth'

export const useUsers = () => {
  const { users, userSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.users);
  const dispatch = useDispatch();

  // const { login, handlerLogout } = useContext(AuthContext);
  const { login, handlerLogout } = useAuth();

  const navigate = useNavigate();

  const getUsers = async (page = 0) => {
    try {
      const result = await findAllPages(page);
      dispatch(load(result.data));
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
        dispatch(addUser(response.data));
      } else if (type == "update") {
        response = await update(user);
        dispatch(updateUser(response.data));
      }

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
        dispatch(loadError(error.response?.data))
      } else if (
        error.response?.status == 500 &&
        error.response?.data?.message.includes("constraint")
      ) {
        if (error.response?.data?.message.includes("UK_username"))
          dispatch(loadError({ username: "El username ya existe" }));
        if (error.response?.data?.message.includes("UK_email"))
          dispatch(loadError({ email: "El email ya existe" }));
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
          dispatch(removeUser(id));
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
    dispatch(onUserSelectedForm({...user}))
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm())
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadError({}));
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    isLoading,
    paginator,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelected,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
    getUser,
  };
};
