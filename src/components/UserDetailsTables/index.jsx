import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import CompltedOrders from "./Tables/CompletedOneTimeOrders";
import CompletedSubscriptionOrders from "./Tables/CompletedSubscriptiOnorders";
import CompletedSubscriptons from './Tables/CompletedSubscriptons';
import PendinOneTimeOrders from "./Tables/PendingOnetimeOrders";
import PendingSubscription from "./Tables/ActiveSubscriptions";
import PendingSubscriptionOrders from './Tables/PendingSubscriptionOrders';
import UserDetails from './Tables/Userdetails';
const Index = ({ data }) => {
  const table = data;
  const navigate = useNavigate();

  const [activeSession, setActiveSession] = useState();
  const [content, setContent] = useState();

  const componentsMap = {
    "completed orders": CompltedOrders,
    "completed subscription orders": CompletedSubscriptionOrders,
    "pending orders": PendinOneTimeOrders,
    "pending subscription orders": PendingSubscriptionOrders,
    "subscription": PendingSubscription,
    "subscription History": CompletedSubscriptons,
    "user details":UserDetails
   
  };

  const ActiveComponent = componentsMap[activeSession];

  return (
    <div>
      <div className='flex justify-center'>
        {Object.entries(table ?? {}).map(([key, value]) => {
          const handleClick = () => {
            setActiveSession(key);
            setContent(value ?? []); 
          };

          return (
            <div
              key={key}
              onClick={handleClick}
              style={{ cursor: "pointer", marginBottom: "10px" }}
              className={`flex px-2 border-4 m-2 mt-10 ${
                activeSession === key ? "bg-gray-200" : ""
              }`}
            >
              {key}
            </div>
          );
        })}
      </div>

      {/* Render active component dynamically */}
      <div className="mt-4">
        {ActiveComponent && <ActiveComponent data={content} />}
      </div>
    </div>
  );
};

export default Index;
