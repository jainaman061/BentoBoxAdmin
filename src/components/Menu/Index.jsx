import React, { useState } from 'react';
import apiClient from '../../utils/apiclient';

const Index = ({ data ,id}) => {
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

  const handleSave = async () => {
    
      console.log(editedData);
      try{
        const response = await apiClient.put(
  `/edititem/${id}/${editedData.id}`,editedData);
      
      console.log(response)

      if (response.status===200) {
        alert("Item updated successfully!");
        setEditingRow(null);
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while saving data");
    }
  };

  return (
    <table className="border-4 border-blue-700 mt-8 mx-auto">
      <thead>
        <tr>
          <th className="px-5 py-2 border">Item Id</th>
          <th className="px-5 py-2 border">isAvailable</th>
          <th className="px-5 py-2 border">Name</th>
          <th className="px-5 py-2 border">Price</th>
          <th className="px-5 py-2 border">Type</th>
          <th className="px-5 py-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index} className="items-center justify-center border border-sky-600">
              {editingRow === item.id ? (
                <>
                  <td className="text-center p-2">{item.id}</td>

                  {/* Availability Dropdown */}
                  <td className="text-center p-2">
                    <select
                      className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedData.isAvailable ? "true" : "false"}
                      onChange={(e) =>
                        handleChange("isAvailable", e.target.value === "true")
                      }
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </td>

                  {/* Name */}
                  <td className="text-center p-2">
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="text-center border px-2 py-1 rounded"
                    />
                  </td>

                  {/* Price */}
                  <td className="text-center p-2">
                    <input
                      type="number"
                      value={editedData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="w-14 text-center border px-2 py-1 rounded"
                    />
                  </td>

                  {/* Type Dropdown */}
                  <td className="text-center p-2">
                    <select
                      className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editedData.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                    >
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                    </select>
                  </td>

                  {/* Save / Cancel Buttons */}
                  <td className="text-center p-2">
                    <button
                      className="border-2 px-2 bg-green-500 text-white rounded mr-2"
                      onClick={handleSave}
                    >
                      Ok
                    </button>
                    <button
                      className="border-2 px-2 bg-red-500 text-white rounded"
                      onClick={handleCancel}
                    >
                      X
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="text-center p-2">{item.id}</td>
                  <td className="text-center">
                    {item.isAvailable ? "Available" : "Not Available"}
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">{item.type}</td>
                  <td className="text-center">
                    <button
                      className="border-2 px-2 rounded hover:bg-gray-100"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center p-4">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Index;
