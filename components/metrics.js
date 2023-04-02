import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import {useEffect, useState} from "react"
import { useUser } from '../lib/context'


export default function Metrics () {
  const { user, allHabits } = useUser()
  const [bestDay, setBestDay] = useState(null)
  const [bestDaySubmissions, setBestDaySubmissions] = useState(0)
  const [streak, setStreak] = useState()
  const [streakStart, setStreakStart] = useState(null)
  const [streakEnd, setStreakEnd] = useState(null)

  useEffect(() => {
    if (!user || Object.keys(user).length == 0 || !allHabits) {
      
    } else {
      let dateResult = {}
      let dates = []

      allHabits.forEach((habit) => {
        dates.push(habit.created_at)
        const date = habit.created_at.split("T")[0].toString();
        if (dateResult[date]) {
          dateResult[date] += 1;
      } else {
        dateResult[date] = 1;
        }
      })

      const sorted = Object.entries(dateResult).sort((prev, next) => prev[1] - next[1])
      const sortedLength = sorted.length - 1
      const bestDayArr = sorted[sortedLength]
      if (bestDayArr && bestDayArr.length > 0){
        setBestDay(bestDayArr[0])
        setBestDaySubmissions(bestDayArr[1])
      }
      let startDate
      let streakDays = 1
      
      dates.forEach((item, index) => {
        if (index == 0) {
          startDate = dayjs(item)
        } else {
          let nextDate = dayjs(item)
          if (Math.abs(startDate.diff(nextDate, 'day')) == 1) {
            if (streakDays == 1) {
              setStreakStart(startDate)
            }
            streakDays++
            startDate = nextDate
            setStreakEnd(nextDate)
          }
        }
      })
      setStreak(streakDays)
    }
  }, [])


  return (
    <>
    {allHabits && allHabits.length > 0 && bestDay ? 
      <div className={"w-[90%] mx-auto mt-5"}>
        <h2 className="flex items-center justify-center mx-auto md:my-5 w-[90%] text-xl font-bold">Metrics</h2>
        <p>Best day for recording self care was: {bestDay ? bestDay.split("-").reverse().join("-") : ''}</p>
        <p>Number of habits logged on the best day was: {bestDaySubmissions}</p>
        <p>Number of days with habits logged in a row: {streak}</p>
        <p>Streak days were between {streakStart ? new Date(streakStart).toISOString().substring(0, 10) : ''} and {streakEnd ? new Date(streakEnd).toISOString().substring(0, 10) : ''}</p>
        <br />
        <p className="flex items-center justify-center mx-auto md:my-5 w-[90%] font-bold">Can you beat these metrics this month?</p>
      </div>
      : 
      <p> Log an habit to start seeing your metrics! </p> }
    </>
  )
}