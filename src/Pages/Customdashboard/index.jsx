import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

export default function OrderDashboard() {
const [dashboardData, setDashboardData] = useState({
  kitchens: [],
  timeWiseOrders: [],
});
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(false);

const [filters, setFilters] = useState({
  restaurantId: "",
  date: new Date().toISOString().split("T")[0],
  mealType: "ALL",
  dashboardType: "TIME_WISE",
});

  // ================= FETCH DASHBOARD =================

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (filters.restaurantId) {
        params.append("restaurantId", filters.restaurantId);
      }

      if (filters.date) {
        params.append("date", filters.date);
      }

      params.append("mealType", filters.mealType);
      params.append(
  "dashboardType",
  filters.dashboardType
);
const response = await apiClient.get(`/order-dashboard?${params.toString()}`)
      

console.log( response.data);

      setDashboardData(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH RESTAURANTS =================

  const fetchRestaurants = async () => {
    try {
        const response = await apiClient.get("/restaurant");
        console.log(response);
        


      setRestaurants(response.data);
    } catch (error) {
      console.error("Restaurant Error:", error);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchRestaurants();
    fetchDashboard();
  }, []);

  // ================= CARD RENDER =================


  // ================= UI =================
const sortedTimeWiseOrders = [...(dashboardData.timeWiseOrders || [])]
  .sort((a, b) => {

    // 1. Restaurant sorting
    const restaurantCompare =
      a.restaurantName.localeCompare(
        b.restaurantName
      );

    if (restaurantCompare !== 0) {
      return restaurantCompare;
    }

    // 2. Time sorting
    const getHour = (slot) => {
      return Number(slot.split(':')[0]);
    };

    return getHour(a.slot) - getHour(b.slot);
  });
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 text-orange-600">
        Order Dashboard
      </h1>

      {/* FILTERS */}
    <div
  className="
    bg-orange-50 border border-orange-200
    rounded-2xl
    shadow
    p-4
    mb-8
    flex
    flex-col
    md:flex-row
    gap-4
  "
>
        {/* Restaurant Dropdown */}
        <select
          value={filters.restaurantId}
          onChange={(e) =>
            setFilters({
              ...filters,
restaurantId: e.target.value
  ? Number(e.target.value)
  : "",            })
          }
          className="
  border
  border-orange-300
  rounded-xl
  px-4
  py-3
  w-full
  md:w-auto
  focus:outline-none
  focus:ring-2
  focus:ring-orange-400
"
        >
          <option value="">All Restaurants</option>

          {restaurants.map((restaurant) => (
            <option
              key={restaurant.id}
              value={restaurant.id}
            >
              {restaurant.name}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters({
              ...filters,
              date: e.target.value,
            })
          }
          className="
  border
  border-orange-300
  rounded-xl
  px-4
  py-3
  w-full
  md:w-auto
  focus:outline-none
  focus:ring-2
  focus:ring-orange-400
"
        />

       

        {/* Meal Type Dropdown */}
        <select
          value={filters.mealType}
          onChange={(e) =>
            setFilters({
              ...filters,
              mealType: e.target.value,
            })
          }
          className="
  border
  border-orange-300
  rounded-xl
  px-4
  py-3
  w-full
  md:w-auto
  focus:outline-none
  focus:ring-2
  focus:ring-orange-400
"
        >
          <option value="ALL">ALL</option>
          <option value="BREAKFAST">BREAKFAST</option>
          <option value="LUNCH">LUNCH</option>
          <option value="DINNER">DINNER</option>
        </select>
<select
  value={filters.dashboardType}
  onChange={(e) =>
    setFilters({
      ...filters,
      dashboardType: e.target.value,
    })
  }
  className="
    border
    border-orange-300
    rounded-xl
    px-4
    py-3
    w-full
    md:w-auto
    focus:outline-none
    focus:ring-2
    focus:ring-orange-400
  "
>
  <option value="OVERVIEW">
    OVERVIEW
  </option>

  <option value="TIME_WISE">
    TIME WISE
  </option>
</select>
        {/* Apply Button */}
        <button
          onClick={fetchDashboard}
          className="
bg-orange-500 hover:bg-orange-600 transition  text-white
  rounded-xl
  px-6
  py-3
  font-semibold
  w-full
  md:w-auto
"
        >
          Apply Filters
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
  <h2 className="text-xl font-semibold">
    Loading...
  </h2>
) : (
  <>
    {/* ================= TIME WISE ================= */}

    {filters.dashboardType === "TIME_WISE" ? (
      <div className="
  bg-white
  rounded-2xl
  shadow
  p-4
  md:p-5
  overflow-hidden
">
        <h2 className="text-2xl font-bold mb-6">
          Time Wise Orders
        </h2>

        <div className="overflow-x-auto">
<table className="min-w-[700px] w-full border-collapse">
                <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-3 text-left">
  Restaurant
</th>
                <th className="p-3 text-left">
                  Time Slot
                </th>

                <th className="p-3 text-left">
                  Total Orders
                </th>

                <th className="p-3 text-left">
                  Ordered
                </th>

                <th className="p-3 text-left">
                  Rider Assigned
                </th>
                
                <th className="p-3 text-left">
                  On The Way
                </th>

                <th className="p-3 text-left">
                  Delivered
                </th>

              
              </tr>
            </thead>

            <tbody>
             
{dashboardData.timeWiseOrders?.length === 0 && (
  <tr>
    <td
      colSpan="6"
      className="text-center p-6 text-gray-500"
    >
      No time wise orders found
    </td>
  </tr>
)}
              {sortedTimeWiseOrders.map(
                (item, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="p-3 font-medium">
  {item.restaurantName}
</td>
                    <td className="p-3 font-medium">
                      {item.slot}
                    </td>

                    <td className="p-3">
                      {item.totalOrders}
                    </td>

                    <td className="p-3">
                      {item.ordered}
                    </td>

                    <td className="p-3">
                      {item.riderAssigned}
                    </td>
                  
                    <td className="p-3">
                      {item.onTheWay}
                    </td>

                    <td className="p-3">
                      {item.delivered}
                    </td>

                  
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      /* ================= KITCHEN SUMMARY ================= */

      <div className="
  bg-white
  rounded-2xl
  shadow
  p-4
  md:p-5
  overflow-hidden
">
        <h2 className="text-2xl font-bold mb-6">
          Kitchen Summary
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-3 text-left">
                  Kitchen
                </th>

                <th className="p-3 text-left">
                  Total Orders
                </th>

                <th className="p-3 text-left">
  Payment Initiated
</th>

<th className="p-3 text-left">
  Payment Cancelled
</th>

<th className="p-3 text-left">
  Refunded
</th>

<th className="p-3 text-left">
  Cancelled
</th>
              </tr>
            </thead>

            <tbody>
                {dashboardData.kitchens?.length === 0 && (
  <tr>
    <td
      colSpan="6"
      className="text-center p-6 text-gray-500"
    >
      No kitchen data found
    </td>
  </tr>
)}
              {dashboardData.kitchens?.map(
                (item, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="p-3 font-medium">
                      {item.kitchenName}
                    </td>

                    <td className="p-3">
                      {item.totalOrders}
                    </td>

                    <td className="p-3">
  {item.paymentInitiated}
</td>

<td className="p-3">
  {item.paymentCancelled}
</td>

<td className="p-3">
  {item.refunded}
</td>

<td className="p-3">
  {item.cancelled}
</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </>
)}
    </div>
  );
}

