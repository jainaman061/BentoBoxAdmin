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
            SetTableType(<PendingSubscriptionOrders />)
            break
        case "CompletedSubscriptiOnorders":
            SetTableType(<CompletedSubscriptiOnorders />)
            break
        case "PendingOnetimeOrders":
            SetTableType(<PendingOnetimeOrders />)
            break
        case "CompletedOneTimeOrders":
            SetTableType(<CompletedOneTimeOrders />)
            break
        case "ActiveSubscriptons":
            SetTableType(<ActiveSubscriptons />)
            break
        case "CompletedSubscriptons":
            SetTableType(<CompletedSubscriptons />)
            break
       case "AllRestaurants":
            SetTableType(<Restaurantdata />)
            break
        case "AllUsers":
            SetTableType(<AllUsers />)
            break

    }
    },[data])
    
   
  return (
    <div className='flex flex-col min-h-0'>{Tabletype}</div>
  )
}

export default Index