import React from 'react'

const Index = ({data}) => {
    console.log(data)
  return (
<table className='border-4    border-blue-700 mt-8'>
      <tr>
       
        <th className='px-5'>name</th>
        <th className='px-5'>chefname</th>
        <th className='px-5'>number</th>

      </tr>
        
         
        
            <tr className='items-center justify-center border border-sky-600'>
             
              <td className='text-center px-2'>{data.name}</td>
              <td className='text-center'>{data.chefname}</td>
              <td className='text-center px-2'>{data.number}</td>
            </tr>
          
        
     </table>  )
}

export default Index