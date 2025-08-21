import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';

const AllUsers = () => {
 const [data, setData] = useState([]);

  useEffect(() => {
    const tableData = async () => {
      try {
        const response = await apiClient.get(
          "/AllUsers"
        );
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    tableData();
  }, []);

  return (
    <div className=" overflow-y-auto max-h-96 w-full pb-4">
<table className='border-4    border-gray-300 mt-8 w-full'>
      <tr>
        <th className='px-5'>
          Customer Id
        </th>

        <th className='px-5' >name</th>
        <th className='px-18'>namber</th>
        <th className='px-5'>email</th>
       

      </tr>

        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.name}</td>
              
              
              <td className='text-center'>{data.number}</td>
                              <td className='text-center'>{data.email}</td>

              </tr>
          ))
        }
     </table> </div>  );
};

export default AllUsers;