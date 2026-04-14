import React, { useState } from "react";
import apiClient from "../../utils/apiclient";

const Index = () => {
  const [Userid, setUserId] = useState("");
  const [Mealid, setMealId] = useState("");

  const [lunchstarttime, setLunchStartTime] = useState("");
  const [lunchendtime, setLunchEndTime] = useState("");

  const [dinnerstarttime, setDinnerStartTime] = useState("");
  const [dinnerendtime, setDinnerEndTime] = useState("");

  const [couponId, setCouponId] = useState("");
  const [useBBCurrency, setUseBBCurrency] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      lunchstarttime: lunchstarttime || null,
      lunchendtime: lunchendtime || null,
      dinnerstarttime: dinnerstarttime || null,
      dinnerendtime: dinnerendtime || null,
      couponId: couponId || null,
      useBBCurrency,
      onlinePayment,
    };

    console.log("Subscription Payload:", payload);

    try {
      const response = await apiClient.post(
        `/create/subscription/${Userid}/${Mealid}`,
        payload
      );

      console.log(response.data);
      alert("Subscription created successfully");
    } catch (e) {
      console.error(e.response?.data || e.message);
      alert("Error creating subscription");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <h2 className="pb-2 text-center">Create Subscription</h2>

        <input
          className="border border-gray-600 mb-2"
          type="text"
          placeholder="User ID"
          value={Userid}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <br/>
        <input
          className="border border-gray-600 mb-2"
          type="text"
          placeholder="Meal ID"
          value={Mealid}
          onChange={(e) => setMealId(e.target.value)}
          required
        />

        {/* Lunch Timings */}
        <h3 className="py-2">Lunch Time</h3>
        <div>
          <label className="pr-4">Start</label>
          <input
            type="time"
            value={lunchstarttime}
            onChange={(e) => setLunchStartTime(e.target.value)}
          />
        </div>

        <div>
          <label className="pr-4">End</label>
          <input
            type="time"
            value={lunchendtime}
            onChange={(e) => setLunchEndTime(e.target.value)}
          />
        </div>

        {/* Dinner Timings */}
        <h3 className="py-4">Dinner Time</h3>
        <div>
          <label className="pr-4">Start</label>
          <input
            type="time"
            value={dinnerstarttime}
            onChange={(e) => setDinnerStartTime(e.target.value)}
          />
        </div>

        <div>
          <label className="pr-4">End</label>
          <input
            type="time"
            value={dinnerendtime}
            onChange={(e) => setDinnerEndTime(e.target.value)}
          />
        </div>

        {/* Coupon */}
        <div className="py-2">
          <input
            className="border border-gray-600"
            type="number"
            placeholder="Coupon ID (optional)"
            value={couponId}
            onChange={(e) => setCouponId(e.target.value)}
          />
        </div>

        {/* Checkboxes */}
        <div className="p-2">
          <label>
            <input
              type="checkbox"
              checked={useBBCurrency}
              onChange={(e) => setUseBBCurrency(e.target.checked)}
            />
            Use BB Currency
          </label>
        </div>

        <div className="p-2">
          <label>
            <input
              type="checkbox"
              checked={onlinePayment}
              onChange={(e) => setOnlinePayment(e.target.checked)}
            />
            Online Payment
          </label>
        </div>

        <button type="submit" className="border border-green-600 p-2">
          Submit Subscription
        </button>
      </form>
    </div>
  );
};

export default Index;
