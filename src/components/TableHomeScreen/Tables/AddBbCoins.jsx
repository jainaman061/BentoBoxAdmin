import React, { useState } from 'react';
import apiClient from '../../../utils/apiclient';

const AddBbCoins = () => {

  const [formData, setFormData] = useState({
    user_id: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
   try{
     const { user_id, amount } = formData;
      await apiClient.post(`/add/BBcoins/${user_id}/${amount}`, {
        
      });
      alert('BB Coins added successfully');

    
   } catch (error) {
      alert('Failed to add BB Coins');
    console.error('Error submitting form:', error);
   }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-6"
    >
      <h1 className="text-xl font-semibold">Add BB Coins</h1>

      {/* User ID */}
      <div className="flex items-center gap-4">
        <label className="w-40 text-right">User Id</label>
        <input
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          className="border-2 border-black px-2 py-1 w-60"
        />
      </div>

      {/* Amount */}
      <div className="flex items-center gap-4">
        <label className="w-40 text-right">Amount of BB Coins</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="border-2 border-black px-2 py-1 w-60"
        />
      </div>

      <button className="bg-orange-500 text-white px-4 py-2 rounded">
        Add Coins
      </button>
    </form>
  );
};

export default AddBbCoins;