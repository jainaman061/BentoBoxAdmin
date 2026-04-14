import React from 'react'

const DashBoardsCards = ({ data }) => {
  return (
    <div className="border-2 border-gray-300 p-2 md:p-3 w-full flex flex-col justify-center items-center">

      <h1 className="text-lg sm:text-xl md:text-3xl font-semibold pb-1">
        {data.count}
      </h1>

      <p className="text-xs sm:text-sm md:text-base text-center">
        {data.title}
      </p>

    </div>
  )
}

export default DashBoardsCards