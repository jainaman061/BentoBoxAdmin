import React, { useState } from 'react'
import RestaurantPage from "../../Pages/RestaurantDetails/index"
import { useNavigate } from 'react-router-dom'
const Index = ({data}) => {
   const [search,Setsearch]=useState("");
  
    // console.log(data)
    const navigate=useNavigate();
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
   <div className="flex flex-col items-center">
  <input 
    className=" border-2 px-2 mt-4" 
    placeholder="Search number" 
    onChange={handlechange}  
    value={search}
  />

  <div className="overflow-y-auto max-h-96 w-full pb-4">
    <table className="border-4 border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="px-5">Restaurant Id</th>
          <th className="px-5">Restaurant Name</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((restaurant,index)=>(
          <tr 
            key={index} 
            className="border border-gray-300 hover:text-blue-900 hover:cursor-pointer"
          >
            <td className="text-center">{restaurant.id}</td>
            <td 
              className="text-center" 
              onClick={()=>navigate(`/restaurant/${restaurant.id}`)}
            >
              {restaurant.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
   )
}

export default Index
