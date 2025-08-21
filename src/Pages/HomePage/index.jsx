import React from 'react'
import Navbar from "../../components/NavBar/Index"
import Home from "../../components/Home/index"
import { useParams } from 'react-router-dom'
const Index = () => {
  const {types} = useParams()
  return (
    <div className='bg-white  h-screen flex flex-col'>
     <Navbar />
   
      <Home type={types}  />
</div>  
  )
}

export default Index