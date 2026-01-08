import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiclient";

const Index = () => {
  const [data, setData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newContainerData, setnewContainerData] = useState({});
  const [newContainer,SetnewConatiner]= useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await apiClient.get("/coupon");
        console.log(response.data);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchdata();
  }, []);

  const handleEditClick = (row) => {
    setEditRow(row.id);
    setEditedData({ ...row });
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };
   const handlenewChange = (e, field) => {
    setnewContainerData({ ...newContainerData, [field]: e.target.value });
  };

  const handleSave = async() => {

    try{
      const formdata = await apiClient.put(
  `/editcontainer?id=${editedData.id}&name=${editedData.name}&price=${editedData.price}`);
  console.log(formdata.data);
  

    }
    catch(e){
      console.log(e);
      
    }
    const updatedData = data.map((item) =>
      item.id === editedData.id ? editedData : item
    );
    setData(updatedData);

   

    setEditRow(null);
  };
  const handleAdd=async()=>{
     try{
      const formData =new FormData();
      formData.append("name",newContainerData.name)
      formData.append("maximumDiscount",parseInt(newContainerData.maximumDiscount))
      formData.append("minimumOrderValue",parseInt(newContainerData.minimumOrderValue))
      formData.append("discountPercentage",parseInt(newContainerData.discountPercentage))
      const response = await apiClient.post("/coupon/add", formData,{
         headers: {
        "Content-Type": "multipart/form-data",
      },
      });
    console.log(response.data);
        const updatedResponse = await apiClient.get("/coupon");
    setData(updatedResponse.data);

    }
    catch(e){
      console.log(e);
      
    }
   

    
    console.log(newContainerData);
    
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      <table className="border-4 border-blue-700 mt-12 w-1/2 mb-4 ">
        <thead>
          <tr>
            <th className="px-5">Id</th>
            <th className="px-5">Name</th>
            <th className="px-5">isvalid</th>
            <th className="px-5">maximumDiscount</th>
            <th className="px-5">minimumOrderValue</th>
            <th className="px-5">discountPercentage</th>
            <th className="px-5">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="items-center justify-center border border-sky-600"
            >
              <td className="text-center">{row.id}</td>

              <td className="text-center">
                {editRow === row.id ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                ) : (
                  row.name
                )}
              </td>
               <td className="text-center">
                {editRow === row.id ? (
                  <input
                    type="text"
                    value={editedData.isvalid?"true":"false"}
                    onChange={(e) => handleChange(e, "isvalid")}
                  />
                ) : (
                  row.isvalid?  "true":"false"
                )}
              </td> <td className="text-center">
                {editRow === row.id ? (
                  <input
                    type="text"
                    value={editedData.maximumDiscount}
                    onChange={(e) => handleChange(e, "maximumDiscount")}
                  />
                ) : (
                  row.maximumDiscount
                )}
              </td> <td className="text-center">
                {editRow === row.id ? (
                  <input
                    type="text"
                    value={editedData.minimumOrderValue}
                    onChange={(e) => handleChange(e, "minimumOrderValue")}
                  />
                ) : (
                  row.minimumOrderValue
                )}
              </td> <td className="text-center">
                {editRow === row.id ? (
                  <input
                    type="text"
                    value={editedData.discountPercentage}
                    onChange={(e) => handleChange(e, "discountPercentage")}
                  />
                ) : (
                  row.discountPercentage
                )}
              </td>

              

              <td className="text-center">
                {editRow === row.id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(row)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-500 text-white px-3 py-1 rounded justify-center text-center"
                  onClick={()=>SetnewConatiner(!newContainer)}>
                    Add new Coupon
                  </button>
                  {newContainer? <div className="mt-2">
                    <input
                    type="text"
                    placeholder="Coupon name"
                    className="border-2 border-indigo-600 text-center mr-2"
                    onChange={(e) => handlenewChange(e, "name")}
                    
                    
                  />
                   
                   <input
                    type="number"
                    placeholder="maximumDiscount"
                    className="border-2 border-indigo-600 text-center"
                      onChange={(e) => handlenewChange(e, "maximumDiscount")}
                    
                  />
                   <input
                    type="number"
                    placeholder="minimumOrderValue"
                    className="border-2 border-indigo-600 text-center"
                      onChange={(e) => handlenewChange(e, "minimumOrderValue")}
                    
                  />
                   <input
                    type="number"
                    placeholder="discountPercentage"
                    className="border-2 border-indigo-600 text-center"
                      onChange={(e) => handlenewChange(e, "discountPercentage")}
                    
                  />
                  <button
                  
                  
                    className="bg-blue-500 text-white px-3 py-1 ml-2 rounded justify-center text-center"
                  onClick={handleAdd}
                  >
                    Add
                  </button>
                  </div>:""}
    </div>
  );
};

export default Index;
