import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';

const CompletedSubscriptons = (route) => {
   const [editingId, setEditingId] = useState(null);
  const [editDates, setEditDates] = useState({
    startdate: "",
    enddate: "",
    expirydate: "",
    noteByAdmin: "",
  });
  const handleDateChange = (e) => {
  const { name, value } = e.target;
  setEditDates((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const handleEdit = (row) => {
  setEditingId(row.id);
  setEditDates({
    startdate: row.startdate,
    enddate: row.enddate,
    expirydate: row.expirydate||"",
    noteByAdmin: row.noteByAdmin || "",
  });
};
const handleSave = async (subscriptionId) => {
  try {
    const payload = {
      startdate: editDates.startdate,
      enddate: editDates.enddate,
      expirydate: editDates.expirydate,
      noteByAdmin: editDates.noteByAdmin, 
    };

    // console.log(payload)
    const response=await apiClient.put(
      `/subscription/update-dates/${subscriptionId}`,
      payload
    );
// console.log(response.data)
    setData2((prev) =>
      prev.map((item) =>
        item.id === subscriptionId
          ? { ...item, ...payload }
          : item
      )
    );

    setEditingId(null);
  } catch (e) {
    console.error(e);
    alert("Failed to update dates");
  }
};
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const navigate = useNavigate()
      useEffect(() => {
        const tableData = async () => {
          try {
            const historyresponse = await apiClient.get(
 `${route.route}`            );
 const response = await apiClient.get(
 `CompletedSubscription`            );
    console.log("response.data",response.data);
            setData(historyresponse.data);
            setData2(response.data);
            // console.log(historyresponse.data);
            
          } catch (e) {
            console.error(e);
          }
        };
        tableData();
      }, []);
  return (
    <div className='w-screen   overflow-x-auto overscroll-x-contain overflow-y-auto h-96  '>
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
        <th className='px-5' >Meal Plan  Name</th>

        <th className='px-5' >Meal Plan Type</th>
        <th className='px-5' >Restaurant Name</th>
        <th className='px-5' >Active Status</th>
     
        <th className='px-5'>start date</th>
        <th className='px-5'>end date</th>
        <th className='px-5'>count</th>
        <th className='px-5'>max count</th>

        <th className='px-5'>Pause Status</th>
        <th className='px-5'>Cancellation Date</th>
        <th className='px-5'>expiredOn Date</th>
        <th className='px-5'>completiondate Date</th>

     

 <th className="px-5">Non Discounted Price</th>
      <th className="px-5">Price</th>
      <th className="px-5">Coins</th>
      <th className="px-5">Discount Value</th>
                <th className='px-5'>refund amount</th>
                <th className='px-5'>admin notes</th>
               
          
<th className="px-5">Action</th>




      </tr>
      </thead>
      <tbody>
        {
          data2.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
               <td className='text-center '>{data.userid}</td>
              <td className='text-center hover:text-blue-900 hover:cursor-pointer' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>
              <td className='text-center'>{data.mealPLanName}</td>
                            <td className='text-center'>{data.mealplandetails.name}</td>

                            <td className='text-center'>{data.mealplantype==1?"Lunch":"Dinner"}</td>

              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/restaurant/${data.restaurantid}`)}}>{data.restaurantName}</td>

              <td className='text-center'>{data.isActive ? "Active":"Not Active"}</td>
             
           
           <td className="text-center">
  {editingId === data.id ? (
    <input
      type="date"
      name="startdate"
      value={editDates.startdate}
      onChange={(e) =>
        setEditDates({ ...editDates, startdate: e.target.value })
      }
      className="border px-1"
    />
  ) : (
    data.startdate
  )}
</td>

<td className="text-center">
  {editingId === data.id ? (
    <input
      type="date"
      name="enddate"
      value={editDates.enddate}
      onChange={(e) =>
        setEditDates({ ...editDates, enddate: e.target.value })
      }
      className="border px-1"
    />
  ) : (
    data.enddate
  )}
</td>
              <td className='text-center'>{data.mealcount}</td>
              <td className='text-center'>{data.maxmealcount}</td>
              <td className='text-center'>{data.ispaused==null?"Yes" : "No"}</td>
        {console.log(data.cancellationdate)}
              
              <td className='text-center'>{data.cancellationdate==null?"-":data.cancellationdate}</td>
              <td className='text-center'>{data.expiredOn==null?"-":data.expiredOn}</td>
              <td className='text-center'>{data.completiondate==null?"-":data.completiondate}</td>

<td className="text-center">{data.nonDiscountedPrice}</td>
        <td className="text-center">{data.price}</td>
        <td className="text-center">{data.coinsused}</td>
        <td className="text-center">{data.discountvalue}</td>              <td className='text-center'>{data.refundAmount===null?"-":data.refundAmount}</td>
        <td className="text-center">
  {editingId === data.id ? (
    <textarea
      name="noteByAdmin"
      value={editDates.noteByAdmin}
      onChange={handleDateChange}
      className="border px-1 w-40"
    />
  ) : (
    data.noteByAdmin || "-"
  )}
</td>
<td className="text-center">
  {editingId === data.id ? (
    <>
      <button
        className="text-green-600 mr-2"
        onClick={() => handleSave(data.id)}
      >
        Save
      </button>
      <button
        className="text-red-600"
        onClick={() => setEditingId(null)}
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      className="text-blue-600 underline"
      onClick={() => handleEdit(data)}
    >
      Edit
    </button>
  )}
</td>
            </tr>
          ))
        
        }
         {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-gray-300'>
              <td className='text-center'>{data.id}</td>
               <td className='text-center '>{data.userid}</td>
              <td className='text-center hover:text-blue-900 hover:cursor-pointer' onClick={()=>{navigate(`/userDetails/${data.number}`)}}>{data.number}</td>
              <td className='text-center'>{data.mealPLanName}</td>
                                   <td className='text-center'>{data.mealPLanName}</td>
                   

                            <td className='text-center'>{data.mealplantype==1?"Lunch":"Dinner"}</td>

              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/restaurant/${data.restaurantid}`)}}>{data.restaurantName}</td>

              <td className='text-center'>{data.isActive ? "Active":"Not Active"}</td>
             
           
              <td className='text-center'>{data.startdate}</td>
              <td className='text-center'>{data.enddate}</td>
              <td className='text-center'>{data.mealcount}</td>
              <td className='text-center'>{data.maxmealcount}</td>
                           <td className='text-center'>{data.cancellationDate==null?"No":"Yes"}</td>
                                           <td className='text-center'>{data.cancellationDate?data.cancellationDate:"-"}</td>
                          
                                           <td className='text-center'>{data.cancellationDate?data.cancellationDate:"-"}</td>
                          
                                           <td className='text-center'>{data.cancellationDate?data.cancellationDate:"-"}</td>

<td className="text-center">{data.nonDiscountedPrice}</td>
        <td className="text-center">{data.price}</td>
        <td className="text-center">{data.coinsused}</td>
        <td className="text-center">{data.discountvalue}</td>              <td className='text-center'>{data.refundAmount===null?"-":data.refundAmount}</td>
<td className="text-center">

</td>
            </tr>
          ))
        
        }
        </tbody>
        </table>
        </div>
  )
}

export default CompletedSubscriptons