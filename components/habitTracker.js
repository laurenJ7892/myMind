import { Inter } from '@next/font/google'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
import { useUser } from "../lib/context"
import Modal from "../components/modal"
import EditModal from "../components/editModal"
import { supabase }  from '../lib/supabaseClient'


dayjs.extend(utc)

export default function HabitTracker(data) {
  const { user, habits, setHabits, allHabits } = useUser()
  const [date, setDate] = useState(dayjs(new Date()))
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteHabit, setDeleteHabit] = useState(false)
  const [editHabit, setEditHabit] = useState({})
  
  const handleDate = async (e) => {
    setDate(dayjs(e.$d))
    const queryMinDate = new Date(e.$y, e.$M, e.$D)
    const queryMaxDate = new Date(e.$y, e.$M, e.$D+1)
    if (user) {
      // const data = allHabits.filter(({ created_at }) => 
      //   new Date(created_at) >= queryMinDate && new Date(created_at) <= queryMaxDate
      // )

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
  }

  const handleClick = async () => {   
    setVisible(!visible)
  }

  const handleEdit= async (row) => {   
    console.log(row)
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
      { visible ? <Modal heading={"Log Habit"} text={"What habit would you like to track?"} data={data} utcDate={date.$d.toUTCString()} date={new Date(date.$d).toISOString().substr(0, 10)} /> : ''}
      { deleteHabit ? <Modal heading={"Delete Habit"} text={"Are you sure you want to delete this entry?"} deleteHabit={editHabit} data={data} /> : ''}
      { editVisible ? <EditModal data={data} habit={editHabit} /> : ''}
    <div className="mt-5 flex grid grid-rows grid-rows-2 md:grid-rows-2 mx-auto w-[95%] h-[60vh] py-10">
      <div className="flex grow bg-gray-100 h-[90vh]">
        <div className="flex mx-auto grid grid-rows md:grid-cols md:grid-cols-2 mt-5 w-[95%]">
          {habits && !!Object.keys(habits).length > 0 ?
            <div className="flex mx-auto justify-center">
              <div>
                <div className="flex mx-auto justify-center my-5">
                  <Image 
                    src={"Images/bullseye-solid.svg"}
                    height={20}
                    width={20}
                    alt="Logged habit bullseye"
                    className="inline-flex mr-3 max-w-[20%]"
                  />
                   <h2 className="flex ml-0">Congratulations on prioritsing yourself!</h2>
                  </div>
              <table className="mt-2 mx-auto table-fixed md:table-auto border border-2 border-cyan-800 border-collapse border-spacing-0.5">
                <thead>
                  <tr>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2 hidden lg:table-cell">Date</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Habit</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">Notes</th>
                    {/* Hide buttons on small devices */}
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2 md:table-cell">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {habits.map(row => (
                  <tr key={row.id}>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2 hidden lg:table-cell">{new Date(row.created_at).toLocaleDateString('en-AU')}</td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.habits?.name}</td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2">{row.description}</td>
                    <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2 md:table-cell">
                    <button 
                        className="flex mx-auto items-center justify-center p-2 rounded-[20px]"
                        onClick={() => handleEdit(row)}
                        >
                    <Image
                        src="Images/pen-to-square-solid.svg"
                        height={15}
                        width={15}
                        alt="edit habit"
                      />
                      </button>
                    <button 
                        className="flex mx-auto items-center justify-center mt-2 bg-blue-200 p-2 rounded-[20px]"
                        onClick={() => handleDelete(row)}>
                     <Image
                        src="Images/trash-solid.svg"
                        height={15}
                        width={15}
                        alt="delete habit"
                      />
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
              <button 
              className="flex w-[60%] mx-auto items-center justify-center bg-blue-800 mt-4 p-4 rounded-[20px] text-lg text-white font-medium"
              onClick={handleClick}>
                Log Habit
            </button>
            </div>
            </div> : (
            <div className="flex grid grid-rows h-80 item-center">
              <p className="flex mx-auto items-center justify-center">Oh no! Please log your habits for today</p>
              <button 
              className="flex w-[60%] mx-auto items-center justify-center h-20 bg-blue-800 p-4 rounded-[20px] text-lg text-white font-medium"
              onClick={handleClick}>
                Log Habit
            </button>
          </div>)
          }
          <div className="flex justify-center h-auto mx-auto w-[95%] mt-5">
          { date ? 
              <DateCalendar 
                value={date}
                views={['day']}
                renderLoading={() => <DayCalendarSkeleton />}
                onChange={handleDate}
              />
            : '' }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
