import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../utils/apiclient';

const Transactions = (route) => {
    const [data,setData]= useState([])
    const navigate = useNavigate()
  useEffect(() => {
    const tableData = async () => {
      console.log(route.route)
      try {

        const response = await apiClient.get(
 `${route.route}`        );
          console.log(response.data)
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    tableData();
  }, [route.route]);
   return (
    <div className='w-screen   overflow-x-auto overflow-y-auto  h-96 overscroll-x-contain flex flex-col text-center items-center '>
      <table className='border-4    border-gray-300 mt-8'>
        <thead>
      <tr>
        <th className=''>Id
        </th>
        <th>
          Public id
        </th>
        <th>
          user id</th>
        <th className='px-5' >amount</th>
        <th className='px-5' >referralBonus</th>
        <th className='px-5' >transactionType</th>
     
        <th className='px-5'>createdAt</th>
      </tr>
      </thead>
      <tbody>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center px-2'>{data.id}</td>
               <td className='text-center px-2 '>{data.publicId}</td>
              {/* <td className='text-center hover:text-blue-900 hover:cursor-pointer' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td> */}
              <td className='text-center'>{data.userId}</td>
              {/* <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/restaurant/${data.restaurantid}`)}}>{data.restaurantName}</td> */}
              <td className='text-center'>{data.amount}</td>
              <td className='text-center'>{data.referralBonus ? "Applied":"Not Applied"}</td>
             
           
            
              <td className='text-center'>{data.transactionType}</td>
                          
              <td className='text-center pr-2'>{data.createdAt}</td>
             

            </tr>
          ))
        }
        </tbody>
        </table>
        </div>
  )
}

export default Transactions