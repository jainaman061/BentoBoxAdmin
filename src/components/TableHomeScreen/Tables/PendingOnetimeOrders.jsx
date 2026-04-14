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
  const tableData = async () => {
    try {
      const res = await apiClient.get(`${route.route}`);
      Setdata(res.data);

      // status map
      const map = {};
      res.data.forEach((o) => {
        map[o.id] = o.orderStatus;
      });
      setStatusMap(map);

      // date map
      const map2 = {};
      res.data.forEach((o) => {
        map2[o.id] = o.orderdate;
      });
      setDateMap(map2);

      // ✅ NEW: refund map (coins + cash)
      const map3 = {};
      res.data.forEach((o) => {
        map3[o.id] = {
          coins: o.refundedCoins || 0,   // adjust key if backend name differs
        cash: o.refundedCash || 0,
        };
      });
      setRefundMap(map3);

    } catch (e) {
      console.error(e);
    }
  };
  tableData();
}, []);
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
            const [data,Setdata]=useState([])
    
      
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

  <div className="w-screen    overflow-x-auto overflow-y-auto overscroll-x-contain h-96 ">
    <table className="min-w-full border-4 border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="px-5 py-2">Order Id</th>
                <th className='px-5 py-2'>Public Id</th>

          <th className="px-5 py-2">Chef Id</th>
          <th className="px-18 py-2">Items</th>
          <th className="px-18 py-2">startTime</th>
          <th className="px-18 py-2">endTime</th>

      <th className="px-18">Delivery Instruction</th>

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

        </tr>
      </thead>
      <tbody>
        {filteredData.map((data, index) => (
          <tr
            key={index}
            className="items-center justify-center border border-gray-300"
          >
            <td className="text-center">{data.id}</td>
                    <td className='text-center px-2'>{data.publicId}</td>

            <td className="text-center">{data.chefid}</td>
            <td className="flex flex-col justify-center text-center items-center">
              {data.orderItems.map((orderItems, idx) => (
                <div key={idx} className="flex">
                  <div className="flex">
                    <span>{orderItems.name}</span>x
                    <span>{orderItems.count}</span>
                  </div>
                  = <span>{orderItems.price}</span>
                </div>
              ))}
            </td>
            <td className="text-center">{data.startTime}</td>
            <td className="text-center">{data.endTime}</td>
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
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
)
}

export default PendingOnetimeOrders