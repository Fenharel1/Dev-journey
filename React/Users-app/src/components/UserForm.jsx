import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({userSelected, handlerClose}) => {

  const { handlerAddUser, errors } = useContext(UserContext);

  const [userForm, setUserForm] = useState(userSelected);

  const { id, username, password, email } = userForm;

  const onInputChange = ({ target: { value, name } }) => {
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (!username || (id == 0 && !password) || !email) {
    //   Swal.fire(
    //     "Error de validacion",
    //     "Debe completar los campos del formulario!",
    //     "error"
    //   );
    //   return
    // } 
    handlerAddUser(userForm);
    // setUserForm(userSelected);
  };

  useEffect(() => {
    setUserForm({ ...userSelected, password: "" });
  }, [userSelected]);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.username}</p>
      {id > 0 || (
        <input
          type="password"
          className="form-control my-3 w-75"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <p className="text-danger">{errors?.password}</p>
      <input
        type="text"
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>
      <input type="hidden" valu={id} name="id" />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Editar" : "Crear"}
      </button>

      {!handlerClose || (
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={handlerClose}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
