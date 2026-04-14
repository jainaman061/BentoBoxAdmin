import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/apiclient";

const AdminApprovals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/admin/approvals");
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAction = async (id, value) => {
    try {
      await apiClient.put(`/admin/approvals/${id}`, {
        authorised: value,
      });

      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, authorised: value } : item
        )
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update");
    }
  };

  return (
    <div>
      <div className="w-screen overflow-x-auto h-96">
        <table className="border-4 border-gray-300 mt-8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Order ID</th>
              <th>Order Type</th>
              <th>Batch ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th className="px-5 py-2 whitespace-nowrap">Rider name</th>
          <th className="px-5 py-2 whitespace-nowrap">Rider number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border border-gray-300">

                <td className="text-center">{item.id}</td>

                <td className="text-center">
                  <img
                    src={item.image}
                    alt="proof"
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>

                <td className="text-center">{item.orderId}</td>
                <td className="text-center">{item.orderType}</td>
                <td className="text-center">{item.batchId}</td>
                <td className="text-center">{item.localDate}</td>
                <td className="text-center">{item.customerId}</td>
                <td className="text-center">{item.customerName}</td>
                <td className="text-center">{item.riderDetails.name}</td>
                <td className="text-center">{item.riderDetails.number}</td>
                <td className="text-center">
                  {item.authorised ? "Approved" : "Pending"}
                </td>

                <td className="text-center">
                  <button
                    className="text-green-600 mr-2"
                    onClick={() => handleAction(item.id, true)}
                  >
                    Approve
                  </button>

                  <button
                    className="text-red-600"
                    onClick={() => handleAction(item.id, false)}
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApprovals;