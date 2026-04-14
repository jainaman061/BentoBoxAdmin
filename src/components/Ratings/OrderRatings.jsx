

import React from 'react'

const OrderRatings = ({data}) => {
    
    console.log("data")
    console.log(data)
  return (
<table className='border-4    border-blue-700 mt-8'>
      <tr>
       
        <th className='px-5'>Id</th>
        <th className='px-5'>restaurantId</th>
        <th className='px-5'>review</th>
        <th className='px-5'>stars</th>
        <th className='px-5'>riderId</th>
        <th className='px-5'>riderStars</th>
        <th className='px-5'>riderReview</th>
        <th className='px-5'>userId</th>

      </tr>
        
         
        {data.map((data,Index)=>(
<tr className='items-center justify-center border border-sky-600'>
             
              <td className='text-center px-2'>{data.id}</td>
              <td className='text-center'>{data.restaurantId}</td>
              <td className='text-center px-2'>{data.review?data.review:"-"}</td>
              <td className='text-center px-2'>{data.stars?data.stars:"-"}</td>
              <td className='text-center px-2'>{data.riderId?data.riderId:"-"}</td>
              <td className='text-center px-2'>{data.riderStars?data.riderStars:"-"}</td>
              <td className='text-center px-2'>{data.riderReview?data.riderReview:"-"}</td>
              <td className='text-center px-2'>{data.userId}</td>
            </tr>
        ))}
            
          
        
     </table>  )
}

export default OrderRatings