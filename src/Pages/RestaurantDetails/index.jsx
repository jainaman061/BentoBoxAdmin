import React, { useState } from 'react'
import apiClient from '../../utils/apiclient'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Menu from "../../components/Menu/Index"
import Orders from "../../components/orders/index"
import Subscriptionsorders from "../../components/SubscriptionOrders/index"
import Subscription from "../../components/subscriptions/Index"
import SubscriptionHistory from "../../components/Subscription History/Index"
import Navbar from "../../components/NavBar/Index"
const Index = () => {
    const {id}=useParams();
    const[menu,SetMenu] = useState([]);
    const[orders,SetOrders] = useState([]);
    const[subscriptionsorders,Setsubscriptionsorders] = useState([]);
    const[subscriptions,Setsubscriptions] = useState([]);
    const[subscriptionHistory,SetsubscriptionHistory] = useState([]);
    const [activeSession,SetactiveSession]=useState("menu");
    
    // console.log(id)
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const menu = await apiClient.get (`/items/${id}`);
                const orders = await apiClient.get (`/orders/${id}`);
                const subscriptionsorders = await apiClient.get (`/subscriptionOrders/${id}`);
                const subscriptions = await apiClient.get (`/subscriptions/${id}`);
                const subscriptionHistory = await apiClient.get (`/subscriptionHistory/${id}`);
                SetMenu(menu.data);
                SetOrders(orders.data)
                Setsubscriptionsorders(subscriptionsorders.data)
                Setsubscriptions(subscriptions.data)
                SetsubscriptionHistory(subscriptionHistory.data)
 
            }
            catch (err) {
        console.error("Something went wrong",err);
      }
        }
        fetchData();
    },[])
  return (
    <div className='flex flex-col  items-center text-center'>
       <div className='justify-between w-screen'>
        <Navbar />
       </div>
    <div className='flex flex-col justify-center items-center text-center '>
        <div className='flex gap-4 mb-6 justify-center items-center mt-6  '>
            <button className='border-2 px-4 bg-blue-400' onClick={()=>{SetactiveSession("menu")}}>Menu</button>
            <button className='border-2 px-4 bg-blue-400' onClick={()=>{SetactiveSession("orders")}}>Orders</button>
            <button className='border-2 px-4 bg-blue-400' onClick={()=>{SetactiveSession("Subscription orders")}}>Subscription orders</button>
            <button className='border-2 px-4 bg-blue-400' onClick={()=>{SetactiveSession("Subscriptions")}}>Subscriptions</button>
            <button className='border-2 px-4 bg-blue-400' onClick={()=>{SetactiveSession("SubscriptionHistory")}}>Subscriptions history</button>
        </div>
        </div>

        
        


        {/* <h1 className='text-3xl'>menu</h1> */}
      {activeSession==="menu" && <Menu data={menu}/>}
      {/* <h1 className='text-3xl'>orders</h1> */}
      {activeSession==="orders" &&<Orders data={orders}/>}
      {/* <h1 className='text-3xl'>subscriptionsorders</h1> */}
      {activeSession==="Subscription orders" && <Subscriptionsorders data={subscriptionsorders} />}
      {/* <h1 className='text-3xl'>subscriptions</h1> */}
      {activeSession==="Subscriptions" &&<Subscription data={subscriptions} />}
      {/* <h1 className='text-3xl'>subscription History</h1> */}
      {activeSession==="SubscriptionHistory" &&<SubscriptionHistory data={subscriptionHistory} />}

    
      
    </div>
  )
}

export default Index
