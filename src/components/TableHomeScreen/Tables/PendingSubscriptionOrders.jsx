import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';

const PendingSubscriptionOrders = ({route}) => {
  const SUBSCRIPTION_STATUSES = [
  "ordered",
  "delivered",
  "cancelled",
  "Refunded",
  "Rider is assigned",
  "on the way",
  "payment_initiated",
  "payment_cancelled"
];
const [page, setPage] = useState(0);
const [size] = useState(20);
const [loading, setLoading] = useState(false);

const [totalPages, setTotalPages] = useState(0);
const [statusMap, setStatusMap] = useState({});


  const navigate=useNavigate();
    const [data,SetData]=useState([])
     const [search,Setsearch]=useState("")

useEffect(() => {
  fetchOrders();
}, [page, search]);

const fetchOrders = async () => {
  try {
        setLoading(true);

   const response = await apiClient.get(
  `/pendingSubscriptionorders?page=${page}&size=${size}&search=${search}`
);

    SetData(response.data.content);
    setTotalPages(response.data.totalPages);

    const map = {};

    response.data.content.forEach((o) => {
      map[o.id] = o.status;
    });

    setStatusMap(map);
  } catch (e) {
    console.error(e);
  }finally {
    setLoading(false);
  }
};
const handleStatusChange = (orderId, newStatus) => {
  setStatusMap((prev) => ({
    ...prev,
    [orderId]: newStatus,
  }));
};

const handleSaveStatus = async (orderId) => {
  const newStatus = statusMap[orderId];

  try {
    await apiClient.put(
      `/updateSubscriptionOrderStatus/${orderId}/${newStatus}`
    );

    // update table data locally
    SetData((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  } catch (e) {
    console.error(e);
  }
};

  const filteredData = data.filter((el) => {
    if (search.trim() === "") {
      return true; 
    }
    return (
      el.name?.toLowerCase().includes(search.toLowerCase()) || "-",
      el.number?.toString().includes(search) || "-",
      el.email?.toLowerCase().includes(search.toLowerCase()) || "-"
    );
  });
    const handlechange=(e)=>{
        const value=e.target.value;
        Setsearch(value);
        console.log(value)
    }
  return (
   <div>
        <input className='w-full md:w-1/3 border-2 px-2' placeholder='search number here' onChange={handlechange}  value={search}/>

     <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain  h-96">
    {loading ? (
<div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10">
      Loading...
    </div>
) : ( <table className='border-4 border-gray-300 mt-8 min-w-max'>
  <thead className="bg-gray-100">
    <tr>
      <th className='px-5 md:px-5 py-2 whitespace-nowrap'>SubscriptionOrder Id</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Public Id</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">customer Number</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">customer Name</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Meal Name</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">subscription  Order Instruction</th>
            <th className='px-5 py-2 whitespace-nowrap '>OTP</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Restaurant Name</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Order Status</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Start Time</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">End Time</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Order Date</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Subscription Price</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">Meal Plan</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">street</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">city</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">latitude</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">longitude</th>
      <th className="px-5 py-2 whitespace-nowrap">Rider name</th>
          <th className="px-5 py-2 whitespace-nowrap">Rider number</th>

          <th className="px-5 py-2 whitespace-nowrap">Created At</th>
          <th className="px-5 py-2 whitespace-nowrap">Updated At</th>

    </tr>
  </thead>
  <tbody>
{data.map((data, index) => (      <tr key={index} className='border border-gray-300 hover:bg-gray-50'>
        <td className='text-center whitespace-nowrap'>{data.id}</td>
        <td className='text-center px-2 whitespace-nowrap'>{data.publicId}</td>
        <td 
          className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline'
          onClick={() => navigate(`/userDetails/${data.number}`)}
        >
          {data.number}
        </td>
        <td className='text-center whitespace-nowrap'>{data.userdetails?.name?data.userdetails?.name:"-"}</td>
        <td className='text-center whitespace-nowrap'>{data.mealName}</td>
        <td className='text-center whitespace-nowrap'>{data.subscriptionOrderInstruction?data.subscriptionOrderInstruction:"no data"}</td>
        <td className='text-center whitespace-nowrap'>{data.otp}</td>

        <td 
          className='text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline'
          onClick={() => navigate(`/restaurant/${data.restaurantid}`)}
        >
          {data.restaurantName}
        </td>
<td className="text-center whitespace-nowrap">
  <div className="flex items-center justify-center gap-2">
    <select
      className="border rounded px-2 py-1"
      value={statusMap[data.id] ?? data.status}
      onChange={(e) =>
        handleStatusChange(data.id, e.target.value)
      }
    >
      {SUBSCRIPTION_STATUSES.map((status) => (
        <option key={status} value={status}>
          {status.replace(/_/g, " ").toUpperCase()}
        </option>
      ))}
    </select>

    {statusMap[data.id] !== data.status && (
      <button
        onClick={() => handleSaveStatus(data.id)}
        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
      >
        Save
      </button>
    )}
  </div>
</td>
        <td className='text-center whitespace-nowrap'>{data.startTime}</td>
        <td className='text-center whitespace-nowrap'>{data.endTime}</td>
        <td className='text-center whitespace-nowrap'>{data.orderdate}</td>
        <td className='text-center whitespace-nowrap'>{data.mealplanprice}</td>
        <td className='text-center whitespace-nowrap'>{data.mealplanname}</td>
       <td className='text-center whitespace-nowrap'>{data.city}</td>
        <td className='text-center whitespace-nowrap '>{data.street}</td>
        <td className='text-center  whitespace-nowrap px-2'>{data.latitude}</td>
        <td className='text-center  whitespace-nowrap px-2'>{data.longitude}</td>
        <td className="text-center whitespace-nowrap">{data.riderDetails?.name?data.riderDetails.name:"-"}</td>
            <td className="text-center whitespace-nowrap">{data.riderDetails?.number?data.riderDetails.number:"-"}</td>
            <td className="text-center whitespace-nowrap">{data.createdAt?data.createdAt.split("T")[1].split(".")[0]:"-"}</td>
            <td className="text-center whitespace-nowrap">{data.updatedAt?data.updatedAt.split("T")[1].split(".")[0]:"-"}</td>
      </tr>
    ))}
  </tbody>
</table>
)}

 </div>
 <div className="flex justify-center items-center gap-4 mt-4">

  <button
    disabled={page === 0}
    onClick={() => setPage((prev) => prev - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>

  <button
    disabled={page >= totalPages - 1}
    onClick={() => setPage((prev) => prev + 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
   </div>
  )
}

export default PendingSubscriptionOrders