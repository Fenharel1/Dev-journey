import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserForm = ({ handlerAddUser, initialUserForm, handlerClose }) => {
  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, username, password, email } = userForm;

  const onInputChange = ({ target: { value, name } }) => {
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || (id == 0 && !password) || !email) {
      Swal.fire(
        "Error de validacion",
        "Debe completar los campos del formulario!",
        "error"
      );
    } else {
      handlerAddUser(userForm);
    }
    setUserForm(initialUserForm);
  };

  useEffect(() => {
    setUserForm({ ...initialUserForm, password: "" });
  }, [initialUserForm]);

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
      <input
        type="text"
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input type="hidden" valu={id} name="id" />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Editar" : "Crear"}
      </button>
      <button
        type="button"
        className="btn btn-primary mx-2"
        onClick={handlerClose}
      >
        Cerrar
      </button>
    </form>
  );
};
