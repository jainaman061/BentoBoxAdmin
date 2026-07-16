import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

const MealPlanForm = (id) => {
  const isAdmin = localStorage.getItem("bentoAdminDetails") == 4 ? true : false;

    console.log(id.id)
    const restaurantId=id.id;
  const [mealname, setMealName] = useState("");

  const [selectedTypes, setSelectedTypes] = useState([]);

  const [prices, setPrices] = useState({
    1: ["", "", ""], // Lunch
    2: ["", "", ""], // Dinner
    3: ["", "", ""], // Combo
  });

  const days = [7, 15, 30];

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handlePriceChange = (type, index, value) => {
    const updated = { ...prices };
    updated[type][index] = value;
    setPrices(updated);
  };
  const [mealplan,SetMealplan]= useState([])
  const fetchData=async()=>{
    try{
      const data= await apiClient.get(`/mealplan/${restaurantId}`);
      console.log(data)
    }
    catch(err){
      alert("error fetching data");
    }
  }
useEffect(()=>{
        fetchData();
    },[id])
  const handleSubmit = async () => {
    
    try {
      const mealPLanDtos = selectedTypes.map((type) => ({
        mealPlanTypeId: type,
        mealname,
        price: prices[type].map(Number),
        days: [7, 15, 30],
      }));

      const mealplanDtoList = {
        mealname,
        mealPLanDtos,
      };

      console.log(mealplanDtoList);

      await apiClient.post(`/addmealplan/${id.id}`, mealplanDtoList);

      alert("Created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const renderSection = (type, label) => {
    if (!selectedTypes.includes(type)) return null;

    return (
      <div className="mt-4 border p-4 rounded">
        <h3 className="font-bold mb-2">{label} Prices</h3>

        {days.map((day, index) => {
          const price = prices[type][index] || 0;
          const perDay = price ? (price / day).toFixed(2) : "0.00";

          return (
            <div key={index} className="flex items-center gap-4 mb-3">
              <div className="w-24">{day} Days</div>

              <div className="bg-blue-100 px-2 py-1 rounded text-sm">
                ₹{perDay}/day
              </div>

              <input
                type="number"
                placeholder="₹"
                value={prices[type][index]}
                onChange={(e) =>
                  handlePriceChange(type, index, e.target.value)
                }
                className="border px-2 py-1"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-xl">
{isAdmin && (
  <>
      {/* Meal Name */}
      <input
        type="text"
        placeholder="Meal Plan Name"
        value={mealname}
        onChange={(e) => setMealName(e.target.value)}
        className="border px-3 py-2 w-full mb-4"
      />

      {/* Category Selection */}
      <div className="flex gap-3 mb-4">
        {[1, 2, 3].map((type) => {
          const label =
            type === 1 ? "Lunch" : type === 2 ? "Dinner" : "Combo";

          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-4 py-2 rounded border ${
                selectedTypes.includes(type)
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sections */}
      {renderSection(1, "Lunch")}
      {renderSection(2, "Dinner")}
      {renderSection(3, "Combo")}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-5 py-2 mt-6 rounded w-full"
      >
        Create Meal Plan
      </button>
      </>
      )}
    </div>
  );
};

export default MealPlanForm;