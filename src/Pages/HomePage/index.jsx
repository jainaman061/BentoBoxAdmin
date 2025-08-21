import React from 'react'
import Navbar from "../../components/NavBar/Index"
import Home from "../../components/Home/index"
const index = () => {
  return (
    <div className='bg-white  h-screen flex flex-col'>
     <Navbar />
   
      <Home />
</div>  
  )
}

export default index