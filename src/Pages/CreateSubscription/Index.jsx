import React from 'react'
import Navbar from "../../components/NavBar/Index"
import CreateSubscription from "../../components/CreateSubscription/Index"

const Index = () => {
  return (
   <div className='bg-white  h-screen flex flex-col  '>
     <Navbar />
   
     <div className="bg-white   mt-6 flex flex-col items-center md:justify-center ">
      
    <CreateSubscription /></div>
    </div>
  )
}

export default Index
