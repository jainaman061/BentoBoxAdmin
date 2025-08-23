import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';

const ActiveSubscriptions = (route) => {
 
      const [data, setData] = useState([]);
      console.log(route);
      
    
      
  return (
    <div className='overflow-x-hidden overflow-y-auto h-96 w-full '>
      <table className='border-4    border-gray-300 mt-8'>
      <tr>
        <th className=''>
          Subscription Id
        </th>

        <th className='px-5' >Meal Plan</th>
        <th className='px-5' >Restaurant Name</th>
        <th className='px-5' >Active Status</th>
     
        <th className='px-5'>start date</th>
        <th className='px-5'>start date</th>
        <th className='px-5'>Pause Status</th>

        <th className='px-5'>pause start date</th>
        <th className='px-5'>pause end date</th>

        <th className='px-5'>price</th>




      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.mealPLanName}</td>
              <td className='text-center'>{data.restaurantName}</td>

              <td className='text-center'>{data.isActive ? "Active":"Not Active"}</td>
             
           
              <td className='text-center'>{data.startdate}</td>
              <td className='text-center'>{data.enddate}</td>
              <td className='text-center'>{data.ispaused ? "tue":"false"}</td>
              <td className='text-center'>{(data.pause_start_date===null )? "-":`${data.pause_start_date}`} </td>
              <td className='text-center'>{(data.pause_end_date===null )? "-":`${data.pause_end_date}`} </td>

              <td className='text-center'>{data.price}</td>

            </tr>
          ))
        }
     </table>
      

    </div>  )
}

export default ActiveSubscriptions