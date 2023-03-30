import { useState } from 'react'
import Router from 'next/router'
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')

const EditModal = ({ data }) => {
  const [showModal, setShowModal] = useState(true)
  const [date, setDate] = useState(null)
  const [habitId, setHabitId] = useState(null)
  const [notes, setNotes] = useState('')
  const { user, setHabits, habits } = useUser()

  const handleClick = () => {
    setShowModal(false)
    Router.push("/")
  }

  const handleSubmit = async () => {
    const utcDate = date ? new Date(date).toUTCString() : habits[0].created_at
    const habit_id = habitId ? habitId : habits[0].habits && habits[0].habits.id ? habits[0].habits.id : 0
    const updatedNotes = notes ? notes : habits[0].description

    const { data, error } = await supabase
      .from('user_habits')
      .update({
        habit_id: habit_id,
        description: updatedNotes,
        created_at: utcDate
        })
       .eq('id', habits[0].id)
       .select()

    if (!error) {
      alert("Updated")
      setShowModal(false)
      setHabits(data)
      
      Router.push("/")
    } else {
      console.log(error)
    }
  }

  return (
    <div>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-[75%] max-w-lg">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h5 className="text-2xl font-semibold">Edit Habit</h5>
                <button className="" onClick={handleClick}>
                  X
                </button>
              </div>
              <div className="relative flex-auto ml-5 p-2">
                <label>Date</label>
                <input type="date" value={new Date(habits[0].created_at).toISOString().substring(0, 10)} className={"p-3"} onChange={(e) => setDate(e.currentTarget.value)}/>
              </div>
              <div className="relative flex p-2 ml-5">
                {habits ? 
                <select className={"ml-2 w-70%"} defaultValue={habits[0].habits ? habits[0].habits.id : 0 } onChange={(e) => setHabitId(e.currentTarget.value)}>
                  {data.props.map(row =>
                    <option key={row.id} value={row.id}>{row.name}</option>
                  )}
                </select> : '' }
              </div>
                <input 
                  type="text" 
                  id="notes" 
                  placeholder={habits[0].description} 
                  maxlength="100" 
                  className={"p-3 mx-auto ml-3 w-[90%]"} 
                  value={notes}
                  onChange={(e) => setNotes(e.currentTarget.value)}/>
                <button className="flex bg-blue-800 mx-auto justify-center text-white rounded-[20px] w-[50%] p-4 m-5" onClick={handleSubmit}>Submit</button> 
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default EditModal
