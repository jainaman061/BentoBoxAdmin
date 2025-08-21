import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../utils/apiclient'

const Restaurantdata = () => {
   const [data,Setdata]=useState([])

  useEffect(()=>{
      const tableData=async()=>{
        try{
          const data=await apiClient.get("/restaurant");
          console.log(data.data);
          Setdata(data.data);
          
        }
        catch(e){
          console.error(e); 
        }
  
      }
tableData()    },[])
    const navigate=useNavigate();
    return (
    <div className=" overflow-y-auto max-h-96 w-full pb-4">

<table className='border-4   border-gray-300 mt-8'>
      <tr>
        <th className='px-5'>
          Restaurant Id
        </th>
        <th className='px-5'>Restaurant Name</th>
        
      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300 hover:text-blue-900 hover:cursor-pointer'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center' onClick={()=>navigate(`/restaurant/${data.id}`)}>{data.name}</td>
              
            </tr>
          ))
        }
     </table>
    </div>
  )
}

export default Restaurantdata