import React, { useEffect, useState } from 'react';
import apiClient from '../../utils/apiclient';

const Index = ({ data ,id,activesessione}) => {
  console.log(activesessione)
  console.log(id)
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [additem,setAdditem]= useState(false);
  const [isAvailable,SetIsAvailable]=useState([true])
   
  const initialItem = {
  name: '',
  price: '',
  description: '',
  type: '',
  chefNote: '',
  packagingId: '',
  image: null,
};


const [newItem, setNewItem] = useState(initialItem);

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

  const adddata=(field,value)=>{
    setNewItem((prev)=>({
      ...prev,
      [field]:value,
    }))
  }
  const handlenewsave = async () => {
  const formData = new FormData();
  formData.append("name", newItem.name);
  formData.append("price", newItem.price);
  formData.append("description", newItem.description);
  formData.append("type", newItem.type);
  formData.append("chefNote", newItem.chefNote);
  formData.append("packagingId", newItem.packagingId);

  if (newItem.image) {
    formData.append("image", newItem.image);
  }

  try {
    const response = await apiClient.post(`/additem/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
  } catch (error) {
    console.error("Error uploading:", error);
  }
};
useEffect(() => {
  const isAvailable = async () => {
    try {
      const response = await apiClient.get(`/${id}/isAvailable`);
      console.log(response.data); 
      SetIsAvailable(response.data)
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  isAvailable();
}, [id]);

  // const handlenewsave=async()=>{
  //    try{
  //       const response = await apiClient.post(
  // `/additem/${id}`,newItem);
      
  //     console.log(response)

  //     if (response.status===200) {
       
  //       setEditingRow(null);
  //        window.location.reload()
  //     } else {
  //       alert("Failed to update item");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error while saving data");
  //   }
  //   console.log(newItem)
  // }
  const updatestatus=async()=>{
    try{
const response = await apiClient.put(`/${id}/isAvailable`);

      if (response.status===200) {
       
        setEditingRow(null);
         window.location.reload()
      } else {
        alert("Failed to update item");
      }
    }
    catch(e){
      alert("failed to update");
    }
  }
  const handleSave = async () => {
    
      console.log(editedData);
      try{
        const response = await apiClient.put(
  `/edititem/${id}/${editedData.id}`,editedData);
      
      console.log(response)

      if (response.status===200) {
       
        setEditingRow(null);
         window.location.reload()
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while saving data");
    }
  };

  return (
    <>
    <div>
      {isAvailable? <button className="border-2 px-2 rounded hover:bg-gray-100" onClick={()=>{
        SetIsAvailable(!isAvailable);
        updatestatus();
      }} >Make Unavailable</button>: <button className="border-2 px-2 rounded hover:bg-gray-100"  onClick={()=>{
        SetIsAvailable(!isAvailable);
        updatestatus();
      }}>Make Available</button>}
           

      <button className="border-2 px-2 rounded hover:bg-gray-100" onClick={()=>setAdditem(!additem)}>Add item</button>
    </div>
    {additem?<div className='mt-4 flex'>
      <input type='text' className="w-16 text-center border px-2 py-1 rounded  " placeholder='name' value={newItem.name} onChange={(e) => adddata("name", e.target.value)}/>
      <input type='text' className="w-16 text-center border px-2 py-1 rounded" placeholder='price' value={newItem.price}onChange={(e) => adddata("price", e.target.value)}/>
      <textarea className=" w-full h-full   text-center border px-2 py-1 rounded placeholder:text-center" value={newItem.description} placeholder='description' onChange={(e) => adddata("description", e.target.value)}/>
      <input type='text' className="w-20 text-center border px-2 py-1 rounded" placeholder='type' value={newItem.type} onChange={(e) => adddata("type", e.target.value)}/>
      <textarea className="w-54 text-center border px-2 py-1 rounded" placeholder='chefNote' value={newItem.chefNote} onChange={(e) => adddata("chefNote", e.target.value)}/>
      <input type='text' className="w-14 text-center border px-2 py-1 rounded" placeholder='packagingId' value={newItem.packagingId} onChange={(e) => adddata("packagingId", e.target.value)}/>
      <input type='file' accept='image/*' className="w-54 text-center border px-2 py-1 rounded"  onChange={(e) => adddata("image", e.target.files[0])}/>
      <button
      className="border-2 px-2 bg-green-500 text-white rounded mr-2"
                    onClick={handlenewsave}
                    >
                      Ok
                    </button>
                    <button
                      className="border-2 px-2 bg-red-500 text-white rounded"
                      onClick={()=>setNewItem(initialItem)}
                    >
                      X
                    </button>
    </div>:""}
    
    <table className="border-4 border-blue-700 mt-8 mx-auto">
      <thead>
        <tr>
          <th className="px-5 py-2 border">Item Id</th>
          <th className="px-5 py-2 border">isAvailable</th>
          <th className="px-5 py-2 border">Name</th>
          <th className="px-5 py-2 border">Price</th>
          <th className="px-5 py-2 border">Type</th>
          <th className="px-5 py-2 border">description</th>
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

                  <td className="text-center p-2">
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="text-center border px-2 py-1 rounded"
                    />
                  </td>

                  <td className="text-center p-2">
                    <input
                      type="number"
                      value={editedData.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      className="w-14 text-center border px-2 py-1 rounded"
                    />
                  </td>

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
                   <td className="text-center p-2">
                    <input
                      type="text"
                      value={editedData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      className="text-center border px-2 py-1 rounded"
                    />
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
                  <td className="text-center">{item.description}</td>
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
    </>
  );
};

export default Index;
