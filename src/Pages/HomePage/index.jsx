import React from 'react'
import Navbar from "../../components/NavBar/Index"
import Home from "../../components/Home/index"
const index = () => {
  return (
    <div className='bg-gray-100  h-screen flex flex-col'>
     <Navbar />
   
      <Home />
</div>  
  )
}

export default index