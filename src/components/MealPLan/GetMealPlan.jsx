import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

const MealPlansTable = (id) => {
    const restaurantId=id.id;
  const [data, setData] = useState([]);
const [menuMap, setMenuMap] = useState({});
const [formMap, setFormMap] = useState({});
  const flattenMealPlans = (data) => {
    let result = [];

    data.forEach((main) => {
      main.mealPlans.forEach((plan) => {
        result.push({
          mealplanmainid: main.mealplanmainid,
          mealplanname: main.mealplanname,
          ...plan,
        });
      });
    });

    return result;
  };


      useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await apiClient.get(`/mealplan/${restaurantId}`);
      const flatData = flattenMealPlans(res.data);
      setData(flatData);

      // 🔥 fetch menu for each mealplanmainid
      const uniqueMainIds = [...new Set(flatData.map(d => d.mealplanmainid))];

      const menuData = {};

      await Promise.all(
        uniqueMainIds.map(async (id) => {
          try {
            const res = await apiClient.get(
              `/subscriptionmenu/${id}`
            );
            menuData[id] = res.data;
          } catch (e) {
            menuData[id] = {}; // no menu exists
          }
        })
      );

      setMenuMap(menuData);
      setFormMap(menuData); // prefill form

      console.log("values are")
      console.log(menuMap);
console.log(formMap);
    } catch (e) {
      console.error(e);
    }
  };

  fetchData();
}, []);
const handleChange = (mainId, field, value) => {
  setFormMap((prev) => ({
    ...prev,
    [mainId]: {
      ...prev[mainId],
      [field]: value,
    },
  }));
};
const handleSaveMenu = async (mainId) => {
  try {
    const body = formMap[mainId];

    await apiClient.post(`/subscriptionmenu/${mainId}`, body);

    alert("Menu saved successfully");

  } catch (e) {
    console.error(e);
  }
};
  return (
    <div className="overflow-x-auto h-96">
      <table className="border-4 border-gray-300 mt-4 w-full">
        <thead>
  <tr>
    <th className="px-2">Main ID</th>
    <th className="px-2">Meal Plan Name</th>
    <th className="px-2">Plan ID</th>
    <th className="px-2">Days</th>
    <th className="px-2">Plan Name</th>
    <th className="px-2">Price</th>
    <th className="px-2">Per Day Price</th>
    <th className="px-2">Type</th>

    {/* 🔥 ADD THESE */}
    <th className="px-2">Mon</th>
    <th className="px-2">Tue</th>
    <th className="px-2">Wed</th>
    <th className="px-2">Thu</th>
    <th className="px-2">Fri</th>
    <th className="px-2">Sat</th>
    <th className="px-2">Sun</th>
    <th className="px-2">Action</th>
  </tr>
</thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border">
  <td className="text-center">{item.mealplanmainid}</td>
  <td className="text-center">{item.mealplanname}</td>
  <td className="text-center">{item.id}</td>
  <td className="text-center">{item.days}</td>
  <td className="text-center">{item.planName}</td>
  <td className="text-center">{item.price}</td>
  <td className="text-center">{item.perdayprice}</td>
  <td className="text-center">{item.mealPlanType?.name}</td>

  {/* 🔥 MENU INPUTS */}
  <td>
    <input
      placeholder="Mon"
      value={formMap[item.mealplanmainid]?.monday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "monday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  <td>
    <input
      placeholder="Tue"
      value={formMap[item.mealplanmainid]?.tuesday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "tuesday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  <td>
    <input
      placeholder="Wed"
      value={formMap[item.mealplanmainid]?.wednesday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "wednesday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  <td>
    <input
      placeholder="Thu"
      value={formMap[item.mealplanmainid]?.thursday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "thursday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  <td>
    <input
      placeholder="Fri"
      value={formMap[item.mealplanmainid]?.friday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "friday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  <td>
    <input
      placeholder="Sat"
      value={formMap[item.mealplanmainid]?.saturday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "saturday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  <td>
    <input
      placeholder="Sun"
      value={formMap[item.mealplanmainid]?.sunday || ""}
      onChange={(e) =>
        handleChange(item.mealplanmainid, "sunday", e.target.value)
      }
      className="border w-20"
    />
  </td>

  {/* 🔥 SAVE BUTTON */}
  <td>
    <button
      onClick={() => handleSaveMenu(item.mealplanmainid)}
      className="bg-green-600 text-white px-2 py-1 rounded"
    >
      Save Menu
    </button>
  </td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlansTable;