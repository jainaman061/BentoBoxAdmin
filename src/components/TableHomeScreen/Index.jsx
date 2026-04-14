import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PendingSubscriptionOrders from "./Tables/PendingSubscriptionOrders"
import CompletedSubscriptiOnorders from "./Tables/CompletedSubscriptiOnorders"
import PendingOnetimeOrders from "./Tables/PendingOnetimeOrders"
import CompletedOneTimeOrders from "./Tables/CompletedOneTimeOrders"
import ActiveSubscriptons from "./Tables/ActiveSubscriptions"
import CompletedSubscriptons from "./Tables/CompletedSubscriptons"
import AllUsers from './Tables/AllUsers'
import Restaurantdata from './Tables/Restaurantdata'
import Transactions from './Tables/Transactions'
import AdminApprovals from './Tables/AdminApprovals'
import AddBbCoins from './Tables/AddBbCoins'
const Index = (data) => {
        const [Tabletype,SetTableType]=useState(<PendingSubscriptionOrders />)
    const type=data.data
    
   useEffect(()=>{
        switch (type){
        case "PendingSubscriptionOrders":
            SetTableType(<PendingSubscriptionOrders route={"/pendingSubscriptionorders"} />)
            break
        case "CompletedSubscriptiOnorders":
            SetTableType(<CompletedSubscriptiOnorders route={"/completedSubscriptionorders"}/>)
            break
        case "PendingOnetimeOrders":
            SetTableType(<PendingOnetimeOrders route={"/pendingOneTimeorders"} />)
            break
        case "CompletedOneTimeOrders":
            SetTableType(<CompletedOneTimeOrders route={"/completedOneTimeorders"} />)
            break
        case "ActiveSubscriptons":
            SetTableType(<ActiveSubscriptons route={"/Activesubscriptions"}/>)
            break
        case "CompletedSubscriptons":
            SetTableType(<CompletedSubscriptons route={"CompletedHistorySubscription"} />)
            break
       case "AllRestaurants":
            SetTableType(<Restaurantdata route={"/restaurant"} />)
            break
        case "AllUsers":
            SetTableType(<AllUsers key="users" route={"/AllUsers"} />)
            break
        case "AllChef":
            SetTableType(<AllUsers key="chefs" route={"/AllChef"} />)
            break
        case "AllRiders":
            SetTableType(<AllUsers key="riders" route={"/AllRiders"} />)
            break
        case "transactions":
            SetTableType(<Transactions route={"/transactions"}/>)
            break
        case "OrderSelfDeliver":
            SetTableType(<AdminApprovals route={"/OrderSelfDeliver"}/>)
            break
        case "AddBbCoins":
            SetTableType(<AddBbCoins route={"/AddBbCoins"}/>)
            break

    }
    },[data])
    
   
  return (
    <div className='flex flex-col text-center  items-center sm:w-screen '>{Tabletype}</div>
  )
}

export default Index