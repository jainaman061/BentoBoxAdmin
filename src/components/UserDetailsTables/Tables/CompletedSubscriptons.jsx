import React, { useEffect, useState } from 'react';
import apiClient from '../../../utils/apiclient';

const CompletedSubscriptons = (content) => {

  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [ordersMap, setOrdersMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

  useEffect(() => {
    if (content?.data) {
      setData(content.data);
    }
  }, [content]);

  const handleToggle = async (subId) => {

    if (expandedRow === subId) {
      setExpandedRow(null);
      return;
    }

    setExpandedRow(subId);

    // already fetched
    if (ordersMap[subId]) return;

    try {
      setLoadingMap(prev => ({ ...prev, [subId]: true }));

      const res = await apiClient.get(
        `/subscriptionOrdersforuser/${subId}` // 🔁 adjust if needed
      );

      setOrdersMap(prev => ({
        ...prev,
        [subId]: res.data
      }));

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMap(prev => ({ ...prev, [subId]: false }));
    }
  };

  return (
    <div className='overflow-x-hidden overflow-y-auto h-96 w-full'>
      <table className='border-4 border-gray-300 mt-8 w-full'>

        <tr>
          <th></th>
          <th>Subscription Id</th>
          <th className='px-5'>Meal Plan</th>
          <th className='px-5'>Meal name</th>
          <th className='px-5'>Restaurant Name</th>
          <th className='px-5'>Active Status</th>
          <th className='px-5'>start date</th>
          <th className='px-5'>end date</th>
          <th className='px-5'>Pause Status</th>
          <th className='px-5'>Cancellation Date</th>
          <th className='px-5'>price</th>
          <th className='px-5'>refund amount</th>
        </tr>

        {data.map((item, index) => (
          <React.Fragment key={index}>

            {/* 🔹 MAIN ROW */}
            <tr className='border border-gray-300'>
              <td
                className='text-center cursor-pointer'
                onClick={() => handleToggle(item.id)}
              >
                {expandedRow === item.id ? "▼" : "▶"}
              </td>

              <td className='text-center'>{item.id}</td>
              <td className='text-center'>{item.mealplanname}</td>
              <td className='text-center'>{item.mealplandetails?.name || "-"}</td>
              <td className='text-center'>{item.restaurantName}</td>
              <td className='text-center'>{item.isActive ? "Active" : "Not Active"}</td>
              <td className='text-center'>{item.startdate}</td>
              <td className='text-center'>{item.enddate}</td>
              <td className='text-center'>{item.cancellationDate ? "Yes" : "No"}</td>
              <td className='text-center'>{item.cancellationDate || "-"}</td>
              <td className='text-center'>{item.price}</td>
              <td className='text-center'>{item.refundAmount ?? "-"}</td>
            </tr>

            {/* 🔥 EXPANDED ORDERS */}
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

export default CompletedSubscriptons;