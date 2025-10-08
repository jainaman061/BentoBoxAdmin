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
            SetTableType(<CompletedSubscriptons route={"/CompletedSubscription"} />)
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

    }
    },[data])
    
   
  return (
    <div className='flex flex-col sm:w-screen'>{Tabletype}</div>
  )
}

export default Index