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
 const [editData, setEditData] = useState({
  distance: "",
  isRiderFromBentoBox: false,
  isPackagingFromBentoBox: false,
});
const updateDistance = async (
  id,
  distance,
  isRiderFromBentoBox,
  isPackagingFromBentoBox
) => {
  try {
    const response = await apiClient.put(
      `/restaurant/updateMaximumDistance/${id}/${distance}/${isRiderFromBentoBox}/${isPackagingFromBentoBox}`
    );

    if (response.status === 200 || response.status === 204) {
      const result = await apiClient.get(`${route.route}`);
      Setdata(result.data);
    }
  } catch (e) {
    console.error(e);
  }

  SetIsEdit(false);
};
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
        <th className='px-5'>packagingFromBentoBox</th>
        <th className='px-5'>riderFromBentoBox</th>
      
        
      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className=' items-center justify-center border border-gray-300 hover:text-blue-900 hover:cursor-pointer'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center' onClick={()=>navigate(`/restaurant/${data.id}`)}>{data.name}</td>
              <td className='text-center' >{data.maximumdistance} </td>
              <td className='text-center'>{data.packagingFromBentoBox?"Yes":"No"}</td>
              <td className='text-center'>{data.riderFromBentoBox?"Yes":"No"}</td>
<button
  className="px-2 ml-10 border-2"
  onClick={() => {
    SetId(data.id);
    SetIsEdit(!isedit);
    setEditData({
      distance: data.maximumdistance,
      isRiderFromBentoBox: data.riderFromBentoBox,
      isPackagingFromBentoBox: data.packagingFromBentoBox,
    });
  }}
>
  edit
</button>              
{id === data.id && isedit && (
  <>
    <input
      type="number"
      value={editData.distance}
      onChange={(e) =>
        setEditData({
          ...editData,
          distance: e.target.value,
        })
      }
      className="border ml-2"
    />

    <label className="ml-2">
      <input
        type="checkbox"
        checked={editData.isRiderFromBentoBox}
        onChange={(e) =>
          setEditData({
            ...editData,
            isRiderFromBentoBox: e.target.checked,
          })
        }
      />
      Rider
    </label>

    <label className="ml-2">
      <input
        type="checkbox"
        checked={editData.isPackagingFromBentoBox}
        onChange={(e) =>
          setEditData({
            ...editData,
            isPackagingFromBentoBox: e.target.checked,
          })
        }
      />
      Packaging
    </label>

    <button
      className="px-2 border-2 bg-green-700 text-white ml-2"
      onClick={() =>
        updateDistance(
          data.id,
          editData.distance,
          editData.isRiderFromBentoBox,
          editData.isPackagingFromBentoBox
        )
      }
    >
      ok
    </button>
  </>
)}

              
              
            </tr>
          ))
        }
     </table>
    </div>
  )
}

export default Restaurantdata