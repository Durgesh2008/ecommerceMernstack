
import { ReactNode } from 'react';
import AdminMenu from './AdminMenu'
type AdminChild={
  children:ReactNode;
}
const Admin_DashBoard = ({children}:AdminChild) => {
  return (
    <>
      <AdminMenu/>

      <div className="p-4 sm:ml-64 ">
        <div className="p-4 drop-shadow-lg rounded-lg dark:border-gray-700">
          
          {children}
          
       
        </div>
      </div>
    </>
  );
};

export default Admin_DashBoard;
