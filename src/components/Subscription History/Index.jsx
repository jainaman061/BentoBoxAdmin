import React from 'react'

const Index = ({data}) => {
   console.log(data)
  return (
    <div>
      <table className='border-4    border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          Subscription Id
        </th>

        <th className='px-5' >Meal Plan Name Name</th>
        <th className='px-5' >Restaurant Name</th>
        <th className='px-5' >Cancellation Date</th>
     
        <th className='px-5'>start date</th>
        <th className='px-5'>start date</th>
      

        <th className='px-5'>price</th>
        <th className='px-5'>refund amount</th>




      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.mealPLanName}</td>
              <td className='text-center'>{data.restaurantName}</td>

              <td className='text-center'>{data.cancellationDate}</td>
             
           
              <td className='text-center'>{data.startdate}</td>
              <td className='text-center'>{data.enddate}</td>
             
              <td className='text-center'>{data.price}</td>
              <td className='text-center'>{data.refundAmount}</td>

            </tr>
          ))
        }
     </table>
      

    </div>
  )
}

export default Index
