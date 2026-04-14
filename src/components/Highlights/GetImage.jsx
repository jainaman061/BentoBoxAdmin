import React, { useEffect, useState } from 'react';
import apiClient from '../../utils/apiclient';

const GetImage = ({ data }) => {
  console.log(data);

  const [tabledata,SetData] = useState([]);
  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/highlight/${imageId}/${data}`);

      // 🔥 remove from UI
      SetData((prev) => prev.filter((item) => item.id !== imageId));

      alert("Deleted successfully");

    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await apiClient.get(`/highlight/${data}`)
        SetData(response.data);
      }
      catch (err) {
        console.error("Something went wrong",err);
      }
    }
    fetchData();
  },[data])

  return (
    <table className='border-4 border-blue-700 mt-8 w-full'>
      
      <thead>
        <tr>
          <th className='px-5'>ID</th>
          <th className='px-5'>Image</th>
          <th className='px-5'>Image Name</th>
          <th className='px-5'>Type</th>
        </tr>
      </thead>

      <tbody>
        {tabledata?.map((item, index) => (
          <tr key={index} className='border border-sky-600 text-center'>
            
            <td className='px-2'>{item.id}</td>

            {/* 🔥 IMAGE CLICKABLE */}
            <td className='px-2'>
              <a
                href={item.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Image
              </a>
            </td>

            <td className='px-2'>{item.imageName}</td>
            <td className='px-2'>{item.imageType}</td>
<td>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default GetImage;