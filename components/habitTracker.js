import { Inter } from '@next/font/google'
import { useState, useEffect } from 'react'
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
import { useUser } from "../lib/context"
import { supabase }  from '../lib/supabaseClient'
import Modal from "../components/modal"
import EditModal from "../components/editModal"
import { DEV_MIDDLEWARE_MANIFEST } from 'next/dist/shared/lib/constants'

dayjs.extend(utc)

export default function HabitTracker(data) {
  const [date, setDate] = useState(dayjs(new Date()))
  const { user, habits, setHabits } = useUser()
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteHabit, setDeleteHabit] = useState(false)
  const [editHabit, setEditHabit] = useState({})
  
  const handleDate = async (e) => {
    setDate(dayjs(e.$d))
    const queryMinDate = new Date(e.$y, e.$M, e.$D)
    const queryMaxDate = new Date(e.$y, e.$M, e.$D+1)

    const { data, error } = await supabase
      .from('user_habits')
      .select(`
        id,
        user_id,
        description,
        habits (
          id,
          name,
          description
        ),
        created_at
        `)
      .eq('user_id', user.id)
      .gte(`created_at`, queryMinDate.toUTCString())
      .lte(`created_at`, queryMaxDate.toUTCString())
    
      if (data) {
        setHabits(data)
      } else {
        setHabits({})
      }
  }

  const handleClick = async () => {   
    setVisible(!visible)
  }

  const handleEdit= async (row) => {   
    setEditHabit(row)
    setEditVisible(!editVisible)
  }

  const handleDelete = async (row) => {
    setEditHabit(row)
    setDeleteHabit(true)
  }

  useEffect(() => {
    handleDate(dayjs())
  }, [])
  
  return (
    <>
    <div className="mt-5 flex grid grid-rows md:grid-cols md:grid-cols-2 md:grid-flow-col md:h-auto mx-auto w-[90%] bg-gray-100">
        <DateCalendar 
          value={date}
          views={['day']}
          renderLoading={() => <DayCalendarSkeleton />}
          onChange={handleDate}
        />
        <div className="flex grid grid-rows-2 items-center justify-center w-[100%]">
          <div className="flex mt-5 mx-auto justify-center w-[90%] md:w-[90%]">
            {habits && !!Object.keys(habits).length > 0 ?
            <div>
              <h2>Habits Logged</h2>
              <table className="mt-5 table-auto border border-2 border-cyan-800 border-collapse border-spacing-0.5">
                <thead>
                  <tr>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Date</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Habit</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Notes</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Edit</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {habits.map(row => (
                  <tr>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{new Date(row.created_at).toLocaleDateString('en-AU')}</td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.habits?.name}</td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.description}</td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">
                    <button 
                        className="flex mx-auto items-center justify-center bg-blue-800 p-4 rounded-[20px] text-lg text-white font-medium"
                        onClick={() => handleEdit(row)}
                        >
                      Edit
                      </button>
                    </td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">
                    <button 
                        className="flex mx-auto items-center justify-center bg-blue-200 p-4 rounded-[20px] text-lg text-black font-medium"
                        onClick={() => handleDelete(row)}>
                      Delete
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div> :
            <p>Oh no! Please log your habits for today</p>
          }
        </div>
          <button 
            className="flex md:mt-10 mx-auto justify-center bg-blue-800 p-4 w-[50%] rounded-[20px] text-lg text-white font-medium"
            onClick={handleClick}>
          Log Habit
        </button>
      </div>
      { visible ? <Modal heading={"Log Habit"} text={"What habit would you like to track?"} data={data} utcDate={date.$d.toUTCString()} date={new Date(date.$d).toISOString().substr(0, 10)} /> : ''}
      { deleteHabit ? <Modal heading={"Delete Habit"} text={"Are you sure you want to delete your habit"} deleteHabit={editHabit} data={data} /> : ''}
      { editVisible ? <EditModal data={data} habit={editHabit} /> : ''}
      {/* TO DO: Metrics */}
      {/* <p className="flex items-center justify-center w-[90%] mb-5"> Commentary about habits</p> */}
    </div>
    </>
  )
}
