import { Inter } from '@next/font/google'
import { useState } from 'react'
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
import { useUser } from "../lib/context"
import { supabase }  from '../lib/supabaseClient'

dayjs.extend(utc)

export default function HabitTracker() {
  const [date, setDate] = useState(dayjs("2023-03-27"))
  const { user, habits, setHabits } = useUser()
  
  const handleDate = async (e) => {
    setDate(dayjs(e.$d))
    const queryMinDate = new Date(e.$y, e.$M, e.$D)
    const queryMaxDate = new Date(e.$y, e.$M, e.$D+1)

    const { data, error } = await supabase
      .from('user_habits')
      .select(`
        user_id,
        description,
        habits (
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
  
  return (
    <>
    <div className="mt-5 flex grid grid-rows md:grid-cols md:grid-cols-2 md:h-auto mx-auto w-[90%] bg-gray-100">
      <DateCalendar 
        value={date}
        views={['day']}
        renderLoading={() => <DayCalendarSkeleton />}
        onChange={handleDate}
      />
      <div className="flex grid grid-rows-2 items-center justify-center w-[100%]">
        <p className="flex"> Commentary about habits</p>
        <button className="flex mt-5 md:mt-10 justify-center bg-blue-200 p-4 w-[90%] rounded-[20px] text-lg font-medium">Create Habit</button>
      </div>
      </div>
      <div className="flex mt-10 items-center justify-center w-[90%] md:w-[100%]">
        {habits && !!Object.keys(habits).length > 0 ?
        <div>
          <h2>Daily Habit</h2>
          <table className="table-auto border border-2 border-cyan-800 border-collapse border-spacing-0.5">
            <thead>
              <tr>
                <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Date</th>
                <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Habit</th>
                <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {habits.map(row => (
              <tr>
                <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.created_at}</td>
                <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.habits.name}</td>
                <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.description}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div> :
        <p>Please create a habit for today</p>
      }
    </div>
    </>
  )
}
