import React, { useEffect, useState } from 'react'
import apiClient from '../../utils/apiclient'

const Index = ({data}) => {
        const [timeslots,setTimeSlots]= useState([])
        const [ButtonOnClick,setButtonOnClick]= useState(false)
      const [newSlots, setNewSlots] = useState([""])
      const [selectedSlots, setSelectedSlots] = useState([])
      const handleSelect = (slot) => {
  if (selectedSlots.includes(slot)) {
    setSelectedSlots(selectedSlots.filter(s => s !== slot))
  } else {
    setSelectedSlots([...selectedSlots, slot])
  }
}
const addRow = () => {
    setNewSlots([...newSlots, ""])
  }
   const handleChange = (index, value) => {
    const updated = [...newSlots]
    updated[index] = value
    setNewSlots(updated)
  }
  const handleSubmit = async () => {
    try {
      await apiClient.post(`/add/timeslot/${data}`, {
        timeSlot: newSlots
      })

      alert("Added successfully")
      setNewSlots([""])
      setButtonOnClick(false)
      fetchData() // refresh table
    } catch (err) {
      const message=err.response.data.message || "Something went wrong";
      alert(message)
    }
  }
    const removeRow = (index) => {
    const updated = [...newSlots]
    updated.splice(index, 1)
    setNewSlots(updated)
  }
  const handleDeleteSelected = async () => {
  if (selectedSlots.length === 0) {
    alert("Please select at least one slot")
    return
  }

  const confirmDelete = window.confirm("Delete selected slots?")
  if (!confirmDelete) return

  try {
     const formattedSlots = selectedSlots.map(slot => slot.substring(0, 5))
    await apiClient.delete(`/remove/timeslot/${data}`, {
      data:{timeSlot: formattedSlots}
    })

    alert("Deleted successfully")
    setSelectedSlots([])
    fetchData()
  } catch (err) {
    const message = err.response?.data?.message || "Error deleting"
    alert(message)
  }
}
   const fetchData=async()=>{
            try{
                
                const timeslots=await apiClient.get(`/get/timeslot/${data}`)
                      
                setTimeSlots(timeslots.data.timeSlots)  
                console.log("timeslots",timeslots.data.timeSlots);

                
            }
            catch (err) {
        console.error("Something went wrong",err);
      }
        }
        useEffect(()=>{
        fetchData();
    },[])

  return (
    // <div>
    //   {timeslots.map((slot, index) => (
    //     <div key={index}>{slot}</div>
    //   ))}
    // </div>
    <div>
     <table className='border-4 border-blue-700 mt-8'>
  <thead>
    <tr>
      <th>Select</th>
      <th className='px-5'>Time Slot</th>
    </tr>
  </thead>

  <tbody>
    {timeslots && timeslots.map((slot, index) => (
      <tr className='border border-sky-600' key={index}>
        
        <td className='text-center'>
          <input
            type="checkbox"
            checked={selectedSlots.includes(slot)}
            onChange={() => handleSelect(slot)}
          />
        </td>

        <td className='text-center px-2'>{slot}</td>

      </tr>
    ))}
  </tbody>
</table>
{selectedSlots.length > 0 && (
  <button
    className='bg-red-600 text-white px-4 py-2 rounded mt-4'
    onClick={handleDeleteSelected}
  >
    Delete Selected
  </button>
)}
     <div className='mt-5'>
        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={()=>{setButtonOnClick(!ButtonOnClick)}}>Add Time Slot</button>
         {ButtonOnClick && (
          <div className='mt-4 border p-4 w-fit'>

            {newSlots.map((slot, index) => (
              <div key={index} className='flex gap-2 mb-2'>
                
                <input
                  type="time"
                  value={slot}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className='border px-2 py-1'
                />

                <button
                  className='bg-red-500 text-white px-2 rounded'
                  onClick={() => removeRow(index)}
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              className='bg-blue-500 text-white px-3 py-1 mr-2 rounded'
              onClick={addRow}
            >
              ➕ Add Row
            </button>

            <button
              className='bg-green-600 text-white px-3 py-1 rounded'
              onClick={handleSubmit}
            >
              Submit
            </button>
        </div>
         )}
     </div>
     </div>
  )
}

export default Index