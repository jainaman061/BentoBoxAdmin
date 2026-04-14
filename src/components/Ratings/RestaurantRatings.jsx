
import React from 'react'

const RestaurantRatings = ({data}) => {
    
    console.log("data")
    console.log(data)
  return (
<table className='border-4    border-blue-700 mt-8'>
      <tr>
       
        <th className='px-5'>Id</th>
        <th className='px-5'>User Id</th>
        <th className='px-5'>review</th>
        <th className='px-5'>rating</th>

      </tr>
        
         
        {data.map((data,Index)=>(
<tr className='items-center justify-center border border-sky-600'>
             
              <td className='text-center px-2'>{data.id}</td>
              <td className='text-center'>{data.userId}</td>
              <td className='text-center px-2'>{data.review?data.review:"-"}</td>
              <td className='text-center px-2'>{data.raiting}</td>
            </tr>
        ))}
            
          
        
     </table>  )
}

export default RestaurantRatings