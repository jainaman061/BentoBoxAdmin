import axios from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/apiclient";
import { useNavigate } from "react-router-dom";

const CompletedOneTimeOrders = (route) => {
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
  const [Data, setData] = useState([]);
  const [data,Setdata]=useState([])
  const navigate =useNavigate();
 const [search,Setsearch]=useState("")
const [statusMap, setStatusMap] = useState({});
const [refundMap, setRefundMap] = useState({});

  useEffect(() => {
    
    const tableData = async () => {
      try {
        const response = await apiClient.get(
 `${route.route}`        );
 const map = {};
response.data.forEach((o) => {
  map[o.id] = {
    coins: o.refundedCoins || 0,
    cash: o.refundedCash || 0,
  };
});
setRefundMap(map);
        setData(response.data);
        console.log(response.data);
        
      } catch (e) {
        console.error(e);
      }
    };
    tableData();
  }, []);
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
  return (
    <div>
              <input className='w-1/3 border-2 px-2' placeholder='search number here' onChange={handlechange}  value={search}/>

    <div className="w-screen   overflow-x-auto overflow-y-auto overscroll-x-contain max-h-96  pb-4">
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
      <th className="px-5 py-2">Rider name</th>
          <th className="px-5 py-2">Rider number</th>
    </tr>
  </thead>

  <tbody>
    {filteredData.map((data, index) => (
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

    {/* 🔥 SHOW ONLY FOR REFUND */}
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
        <td className="text-center">{data.orderdate}</td>
         <td className='text-center'>{data.startTime}</td>
              <td className='text-center'>{data.endTime}</td>
        <td className="text-center">{data.riderDetails.name}</td>
            <td className="text-center">{data.riderDetails.number}</td>
      </tr>
    ))}
  </tbody>
</table>

 </div>  </div>);
};

export default CompletedOneTimeOrders;
