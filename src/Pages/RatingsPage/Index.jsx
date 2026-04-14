import React, { useEffect, useState } from 'react'
import Navbar from "../../components/NavBar/Index"
import Home from "../../components/Home/index"
import { useNavigate, useParams } from 'react-router-dom'
import Dashboard from '../../components/Home/Dashboard'
import apiClient from '../../utils/apiclient'
import OrderRatings from '../../components/Ratings/OrderRatings'
const Index = () => {
    const navigate=useNavigate()
    const [ratings,setRatings]= useState([])
useEffect(() => {
  if (!localStorage.getItem("bentoAdmin")) {
    navigate("/login");
    return;
  }

  fetchRatings();
},[]);

const fetchRatings = async () => {
  try {
    const res = await apiClient.get(`order/rating`);
    setRatings(res.data);
  } catch (e) {
    console.error(e);
  }
};

  return (

    <div className='bg-white  h-screen flex flex-col  '>
     <Navbar />
   
     <div className="bg-white   mt-6 flex flex-col items-center md:justify-center ">
      
  <Dashboard />

  <OrderRatings data={ratings} />
  
  
     </div>

  
  
</div>

  )
}

export default Index