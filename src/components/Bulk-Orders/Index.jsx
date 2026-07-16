import { memo, useEffect, useState } from 'react';
import apiClient from '../../utils/apiclient';

const Index = () => {
const isAdmin = localStorage.getItem("bentoAdminDetails") == 4 ? true : false;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/bulk-orders');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching bulk orders:', error);
            }
        };

        fetchData();
    }, []);

    const handleCall  = async (id) => {
            const response = await apiClient.put(`/bulk-orders/${id}/called`);

            if(response.status===200){
                setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, called: true }
          : item
      )
    );
            }

    }
    const handleDone  = async (id) => {
            const response = await apiClient.put(`/bulk-orders/${id}/done`);
            if(response.status===200){
                setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, done: true }
          : item
      )
    );
            }
        }
  return (
   <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-4xl font-black">
        Bulk Orders
      </h1>
      <p className="text-gray-400 mt-1">
        Manage all bulk catering requests
      </p>
    </div>

   
  </div>

  {/* Stats */}
  

  {/* Table */}
  <div className="bg-white/5 border border-white/10 rounded-[28px] overflow-hidden backdrop-blur-xl">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-orange-500/10 border-b border-white/10">
          <tr className="text-left">
            <th className="px-6 py-5">Customer</th>
            <th className="px-6 py-5">Phone</th>
            <th className="px-6 py-5">Delivery</th>
            <th className="px-6 py-5">People</th>
            <th className="px-6 py-5">Food</th>
            <th className="px-6 py-5">Budget</th>
            <th className="px-6 py-5">Additional Requirements</th>
            <th className="px-6 py-5">Status</th>
            {(isAdmin) && (
            <th className="px-6 py-5 text-center">
              Actions
            </th>)}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="px-6 py-5">
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {item.deliveryLocation} 
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                {item.phoneNumber}        
              </td>

              <td className="px-6 py-5">
                <div>
                  <p>{item.deliveryDate}</p>

                  <p className="text-sm text-gray-400">
                    {item.deliverySlot}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                {item.peopleRange}
              </td>

              <td className="px-6 py-5">
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
                    {item.foodTypes}
                  </span>

                  
                </div>
              </td>

              <td className="px-6 py-5">
                {item.budgetRange}
              </td>
              <td className="px-6 py-5">
                {item.additionalRequirements}
              </td>

              <td className="px-6 py-5">
                <span className="bg-yellow-500/10 text-yellow-400 px-3 py-2 rounded-full text-xs font-semibold">
                  {item.done&&item.called?"Completed":item.called?"Called":"Pending"}
                </span>
              </td>

              <td className="px-6 py-5">
                {(isAdmin) && (
                <div className="flex gap-2 justify-center">
                  <button className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-xl text-sm font-medium" onClick={()=>handleCall(item.id)}>
                    {item.called?"Called":"Call"}
                  </button>

                  <button className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-xl text-sm font-medium" onClick={()=>handleDone(item.id)}>
                    {item.done?"Done":"Mark Done"}
                  </button>

               
                </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default memo(Index);