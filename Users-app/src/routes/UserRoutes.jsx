import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersPage } from '../pages/UsersPage';
import { Navbar } from '../components/layout/Navbar'
import { RegisterPage } from '../pages/RegisterPage';
import { useUsers } from '../hooks/useUsers';

export const UserRoutes = ({login, handlerLogout}) => {

  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelected,
    handlerOpenForm,
    handlerCloseForm,
  } = useUsers();

  return (
    <>
      <Navbar login={login} handlerLogout={handlerLogout}></Navbar>
      <Routes>
        <Route path='users' element={ <UsersPage
          users={users}
          userSelected={userSelected}
          initialUserForm={initialUserForm}
          visibleForm={visibleForm}
          handlerAddUser={handlerAddUser}
          handlerRemoveUser={handlerRemoveUser}
          handlerUserSelected={handlerUserSelected}
          handlerOpenForm={handlerOpenForm}
          handlerCloseForm={handlerCloseForm}
          ></UsersPage> } />
        <Route path='users/register' element={ <RegisterPage 
          handlerAddUser={handlerAddUser} 
          initialUserForm={initialUserForm} 
        ></RegisterPage> } />
        <Route path='users/edit/:id' element={ <RegisterPage 
          users={users}
          handlerAddUser={handlerAddUser} 
          initialUserForm={initialUserForm} 
        ></RegisterPage> } />
        <Route path="/*" element={ <Navigate to="/users"></Navigate> }></Route>
      </Routes> 
    </>
  )
}