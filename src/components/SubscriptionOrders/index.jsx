import React from 'react'

const Index = ({data}) => {
    return (
    <div>
      <table className='border-4    border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          SubscriptionOrder Id
        </th>
        <th className='px-5' >number</th>
        <th className='px-5'>meal name</th>
        <th className='px-5'>orderStatus</th>
        <th className='px-5'>start time</th>
        <th className='px-5'>end time</th>
        <th className='px-5'>order Date</th>


      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.number}</td>
              <td className='text-center'>{data.mealName}</td>
              <td className='text-center'>{data.status}</td>
              <td className='text-center'>{data.startTime}</td>
              <td className='text-center'>{data.endTime}</td>
              <td className='text-center'>{data.orderdate}</td>
            </tr>
          ))
        }
     </table>
      

    </div>
  )
}

export default Index
