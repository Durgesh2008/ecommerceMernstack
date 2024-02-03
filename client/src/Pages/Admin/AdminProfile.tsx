import React, { useContext } from 'react'
import { SHOPCONTAEXT } from '../../context/Shopcontext'

const AdminProfile = () => {
  const context=useContext(SHOPCONTAEXT);
  return (
   <>
   
<dl className="w-full  text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-70">
<div className="flex flex-col pt-3 ">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
        <dd className="text-lg font-semibold">{context?.Auth?.name}</dd>
    </div>
    <div className="flex flex-col pb-3 ">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
        <dd className="text-lg font-semibold">{context?.Auth?.email}</dd>
    </div>
    <div className="flex flex-col py-3 ">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Home address</dt>
        <dd className="text-lg font-semibold">{context?.Auth?.address}</dd>
    </div>
    <div className="flex flex-col pt-3 ">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
        <dd className="text-lg font-semibold">{context?.Auth?.phone}</dd>
    </div>
   
</dl>

   </>
  )
}

export default AdminProfile