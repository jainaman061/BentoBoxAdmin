import React, { useState } from 'react';
import apiClient from '../../utils/apiclient';

const Index = ({ data, id, refreshData }) => {

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row });
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

  // 🔥 FINAL EDIT FUNCTION
  const handleSave = async () => {

    // ✅ VALIDATION
    if (!editedData.lunchDescription) {
      alert("Lunch description is required");
      return;
    }

    if (editedData.dynamicDescription && !editedData.dinnerDescription) {
      alert("Dinner description required when dynamic enabled");
      return;
    }

    const formData = new FormData();

    // ✅ REQUIRED PARAMS
    formData.append("id", editedData.id);
    formData.append("name", editedData.name);
    formData.append("price", editedData.price);
    formData.append("type", editedData.type);
    formData.append("ingredients", editedData.ingredients || "");
    formData.append("packagingId", editedData.packagingId || "");
    formData.append("chefNote", editedData.chefNote || "");

    // ✅ FLAGS
    formData.append("descriptionChanged", true);
    formData.append("descriptionDynamic", editedData.dynamicDescription);

    // ✅ DESCRIPTION LOGIC
    formData.append("lunchDescription", editedData.lunchDescription);

    if (editedData.dynamicDescription) {
      formData.append("dinnerDescription", editedData.dinnerDescription);
    }

    // ❌ PUBLIC DESCRIPTIONS NOT SENT

    // ✅ IMAGE FIX (VERY IMPORTANT)
    if (editedData.image) {
      formData.append("image", editedData.image);
      formData.append("imageurl", false);
    } else {
      // send empty file to satisfy backend
      formData.append("image", new Blob(), "empty.jpg");
      formData.append("imageurl", true);
    }

    // 🔍 DEBUG (optional)
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      await apiClient.put(
        `/edititem/${id}/${editedData.id}`, // ✅ CORRECT
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

  return (
    <table className="border-4 border-blue-700 mt-8 mx-auto">
      <thead>
        <tr>
          <th className="px-5 py-2 border">Id</th>
          <th className="px-5 py-2 border">Name</th>
          <th className="px-5 py-2 border">Price</th>
          <th className="px-5 py-2 border">Type</th>
          <th className="px-5 py-2 border">Description</th>
          <th className="px-5 py-2 border">Edit</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border">

            {editingRow === item.id ? (
              <>
                <td>{item.id}</td>

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
                  <input
                    value={editedData.type}
                    onChange={(e)=>handleChange("type", e.target.value)}
                  />
                </td>

                {/* ✅ EDIT DESCRIPTION */}
                <td>
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
                        placeholder="Lunch"
                        value={editedData.lunchDescription}
                        onChange={(e)=>handleChange("lunchDescription", e.target.value)}
                      />
                      <textarea
                        placeholder="Dinner"
                        value={editedData.dinnerDescription}
                        onChange={(e)=>handleChange("dinnerDescription", e.target.value)}
                      />
                    </>
                  ) : (
                    <textarea
                      placeholder="Lunch"
                      value={editedData.lunchDescription}
                      onChange={(e)=>handleChange("lunchDescription", e.target.value)}
                    />
                  )}
                </td>

                <td>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>

                <td>
                  {item.dynamicDescription ? (
                    <>
                      <div>
                        <b>L:</b> {item.lunchDescription} → 👁 {item.publiclunchDescription}
                      </div>
                      <div>
                        <b>D:</b> {item.dinnerDescription} → 👁 {item.publicdinnerDescription}
                      </div>
                    </>
                  ) : (
                    <div>
                      <b>L:</b> {item.lunchDescription} → 👁 {item.publiclunchDescription}
                    </div>
                  )}
                </td>

                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </td>
              </>
            )}

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Index;