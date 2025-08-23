import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDetailsTable from "../../components/UserDetailsTables/index"
const Index = () => {
    const {number} = useParams()
    console.log(number);

    const [data,SetData]=useState()
    useEffect(()=>{
      const fetchData=async()=>{
        try{
            const response =await axios.get(`http://localhost:8080/admin/user/${number}`)
            SetData(response.data)
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