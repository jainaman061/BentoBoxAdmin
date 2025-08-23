import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiClient from '../../../utils/apiclient';
import { useNavigate } from 'react-router-dom';

const PendingSubscriptionOrders = ({ data = [] }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data ?? []);
  }, [data]);

  return (
    <div className="overflow-y-auto h-96 w-full">
      <table className="border-4 border-gray-300 mt-8">
        <thead>
          <tr>
            <th className="px-5">SubscriptionOrder Id</th>
            <th className="px-5">number</th>
            <th className="px-5">meal name</th>
            <th className="px-5">Restaurant name</th>
            <th className="px-5">orderStatus</th>
            <th className="px-5">start time</th>
            <th className="px-5">end time</th>
            <th className="px-5">order Date</th>
            <th className="px-5">Subscription Price</th>
            <th className="px-5">Meal Plan</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="items-center justify-center border border-gray-300"
            >
              <td className="text-center">{row.id}</td>
              <td
                className="text-center hover:text-blue-900 text-lg hover:cursor-pointer hover:underline"
                onClick={() => {
                  navigate(`/userDetails/${row.number}`);
                }}
              >
                {row.number}
              </td>
              <td className="text-center">{row.mealName}</td>
              <td className="text-center">{row.restaurantName}</td>
              <td className="text-center">{row.status}</td>
              <td className="text-center">{row.startTime}</td>
              <td className="text-center">{row.endTime}</td>
              <td className="text-center">{row.orderdate}</td>
              <td className="text-center">{row.mealplanprice}</td>
              <td className="text-center">{row.mealplanname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default PendingSubscriptionOrders