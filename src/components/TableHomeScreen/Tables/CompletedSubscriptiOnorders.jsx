import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient'
import { useNavigate } from 'react-router-dom'

const CompletedSubscriptiOnorders = (route) => {
  const navigate = useNavigate()
        const [data,Setdata]=useState([])
 const [search,Setsearch]=useState("")

  useEffect(()=>{
      const tableData=async()=>{
        try{
          const data=await apiClient.get( `${route.route}`);
          console.log(data.data);
          Setdata(data.data);
          
        }
        catch(e){
          console.error(e); 
        }
  
      }
tableData()    },[])
const filteredData = data.filter((el) => {
    if (search.trim() === "") {
      return true; 
    }
    return (
      el.name?.toLowerCase().includes(search.toLowerCase()) || 
      el.number?.toString().includes(search) ||
      el.email?.toLowerCase().includes(search.toLowerCase())
    );
  });
    const handlechange=(e)=>{
        const value=e.target.value;
        Setsearch(value);
        console.log(value)
    }
  return (<div>
            <input className='w-1/3 border-2 px-2' placeholder='search number here' onChange={handlechange}  value={search}/>

    <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain h-96 ">
    <table className='border-4    border-gray-300 mt-8'>
      <thead>
      <tr>
        <th className='px-5'>
          SubscriptionOrder Id
        </th>
              <th className='px-5 py-2'>Public Id</th>

        <th className='px-5' >Customer Number</th>
        <th className='px-5' >Customer Name</th>
        <th className='px-5'>meal name</th>
        <th className='px-5'>subscription Order Instruction</th>
        <th className='px-5'>OTP</th>
        <th className='px-5'>Restaurant name</th>

        <th className='px-5'>orderStatus</th>
        <th className='px-5'>start time</th>
        <th className='px-5'>end time</th>
        <th className='px-5'>order Date</th>
        <th className='px-5'>Start Time</th>
        <th className='px-5'>End Time</th>
        <th className='px-5'>Subscription Price</th>
        <th className='px-5'>Meal Plan</th>
        <th className='px-5'>City</th>
        <th className='px-5'>Street</th>
        <th className='px-5'>Latitude</th>
        <th className='px-5'>Longitude</th>
        <th className="px-5 py-2">Rider name</th>
          <th className="px-5 py-2">Rider number</th>


      </tr>
      </thead><tbody>
        {
          filteredData.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center px-2'>{data.publicId}</td>
              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>
                      <td className='text-center whitespace-nowrap'>{data.userdetails?.name}</td>

              <td className='text-center'>{data.mealName}</td>
              <td className='text-center'>{data.subscriptionOrderInstruction?data.subscriptionOrderInstruction:"no data"}</td>

              <td className='text-center'>{data.otp}</td>
              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline'onClick={()=>{navigate(`/restaurant/${data.restaurantid}`)}} >{data.restaurantName}</td>
              <td className='text-center'>{data.status}</td>
              <td className='text-center'>{data.startTime}</td>
              <td className='text-center'>{data.endTime}</td>
              <td className='text-center'>{data.orderdate}</td>
              <td className='text-center'>{data.startTime}</td>
              <td className='text-center'>{data.endTime}</td>
              <td className='text-center'>{data.mealplanprice}</td>
              <td className='text-center'>{data.mealplanname}</td>
                      <td className='text-center '>{data.city}</td>
        <td className='text-center '>{data.street}</td>
        <td className='text-center px-2'>{data.latitude}</td>
        <td className='text-center px-2'>{data.longitude}</td>
              <td className="text-center">{data.riderDetails.name}</td>
            <td className="text-center">{data.riderDetails.number}</td>
            </tr>
          ))
        }</tbody>
     </table> </div>
     </div>
  )
}

export default CompletedSubscriptiOnorders