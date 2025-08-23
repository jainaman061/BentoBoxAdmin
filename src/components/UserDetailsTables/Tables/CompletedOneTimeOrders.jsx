import axios from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/apiclient";
import { useNavigate } from "react-router-dom";

const CompletedOneTimeOrders = (content) => {
  const [data, setData] = useState([]);
  
  const navigate =useNavigate();

  useEffect(() => {
   setData(content.data)
    

  }, []);

  return (
    <div className=" overflow-y-auto max-h-96 w-full pb-4">
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
              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>
              <td className='text-center'>{data.restaurantName}</td>
            </tr>
          ))
        }
     </table> </div>  );
};

export default CompletedOneTimeOrders;
