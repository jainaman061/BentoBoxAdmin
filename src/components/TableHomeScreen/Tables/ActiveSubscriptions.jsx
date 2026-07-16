import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';

const ActiveSubscriptions = (route) => {
  const isAdmin = localStorage.getItem("bentoAdminDetails") == 4 ? true : false;

  const [editingId, setEditingId] = useState(null);
  
const [editDates, setEditDates] = useState({
  startdate: "",
  enddate: "",
  expirydate: "",
  noteByAdmin: "",
  maxmealcount: "",
});
const handleEdit = (row) => {
  setEditingId(row.id);
  setEditDates({
    startdate: row.startdate,
    enddate: row.enddate,
    expirydate: row.expirydate,
    noteByAdmin: row.noteByAdmin || "",
    maxmealcount: row.maxmealcount || "",

  });
};

const handleDateChange = (e) => {
  const { name, value } = e.target;
  setEditDates((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleSave = async (subscriptionId) => {
  try {
    const payload = {
      startdate: editDates.startdate,
      enddate: editDates.enddate,
      expirydate: editDates.expirydate,
      noteByAdmin: editDates.noteByAdmin, 
      maxmealcount: editDates.maxmealcount,
    };

    console.log(payload)
    const response=await apiClient.put(
      `/subscription/update-dates/${subscriptionId}`,
      payload
    );
console.log(response.data)
    setData((prev) =>
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

  const navigate = useNavigate()
      const [data, setData] = useState([]);
      const [count,setCount] = useState([]);
      console.log(route);
       const [search,Setsearch]=useState("")
      
    
      useEffect(() => {
        const tableData = async () => {
          try {
            const response = await apiClient.get(
              `${route.route}`
            );
            const res = await apiClient.get("/subscriptions/user-count");
setCount(res.data);
            setData(response.data);
            console.log(res.data)
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

      <div className='w-screen   overflow-x-auto  overflow-y-auto overscroll-x-contain h-96  '>
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
        <th className='px-5' >Meal name</th>
        <th className='px-5' >Meal Plan Type</th>
        <th className='px-5' >Start Time</th>
        <th className='px-5' >End Time</th>
        <th className='px-5' >Address</th>

        <th className='px-5' >Restaurant Name</th>
        <th className='px-5' >Active Status</th>
     
        <th className='px-5'>start date</th>
        <th className='px-5'>end date</th>
        <th className='px-5'>Subscription Count</th>
        <th className='px-5'>count</th>
        <th className='px-5'>max count</th>
        <th className='px-5'>Promo Applied</th>
        <th className='px-5'>Subscription type</th>
        <th className='px-5'>Subscription status</th>
        <th className='px-5'>Pause Status</th>

        <th className='px-5'>pause start date</th>
        <th className='px-5'>pause end date</th>
<th className='px-5'>Admin Note</th>
 <th className="px-5">Non Discounted Price</th>
      <th className="px-5">Price</th>
      <th className="px-5">Coins</th>
      <th className="px-5">Discount Value</th>
        <th className='px-5'>expirydate</th>
          <th className='px-5'>name</th>
        <th className='px-5'>number</th>

              {(isAdmin) && (
                <th className="px-5">Action</th>
              )}



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
              <td className='text-center'>{data.mealplandetails.name}</td>
              <td className='text-center'>{data.mealplantype==1?"Lunch":"Dinner"}</td>
             
              <td className='text-center'>{data.mealplantype==1?data.lunchstarttime:data.dinnerstarttime}</td>
              <td className='text-center'>{data.mealplantype==1?data.lunchendtime:data.dinnerendtime}</td>
                            <td className='text-center'>{data.street} {data.city} {data.state} {data.postalCode}</td>

              <td className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{navigate(`/restaurant/${data.restaurantid}`)}}>{data.restaurantName}</td>

              <td className='text-center'>{data.isActive ? "Active":"Not Active"}</td>
             
           
           <td className="text-center">
  {editingId === data.id ? (
    <input
      type="date"
      name="startdate"
      value={editDates.startdate}
      onChange={handleDateChange}
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
      onChange={handleDateChange}
      className="border px-1"
    />
  ) : (
    data.enddate
  )}
</td>
 <td className='text-center'>{count[data.userid]?count[data.userid]:"null"}</td>
 <td className='text-center'>{data.mealcount}</td>
  <td className="text-center">
  {editingId === data.id ? (
    <input
      type="number"
      name="maxmealcount"
      value={editDates.maxmealcount}
      onChange={handleDateChange}
      className="border px-1 w-16 text-center mx-auto block"
    />
  ) : (
    data.maxmealcount
  )}
</td>
            <td className='text-center'>{data.promoApplicable?"Applied":"Not Applied"}</td>
              <td className='text-center'>{returnmealplantype(data.mealplantype)}</td>
              <td className='text-center'>{data.subscriptionStatus }</td>
              <td className='text-center'>{data.ispaused ? "tue":"false"}</td>
              <td className='text-center'>{(data.pause_start_date===null )? "-":`${data.pause_start_date}`} </td>
              <td className='text-center'>{(data.pause_end_date===null )? "-":`${data.pause_end_date}`} </td>
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

<td className="text-center">{data.nonDiscountedPrice}</td>
        <td className="text-center">{data.price}</td>
        <td className="text-center">{data.coinsUsed}</td>
        <td className="text-center">{data.discountvalue}</td>    
<td className="text-center">
  {editingId === data.id ? (
    <input
      type="date"
      name="expirydate"
      value={editDates.expirydate}
      onChange={handleDateChange}
      className="border px-1"
    />
  ) : (
    data.expirydate
  )}
</td>
              <td className='text-center'>{data.userdetails.name}</td>
              <td className='text-center'>{data.userdetails.number}</td>
<td className="text-center">
  {isAdmin && (
  editingId === data.id ? (
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
  )
)}
</td>

            </tr>
          ))
        }
        </tbody>
     </table>
      

    </div>
    </div>  )
}

export default ActiveSubscriptions