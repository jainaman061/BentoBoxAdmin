import React from 'react'

const Index = ({data}) => {


  return (
   <table className='border-4    border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          Item Id
        </th>
        <th className='px-5' >isAvailable</th>
        <th className='px-5'>name</th>
        <th className='px-5'>price</th>
        <th className='px-5'>type</th>

      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.isAvailable?"Available":"Not Available"}</td>
             
              <td className='text-center'>{data.name}</td>
              <td className='text-center'>{data.price}</td>
              <td className='text-center'>{data.type}</td>
            </tr>
          ))
        }
     </table>
  )
}

export default Index
