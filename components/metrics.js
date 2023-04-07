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
        setBestDay(new Date(bestDayArr[0]).toLocaleDateString())
        setBestDaySubmissions(bestDayArr[1])
      }

      let startDate
      let streakStartDate
      let streakObj = {}

      dates.forEach((item, index) => {
          streakStartDate = new Date(item).setHours(0, 0, 0)
          let streak = 0
          startDate = streakStartDate
          for (let i = index + 1; i < dates.length; i++) {
            const nextDateDayJS = dates[i]
            const nextDayDate = new Date(nextDateDayJS).setHours(0, 0, 0)
            if (nextDayDate - startDate == 86400000) {
              streak++
              startDate = nextDayDate
            }
          }
          streakObj[streakStartDate] = streak
      })
      if (Object.keys(streakObj).length > 0) {
        const streak = Object.keys(streakObj).reduce((a, b) => streakObj[a] > streakObj[b] ? a : b);
        const streakInt = parseInt(streak)
        const streakLen = parseInt(streakObj[streak])
        const streakSec = streakLen * 86400000
        const streakEnd = streakInt+streakSec
        console.log(streakEnd)

        setStreakStart(new Date(streakInt).toLocaleDateString())
        setStreak(streakLen + 1)
        setStreakEnd(new Date(streakEnd).toLocaleDateString())
      }
    }
  }, [allHabits])


  return (
    <>
    {allHabits && allHabits.length > 0 && bestDay ? 
      <div className={"w-[90%] mx-auto mt-5"}>
        <h2 className="flex items-center justify-left mx-auto md:my-5 text-xl font-bold">Metrics</h2>
        <p>Best day for recording self care was: {bestDay ? bestDay.split("-").reverse().join("-") : ''}</p>
        <p>Number of habits logged on the best day was: {bestDaySubmissions}</p>
        <p>Number of days with habits logged in a row: {streak}</p>
        <p>Streak days were between {streakStart ? streakStart : ''} and {streakEnd ? streakEnd : ''}</p>
        <br />
        <p className="flex items-center justify-center mx-auto md:my-5 w-[90%] font-bold">Can you beat these metrics this month?</p>
      </div>
      : 
      <p> Log an habit to start seeing your metrics! </p> }
    </>
  )
}