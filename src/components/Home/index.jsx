import React from 'react'
import Dashboard from './Dashboard'
import Table from "../TableHomeScreen/Index"
const index = ({type}) => {
  return (
    <div className=' flex  flex-col  overflow-y-hidden '>
     <div> <div className="px-2 md:px-56"></div>
<div className="bg-white flex-1 mt-6 flex justify-center  ">
  <Dashboard />
</div>
      </div>
     <div className='flex flex-col md:justify-center p-2 '> 
      <div className=' mt-6 flex justify-center items-center ml-2'><Table data={type}/> </div>
      </div>
    </div>
  )
}

export default index
