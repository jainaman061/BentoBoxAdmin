import React from 'react'

const Index = ({data}) => {
  return (
    <div>
      <table className='border-4    border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          Subscription Id
        </th>

        <th className='px-5' >Meal Plan Name Name</th>
        <th className='px-5' >Restaurant Name</th>
        <th className='px-5' >Active Status</th>
     
        <th className='px-5'>start date</th>
        <th className='px-5'>start date</th>
        <th className='px-5'>Pause Status</th>

        <th className='px-5'>pause start date</th>
        <th className='px-5'>pause end date</th>

        <th className='px-5'>price</th>




      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.mealPLanName}</td>
              <td className='text-center'>{data.restaurantName}</td>

              <td className='text-center'>{data.isActive ? "Active":"Not Active"}</td>
             
           
              <td className='text-center'>{data.startdate}</td>
              <td className='text-center'>{data.enddate}</td>
              <td className='text-center'>{data.ispaused ? "Paused":"Not Paused"}</td>
              <td className='text-center'>{(data.pause_start_date===null )? "-":`${data.pause_start_date}`} </td>
              <td className='text-center'>{(data.pause_end_date===null )? "-":`${data.pause_end_date}`} </td>

              <td className='text-center'>{data.price}</td>

            </tr>
          ))
        }
     </table>
      

    </div>
  )
}

export default Index
