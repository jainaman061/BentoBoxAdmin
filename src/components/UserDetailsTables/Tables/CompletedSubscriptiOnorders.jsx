import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient'
import { useNavigate } from 'react-router-dom'

const CompletedSubscriptiOnorders = (content) => {
  console.log(content.data);
  
  const navigate = useNavigate()
        const [data,Setdata]=useState([])

  useEffect(()=>{
      const tableData=async()=>{
        try{
          Setdata(content.data);
          
        }
        catch(e){
          console.error(e); 
        }
  
      }
tableData()    },[])
  return (
    <div className=" overflow-y-auto h-96 w-full">
    <table className='border-4    border-gray-300 mt-8'>
      <tr>
        <th className='px-5'>
          SubscriptionOrder Id
        </th>
        <th className='px-5' >number</th>
        <th className='px-5'>meal name</th>
        <th className='px-5'>Restaurant name</th>

        <th className='px-5'>orderStatus</th>
        <th className='px-5'>start time</th>
        <th className='px-5'>end time</th>
        <th className='px-5'>order Date</th>
        <th className='px-5'>Subscription Price</th>
        <th className='px-5'>Meal Plan</th>


      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>
              <td className='text-center'>{data.mealName}</td>
              <td className='text-center'>{data.restaurantName}</td>
              <td className='text-center'>{data.status}</td>
              <td className='text-center'>{data.startTime}</td>
              <td className='text-center'>{data.endTime}</td>
              <td className='text-center'>{data.orderdate}</td>
              <td className='text-center'>{data.mealplanprice}</td>
              <td className='text-center'>{data.mealplanname}</td>
            </tr>
          ))
        }
     </table> </div>
  )
}

export default CompletedSubscriptiOnorders