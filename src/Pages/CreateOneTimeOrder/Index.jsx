import React from 'react'
import Navbar from "../../components/NavBar/Index"
import CreateOneTimeOrder from "../../components/CreateOneTimeOrder/Index"

const Index = () => {
  return (
   <div className='bg-white  h-screen flex flex-col  '>
     <Navbar />
   
     <div className="bg-white   mt-6 flex flex-col items-center md:justify-center ">
      
    <CreateOneTimeOrder /></div>
    </div>
  )
}

export default Index