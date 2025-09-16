import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';
import ReactSearchBox from "react-search-box";

const AllUsers = (route) => {
 const [data, setData] = useState([]);
 const [search,Setsearch]=useState("");
 const [isloading,SetIsLoading]=useState(true)
const navigate = useNavigate()
  useEffect(() => {
    const tableData = async () => {
      try {
        const response = await apiClient.get(
 `${route.route}`        );
        setData(response.data);
        SetIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    tableData();
  }, [route.route]);
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
     <div className=" overflow-y-auto max-h-96 w-full pb-4">
<table className='border-4    border-gray-300 mt-8 w-full'>
  <thead>
      <tr>
        <th className='px-5'>
          Customer Id
        </th>

        <th className='px-5' >name</th>
        <th className='px-18'>namber</th>
        <th className='px-5'>email</th>
       

      </tr>
      </thead>
      <tbody>
        {isloading?"Loading...":(
          filteredData.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.name}</td>
              
              
              <td className='text-center  hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>
                              <td className='text-center'>{data.email}</td>

              </tr>
          ))
  )}
        </tbody>
     </table> </div> 
   </div> );
};

export default AllUsers;