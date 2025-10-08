import React, { useEffect, useState } from 'react'
import Cards from "./DashBoardsCards"
import axios from 'axios'
import apiClient from '../../utils/apiclient'

const Dashboard = () => {
const [count,SetCount]=useState([])
  useEffect(()=>{
    const count=async()=>{
      try{
        const data=await apiClient.get("/getCounts");
        SetCount(data.data)
      }
      catch(e){
        console.error(e); 
      }

    }
    count();
  },[])
  const [oneTimeOrdersCount,SetoneTimeOrdersCount]= useState({
    "name":"Total One_time Orders",
    "values":"1"
  })
  return (
    <div className='md:w-1/2 lg:w-1/2 sm:mr-2'>
      <div>
        DashBoard
      </div>
      <div className='flex mt-2 '>
      {Object.entries(count).map(([key, value], index) => (
  <Cards key={index} data={{ title: key, count: value }} />
))}
    </div>
    </div>
  )
}

export default Dashboard