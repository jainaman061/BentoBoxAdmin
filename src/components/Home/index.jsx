import React from 'react'
import Dashboard from './Dashboard'
import Table from "../TableHomeScreen/Index"
const index = ({type}) => {
  return (
    <div className=' flex  flex-col  overflow-y-hidden'>
     <div> <div className='px-56'></div>
<div className="bg-white flex-1 mt-6 flex justify-center">
  <Dashboard />
</div>
      </div>
     <div className='flex flex-col justify-center  '> <div className=' mt-6 flex justify-center items-center'><Table data={type}/> </div></div>
    </div>
  )
}

export default index
