import React, { useEffect, useState } from 'react'
import Cards from "./DashBoardsCards"
import axios from 'axios'

const Dashboard = () => {
const [count,SetCount]=useState([])
  useEffect(()=>{
    const count=async()=>{
      try{
        const data=await axios.get("http://localhost:8080/admin/getCounts");
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
    <div className='min-h-screen'>
      <div>
        DashBoard
      </div>
      <div className='flex mt-2'>
      {Object.entries(count).map(([key, value], index) => (
  <Cards key={index} data={{ title: key, count: value }} />
))}
    </div>
    </div>
  )
}

export default Dashboard