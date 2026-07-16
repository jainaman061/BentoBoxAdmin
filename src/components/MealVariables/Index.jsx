import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

const MealVariablesPage = ({ data }) => {

  const [variables, setVariables] = useState([]);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // ✅ GET ALL VARIABLES
  const fetchVariables = async () => {
    try {
      const res = await apiClient.get(`/mealvariable/${data}`);
      setVariables(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, [data]);

  // ✅ ADD VARIABLE
  const handleAdd = async () => {
    if (!newName.trim()) return;

    try {
      await apiClient.post(`/mealvariable/add/${data}`, {
        mealName: newName,
      });

      setNewName("");
      fetchVariables();
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/mealvariable/delete/${id}/${data}`);
      fetchVariables();
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ START EDIT
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.mealName);
  };

  // ✅ SAVE EDIT
  const handleSave = async (id) => {
    try {
      await apiClient.put(`/mealvariable/edit/${id}/${data}`, {
        mealName: editName,
      });

      setEditingId(null);
      setEditName("");
      fetchVariables();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4">

      <h2 className="text-xl font-bold mb-4">Meal Variables</h2>

      {/* ✅ ADD */}
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1"
          placeholder="Enter meal variable (e.g. gravy_sabzi)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {/* ✅ LIST */}
      <table className="border w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Meal Name</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {variables.map((item) => (
            <tr key={item.id} className="text-center">

              <td className="border px-2 py-2">{item.id}</td>

              <td className="border px-2 py-2">
                {editingId === item.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2"
                  />
                ) : (
                  item.mealName
                )}
              </td>

              <td className="border px-2 py-2 flex justify-center gap-2">

                {editingId === item.id ? (
                  <>
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}

              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default MealVariablesPage;