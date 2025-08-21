import React, { useState } from 'react'
import apiClient from '../../utils/apiclient'
import { useEffect } from 'react'
import UnauthorizedChef from "../../components/UnauthorizedRestaurants/Index"
import Navbar from "../../components/NavBar/Index"
const Index = () => {
  const [data,SetData]=useState([]);
   useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response = await apiClient.get ("/unauthorizedchef");
                SetData(response.data);

                
            }
            catch (err) {
        console.error("Something went wrong",err);
      }
        }
        fetchData();
    },[])
  return (
    <div>
      <Navbar />
      <div className='flex justify-center text-center items-center'><UnauthorizedChef data={data} /></div>
    </div>
  )
}

export default Index
