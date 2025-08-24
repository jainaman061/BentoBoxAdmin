import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';

const PendingSubscriptionOrders = ({route}) => {
  
  const navigate=useNavigate();
    const [data,Setdata]=useState([])
     const [search,Setsearch]=useState("")


  useEffect(()=>{
      const tableData=async()=>{
        try{
          const data=await apiClient.get( "/pendingSubscriptionorders");
          console.log(data.data);
          Setdata(data.data);
          
        }
        catch(e){
          console.error(e); 
        }
  
      }
tableData()   },[])
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
  return (
   <div>
        <input className='w-1/3 border-2 px-2' placeholder='search number here' onChange={handlechange}  value={search}/>

     <div className=" overflow-y-auto h-96 w-full">
     <table className='border-4 border-gray-300 mt-8 w-full'>
  <thead className="bg-gray-100">
    <tr>
      <th className='px-5 py-2'>SubscriptionOrder Id</th>
      <th className='px-5 py-2'>Number</th>
      <th className='px-5 py-2'>Meal Name</th>
      <th className='px-5 py-2'>Restaurant Name</th>
      <th className='px-5 py-2'>Order Status</th>
      <th className='px-5 py-2'>Start Time</th>
      <th className='px-5 py-2'>End Time</th>
      <th className='px-5 py-2'>Order Date</th>
      <th className='px-5 py-2'>Subscription Price</th>
      <th className='px-5 py-2'>Meal Plan</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((data, index) => (
      <tr key={index} className='border border-gray-300 hover:bg-gray-50'>
        <td className='text-center'>{data.id}</td>
        <td 
          className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline'
          onClick={() => navigate(`/userDetails/${data.number}`)}
        >
          {data.number}
        </td>
        <td className='text-center'>{data.mealName}</td>
        <td 
          className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline'
          onClick={() => navigate(`/restaurant/${data.restaurantid}`)}
        >
          {data.restaurantName}
        </td>
        <td className='text-center'>{data.status}</td>
        <td className='text-center'>{data.startTime}</td>
        <td className='text-center'>{data.endTime}</td>
        <td className='text-center'>{data.orderdate}</td>
        <td className='text-center'>{data.mealplanprice}</td>
        <td className='text-center'>{data.mealplanname}</td>
      </tr>
    ))}
  </tbody>
</table>
 </div>
   </div>
  )
}

export default PendingSubscriptionOrders