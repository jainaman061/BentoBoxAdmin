import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient'
import { useNavigate } from 'react-router-dom'

const PendingOnetimeOrders = (route) => {
  const [dateMap, setDateMap] = useState({});
  const [refundMap, setRefundMap] = useState({});
  const ORDER_STATUSES = [
  "ordered",
  "delivered",
  "cancelled",
  "Refunded",
  "Rider is assigned",
  "on the way",
  "payment_initiated",
  "payment_cancelled",
  "delivered_Refunded",

];
const [data, Setdata] = useState([]);
const [page, setPage] = useState(0);
const [size] = useState(20);
const [totalPages, setTotalPages] = useState(0);
const [loading, setLoading] = useState(false);
const handleRefundChange = (orderId, field, value) => {
  setRefundMap((prev) => ({
    ...prev,
    [orderId]: {
      ...prev[orderId],
      [field]: value,
    },
  }));
};
  console.log(route.route);
   const [search,Setsearch]=useState("")
const [statusMap, setStatusMap] = useState({});
useEffect(() => {
  fetchOrders();
}, [page,search]);

const fetchOrders = async () => {
  try {
    setLoading(true);

    const res = await apiClient.get(
  `${route.route}?page=${page}&size=${size}&search=${search}`
);

    Setdata(res.data.content);
    setTotalPages(res.data.totalPages);

    const status = {};
    const dates = {};
    const refunds = {};

    res.data.content.forEach((o) => {
      status[o.id] = o.orderStatus;

      dates[o.id] = o.orderdate;

      refunds[o.id] = {
        coins: o.refundedCoins || 0,
        cash: o.refundedCash || 0,
      };
    });

    setStatusMap(status);
    setDateMap(dates);
    setRefundMap(refunds);
  } catch (e) {
    console.error(e);
  } finally {
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
    const body =
      newStatus === "Refunded" || newStatus === "delivered_Refunded"
        ? {
            coins: Number(refundMap[orderId]?.coins || 0),
            cash: Number(refundMap[orderId]?.cash || 0),
          }
        : {};

    await apiClient.put(
      `/updateOrderStatus/${orderId}/${newStatus}`,
      body
    );

    Setdata((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      )
    );
  } catch (e) {
    console.error(e);
  }
};


  const navigate=useNavigate()
    
      
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
  return ( <div className="p-4">
  <input
    className="w-full sm:w-1/2  border-2  py-1 rounded mb-4"
    placeholder="Search number here"
    onChange={handlechange}
    value={search}
  />

    <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain max-h-96  pb-4">
     {loading ? (
<div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10">
      Loading...
    </div>
) : (
<table className="border-4 border-gray-300 mt-8 w-full">
      <thead>
        <tr>
          <th className="px-5 py-2">Order Id</th>
                <th className='px-5 py-2'>Public Id</th>

          <th className="px-5 ">Chef Id</th>
          <th className="px-5 ">Items</th>
          <th className="px-5 ">startTime</th>
          <th className="px-5">endTime</th>
          <th className="px-18 py-2">Order Items <br/><span className='p-2'> name </span><span className='p-2'> count </span><span className='p-2'> price </span><span className='p-2'> description </span></th>

      <th className="px-5">Delivery Instruction</th>

          <th className="px-18 py-2">OTP</th>
      <th className="px-5">Non Discounted Price</th>
      <th className="px-5">Price</th>
      <th className="px-5">Coins</th>
      <th className="px-5">Discount Value</th>
          <th className="px-5 py-2">Order Status</th>
          <th className="px-5 py-2">Customer Number</th>
          <th className="px-5 py-2">Customer Name</th>
          <th className="px-5 py-2">Restaurant Name</th>
          <th className="px-5 py-2">Order Date</th>
                <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">street</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">city</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">latitude</th>
      <th className="px-2 md:px-5 py-2 whitespace-nowrap text-xs md:text-sm">longitude</th>
          <th className="px-5 py-2">Rider name</th>
          <th className="px-5 py-2">Rider number</th>
<th className="px-5 py-2 whitespace-nowrap">Created At</th>
          <th className="px-5 py-2 whitespace-nowrap">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr
            key={index}
            className="items-center justify-center border border-gray-300"
          >
            <td className="text-center">{data.id}</td>
                    <td className='text-center px-2'>{data.publicId}</td>

            <td className="text-center">{data.chefid}</td>
           <td className="text-center">
          <div className="flex flex-col items-center">
            {data.orderItems.map((orderItems, idx) => (
              <div key={idx} className="flex gap-2">
                <span>{orderItems.name}</span>x
                <span>{orderItems.count}</span>=
                <span>{orderItems.price}</span>
              </div>
            ))}
          </div>
        </td>
            <td className="text-center">{data.startTime}</td>
            <td className="text-center">{data.endTime}</td>
             <td  className='flex flex-col justify-center text-center items-center'>{data.orderItems.map((orderItems,idx)=>(
                <tr key={idx} className='flex '><td className='w-20'>{orderItems.name}</td>
                <td className='w-20'>{orderItems.count}</td>
                <td className='w-16'>{orderItems.price}</td>
                <td className='w-16'>{orderItems.description?orderItems.description:"no data"}</td></tr>
              
              ))}</td>
                    <td className="text-center">{data.deliveryInstruction?data.deliveryInstruction:"no data"}</td>

            <td className="text-center">{data.otp}</td>
<td className="text-center">{data.nonDiscountedPrice}</td>
        <td className="text-center">{data.price}</td>
        <td className="text-center">{data.coinsused}</td>
        <td className="text-center">{data.discountvalue}</td>              <td className="text-center">
  <div className="flex flex-col items-center gap-2">
  <div className="flex items-center gap-2">
    <select
      className="border rounded px-2 py-1"
      value={statusMap[data.id] ?? data.orderStatus}
      onChange={(e) => handleStatusChange(data.id, e.target.value)}
    >
      {ORDER_STATUSES.map((status) => (
        <option key={status} value={status}>
          {status.replace(/_/g, " ").toUpperCase()}
        </option>
      ))}
    </select>

    {statusMap[data.id] !== data.orderStatus && (
      <button
        onClick={() => handleSaveStatus(data.id)}
        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
      >
        Save
      </button>
    )}
  </div>

  {/* ✅ SHOW ONLY FOR REFUND STATUSES */}
  {(statusMap[data.id] === "Refunded" ||
    statusMap[data.id] === "delivered_Refunded") && (
    <div className="flex gap-2">
      <input
        type="number"
        placeholder="Coins"
        className="border px-2 py-1 rounded w-20"
        value={refundMap[data.id]?.coins || ""}
        onChange={(e) =>
          handleRefundChange(data.id, "coins", e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Cash"
        className="border px-2 py-1 rounded w-20"
        value={refundMap[data.id]?.cash || ""}
        onChange={(e) =>
          handleRefundChange(data.id, "cash", e.target.value)
        }
      />
    </div>
  )}
</div>
</td>

            <td
              className="text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline"
              onClick={() => navigate(`/userDetails/${data.number}`)}
            >
              {data.number}
            </td>
                    <td className='text-center whitespace-nowrap'>{data.userdetails?.name}</td>

            <td
              className="text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline"
              onClick={() => navigate(`/restaurant/${data.restaurantid}`)}
            >
              {data.restaurantName}
            </td>
<td className="text-center">
  <div className="flex items-center justify-center gap-2">
    
   <input
  type="date"
  className="border px-2 py-1 rounded"
  value={
    dateMap[data.id]
      ? new Date(dateMap[data.id]).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) => {
    setDateMap((prev) => ({
      ...prev,
      [data.id]: e.target.value,
    }));
  }}
/>


    <button
      onClick={async () => {
  try {
    const updatedDate = dateMap[data.id];

    await apiClient.put(
      `/updateOrderDate/${data.id}/${updatedDate}`
    );

    // update UI also
    Setdata((prev) =>
      prev.map((order) =>
        order.id === data.id
          ? { ...order, orderdate: updatedDate }
          : order
      )
    );

    alert("Order date updated successfully");
  } catch (e) {
    console.error(e);
  }
}}
      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
    >
      Save
    </button>

  </div>
</td>
                <td className='text-center whitespace-nowrap'>{data.city}</td>
        <td className='text-center whitespace-nowrap '>{data.street}</td>
        <td className='text-center  whitespace-nowrap px-2'>{data.latitude}</td>
        <td className='text-center  whitespace-nowrap px-2'>{data.longitude}</td>
            <td className="text-center">{data.riderDetails.name}</td>
            <td className="text-center">{data.riderDetails.number}</td>
                  <td className="text-center whitespace-nowrap">{data.createdAt?data.createdAt.split("T")[1].split(".")[0]:"-"}</td>
            <td className="text-center whitespace-nowrap">{data.updatedAt?data.updatedAt.split("T")[1].split(".")[0]:"-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
)}
    <div className="flex justify-center gap-4 mt-4">

  <button
    disabled={page === 0 || loading}
    onClick={() => setPage((prev) => prev - 1)}
    className="px-4 py-2 bg-gray-300 rounded"
  >
    Previous
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>

  <button
    disabled={page >= totalPages - 1 || loading}
    onClick={() => setPage((prev) => prev + 1)}
    className="px-4 py-2 bg-gray-300 rounded"
  >
    Next
  </button>

</div>
  </div>
</div>
)
}

export default PendingOnetimeOrders