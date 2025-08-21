import React from 'react'
import RestaurantPage from "../../Pages/RestaurantDetails/index"
import { useNavigate } from 'react-router-dom'
const Index = ({data}) => {
    
    const navigate=useNavigate();
    return (
    <div>
           <table className='border-4   border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          Restaurant Id
        </th>
        <th className='px-5'>Restaurant Name</th>
        
      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600 hover:text-blue-900 hover:cursor-pointer'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center' onClick={()=>navigate(`/restaurant/${data.id}`)}>{data.name}</td>
              
            </tr>
          ))
        }
     </table>
    </div>
  )
}

export default Index
