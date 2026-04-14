import React, { useEffect, useState } from 'react';
import apiClient from '../../../utils/apiclient';

const ActiveSubscriptions = (route) => {

  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [ordersMap, setOrdersMap] = useState({}); // {subId: orders[]}
  const [loadingMap, setLoadingMap] = useState({}); // {subId: true/false}

  useEffect(() => {
    if (route?.data) {
      setData(route.data);
    }
  }, [route]);

  // 🔥 Toggle + fetch
  const handleToggle = async (subId) => {
    // collapse if already open
    if (expandedRow === subId) {
      setExpandedRow(null);
      return;
    }

    setExpandedRow(subId);

    // already fetched? don’t call again
    if (ordersMap[subId]) return;

    try {
      setLoadingMap(prev => ({ ...prev, [subId]: true }));

      const res = await apiClient.get(
        `/subscriptionOrdersforuser/${subId}`
        // `/subscriptions/${subId}/orders` // 🔁 change endpoint if needed
      );
      console.log("Orders for subId", subId, res.data);

      setOrdersMap(prev => ({
        ...prev,
        [subId]: res.data
      }));

    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoadingMap(prev => ({ ...prev, [subId]: false }));
    }
  };

  return (
    <div className='overflow-x-hidden overflow-y-auto h-96 w-full'>
      <table className='border-4 border-gray-300 mt-8 w-full'>

        <tr>
          <th></th> {/* arrow */}
          <th>Subscription Id</th>
          <th className='px-5'>Meal Plan</th>
          <th className='px-5'>Meal Plan name</th>
          <th className='px-5'>Restaurant Name</th>
          <th className='px-5'>Active Status</th>
          <th className='px-5'>start date</th>
          <th className='px-5'>end date</th>
          <th className='px-5'>Pause Status</th>
          <th className='px-5'>pause start</th>
          <th className='px-5'>pause end</th>
          <th className='px-5'>price</th>
        </tr>

        {data.map((item, index) => (
          <React.Fragment key={index}>

            {/* 🔹 MAIN ROW */}
            <tr className='border border-gray-300'>
              <td
                className='text-center cursor-pointer text-lg'
                onClick={() => handleToggle(item.id)}
              >
                {expandedRow === item.id ? "▼" : "▶"}
              </td>

              <td className='text-center'>{item.id}</td>
              <td className='text-center'>{item.mealplanname}</td>
              <td className='text-center'>{item.mealplandetails?.name}</td>
              <td className='text-center'>{item.restaurantName}</td>
              <td className='text-center'>{item.isActive ? "Active" : "Not Active"}</td>
              <td className='text-center'>{item.startdate}</td>
              <td className='text-center'>{item.enddate}</td>
              <td className='text-center'>{item.ispaused ? "true" : "false"}</td>
              <td className='text-center'>{item.pause_start_date || "-"}</td>
              <td className='text-center'>{item.pause_end_date || "-"}</td>
              <td className='text-center'>{item.price}</td>
            </tr>

            {/* 🔥 EXPANDED ROW */}
            {expandedRow === item.id && (
              <tr>
                <td colSpan="12" className="bg-gray-50 p-4">

                  {loadingMap[item.id] ? (
                    <p className="animate-pulse">Loading orders...</p>
                  ) : (
                    <table className="w-full border">
                      <tr>
                        <th>Order Id</th>
                        <th>Meal</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>

                      {(ordersMap[item.id] || []).map((order, i) => (
                        <tr key={i} className="border">
                          <td className="text-center">{order.id}</td>
                          <td className="text-center">{order.mealName}</td>
                          <td className="text-center">{order.status}</td>
                          <td className="text-center">{order.orderdate}</td>
                        </tr>
                      ))}
                    </table>
                  )}

                </td>
              </tr>
            )}

          </React.Fragment>
        ))}
      </table>
    </div>
  );
};

export default ActiveSubscriptions;