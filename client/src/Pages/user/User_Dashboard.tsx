
import { ReactNode } from 'react';
import UserMenu from './UserMenu'
type UserChild={
  children:ReactNode;
}
const User_Dashboard = ({children}:UserChild) => {
  return (
    <>
      <UserMenu/>

      <div className="p-4 sm:ml-64">
        <div className="p-4 drop-shadow-lg rounded-lg dark:border-gray-700">
          
          {children}
          
       
        </div>
      </div>
    </>
  );
};

export default User_Dashboard;
