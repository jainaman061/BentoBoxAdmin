import React, { useEffect, useState } from 'react'
import UnAuthorizedRider from "../../components/UnAuthorizedRiders/Index"
import apiClient from '../../utils/apiclient';
import Navbar from "../../components/NavBar/Index"

const Index = () => {
  const [data,SetData]=useState([]);
   useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response = await apiClient.get ("/unauthorizedrider");
                
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
      <div className='flex justify-center text-center items-center'><UnAuthorizedRider data={data} />
    </div>
    </div>
  )
}

export default Index

