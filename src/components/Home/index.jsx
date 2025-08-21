import React from 'react'
import Dashboard from './Dashboard'
const index = () => {
  return (
    <div className=' flex  overflow-y-hidden'>
      <div className='px-56'></div>
      <div className='bg-gray-300 flex-1 mt-6'><Dashboard /></div>
    </div>
  )
}

export default index
