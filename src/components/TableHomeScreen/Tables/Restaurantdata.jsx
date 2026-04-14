import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient'
import { useNavigate } from 'react-router-dom'

const Restaurantdata = (route) => {
  const navigate=useNavigate()
   const [data,Setdata]=useState([])

   const [id,SetId]=useState([])
   const [isedit,SetIsEdit]=useState(false)
     const [value, setValue] = useState("");
const updateDistance=async(id,value)=>{


  try {
    console.log(id,value)
    const response=await apiClient.put(
      `/restaurant/updateMaximumDistance/${id}/${value}`
    );

    console.log(response)
   if(response.status==204){
    console.log("hi")
 try{
          const data=await apiClient.get( `${route.route}`);
          console.log(data.data);
          Setdata(data.data);
          
        }
        catch(e){
          console.error(e); 
        }}
        } catch (e) {
    console.error(e);
  }
SetIsEdit(false)
setValue("")
}

  useEffect(()=>{
      const tableData=async()=>{
        try{
          const data=await apiClient.get( `${route.route}`);
          console.log(data.data);
          Setdata(data.data);
          
        }
        catch(e){
          console.error(e); 
        }
  
      }
tableData()    },[])
    return (
    <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain max-h-96  pb-4">

<table className='border-4   border-gray-300 mt-8'>
      <tr>
        <th className='px-5'>
          Restaurant Id
        </th>
        <th className='px-5'>Restaurant Name</th>
        <th className='px-5'>Maximum distance</th>
      
        
      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className=' items-center justify-center border border-gray-300 hover:text-blue-900 hover:cursor-pointer'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center' onClick={()=>navigate(`/restaurant/${data.id}`)}>{data.name}</td>
              <td className='text-center' >{data.maximumdistance} <button className='px-2 ml-10 border-2 ' onClick={()=>{SetId(data.id);SetIsEdit(!isedit)}}>edit</button></td>
              
               {
  id === data.id && isedit ? (
    <>
      <input
        type="number"
        placeholder="Enter number"
        inputMode="numeric"
        min="0" 
        value={value}
        onChange={(e)=>setValue(e.target.value)}
      />
      <button className='px-2 border-2 bg-green-700 text-white' onClick={()=>updateDistance(data.id,value)}>ok</button>
    </>
  ) : null
}

              
              
            </tr>
          ))
        }
     </table>
    </div>
  )
}

export default Restaurantdata