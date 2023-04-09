import { Inter } from '@next/font/google'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import { PickersDay } from '@mui/x-date-pickers';
import Badge from '@mui/material/Badge';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
import { useUser } from "../lib/context"
import Modal from "../components/modal"
import EditModal from "../components/editModal"
import { supabase }  from '../lib/supabaseClient'


dayjs.extend(utc)

export default function HabitTracker(data) {
  const requestAbortController = useRef(null);
  const { user, habits, setHabits, setAllHabits } = useUser()
  const [date, setDate] = useState(dayjs())
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteHabit, setDeleteHabit] = useState(false)
  const [editHabit, setEditHabit] = useState({})
  const [highlightedDays, setHighlightedDays] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const handleDate = async (e) => {
    setDate(e)
    const queryMinDate = new Date(e.$y, e.$M, e.$D)
    const queryMaxDate = new Date(e.$y, e.$M, e.$D+1)
    if (user) {
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
    setEditHabit(row)
    setEditVisible(!editVisible)
  }

  const handleDelete = async (row) => {
    setEditHabit(row)
    setDeleteHabit(true)
  }

  const handleMonthChange = async (e) => {
      if (requestAbortController.current) {
        // make sure that you are aborting useless requests if you change months quickly
        requestAbortController.current.abort();
      }
      setDate(e)
      setIsLoading(true);
      setHighlightedDays([]);
      await getHightlightedDays(e.$d)     
  };


  const getHightlightedDays = async (newDate) => {
    const ac = new AbortController();
    const fetchDate = newDate ? newDate : date
    const monthStartDate = dayjs(fetchDate).startOf('month')
    const monthEndDate = dayjs(fetchDate).endOf('month')

      const { data } = await supabase
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
        .order('created_at', { ascending: true })
        .abortSignal(ac.signal)

      if (data) {
        setAllHabits(data)

        const dateData = data.filter(({ created_at }) =>
            new Date(created_at) >= monthStartDate && new Date(created_at) <= monthEndDate
          ).map(({created_at}) => new Date(created_at).getDate())

        setHighlightedDays(dateData)
        setIsLoading(false)
      }
      requestAbortController.current = ac
  }

  // MUI Component instructions to get it to load and overlay data
  function ServerDay(props) {
    const isSelected = !props.outsideCurrentMonth && props.highlightedDays.indexOf(props.day.date()) >= 0;
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <StarOutlineIcon color="secondary"/> : undefined}
      >
        <PickersDay
          outsideCurrentMonth={props.outsideCurrentMonth} 
          day={props.day}
          onDaySelect={handleDate}
          today={props.today}
          disabled={props.disabled}
          />
    </Badge>
    )
  }

   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleDate(dayjs())
    getHightlightedDays()
    return () => requestAbortController.current?.abort();
  }, [])
  
  return (
    <>
      { visible ? <Modal heading={"Log Habit"} text={"What habit would you like to track?"} data={data} utcDate={date.$d.toUTCString()} date={date.$d} /> : ''}
      { deleteHabit ? <Modal heading={"Delete Habit"} text={"Are you sure you want to delete this entry?"} deleteHabit={editHabit} data={data} /> : ''}
      { editVisible ? <EditModal data={data} habit={editHabit} /> : ''}
    <div className="mt-5 flex grid grid-rows md:grid-rows-2 mx-auto w-[95%] md:h-[60vh] md:py-10">
      <div className="flex grow bg-gray-100 h-[90vh]">
        <div className="flex mx-auto grid grid-rows auto-rows-min md:grid-cols md:grid-cols-2 mt-5 w-[95%]">
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
                   <h2 className="flex ml-0">Way to go! You logged: </h2>
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
                { date && date > dayjs().subtract(7, 'days') ? 
                <button 
                  className="flex w-[60%] mx-auto items-center justify-center h-10 md:h-20 md:my-5 bg-blue-800 p-4 rounded-[20px] text-lg text-white font-medium"
                  onClick={handleClick}>
                  Log Habit
                </button> : '' }
              </div>
            </div> : (
              <div className="flex grid grid-rows auto-rows-min h-40 md:h-80 item-center">
                { date && date > dayjs().subtract(7, 'days') ?
                <>
                <p className="flex mx-auto items-center justify-center text-center text-2xl my-2 md:my-10">What is one thing you can do today for yourself?</p>
                <button 
                  className="flex w-[60%] mx-auto items-center justify-center h-10 md:h-20 md:my-5 bg-blue-800 p-4 rounded-[20px] text-lg text-white font-medium"
                  onClick={handleClick}>
                  Log Habit
              </button>
              </>
               : <>
               <p className="flex mx-auto items-center justify-center text-center text-2xl my-2 md:my-10">Oh no! We do not let you add any habits older than a week ago. </p>
             </> }
              </div>
          )}
          <div className="flex justify-center h-auto mx-auto w-[95%] md:mt-5">
          { date ? 
              <DateCalendar 
                defaultValue={date}
                value={date}
                views={['day']}
                loading={isLoading}
                renderLoading={() => <DayCalendarSkeleton />}
                onMonthChange={handleMonthChange}
                slots={{
                  day: ServerDay,
                }}
                disableFuture={true}
                disableHighlightToday={false}
                slotProps={{
                  day: {
                    highlightedDays: highlightedDays
                  }
                }}
              />
            : '' }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
