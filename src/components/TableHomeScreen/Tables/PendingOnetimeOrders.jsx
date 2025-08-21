import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient'

const PendingOnetimeOrders = () => {
            const [data,Setdata]=useState([])
    
      useEffect(()=>{
          const tableData=async()=>{
            try{
              const data=await apiClient.get("/pendingOneTimeorders");
              console.log(data.data);
              Setdata(data.data);
              
            }
            catch(e){
              console.error(e); 
            }
      
          }
    tableData()    },[])
  return ( <div className=" overflow-y-auto h-96 w-full">
<table className='border-4    border-gray-300 mt-8 w-full'>
      <tr>
        <th className='px-5'>
          Order Id
        </th>
        <th className='px-5' >chefId</th>
        <th className='px-18'>items</th>
        <th className='px-5'>price</th>
        <th className='px-5'>orderStatus</th>
        <th className='px-5'>Customer number</th>
        <th className='px-5'>Restaurant Name</th>

      </tr>

        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.chefid}</td>
              <td  className='flex flex-col justify-center text-center items-center '>{data.orderItems.map((orderItems,idx)=>(
                <tr key={idx} className='flex '><div className='flex'><td className=''>{orderItems.name}</td>x
                <td className=''>{orderItems.count}</td></div>=
                <td className=''>{orderItems.price}</td></tr>
              
              ))}</td>
              <td className='text-center '>{data.price}</td>
              <td className='text-center'>{data.orderStatus}</td>
              <td className='text-center'>{data.number}</td>
              <td className='text-center'>{data.restaurantName}</td>
            </tr>
          ))
        }
     </table> </div>  )
}

export default PendingOnetimeOrders