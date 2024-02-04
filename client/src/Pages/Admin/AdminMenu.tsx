import  { useState } from 'react'
import { Link } from "react-router-dom";
import {FaProductHunt} from 'react-icons/fa'
import {TbCategoryFilled} from 'react-icons/tb'
import {HiUsers } from 'react-icons/hi2'
import {IoMenu} from 'react-icons/io5'
import {RxCross2} from 'react-icons/rx'
const AdminMenu = () => {
  const [isopen,setisopen]=useState<boolean>(false)
  return (
   <>
    <button
        type="button"
        onClick={()=>setisopen(!isopen)}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        {
          isopen? <RxCross2 className='text-[#000000] text-[24px] cursor-pointer'/>:  <IoMenu  className='text-[#000000] text-[24px] cursor-pointer'/>
        }
     
        
      </button>

      <aside
        id="default-sidebar"
        className={` top-[5%] md:top-[4%] ${isopen?'translate-x-[8px]':'-translate-x-full'}  md:left-0  absolute z-40 w-64 h-screen transition-all ease-in duration-500 -translate-x-full sm:translate-x-0`}
        
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
              onClick={()=>setisopen(false)}
              to={'/admin_dashboard/users'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
              <HiUsers/>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link 
                onClick={()=>setisopen(false)}
                to={'/admin_dashboard/create_product'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <FaProductHunt/>
                <span className="flex-1 ml-3 whitespace-nowrap">Create Products</span>
              </Link>
            </li>
            <li>
              <Link 
                onClick={()=>setisopen(false)}
                to={'/admin_dashboard/mange_product'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <FaProductHunt/>
                <span className="flex-1 ml-3 whitespace-nowrap">Mange Products</span>
              </Link>
            </li>
            <li>
              <Link 
                onClick={()=>setisopen(false)}
                to={'/admin_dashboard/create_category'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
              <TbCategoryFilled/>
                <span className="flex-1 ml-3 whitespace-nowrap">Manage Category</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
   </>
  )
}

export default AdminMenu