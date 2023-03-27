import { Inter } from '@next/font/google'
import { useState } from 'react'
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
import { useUser } from "../lib/context"
import { supabase }  from '../lib/supabaseClient'

export default function HabitTracker() {
  const [date, setDate] = useState(dayjs("2023-03-27"))
  const { user, habits, setHabits } = useUser()

  const handleDate = async (e) => {
    setDate(dayjs(e.$d))

    console.log(habits)

    const { data, error } = await supabase
      .from('user_habits')
      .select(`
        user_id,
        description,
        habits (
          name
        )
        `)
      .eq('user_id', user.id)
      .eq(`created_at`, date)
    
      if (data) {
        setHabits(data)
      }
  }
  

  return (
    <div className="mt-5 flex items-center grid grid-rows md:grid-cols md:grid-cols-2 md:h-[40vh] mx-auto w-[90%] bg-gray-100">
      <DateCalendar 
        value={date}
        views={['day']}
        renderLoading={() => <DayCalendarSkeleton />}
        onChange={handleDate}
      />
      <div className="flex grid grid-rows justify-center w-[100%]">
        <p className="flex"> Commentary about habits</p>
        <button className="flex mt-5 md:mt-20 justify-center bg-blue-200 p-4 w-[90%] rounded-[20px] text-lg font-medium">Create Habit</button>
      </div>
      <div>
        {habits && !!Object.keys(habits).length >0 ? '' : 
        <p>Please create a habit for today</p>
      }
      </div>
    </div>
  )
}
