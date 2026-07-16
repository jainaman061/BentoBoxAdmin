import axios from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/apiclient";
import { data, useNavigate } from "react-router-dom";

const CompletedOneTimeOrders = (route) => {
  const [Data, setData] = useState([]);
const [page, setPage] = useState(0);
const [size] = useState(20);
const [totalPages, setTotalPages] = useState(0);
const [loading, setLoading] = useState(false);
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
  const navigate =useNavigate();
 const [search,Setsearch]=useState("")
const [statusMap, setStatusMap] = useState({});
const [refundMap, setRefundMap] = useState({});

  useEffect(() => {
  fetchOrders();
}, [page, search]);

const fetchOrders = async () => {
  try {
    setLoading(true);

    const response = await apiClient.get(
  `${route.route}?page=${page}&size=${size}&search=${search}`
);

    const pageData = response.data.content;

    setData(pageData);
    setTotalPages(response.data.totalPages);

    const map = {};
    pageData.forEach((o) => {
      map[o.id] = {
        coins: o.refundedCoins || 0,
        cash: o.refundedCash || 0,
      };
    });

    const statusInitMap = {};
    pageData.forEach((o) => {
      statusInitMap[o.id] = o.orderStatus;
    });

    setStatusMap(statusInitMap);
    console.log("statusInitMap Map:", statusInitMap);
    setRefundMap(map);

  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};
  const handleRefundChange = (orderId, field, value) => {
  setRefundMap((prev) => ({
    ...prev,
    [orderId]: {
      ...prev[orderId],
      [field]: value,
    },
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

    setData((prev) =>
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
const filteredData = Data.filter((el) => {
    if (search.trim() === "") {
      return true; 
    }
    return (
      el.name?.toLowerCase().includes(search.toLowerCase()) || 
      el.number?.toString().includes(search) ||
      el.email?.toLowerCase().includes(search.toLowerCase())
    );
  });
   const handleStatusChange = (orderId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };
    const handlechange=(e)=>{
        const value=e.target.value;
        Setsearch(value);
        console.log(value)
    }
    console.log("Data:", Data);
console.log("Length:", Data.length);
  return (
    <div>
              <input className='w-1/3 border-2 px-2' placeholder='search number here' onChange={handlechange}  value={search}/>

    <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain max-h-96  pb-4">

  {loading && (
    <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
      <div className="text-lg font-semibold">
        Loading...
      </div>
    </div>
  )}{

<table className="border-4 border-gray-300 mt-8 w-full">
  <thead>
    <tr>
      <th className="px-5">Order Id</th>
            <th className='px-5 py-2'>Public Id</th>

      <th className="px-5">Chef Id</th>
      <th className="px-18">Items</th>
      <th className="px-18">Delivery Instruction</th>

      <th className="px-18">OTP</th>
      <th className="px-5">Non Discounted Price</th>
      <th className="px-5">Price</th>
      <th className="px-5">Coins</th>
      <th className="px-5">Discount Value</th>

      <th className="px-5">Order Status</th>
      <th className="px-5">Customer Number</th>
      <th className="px-5">Customer Name</th>
      <th className="px-5">Restaurant Name</th>
      <th className="px-5">Order Date</th>
       <th className='px-5'>Start Time</th>
        <th className='px-5'>End Time</th>
                  <th className="px-18 py-2">Order Items <br/><span className='p-2'> name </span><span className='p-2'> count </span><span className='p-2'> price </span><span className='p-2'> description </span></th>

      <th className="px-5 py-2">Rider name</th>
          <th className="px-5 py-2">Rider number</th>
          <th className="px-5 py-2 whitespace-nowrap">Created At</th>
          <th className="px-5 py-2 whitespace-nowrap">Updated At</th>
    </tr>
  </thead>

  <tbody>
    {Data.map((data, index) => (
      <tr key={index} className="items-center justify-center border border-gray-300">
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

        <td className="text-center">{data.deliveryInstruction?data.deliveryInstruction:"no data"}</td>
        <td className="text-center">{data.otp}</td>
        <td className="text-center">{data.nonDiscountedPrice}</td>
        <td className="text-center">{data.price}</td>
        <td className="text-center">{data.coinsused}</td>
        <td className="text-center">{data.discountvalue}</td>
<td className="text-center">
  {(() => {
    const currentStatus = statusMap[data.id] ?? data.orderStatus;

    console.log("Current Status:", data.id, currentStatus);

    return (
      <>
        <select
          className="border rounded px-2 py-1"
          value={currentStatus}
          onChange={(e) =>
            handleStatusChange(data.id, e.target.value)
          }
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>

        {currentStatus !== data.orderStatus && (
          <button
            onClick={() => handleSaveStatus(data.id)}
            className="bg-green-600 text-white px-2 py-1 rounded text-sm mt-2"
          >
            Save
          </button>
        )}

        {(currentStatus === "Refunded" ||
          currentStatus === "delivered_Refunded") && (
          <div className="flex gap-2 mt-2">
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
      </>
    );
  })()}
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
        <td className="text-center">{data.orderdate}</td>
         <td className='text-center'>{data.startTime}</td>
              <td className='text-center'>{data.endTime}</td>
              <td  className='flex flex-col justify-center text-center items-center'>{data.orderItems.map((orderItems,idx)=>(
                <tr key={idx} className='flex '><td className='w-20'>{orderItems.name}</td>
                <td className='w-20'>{orderItems.count}</td>
                <td className='w-16'>{orderItems.price}</td>
                <td className='w-16'>{orderItems.description?orderItems.description:"no data"}</td></tr>
              
              ))}</td>
        <td className="text-center">{data.riderDetails.name}</td>
            <td className="text-center">{data.riderDetails.number}</td>
                  <td className="text-center whitespace-nowrap">{data.createdAt?data.createdAt.split("T")[1].split(".")[0]:"-"}</td>
            <td className="text-center whitespace-nowrap">{data.updatedAt?data.updatedAt.split("T")[1].split(".")[0]:"-"}</td>
      </tr>
    ))}
  </tbody>
</table>
}

 </div>  <div className="flex justify-center items-center gap-4 mt-4">

  <button
    disabled={page === 0 || loading}
    onClick={() => setPage((prev) => prev - 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>

  <button
    disabled={page >= totalPages - 1 || loading}
    onClick={() => setPage((prev) => prev + 1)}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>

</div></div>);
};

export default CompletedOneTimeOrders;
