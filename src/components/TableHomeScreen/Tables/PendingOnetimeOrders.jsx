import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient'
import { useNavigate } from 'react-router-dom'

const PendingOnetimeOrders = (route) => {
  console.log(route.route);
   const [search,Setsearch]=useState("")

  const navigate=useNavigate()
            const [data,Setdata]=useState([])
    
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
  return ( <div className="p-4">
  <input
    className="w-full sm:w-1/2  border-2  py-1 rounded mb-4"
    placeholder="Search number here"
    onChange={handlechange}
    value={search}
  />

  <div className="overflow-x-auto overflow-y-auto h-96 w-full">
    <table className="min-w-full border-4 border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="px-5 py-2">Order Id</th>
          <th className="px-5 py-2">Chef Id</th>
          <th className="px-18 py-2">Items</th>
          <th className="px-18 py-2">startTime</th>
          <th className="px-18 py-2">endTime</th>

          <th className="px-18 py-2">OTP</th>
          <th className="px-5 py-2">Price</th>
          <th className="px-5 py-2">Order Status</th>
          <th className="px-5 py-2">Customer Number</th>
          <th className="px-5 py-2">Restaurant Name</th>
          <th className="px-5 py-2">Order Date</th>
          <th className="px-5 py-2">Rider name</th>
          <th className="px-5 py-2">Rider number</th>

        </tr>
      </thead>
      <tbody>
        {filteredData.map((data, index) => (
          <tr
            key={index}
            className="items-center justify-center border border-gray-300"
          >
            <td className="text-center">{data.id}</td>
            <td className="text-center">{data.chefid}</td>
            <td className="flex flex-col justify-center text-center items-center">
              {data.orderItems.map((orderItems, idx) => (
                <div key={idx} className="flex">
                  <div className="flex">
                    <span>{orderItems.name}</span>x
                    <span>{orderItems.count}</span>
                  </div>
                  = <span>{orderItems.price}</span>
                </div>
              ))}
            </td>
            <td className="text-center">{data.startTime}</td>
            <td className="text-center">{data.endTime}</td>
            <td className="text-center">{data.otp}</td>
            <td className="text-center">{data.price}</td>
            <td className="text-center">{data.orderStatus}</td>
            <td
              className="text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline"
              onClick={() => navigate(`/userDetails/${data.number}`)}
            >
              {data.number}
            </td>
            <td
              className="text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline"
              onClick={() => navigate(`/restaurant/${data.restaurantid}`)}
            >
              {data.restaurantName}
            </td>
            <td className="text-center">{data.orderdate}</td>
            <td className="text-center">{data.riderDetails.name}</td>
            <td className="text-center">{data.riderDetails.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
)
}

export default PendingOnetimeOrders