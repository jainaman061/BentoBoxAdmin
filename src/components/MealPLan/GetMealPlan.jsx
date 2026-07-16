import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

const MealPlansTable = (id) => {
  const isAdmin = localStorage.getItem("bentoAdminDetails") == 4 ? true : false;

  const restaurantId = id.id;
  const [data, setData] = useState([]);
  const [menuMap, setMenuMap] = useState({});
  const [formMap, setFormMap] = useState({});
const [editingId, setEditingId] = useState(null);
const [expandedRow, setExpandedRow] = useState(null);
const [editPrice, setEditPrice] = useState({
  id: null,
  price: ""
});
const handlePriceChange = (id, value) => {
  setEditPrice({
    id,
    price: value
  });
};
const handleSavePrice = async () => {
  try {
    const payload = {
      editMealPLanSubTypeListList: [
        {
          id: editPrice.id,
          price: Number(editPrice.price)
        }
      ]
    };

    await apiClient.put("/mealplan/edit", payload);
setData(prev =>
      prev.map(item =>
        item.id === editPrice.id
          ? { ...item, price: Number(editPrice.price) }
          : item
      )
    );
    alert("Updated successfully");
  } catch (e) {
    console.error(e);
  }
};
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

        const uniqueMainIds = [...new Set(flatData.map(d => d.mealplanmainid))];

        const menuData = {};

        await Promise.all(
          uniqueMainIds.map(async (id) => {
            try {
              const res = await apiClient.get(`/subscriptionmenu/${id}`);
              menuData[id] = res.data;
            } catch (e) {
              menuData[id] = null; // no menu exists
            }
          })
        );

        setMenuMap(menuData);
        setFormMap(menuData);

        console.log("values are");
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
      const rawBody = { ...formMap[mainId] };

    const { id, ...body } = rawBody || {};

    const existingMenu = menuMap[mainId];


    if (existingMenu && Object.keys(existingMenu).length > 0) {
      // ✅ UPDATE (PUT)
      await apiClient.put(`/subscriptionmenu/${mainId}`, body);
    } else {
      // ✅ CREATE (POST)
      await apiClient.post(`/subscriptionmenu/${mainId}`, body);
    }

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
                <th className="px-2">Action</th>
            <th className="px-2">Per Day Price</th>
            <th className="px-2">Type</th>

            {/* <th className="px-2">Mon</th>
            <th className="px-2">Tue</th>
            <th className="px-2">Wed</th>
            <th className="px-2">Thu</th>
            <th className="px-2">Fri</th>
            <th className="px-2">Sat</th>
            <th className="px-2">Sun</th> */}
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
              <td className="text-center">
  {editingId === item.id ? (
    <input
      type="number"
      value={editPrice.id === item.id ? editPrice.price : item.price}
      onChange={(e) => handlePriceChange(item.id, e.target.value)}
      className="border w-20 text-center"
    />
  ) : (
    item.price
  )}
</td>   
    <td>
  {editingId === item.id ? (
    <button
      onClick={() => {
        handleSavePrice();
        setEditingId(null);
      }}
      className="bg-blue-600 text-white px-2 py-1 rounded"
    >
      Save
    </button>
  ) : (
    isAdmin && (
      <>
    <button
      onClick={() => {
        setEditingId(item.id);
        setEditPrice({ id: item.id, price: item.price });
      }}
      className="bg-yellow-500 text-white px-2 py-1 rounded"
    >
      Edit
    </button>
    </>
    )
    
  )}
</td>
              <td className="text-center">{item.perdayprice}</td>
              <td className="text-center">{item.mealPlanType?.name}</td>
<td>
  <button
    onClick={() =>
      setExpandedRow(expandedRow === item.id ? null : item.id)
    }
    className="bg-blue-500 text-white px-2 py-1 rounded"
  >
    {expandedRow === item.id ? "Hide" : "View Menu"}
  </button>
</td>
{expandedRow === item.id && (
  <tr>
    <td colSpan="100%">
      <div className="p-4 bg-gray-100 ">

        <div className="flex flex-col text-center">

<td>
                <span>mon : </span>
                <input
                  placeholder="Mon"
                  value={formMap[item.mealplanmainid]?.monday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "monday", e.target.value)
                  }
                  className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}
                />
              </td>          
            <td>
              <span>tue :</span>
                <input
                  placeholder="Tue"
                  value={formMap[item.mealplanmainid]?.tuesday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "tuesday", e.target.value)
                  }
                  className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}
                />
              </td>

              <td>
                <span>wed :</span>
                <input
                  placeholder="Wed"
                  value={formMap[item.mealplanmainid]?.wednesday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "wednesday", e.target.value)
                  }
                 className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}
                />
              </td>

              <td>
                <span>thu :</span>
                <input
                  placeholder="Thu"
                  value={formMap[item.mealplanmainid]?.thursday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "thursday", e.target.value)
                  }
className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}                />
              </td>

              <td>
                <span>fri :</span>
                <input
                  placeholder="Fri"
                  value={formMap[item.mealplanmainid]?.friday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "friday", e.target.value)
                  }
className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}                />
              </td>

              <td>
                <span>sat :</span>
                <input
                  placeholder="Sat"
                  value={formMap[item.mealplanmainid]?.saturday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "saturday", e.target.value)
                  }
className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}                />
              </td>

              <td>
                <span>sun :</span>
                <input
                  placeholder="Sun"
                  value={formMap[item.mealplanmainid]?.sunday || ""}
                  onChange={(e) =>
                    handleChange(item.mealplanmainid, "sunday", e.target.value)
                  }
className="border px-2 py-1 min-w-[80px] w-auto"
                  style={{ width: `${(formMap[item.mealplanmainid]?.monday?.length || 5) * 10}px` }}                />
              </td>
              {/* {(isAdmin) && ( */}
              <td>
                
                <button
                  onClick={() => handleSaveMenu(item.mealplanmainid)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save Menu
                </button>
               
              </td>
               {/* )} */}
        </div>

      </div>
    </td>
  </tr>
)}
              {/* <td>
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
              </td> */}

              {/* <td>
                <button
                  onClick={() => handleSaveMenu(item.mealplanmainid)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save Menu
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlansTable;