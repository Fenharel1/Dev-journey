import { useContext } from "react";
import { UserForm } from "./UserForm";
import { UserContext } from "../context/UserContext";
import { useUsers } from "../hooks/useUsers";

export const UserModalForm = () => {
  // const {userSelected, handlerCloseForm: handlerClose} = useContext(UserContext)
  const {userSelected, handlerCloseForm: handlerClose} = useUsers();
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userSelected.id > 0 ? "Editar" : "Crear"} Modal usuarios
              </h5>
            </div>
            <div className="modal-body">
              <UserForm
                handlerClose={handlerClose}
                userSelected={userSelected}
              ></UserForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
