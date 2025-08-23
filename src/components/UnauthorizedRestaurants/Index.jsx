import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../utils/apiclient';
const Index = ({data}) => {
     const [search,Setsearch]=useState("")

    const navigate=useNavigate();
    const approveRestaurant=async(id)=>{
            try{
                const response = await apiClient.post ("/setAuthorized",
                        {"id":id}
                    );

                navigate(0)
            }
            catch (err) {
        console.error("Something went wrong",err);
      }
        }
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

    <div>
           <table className='border-4   border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          Restaurant Id
        </th>
        <th className='px-5'>Restaurant Name</th>
        <th className='px-5'>number</th>
        <th className='px-5'>Approve</th>
        
        
      </tr>
        {
          filteredData.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600 hover:text-blue-900 hover:cursor-pointer'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center' >{data.restaurantname===null?"Not yet added":data.restaurantname}</td>
              <td className='text-center' >{data.number}</td>
              <td className='text-center' ><button className='bg-gray-400 border rounded-lg p-1' onClick={()=>{approveRestaurant(data.id)}}>approve</button></td>

              
            </tr>
          ))
        }
     </table>
    </div> </div>
  )
}

export default Index
