import React, { useEffect } from 'react'
import Navbar from "../../components/NavBar/Index"
import Home from "../../components/Home/index"
import { useNavigate, useParams } from 'react-router-dom'
const Index = () => {
    const navigate=useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("bentoAdmin")) {
      navigate("/login")
    }
  }, [navigate])

  const {types} = useParams()

  return (

    <div className='bg-white  h-screen flex flex-col'>
     <Navbar />
   
      <Home type={types}  />
</div>  
  )
}

export default Index