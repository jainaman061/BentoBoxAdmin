import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

const Index = () => {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState("");

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const [batchDetails, setBatchDetails] = useState(null);

  const [loadingRiders, setLoadingRiders] = useState(false);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [search, setSearch] = useState("");

  // Fetch Riders
  const fetchRiders = async () => {
    try {
      setLoadingRiders(true);

      const response = await apiClient.get(
        "/AllRiders?page=0&size=100"
      );

      setRiders(response.data.content || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRiders(false);
    }
  };

  // Fetch Batches By Rider
  const fetchBatches = async (riderId) => {
    try {
      setLoadingBatches(true);

      const response = await apiClient.get(
        `/batches?page=0&size=100&search=${search}&riderId=${riderId}`
      );

      setBatches(response.data.content || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingBatches(false);
    }
  };

  // Fetch Orders By Batch
  const fetchBatchOrders = async (batchId) => {
    try {
      setLoadingOrders(true);

      const response = await apiClient.get(
        `/getBatchorders/${batchId}`
      );

const data = response.data;

// Merge subscription + one time orders
const combinedOrders = [
  ...(data.subscriptionOrders || []).map((order) => ({
    ...order,
    type: "SUBSCRIPTION",
  })),
  ...(data.oneTimeOrders || []).map((order) => ({
    ...order,
    type: "ONETIME",
  })),
].sort((a, b) => a.deliverySequence - b.deliverySequence);

setBatchDetails({
  ...data,
  allOrders: combinedOrders,
});
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  return (
    <div className="p-4">

      <div className="flex gap-4 mb-6">

        {/* Rider Dropdown */}
        <select
          className="border px-3 py-2 rounded w-72"
          value={selectedRider}
          onChange={(e) => {
            const riderId = e.target.value;

            setSelectedRider(riderId);
            setSelectedBatch("");
            setBatchDetails(null);

            if (riderId) {
              fetchBatches(riderId);
            } else {
              setBatches([]);
            }
          }}
        >
          <option value="">
            Select Rider
          </option>

          {riders.map((rider) => (
            <option
              key={rider.id}
              value={rider.id}
            >
              {rider.name} ({rider.number})
            </option>
          ))}
        </select>

        {/* Batch Dropdown */}
        <select
          className="border px-3 py-2 rounded w-72"
          disabled={!selectedRider}
          value={selectedBatch}
          onChange={(e) => {
            const batchId = e.target.value;

            setSelectedBatch(batchId);

            if (batchId) {
              fetchBatchOrders(batchId);
            }
          }}
        >
          <option value="">
            Select Batch
          </option>

          {batches.map((batch) => (
            <option
              key={batch.id}
              value={batch.id}
            >
              
              Batch #{batch.id} || created-on->{batch.localDate?batch.localDate:"-"} Created-At-> {batch.createdAt?batch.createdAt.split("T")[1].split(".")[0]:"-"} || updated-at-> {batch.updatedAt?batch.updatedAt.split("T")[1].split(".")[0]:"-"} || status->  {batch.status} ||
              distance-> {(batch.totalDistance/1000).toFixed(2)} km 
            </option>
          ))}
        </select>

      </div>

      {(loadingRiders ||
        loadingBatches ||
        loadingOrders) && (
        <div className="mb-4 font-semibold">
          Loading...
        </div>
      )}

      {batchDetails && (
        <>
          {/* Subscription Orders */}

         {batchDetails && (
  <>
    <h3 className="font-bold text-lg mb-2">
      Batch Orders
    </h3>

    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th>Seq</th>
          <th>Type</th>
          <th>ID</th>
          <th>Customer</th>
          <th>Meal / Restaurant</th>
          <th>Status</th>
          <th>Address</th>
          <th>Distance</th>
          <th>Created At</th>
          <th >Updated At</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {batchDetails.allOrders?.map((order) => (
          <tr key={`${order.type}-${order.id}`}>
            <td>{order.deliverySequence}</td>

            <td>
              {order.type === "SUBSCRIPTION"
                ? "Subscription"
                : "One Time"}
            </td>

            <td>{order.id}</td>

            <td>{order.userdetails?.name}</td>

            <td>
              {order.type === "SUBSCRIPTION"
                ? order.mealName
                : order.restaurantName}
            </td>

            <td>
              {order.type === "SUBSCRIPTION"
                ? order.status
                : order.orderStatus}
            </td>

            <td>{order.street}</td>

            <td>
              {Number(order.distanceMeters/1000 || 0).toFixed(2)} km
            </td>
                  <td className="text-center whitespace-nowrap">{order.createdAt.split("T")[1].split(".")[0]}</td>
            <td className="text-center whitespace-nowrap">{order.updatedAt.split("T")[1].split(".")[0]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}
        </>
      )}
    </div>
  );
};

export default Index;