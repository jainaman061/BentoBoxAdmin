import { memo } from 'react';
import Navbar from "../../components/NavBar/Index"
import BulkOrders from "../../components/Bulk-Orders/Index"
const Index = () => {
  return (
    <div className='flex flex-col '>
      <Navbar />
      <BulkOrders />
    </div>
  );
};

export default memo(Index);