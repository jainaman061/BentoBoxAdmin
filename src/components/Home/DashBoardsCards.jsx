import React from 'react'

const DashBoardsCards = ({data}) => {
  console.log(data)
  return (
    <div className='border-2 border-gray-300 p-3 mr-2'>
      <h1 className='text-3xl pb-2'>{data.count}</h1>
      <p>{data.title}</p>
    </div>
  )
}

export default DashBoardsCards