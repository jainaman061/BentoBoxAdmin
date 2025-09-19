import React from 'react'
import Bentologo from "../../images/favicon.png"
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import { ImCross } from "react-icons/im";

const Index = () => {
    const navigate = useNavigate()
    
    const [sidepanel,SetSidepanel]=useState(false);
    const logout=()=>{
            localStorage.removeItem("bentoAdmin")
            localStorage.removeItem("bentoAdminExpiry")
            navigate("/login")
    }
    const toggleSidepanel=()=>{
      SetSidepanel(!sidepanel);
    }

  return (
    <div className='relative flex justify-between   bg-white'>
      
      {(sidepanel)?<div className='absolute w-1/5 bg-gray-300 h-screen flex flex-col pt-12 pl-2'>
      
        
        <ol className="list-disc marker:text-xl marker:font-bold p-4 ml-6">
  

          <li><a className='text-black  text-md  hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/PendingSubscriptionOrders')
            SetSidepanel(!sidepanel)
          }}>Pending Subscription Orders</a></li>
          
         <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/CompletedSubscriptiOnorders')
                        SetSidepanel(!sidepanel)

          }}>Completed Subscription Orders</a></li>
        <li>  <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/PendingOnetimeOrders')
                        SetSidepanel(!sidepanel)

          }}>Pending One Time Orders</a></li>
          <li><a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/CompletedOneTimeOrders')
                        SetSidepanel(!sidepanel)

          }}>Completed One Time Orders</a></li>
        <li>  <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/ActiveSubscriptons')
                        SetSidepanel(!sidepanel)


          }}>Active Subscription </a></li>
         <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/CompletedSubscriptons')
                        SetSidepanel(!sidepanel)

          }}>Completed Subscriptions </a></li>
         <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/AllUsers')
                        SetSidepanel(!sidepanel)

          }}>All Users </a></li>
          <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/AllChef')
                        SetSidepanel(!sidepanel)

          }}>All Chef </a></li>
          <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/AllRiders')
                        SetSidepanel(!sidepanel)

          }}>All Riders </a></li>
        <li>  <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/AllRestaurants')
                        SetSidepanel(!sidepanel)

          }}>All Restaurants</a></li>
          <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/unAuthorizedChefs')
                        SetSidepanel(!sidepanel)

          }}>view unAuthorized Chefs</a>
</li>
                    <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/unAuthorizedRiders')
                        SetSidepanel(!sidepanel)

          }}>view unAuthorized Riders</a></li>
          <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/weekmealnotadded')
                        SetSidepanel(!sidepanel)

          }}>Week meal not added</a></li>
          <li> <a className='text-black text-md mt-2 hover:text-blue-900 text-lg hover:cursor-pointer hover:underline' onClick={()=>{
            navigate('/editContainer')
                        SetSidepanel(!sidepanel)

          }}>Edit Container</a></li>
        </ol>  


      </div>:""}
      <div className={`flex flex-col mt-4 w-screen ${sidepanel?"ml-80":"ml-6"} `}>
        <div className='flex'><img src={Bentologo}  alt='logo' className='w-11 -ml-3' />
      <h1 className='mt-2'>Bento Box Admin Portal</h1></div>
      <div >
        {sidepanel?<ImCross onClick={()=>{toggleSidepanel()}} className={`text-red-600 mt-4 text-2xl hover:cursor-pointer`}/>: <RxHamburgerMenu className={`text-2xl mt-4  hover:cursor-pointer`} onClick={()=>{toggleSidepanel()}}/>
}
             
      </div>
      </div>
      <button className='bg-red-800 text-white px-2  rounded-2xl h-9 mt-6 mr-4' onClick={()=>{logout()}}>Logout</button>
      
    </div>
  )
}

export default Index
