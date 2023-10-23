import React from 'react'
import loader from '../../Images/loading-gif.gif'
const DataLoader = () => {
  return (

    <div className='flex items-center justify-center '>
  <img src={loader} className='w-10 h-10 my-3' alt="Loading..." />
    </div>
  )
}

export default DataLoader