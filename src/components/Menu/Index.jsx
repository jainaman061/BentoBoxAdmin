import React, { useEffect, useState } from 'react';
import apiClient from '../../utils/apiclient';

const Index = ({ data, id, refreshData }) => {
const [isAvailable, setIsAvailable] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [mealVariables, setMealVariables] = useState([]);
  const[additem,setAdditem]  = useState(false);
  const [selectedAddonItemIds, setSelectedAddonItemIds] = useState([]);
  const [newItem, setNewItem] = useState({
  name: "",
  price: "",
  type: "",
  itemType: "",
  chefNote: "",
  packagingId: "",
  image: null,
  ingredients: "",

  dynamicDescription: false,
  lunchDescription: "",
  dinnerDescription: "",

  healthyMode: false,
  jainFood: false,
  todaySpecial: false,

  isLunch: false,
  isDinner: false,
  isBreakfast: false,

nutrition: ["","","",""]
});
const handleNewItemChange = (field, value) => {
  if (field === "itemType") {
    setSelectedAddonItemIds([]);
  }

  setNewItem((prev) => ({
    ...prev,
    [field]: value
  }));
};
const isAdmin = localStorage.getItem("bentoAdminDetails") == 4 ? true : false;
console.log("isAdmin", isAdmin);
const normalizeAddonItemIds = (value) => {
  const rawList = Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value.split(",")
    : [];

  return [...new Set(
    rawList
      .map((item) => {
        if (item && typeof item === "object") {
          return String(item.id ?? item.itemId ?? item._id ?? item.menuItemId ?? "").trim();
        }

        return String(item ?? "").trim();
      })
      .filter(Boolean)
  )];
};

const getExistingAddonItemIds = (item) => {
  const directIds = normalizeAddonItemIds(item?.addonItemIds);

  if (directIds.length > 0) {
    return directIds;
  }

  const relatedItems =
    String(item?.itemType || item?.type || "")
      .trim()
      .toUpperCase() === "MAIN"
      ? item?.addonsformain || item?.addonItems || []
      : item?.mainItems || item?.mainItemList || [];

  return normalizeAddonItemIds(relatedItems);
};
const handleAddItem = async () => {
  try {
    if (!newItem.lunchDescription) {
      alert("Lunch description required");
      return;
    }

    if (newItem.dynamicDescription && !newItem.dinnerDescription) {
      alert("Dinner description required");
      return;
    }

if (newItem.healthyMode) {
  if (
    !newItem.nutrition ||
    newItem.nutrition.some(
      (n) =>
        n === "" ||
        n === null ||
        n === undefined
    )
  ) {
    alert("All nutrition values are required");
    return;
  }
} else {
  newItem.nutrition = [0, 0, 0, 0];
}
    const normalizedType = String(newItem.type || "").trim();
    const normalizedItemType = String(newItem.itemType || "").trim().toUpperCase();
    const formData = new FormData();

    formData.append("name", newItem.name);
    formData.append("price", Number(newItem.price));
    formData.append("type", normalizedType);
    formData.append("itemType", normalizedItemType);
    formData.append("chefNote", newItem.chefNote || "");
    formData.append("packagingId", Number(newItem.packagingId) || 0);
    formData.append("ingredients", newItem.ingredients || "");

    formData.append("dynamicDescription", String(newItem.dynamicDescription));
    formData.append("lunchDescription", newItem.lunchDescription);

    if (newItem.dynamicDescription) {
      formData.append("dinnerDescription", newItem.dinnerDescription);
    }

    if (newItem.image) {
      formData.append("image", newItem.image);
    } else {
      formData.append("image", new Blob(), "empty.jpg");
    }
    formData.append(
  "descriptionDynamic",
  String(newItem.dynamicDescription)
);

formData.append(
  "healthyMode",
  Boolean(newItem.healthyMode)
)

formData.append(
  "jainFood",
  Boolean(newItem.jainFood)
)

formData.append(
  "todaySpecial",
  Boolean(newItem.todaySpecial)
)

formData.append(
  "isBreakfast",
  Boolean(newItem.isBreakfast)
)

formData.append(
  "isLunch",
  Boolean(newItem.isLunch)
)

formData.append(
  "isDinner",
  Boolean(newItem.isDinner)
)

formData.append(
  "descriptionDynamic",
  Boolean(newItem.descriptionDynamic)
)
newItem.nutrition.forEach((n) => {
  formData.append("nutrition", Number(n));
});

selectedAddonItemIds.forEach((itemId) => {
  formData.append("addonItemIds", String(itemId));
});

    // 🔍 DEBUG (REAL WAY)
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await apiClient.post(`/additem/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log("Item added", res.data);

    setAdditem(false);

    setSelectedAddonItemIds([]);

    setNewItem({
      name: "",
      price: "",
      type: "",
      itemType: "",
      chefNote: "",
      packagingId: "",
      image: null,
      ingredients: "",
      dynamicDescription: false,
      lunchDescription: "",
      dinnerDescription: "",
      nutrition: ["","","",""]
    });

    refreshData();

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Error adding item");
  }
};
const [activeField, setActiveField] = useState("lunch");
  // ✅ FETCH MEAL VARIABLES
  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const res = await apiClient.get(`/mealvariable/${id}`);
        setMealVariables(res.data);
      } catch (e) {
        console.error("Error fetching meal variables", e);
      }
    };
const fetchAvailability = async () => {
    try {
      const res = await apiClient.get(`/${id}/isAvailable`);
      setIsAvailable(res.data); // true / false
    } catch (e) {
      console.error("Error fetching availability", e);
    }
  };

  fetchVariables();
  fetchAvailability();
  }, [id]);

 const handleEdit = (row) => {
  setEditingRow(row.id);

  setEditedData({
    ...row,
    itemType: String(row.itemType || row.type || "").trim().toUpperCase(),
    addonItemIds: getExistingAddonItemIds(row),

    healthyMode: row.itemTags?.includes(1),
    jainFood: row.itemTags?.includes(2),
    todaySpecial: row.itemTags?.includes(3),

    nutrition: row.nutrition || [0,0,0,0]
  });
};

  const handleCancel = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ INSERT VARIABLE AT CURSOR
 const insertVariableAtCursor = (variableId) => {

  const field =
    activeField === "dinner"
      ? "dinnerDescription"
      : "lunchDescription";

  const textareaId =
    activeField === "dinner"
      ? "dinner-textarea"
      : "lunch-textarea";

  const textarea = document.getElementById(textareaId);

  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const text = editedData[field] || "";

  const newText =
    text.substring(0, start) +
    ` [${variableId}] ` +
    text.substring(end);

  setEditedData((prev) => ({
    ...prev,
    [field]: newText,
  }));

  setTimeout(() => {
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd =
      start + (` [${variableId}] `.length);
  }, 0);
};

  // ✅ SAVE FUNCTION
  const handleSave = async () => {

    if (!editedData.lunchDescription) {
      alert("Lunch description is required");
      return;
    }

    if (editedData.dynamicDescription && !editedData.dinnerDescription) {
      alert("Dinner description required when dynamic enabled");
      return;
    }
if (
  !editedData.nutrition ||
  editedData.nutrition.some(
    (n) =>
      n === "" ||
      n === null ||
      n === undefined
  )
) {
  alert(
    "All nutrition values are required"
  );
  return;
}
    const formData = new FormData();
    const selectedEditAddonItemIds = normalizeAddonItemIds(editedData.addonItemIds);

    formData.append("id", editedData.id);
    formData.append("name", editedData.name);
    formData.append("price", editedData.price);
    formData.append("type", editedData.type);
    formData.append("itemType", String(editedData.itemType || "").trim().toUpperCase());
    formData.append("ingredients", editedData.ingredients || "");
    formData.append("packagingId", editedData.packagingId || 0);
    formData.append("chefNote", editedData.chefNote || "");
formData.append("isAvailable", String(editedData.isAvailable));
    formData.append("descriptionChanged", true);
    formData.append("descriptionDynamic", editedData.dynamicDescription);
   formData.append(
  "healthyMode",
  Boolean(editedData.healthyMode)
)

formData.append(
  "jainFood",
  Boolean(editedData.jainFood)
)

formData.append(
  "todaySpecial",
  Boolean(editedData.todaySpecial)
)

formData.append(
  "isBreakfast",
  Boolean(editedData.isBreakfast)
)

formData.append(
  "isLunch",
  Boolean(editedData.isLunch)
)

formData.append(
  "isDinner",
  Boolean(editedData.isDinner)
)

formData.append(
  "descriptionDynamic",
  Boolean(editedData.descriptionDynamic)
)
    formData.append("lunchDescription", editedData.lunchDescription);

    if (editedData.dynamicDescription) {
      formData.append("dinnerDescription", editedData.dinnerDescription);
    }

   if (editedData.image instanceof File) {
  formData.append("image", editedData.image);
  formData.append("imageurl", true);
} else {
  formData.append("image", new Blob(), "empty.jpg");
  formData.append("imageurl", false);
}
    // }
editedData.nutrition?.forEach((n) => {
  formData.append("nutrition", Number(n));
});

selectedEditAddonItemIds.forEach((itemId) => {
  formData.append("addonItemIds", String(itemId));
});

    try {
      await apiClient.put(
        `/edititem/${id}/${editedData.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditingRow(null);
      refreshData();
    } catch (err) {
      console.error(err);
      alert("Error updating item");
    }
  };
  const getRelatedMenuItems = (itemType = newItem.itemType) => {
    const currentItemType = String(itemType || "").trim().toUpperCase();

    if (currentItemType === "MAIN") {
      return (data || []).filter((item) => {
        const itemTypeValue = String(item?.itemType || item?.type || "").trim().toUpperCase();
        return itemTypeValue === "ADDON";
      });
    }

    if (currentItemType === "ADDON") {
      return (data || []).filter((item) => {
        const itemTypeValue = String(item?.itemType || item?.type || "").trim().toUpperCase();
        return itemTypeValue === "MAIN";
      });
    }

    return [];
  };

  const relatedMenuItems = getRelatedMenuItems();

  const getRelatedItemList = (item) => {
    const currentItemType = String(item?.itemType || item?.type || "").trim().toUpperCase();

    if (currentItemType === "MAIN") {
      const addonItems = item?.addonsformain || item?.addonItems || item?.addons || [];

      if (addonItems.length > 0) {
        return addonItems;
      }
    }

    if (currentItemType === "ADDON") {
      const mainItems = item?.mainItems || item?.mainItemList || item?.mains || [];

      if (mainItems.length > 0) {
        return mainItems;
      }
    }

    const relatedIds = normalizeAddonItemIds(item?.addonItemIds || []);

    if (relatedIds.length > 0) {
      return (data || []).filter((entry) => relatedIds.includes(String(entry.id)));
    }

    return [];
  };

  const toggleRestaurantAvailability = async () => {
  try {
    await apiClient.put(`/${id}/isAvailable`, {
      isAvailable: !isAvailable
    });

    setIsAvailable((prev) => !prev); // update UI instantly
    refreshData();

  } catch (err) {
    console.error(err);
    alert("Error updating restaurant availability");
  }
};

  return (
    <div className="flex w-full max-w-full min-w-0 flex-col items-center text-center px-2">
      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-2 sm:justify-between">
        <button
          className="border-2 px-2 rounded hover:bg-gray-100"
          onClick={toggleRestaurantAvailability}
        >
          {isAvailable ? "Make Unavailable" : "Make Available"}
        </button>
      {isAdmin && (
  <button
    className="border-2 px-2 rounded hover:bg-gray-100"
    onClick={() => setAdditem(!additem)}
  >
    Add item
  </button>
)}
      </div>
      {additem && (
        <div className="mt-4 w-full max-w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-x-auto">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-800">Add item</h3>
              <button
                type="button"
                className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
                onClick={() => setAdditem(false)}
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3">
            <input
              className="w-full border px-2 py-2"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => handleNewItemChange("name", e.target.value)}
            />
            <input
              className="w-full border px-2 py-2"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => handleNewItemChange("price", e.target.value)}
            />
            <select
              className="w-full border px-2 py-2"
              value={newItem.type}
              onChange={(e) => handleNewItemChange("type", e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            <select
              className="w-full border px-2 py-2"
              value={newItem.itemType}
              onChange={(e) => handleNewItemChange("itemType", e.target.value)}
            >
              <option value="">Select item type</option>
              <option value="MAIN">MAIN</option>
              <option value="ADDON">ADDON</option>
            </select>
            <input
              className="w-full border px-2 py-2"
              placeholder="Ingredients"
              value={newItem.ingredients}
              onChange={(e) => handleNewItemChange("ingredients", e.target.value)}
            />
            <input
              className="w-full border px-2 py-2"
              placeholder="Packaging Id"
              value={newItem.packagingId}
              onChange={(e) => handleNewItemChange("packagingId", e.target.value)}
            />
            <input
              type="file"
              className="text-sm"
              onChange={(e) => handleNewItemChange("image", e.target.files[0])}
            />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={newItem.dynamicDescription}
                onChange={(e) => handleNewItemChange("dynamicDescription", e.target.checked)}
              />
              Dynamic description
            </label>

            {newItem.dynamicDescription ? (
              <>
                <textarea
                  className="min-h-[80px] w-full border px-2 py-2"
                  placeholder="Lunch description"
                  value={newItem.lunchDescription}
                  onChange={(e) => handleNewItemChange("lunchDescription", e.target.value)}
                />
                <textarea
                  className="min-h-[80px] w-full border px-2 py-2"
                  placeholder="Dinner description"
                  value={newItem.dinnerDescription}
                  onChange={(e) => handleNewItemChange("dinnerDescription", e.target.value)}
                />
              </>
            ) : (
              <textarea
                className="min-h-[110px] w-full border px-2 py-2"
                placeholder="Lunch description"
                value={newItem.lunchDescription}
                onChange={(e) => handleNewItemChange("lunchDescription", e.target.value)}
              />
            )}

            <textarea
              className="min-h-[70px] w-full border px-2 py-2"
              placeholder="Chef note"
              value={newItem.chefNote}
              onChange={(e) => handleNewItemChange("chefNote", e.target.value)}
            />
          </div>
        </div>

        {newItem.itemType && (
          <div className="rounded-lg border border-gray-200 p-3 overflow-x-auto">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              {newItem.itemType === "MAIN" ? "Select addon items" : "Select main items"}
            </p>

            {relatedMenuItems.length > 0 ? (
              <div className="grid min-w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {relatedMenuItems.map((item) => {
                  const itemId = String(item.id);
                  const isChecked = selectedAddonItemIds.includes(itemId);

                  return (
                    <label
                      key={item.id}
                      className="flex items-start gap-2 rounded border border-gray-200 bg-gray-50 p-2 text-left text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          setSelectedAddonItemIds((prev) =>
                            e.target.checked
                              ? [...new Set([...prev, itemId])]
                              : prev.filter((id) => id !== itemId)
                          );
                        }}
                      />
                      <span>{item.name} (ID: {item.id})</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-amber-600">
                No {newItem.itemType === "MAIN" ? "ADDON" : "MAIN"} items available for this restaurant yet.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-3 overflow-x-auto">
            <p className="mb-2 text-sm font-semibold text-gray-700">Tags</p>
            <div className="grid min-w-full grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
              {[
                ["healthyMode", "Healthy"],
                ["jainFood", "Jain"],
                ["todaySpecial", "Today Special"],
                ["isBreakfast", "Breakfast"],
                ["isLunch", "Lunch"],
                ["isDinner", "Dinner"]
              ].map(([field, label]) => (
                <label key={field} className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50 p-2">
                  <input
                    type="checkbox"
                    checked={newItem[field]}
                    onChange={(e) => handleNewItemChange(field, e.target.checked)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-3 overflow-x-auto">
            <p className="mb-2 text-sm font-semibold text-gray-700">Nutrition</p>
            <div className="grid min-w-full grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                ["Calories", 0],
                ["Protein", 1],
                ["Carbs", 2],
                ["Fat", 3]
              ].map(([label, index]) => (
                <input
                  key={label}
                  type="number"
                  className="w-full border px-2 py-2"
                  placeholder={label}
                  value={newItem.nutrition[index]}
                  onChange={(e) => {
                    const updated = [...newItem.nutrition];
                    updated[index] = e.target.value;
                    handleNewItemChange("nutrition", updated);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
            onClick={() => setAdditem(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600"
            onClick={handleAddItem}
          >
            Save item
          </button>
        </div>
      </div>
    </div>
  )}
    <div className="mt-8 w-full max-w-full overflow-x-auto">
      <div className="min-w-0 w-full">
        <table className="border-4 border-blue-700 mx-auto min-w-[980px] w-full table-auto">
      <thead>
        <tr>
          <th className="px-5 py-2 border">Id</th>
          <th className="px-5 py-2 border">isAvailable</th>
          <th className="px-5 py-2 border">Meal tag</th>
          <th className="px-5 py-2 border">Availabiliy</th>

          <th className="px-5 py-2 border">Name</th>
          <th className="px-5 py-2 border">Price</th>
          <th className="px-5 py-2 border">Type</th>
          <th className="px-5 py-2 border">
  Nutrition
</th>
          <th className="px-5 py-2 border">Description</th>
          <th className="px-5 py-2 border">Image</th>
          {isAdmin && (
          <th className="px-5 py-2 border">Edit</th>)}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border">

            {editingRow === item.id ? (
              <>
                <td>{item.id}</td>
<td>
  <select
    value={editedData.isAvailable}
    onChange={(e) =>
      handleChange("isAvailable", e.target.value === "true")
    }
  >
    <option value="true">Available</option>
    <option value="false">Not Available</option>
  </select>
</td>
<td> <div className="flex gap-2 flex-wrap">

<label>
  <input
    type="checkbox"
    checked={editedData.healthyMode || false}
    onChange={(e) =>
      handleChange("healthyMode", e.target.checked)
    }
  />
  Healthy
</label>

<label>
  <input
    type="checkbox"
    checked={editedData.jainFood || false}
    onChange={(e) =>
      handleChange("jainFood", e.target.checked)
    }
  />
  Jain
</label>

<label>
  <input
    type="checkbox"
    checked={editedData.todaySpecial || false}
    onChange={(e) =>
      handleChange("todaySpecial", e.target.checked)
    }
  />
  Today Special
</label>

</div>
</td>
<td> <div className="flex gap-2 flex-wrap">

<label>
  <input
    type="checkbox"
    checked={editedData.isBreakfast || false}
    onChange={(e) =>
      handleChange("isBreakfast", e.target.checked)
    }
  />
  Breakfast
</label>

<label>
  <input
    type="checkbox"
    checked={editedData.isLunch || false}
    onChange={(e) =>
      handleChange("isLunch", e.target.checked)
    }
  />
  Lunch
</label>

<label>
  <input
    type="checkbox"
    checked={editedData.isDinner || false}
    onChange={(e) =>
      handleChange("isDinner", e.target.checked)
    }
  />
  Dinner
</label>

</div></td>

                <td>
                  <input
                    value={editedData.name}
                    onChange={(e)=>handleChange("name", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    value={editedData.price}
                    onChange={(e)=>handleChange("price", e.target.value)}
                  />
                </td>

                <td>
                  <select
                    className="w-full border px-2 py-1"
                    value={editedData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </td>
<td>
  <div className="flex flex-col gap-1">

    <input
      type="number"
      placeholder="Calories"
      value={editedData.nutrition?.[0] || ""}
      onChange={(e) => {
        const updated = [...(editedData.nutrition || [0,0,0,0])];
        updated[0] = e.target.value;
        handleChange("nutrition", updated);
      }}
    />

    <input
      type="number"
      placeholder="Protein"
      value={editedData.nutrition?.[1] || ""}
      onChange={(e) => {
        const updated = [...(editedData.nutrition || [0,0,0,0])];
        updated[1] = e.target.value;
        handleChange("nutrition", updated);
      }}
    />

    <input
      type="number"
      placeholder="Carbs"
      value={editedData.nutrition?.[2] || ""}
      onChange={(e) => {
        const updated = [...(editedData.nutrition || [0,0,0,0])];
        updated[2] = e.target.value;
        handleChange("nutrition", updated);
      }}
    />

    <input
      type="number"
      placeholder="Fat"
      value={editedData.nutrition?.[3] || ""}
      onChange={(e) => {
        const updated = [...(editedData.nutrition || [0,0,0,0])];
        updated[3] = e.target.value;
        handleChange("nutrition", updated);
      }}
    />

  </div>
</td>
                {/* 🔥 DESCRIPTION + MEAL VARIABLES */}
                <td>
                  {editedData.itemType && (
                    <div className="mb-2 rounded border border-gray-200 bg-gray-50 p-2 text-left">
                      <p className="text-xs font-semibold text-gray-700">
                        {editedData.itemType === "MAIN"
                          ? "Addons for this MAIN item"
                          : "Main items for this ADDON item"}
                      </p>
                      <div className="mt-1 flex flex-col gap-1 text-xs text-gray-700">
                        {getRelatedMenuItems(editedData.itemType).length > 0 ? (
                          getRelatedMenuItems(editedData.itemType).map((item) => {
                            const itemId = String(item.id);
                            const selectedIds = normalizeAddonItemIds(editedData.addonItemIds);
                            const isChecked = selectedIds.includes(itemId);

                            return (
                              <label key={item.id} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const currentIds = normalizeAddonItemIds(editedData.addonItemIds);
                                    const nextIds = e.target.checked
                                      ? [...new Set([...currentIds, itemId])]
                                      : currentIds.filter((id) => id !== itemId);

                                    handleChange("addonItemIds", nextIds);
                                  }}
                                />
                                <span>{item.name} (ID: {item.id})</span>
                              </label>
                            );
                          })
                        ) : (
                          <span className="text-amber-600">
                            No related items available.
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ✅ MEAL VARIABLE BUTTONS */}
                  <div className="flex gap-2 flex-wrap mb-2">
                    {mealVariables.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        className="bg-gray-200 px-2 py-1 rounded text-xs"
                        onClick={() => insertVariableAtCursor(v.id)}
                      >
                        {v.mealName}
                      </button>
                    ))}
                  </div>

                  <label>
                    <input
                      type="checkbox"
                      checked={editedData.dynamicDescription}
                      onChange={(e)=>handleChange("dynamicDescription", e.target.checked)}
                    /> Dynamic
                  </label>

                  {editedData.dynamicDescription ? (
                    <>
                      <textarea
                        id="lunch-textarea"
                        className="min-h-[80px] w-full border px-2 py-2"
                        onFocus={() => setActiveField("lunch")}
                        placeholder="Lunch"
                        value={editedData.lunchDescription}
                        onChange={(e)=>handleChange("lunchDescription", e.target.value)}
                      />
                      <textarea
                        id="dinner-textarea"
                        className="min-h-[80px] w-full border px-2 py-2"
                        onFocus={() => setActiveField("dinner")}
                        placeholder="Dinner"
                        value={editedData.dinnerDescription}
                        onChange={(e)=>handleChange("dinnerDescription", e.target.value)}
                      />
                    </>
                  ) : (
                    <textarea
                      id="lunch-textarea"
                      className="min-h-[80px] w-full border px-2 py-2"
                      onFocus={() => setActiveField("lunch")}
                      placeholder="Lunch"
                      value={editedData.lunchDescription}
                      onChange={(e)=>handleChange("lunchDescription", e.target.value)}
                    />
                  )}

                </td>
                <td>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleChange("image", e.target.files[0])
                      }
                    />

                    {editedData.image && !(editedData.image instanceof File) && (
                      <img
                        src={editedData.image}
                        alt="preview"
                        className="w-20 h-20 object-cover border"
                      />
                    )}

                    {editedData.image instanceof File && (
                      <p>{editedData.image.name}</p>
                    )}
                  </div>
                </td>
                <td>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{item.id}</td>
                <td>{item.isAvailable ? "Available" : "Not Available"}</td>
                <td>{item.isBreakfast ? "Breakfast " : ""}{item.isLunch ? "| Lunch " : ""}{item.isDinner ? "| Dinner " : ""}</td>
              <td>
  {item.itemTags.map((itemval) => {
    if (itemval === 1) return "Healthy |";
    if (itemval === 2) return "Jain |";
    if (itemval === 3) return "Today Special ";
    return "";
  })}
</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>
  Calories: {item.nutrition?.[0] || 0}
  <br />
  Protein: {item.nutrition?.[1] || 0}
  <br />
  Carbs: {item.nutrition?.[2] || 0}
  <br />
  Fat: {item.nutrition?.[3] || 0}
</td>

                <td>
  {item.dynamicDescription ? (
    <>
      <div>
        <b>L:</b> {item.lunchDescription}
        <br />
        👁 {item.publiclunchDescription}
      </div>

      <div>
        <b>D:</b> {item.dinnerDescription}
        <br />
        👁 {item.publicdinnerDescription}
      </div>
    </>
  ) : (
    <div>
      <b>L:</b> {item.lunchDescription}
      <br />
      👁 {item.publiclunchDescription}
    </div>
  )}

  {(() => {
    const relatedItems = getRelatedItemList(item);

    if (!relatedItems.length) return null;

    return (
      <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-2 text-left text-xs">
        <div className="font-semibold text-gray-700">
          {String(item?.itemType || item?.type || "").trim().toUpperCase() === "MAIN"
            ? "Addons"
            : "Main Items"}
        </div>
        <div className="text-gray-600">
          {relatedItems
            .map((entry) => entry?.name || entry)
            .filter(Boolean)
            .join(", ")}
        </div>
      </div>
    );
  })()}
</td>
<td>
  {item.image ? (
    <img
      src={item.image} className='w-20'/>
  ) : null}
  </td>
{isAdmin && (
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </td>
                )}
              </>

            )}

          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  );
};

export default Index;