import { UserForm } from "./UserForm";

export const UserModalForm = ({userSelected, handlerAddUser, handlerCloseForm}) => {
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
                initialUserForm={userSelected}
                handlerAddUser={handlerAddUser}
                handlerClose={handlerCloseForm}
              ></UserForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
