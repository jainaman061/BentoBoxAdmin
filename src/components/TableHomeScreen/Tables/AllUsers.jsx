import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';
import ReactSearchBox from "react-search-box";

const AllUsers = (route) => {
  const [data, setData] = useState([]);
const [search, Setsearch] = useState("");
const [isloading, SetIsLoading] = useState(false);

const [page, setPage] = useState(0);
const [size] = useState(20);
const [totalPages, setTotalPages] = useState(0);
const navigate = useNavigate()
useEffect(() => {
  fetchUsers(search);
}, [route.route, page, search]);

const fetchUsers = async (number = "") => {
  try {
    SetIsLoading(true);

    const response = await apiClient.get(
      `${route.route}?page=${page}&size=${size}&search=${number}`
    );

    setData(response.data.content);
    setTotalPages(response.data.totalPages);
  } catch (e) {
    console.error(e);
  } finally {
    SetIsLoading(false);
  }
};
  const filteredData = Array.isArray(data)
  ? data.filter((el) => {
      if (search.trim() === "") return true;

      return (
        el.name?.toLowerCase().includes(search.toLowerCase()) ||
        el.number?.toString().includes(search) ||
        el.email?.toLowerCase().includes(search.toLowerCase())||
        el.id?.toString().includes(search)
      );
    })
  : [];
  console.log("API data", data);
console.log("Filtered data", filteredData);
 const handlechange = (e) => {
  const value = e.target.value;
  Setsearch(value);
};
  return (
   <div>
    <input className='w-1/3 border-2 px-2' placeholder='search number here' onChange={handlechange}  value={search}/>
     <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain max-h-96  pb-4">

  {isloading && (
    <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
      <div className="text-lg font-semibold">
        Loading...
      </div>
    </div>
  )}
<table className='border-4    border-gray-300 mt-8 w-full'>
  <thead>
      <tr>
        <th className='px-5'>
          Customer Id
        </th>

        <th className='px-5' >name</th>
        <th className='px-18'>number</th>
        <th className='px-5'>email</th>
        <th className='px-5'>city</th>
        <th className='px-5'>street</th>
        <th className='px-5'>latitude</th>
        <th className='px-5'>longitude</th>
       

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
                              <td className='text-center'>{data.city}</td>
                              <td className='text-center'>{data.street}</td>
                              <td className='text-center px-2'>{data.latitude}</td>
                              <td className='text-center px-2'>{data.longitude}</td>

              </tr>
          ))
  )}
        </tbody>
     </table> </div><div className="flex justify-center items-center gap-4 mt-4">

  <button
    disabled={page === 0 || isloading}
    onClick={() => setPage((prev) => prev - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>

  <button
    disabled={page >= totalPages - 1 || isloading}
    onClick={() => setPage((prev) => prev + 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>

</div> 
   </div> );
};

export default AllUsers;