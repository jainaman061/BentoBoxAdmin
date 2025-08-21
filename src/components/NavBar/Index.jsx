import React from 'react'
import logo from "../../images/favicon.png"
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
    <div className='relative flex justify-between   bg-gray-300'>
      {(sidepanel)?<div className='absolute w-2/12 bg-white h-screen'>

      </div>:""}
      <div className={`flex flex-col mt-4 w-screen ${sidepanel?"ml-80":"ml-6"} `}>
        <div className='flex'><img src={logo} alt='logo' className='w-11 -ml-3' />
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
