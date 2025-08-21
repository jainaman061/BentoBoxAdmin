import React from 'react'
import { href, useNavigate } from 'react-router-dom'
import apiClient from '../../utils/apiclient';
const Index = ({data}) => {
    console.log(data)
    const navigate=useNavigate();
    const approveRestaurant=async(id)=>{
            try{
                const response = await apiClient.post ("/setAuthorized",
                        {"id":id}
                    );
                console.log(response)

                navigate(0)
            }
            catch (err) {
        console.error("Something went wrong",err);
      }
        }
    return (
    <div>
           <table className='border-4   border-blue-700 mt-8'>
      <tr>
        <th className='px-5'>
          Driver Id
        </th>
        <th className='px-5'>Driver Name</th>
        <th className='px-5'>number</th>
        <th className='px-5'>driving Liscence</th>
        <th className='px-5'>restaurant name</th>
        

        <th className='px-5'>Approve</th>
        
        
      </tr>
        {
          data.map((data,index)=>(
        
            <tr key={index} className='items-center justify-center border border-sky-600 hover:text-blue-900 hover:cursor-pointer'>
              <td className='text-center'>{data.id}</td>
              <td className='text-center'>{data.name}</td>
              <td className='text-center' >{data.number}</td>
              <td className='text-center' ><a  href={data.drivingLiscence} 
    target="_blank" 
    rel="noopener noreferrer"
    className='text-blue-500 underline cursor-pointer'>view</a></td>

              <td className='text-center' >{data.restaurantname===null?"Not yet added":data.restaurantname}</td>
              <td className='text-center' ><button className='bg-gray-400 border rounded-lg p-1' onClick={()=>{approveRestaurant(data.id)}}>approve</button></td>

              
            </tr>
          ))
        }
     </table>
    </div>
  )
}

export default Index
