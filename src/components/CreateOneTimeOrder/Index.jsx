import React, { useState } from "react";
import apiClient from "../../utils/apiclient";

const Index = () => {
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [Userid,SetUserId]=useState("")
  const [Coupon,SetCoupon]=useState("")

  const [useBBCurrency, setUseBBCurrency] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);

  const [itemDetails, setItemDetails] = useState([
    { itemid: "", count: 1 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...itemDetails];
    updatedItems[index][field] = value;
    setItemDetails(updatedItems);
  };

  const addItem = () => {
    setItemDetails([...itemDetails, { itemid: "", count: 1 }]);
  };

  const removeItem = (index) => {
    setItemDetails(itemDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = async(e) => {
        // 👉 call API here
    try {
        e.preventDefault();

    const payload = {
        
      starttime,
      endtime,
      itemDetails,
      useBBCurrency,
      onlinePayment,
      couponId: Coupon || null
    };

    console.log("Order Payload:", payload);

        const response = await apiClient.post(`/create/order/${Userid}`,
            payload
        );
        console.log(response.data)
        alert("Order created successfully");
      } catch (e) {
        console.log(e);
      }
  };

  return (
   <div className=" "><form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <h2 className="pb-2 text-center">Create Order</h2>
 <input
 className="border border-gray-600"
            type="text"
            placeholder="User ID"
            value={Userid}
            onChange={(e) =>
             SetUserId(e.target.value)
            }
            required
          />
      <div>
        <label className="pr-4">Start Time</label>
      <input
        type="time"
        value={starttime}
        onChange={(e) => setStarttime(e.target.value)}
        required
      /> </div>

      <label className="pr-4">End Time</label>
      <input
        type="time"
        value={endtime}
        onChange={(e) => setEndtime(e.target.value)}
        required
      />

      <h3 className="py-4">Items</h3>

      {itemDetails.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Item ID"
            value={item.itemid}
            onChange={(e) =>
              handleItemChange(index, "itemid", e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Count"
            min="1"
            value={item.count}
            onChange={(e) =>
              handleItemChange(index, "count", Number(e.target.value))
            }
            required
          />

          {itemDetails.length > 1 && (
            <button type="button" onClick={() => removeItem(index)}>
              ❌
            </button>
          )}
        </div>
      ))}

      <button type="button" className="border border-purple-400 p-2 " onClick={addItem}>
        ➕ Add Item
      </button>

      <div className="p-2">
        <label>
          <input
            type="checkbox"
            checked={useBBCurrency}
            onChange={(e) => setUseBBCurrency(e.target.checked)}
          />
          Use BB Currency
        </label>
      </div>

      <div className="p-2">
        <label>
          <input
            type="checkbox"
            checked={onlinePayment}
            onChange={(e) => setOnlinePayment(e.target.checked)}
          />
          Online Payment
        </label>
      </div>
<input
 className="border border-gray-600"
            type="text"
            placeholder="Coupon ID"
            value={Coupon}
            onChange={(e) =>
             SetCoupon(e.target.value)
            }
            
          />
          <br />
      <button type="submit" className="mt-2 border border-green-600">Submit Order</button>
    </form>
    </div> 
  );
};

export default Index;
