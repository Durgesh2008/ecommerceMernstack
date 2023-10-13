import React from 'react'
import { Link } from "react-router-dom";
import {FaProductHunt} from 'react-icons/fa'
import {TbCategoryFilled} from 'react-icons/tb'
import {HiUsers } from 'react-icons/hi2'
import {IoMenu} from 'react-icons/io5'
const AdminMenu = () => {
  return (
   <>
    <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <IoMenu/>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-[10%] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
              to={'/admin_dashboard/users'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
              <HiUsers/>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link 
                to={'/admin_dashboard/create_product'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <FaProductHunt/>
                <span className="flex-1 ml-3 whitespace-nowrap">Create Products</span>
              </Link>
            </li>
            <li>
              <Link 
                to={'/admin_dashboard/create_category'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
              <TbCategoryFilled/>
                <span className="flex-1 ml-3 whitespace-nowrap">Create Category</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
   </>
  )
}

export default AdminMenu