import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';

const ActiveSubscriptions = (route) => {
  const navigate = useNavigate()
      const [data, setData] = useState([]);
      console.log(route);
       const [search,Setsearch]=useState("")
      
    
      useEffect(() => {
        const tableData = async () => {
          try {
            const response = await apiClient.get(
              `${route.route}`
            );
            setData(response.data);
            console.log(response.data);
            
          } catch (e) {
            console.error(e);
          }
        };
        tableData();
      }, []);
      const returnmealplantype=((id)=>{
          if(id==1){
            return "lunch";
          }
          else if(id==2){
            return "dinner";
          }
          else if(id==3){
            return "combo";
          }
          else{
            return "invalid";
          }
      })
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

      <div className='overflow-x-hidden overflow-y-auto h-96 w-full '>
      <table className='border-4    border-gray-300 mt-8'>
        <thead>
      <tr>
        <th className=''>
          Subscription Id
        </th>
        <th>
          user id
        </th>
        <th>
          user number</th>

        <th className='px-5' >Meal Plan</th>
        <th className='px-5' >Restaurant Name</th>
        <th className='px-5' >Active Status</th>
     
        <th className='px-5'>start date</th>
        <th className='px-5'>end date</th>
        <th className='px-5'>Subscription type</th>
        <th className='px-5'>Pause Status</th>

        <th className='px-5'>pause start date</th>
        <th className='px-5'>pause end date</th>

        <th className='px-5'>price</th>




      </tr>
      </thead>
      <tbody>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center '>{data.userid}</td>
              <td className='text-center hover:text-blue-900 hover:cursor-pointer' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>

              <td className='text-center'>{data.mealPLanName}</td>
              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/restaurant/${data.restaurantid}`)}}>{data.restaurantName}</td>

              <td className='text-center'>{data.isActive ? "Active":"Not Active"}</td>
             
           
              <td className='text-center'>{data.startdate}</td>
              <td className='text-center'>{data.enddate}</td>
              <td className='text-center'>{returnmealplantype(data.mealplantype)}</td>

              <td className='text-center'>{data.ispaused ? "tue":"false"}</td>
              <td className='text-center'>{(data.pause_start_date===null )? "-":`${data.pause_start_date}`} </td>
              <td className='text-center'>{(data.pause_end_date===null )? "-":`${data.pause_end_date}`} </td>

              <td className='text-center'>{data.price}</td>

            </tr>
          ))
        }
        </tbody>
     </table>
      

    </div>
    </div>  )
}

export default ActiveSubscriptions