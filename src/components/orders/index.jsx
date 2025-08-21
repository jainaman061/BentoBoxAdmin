import React,{ useEffect,useState } from 'react'
const Index = ({data}) => {
  return (
    <div>
     <table className='border-4    border-blue-700 mt-8 w-fit'>
      <tr>
        <th className='px-5'>
          Order Id
        </th>
        <th className='px-5' >chefId</th>
        <th className='px-52'>items</th>
        <th className='px-5'>price</th>
        <th className='px-5'>orderStatus</th>

      </tr>

        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.chefid}</td>
              <td  className='flex flex-col justify-center text-center items-center'>{data.orderItems.map((orderItems,idx)=>(
                <tr key={idx} className='flex '><td className='w-40'>{orderItems.name}</td>
                <td className='w-20'>{orderItems.count}</td>
                <td className='w-16'>{orderItems.price}</td></tr>
              
              ))}</td>
              <td className='text-center'>{data.price}</td>
              <td className='text-center'>{data.orderStatus}</td>
            </tr>
          ))
        }
     </table>
      
      </div>
  )
}

export default Index