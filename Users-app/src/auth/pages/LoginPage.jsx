import { useState } from "react";
import Swal from "sweetalert2";

const initialLoginForm = {
  username: "",
  password: "",
};

export const LoginPage = ({ handlerLogin }) => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target: { value, name } }) => {
    setLoginForm({ ...loginForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      Swal.fire(
        "Error de validacion",
        "Username y password requeridos",
        "error"
      );
      return;
    }
    // login
    handlerLogin({ username, password });

    setLoginForm(initialLoginForm);
  };

  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login page</h5>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control my-3 w-75"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={onInputChange}
                />
                <input
                  type="password"
                  className="form-control my-3 w-75"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
