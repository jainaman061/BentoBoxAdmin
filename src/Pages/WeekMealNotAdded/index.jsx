import React, { useEffect, useState } from 'react'
import apiClient from '../../utils/apiclient'
import Restaurant from "../../components/restaurants/index"
import Navbar from "../../components/NavBar/Index"
import { useNavigate } from 'react-router-dom'

const Index = () => {
    const navigate=useNavigate()
   useEffect(() => {
      if (!localStorage.getItem("bentoAdmin")) {
        navigate("/login")
      }
    }, [navigate])
  
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const response= await apiClient.get("restaurant/mealsnotaddedtoday");
                setData(response.data);
                
                console.log(response.data);
                
            }
            catch(e){
                console.error(e)
            }
        }
        fetchdata()
    },[])
  return (
    <div>
                <Navbar />

<div className='bg-white h-screen flex flex-col items-center'>
    <div className='overflow-x-hidden overflow-y-auto h-96  '>  
           
    <Restaurant data={data} />
   
</div>  </div> 
</div> )
}

export default Index