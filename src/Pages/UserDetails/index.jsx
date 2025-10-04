import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserDetailsTable from "../../components/UserDetailsTables/index"
import apiClient from '../../utils/apiclient';
const Index = () => {
  const navigate=useNavigate()
   useEffect(() => {
      if (!localStorage.getItem("bentoAdmin")) {
        navigate("/login")
      }
    }, [navigate])
  
    const {number} = useParams()
    console.log(number);

    const [data,SetData]=useState()
    useEffect(()=>{
      const fetchData=async()=>{
        try{
            const response =await apiClient.get(`user/${number}`)
            SetData(response.data)
            console.log(response.data);
            
        }
        catch(e){
          console.error(e)
        }
      }

        fetchData()
    },[])
    
  return (
    <div className='flex justify-center  h-screen'>
     <div className=''><UserDetailsTable data={data} /></div>
  </div>
  )
}
export default Index