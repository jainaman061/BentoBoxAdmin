import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';

const CompletedSubscriptons = () => {
    const [data, setData] = useState([]);
    
      useEffect(() => {
        const tableData = async () => {
          try {
            const response = await apiClient.get(
              "/CompletedSubscription"
            );
            setData(response.data);
            console.log(response.data);
            
          } catch (e) {
            console.error(e);
          }
        };
        tableData();
      }, []);
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
        <th className='px-5'>Cancellation Date</th>

     

        <th className='px-5'>price</th>
                <th className='px-5'>refund amount</th>





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
                           <td className='text-center'>{data.cancellationDate==null?"No":"Yes"}</td>
                                           <td className='text-center'>{data.cancellationDate==null?"-":data.cancellationDate}</td>

              <td className='text-center'>{data.price}</td>
              <td className='text-center'>{data.refundAmount===null?"-":data.refundAmount}</td>

            </tr>
          ))
        }
        </table>
        </div>
  )
}

export default CompletedSubscriptons