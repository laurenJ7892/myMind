import { Inter } from '@next/font/google'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import { PickersDay } from '@mui/x-date-pickers';
import Badge from '@mui/material/Badge';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
import { useTranslation } from 'next-i18next'

import { useUser } from "../lib/context"
import Modal from "../components/modal"
import EditModal from "../components/editModal"
import { supabase }  from '../lib/supabaseClient'


dayjs.extend(utc)

export default function HabitTracker(data) {
  const { t } = useTranslation('common');
  const requestAbortController = useRef(null);
  const { user, habits, setHabits, setAllHabits, setGoal } = useUser()
  const [date, setDate] = useState(dayjs())
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteHabit, setDeleteHabit] = useState(false)
  const [editHabit, setEditHabit] = useState({})
  const [highlightedDays, setHighlightedDays] = useState([])
  const [goalDays, setGoalDays] = useState([])
  const [completedGoalDays, setCompletedGoalDays] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const handleDate = async (e) => {
    setDate(e)
    const queryMinDate =  new Date(new Date(e.$y, e.$M, e.$D).setUTCHours(0, 0, 0, 0)).toUTCString()
    const queryMaxDate = new Date(new Date(e.$y, e.$M, e.$D+1).setUTCHours(0, 0, 0, 0)).toUTCString()
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
        .gt(`created_at`, queryMinDate)
        .lte(`created_at`, queryMaxDate)
      
      if (data) {
        console.log(data)
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

  const getGoalDays = async (newDate, habitData) => {
    const ac = new AbortController();
    const fetchDate = newDate ? newDate : date
    const monthStartDate = new Date(dayjs(fetchDate).startOf('month')).toUTCString()
    const monthEndDate = new Date(dayjs(fetchDate).endOf('month')).toUTCString()

      const { data } = await supabase
        .from('user_goals')
        .select(`
          id,
          user_id,
          habits (
            id,
            name,
            description
          ),
          completion_date,
          num_times,
          created_at
          `)
        .eq('user_id', user.id)
        .gt('completion_date', monthStartDate)
        .lte('completion_date', monthEndDate)
        .abortSignal(ac.signal)

      if (data) {
        setGoal(data)
        const goalData = data.map(({ completion_date }) => new Date(completion_date).getDate())
        setGoalDays(goalData)
        checkGoalCompletion(data, habitData)
        setIsLoading(false)
      }
      requestAbortController.current = ac
  }


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
        getGoalDays(newDate, data)
      }
      requestAbortController.current = ac
  }

  const checkGoalCompletion = (data, habitData) => {
    let achievedGoalsCheck = []
    let toDoGoals = []
    let complGoalDays = []
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const goalItem = data[i]
        const startDate = goalItem.created_at
        const endDate = goalItem.completion_date
        const habitGoalData = habitData.filter(({ created_at }) => created_at >= startDate && created_at <= endDate).map(({created_at}) => new Date(created_at).getDate())
        if (habitGoalData.length >= goalItem.num_times) {
          achievedGoalsCheck.push(goalItem)
          complGoalDays.push(new Date(goalItem.completion_date).getDate())
        } else {
          toDoGoals.push(goalItem)
        }
      }
      setCompletedGoalDays(complGoalDays)
      setGoal(toDoGoals)
    }
  }

  // MUI Component instructions to get it to load and overlay data
  function ServerDay(props) {
    const isSelected = !props.outsideCurrentMonth && props.highlightedDays.indexOf(props.day.date()) >= 0;
    const isGoal = !props.outsideCurrentMonth && props.goalDays.indexOf(props.day.date()) >= 0;
    const isCompletedGoal = !props.outsideCurrentMonth && props.completedGoalDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <StarOutlineIcon color="secondary"/> : undefined }
      >
        <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isCompletedGoal ? <CrisisAlertIcon color="success"/>  : isGoal ? <CrisisAlertIcon color="primary"/> : undefined} >
          <PickersDay
            outsideCurrentMonth={props.outsideCurrentMonth} 
            day={props.day}
            onDaySelect={handleDate}
            today={props.today}
            disabled={props.disabled}
            />
          </Badge>
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
      { visible ? <Modal heading={t('logHabit')} text={t('logHabitText')} data={data} utcDate={new Date(new Date(date.$d).setUTCHours(0, 0, 0, 0)).toUTCString()} date={date.$d} /> : ''}
      { deleteHabit ? <Modal heading={t('deleteHabit')} text={t('deleteHabitText')} deleteHabit={editHabit} data={data} /> : ''}
      { editVisible ? <EditModal data={data} habit={editHabit} /> : ''}
    <div className="mt-2 flex flex-grow grid grid-rows md:grid-rows-1 mx-auto w-[95%] md:py-5">
      <h2 className="font-medium text-xl justify-center mx-auto">{t('habitTracker')}</h2>
      <div className="flex flex-grow">
        <div className="flex mx-auto grid grid-rows auto-rows-min md:grid-cols md:grid-cols-2 mt-2 w-[95%]">
          {habits && !!Object.keys(habits).length > 0 ?
            <div className="flex mx-auto justify-center">
              <div>
                <div className="flex mx-auto justify-center my-5">
                  <Image 
                    src={"/Images/bullseye-solid.svg"}
                    height={20}
                    width={20}
                    alt="Logged habit bullseye"
                    className="inline-flex mr-3 max-w-[20%]"
                  />
                   <h2 className="flex ml-0">{t('habitsEncouragement')}: </h2>
                  </div>
              <table className="mt-2 mx-auto table-fixed md:table-auto border border-2 border-cyan-800 border-collapse border-spacing-0.5">
                <thead>
                  <tr>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2 hidden lg:table-cell">{t('date')}</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">{t('habit')}</th>
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2">{t('notes')}</th>
                    {/* Hide buttons on small devices */}
                    <th className="border border-2 border-cyan-800 border-spacing-0.5 p-2 md:table-cell">{t('action')}</th>
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
                        src="/Images/pen-to-square-solid.svg"
                        height={15}
                        width={15}
                        alt="edit habit"
                      />
                      </button>
                    <button 
                        className="flex mx-auto items-center justify-center mt-2 bg-blue-200 p-2 rounded-[20px]"
                        onClick={() => handleDelete(row)}>
                     <Image
                        src="/Images/trash-solid.svg"
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
                { date && date > dayjs().subtract(1, 'month') ? 
                <button 
                  className="flex w-[60%] mx-auto mt-10 items-center justify-center h-10 md:h-20 md:my-2 bg-blue-800 p-2 rounded-[20px] text-lg text-white font-medium"
                  onClick={handleClick}>
                 {t('logHabit')}
                </button> : '' }
              </div>
            </div> : (
              <div className="flex grid grid-rows auto-rows-min h-40 md:h-80 item-center">
                { date && date > dayjs().subtract(1, 'month') ?
                <>
                <p className="flex mx-auto items-center justify-center text-center text-2xl my-2 md:my-10"> {t('habitsToday')}?</p>
                <button 
                  className="flex w-[60%] mx-auto mt-10  items-center justify-center h-10 md:h-20 md:my-5 bg-blue-800 p-2 rounded-[20px] text-lg text-white font-medium"
                  onClick={handleClick}>
                  {t('logHabit')}
              </button>
              </>
               : <>
               <p className="flex mx-auto items-center justify-center text-center text-2xl my-2 md:my-10">{t('habitsOutOfDate')}.</p>
             </> }
              </div>
          )}
          <div className="flex justify-center h-auto mx-auto w-[95%] mt-10">
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
                    highlightedDays: highlightedDays,
                    goalDays: goalDays,
                    completedGoalDays: completedGoalDays,
                  },
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
