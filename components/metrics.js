import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import {useEffect, useState} from "react"
import { useUser } from '../lib/context'
import GoalModal from "../components/goalModal"


export default function Metrics () {
  const { user, allHabits, goal } = useUser()
  const [bestDay, setBestDay] = useState(null)
  const [bestDaySubmissions, setBestDaySubmissions] = useState(0)
  const [streak, setStreak] = useState()
  const [streakStart, setStreakStart] = useState(null)
  const [streakEnd, setStreakEnd] = useState(null)
  const [habitType, setHabitType] = useState(null)
  const [habitActivities, setHabitActivities] = useState(null)
  const [updateGoal, setUpdateGoal] = useState({})
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [goalModalVisible, setGoalModalVisible] = useState(false)

  const handleEdit= async (row) => {   
    setUpdateGoal(row)
    setEditVisible(true)
  }

  const handleDelete = async (row) => {
    setUpdateGoal(row)
    setDeleteVisible(true)
  }

  const handleGoalModalClick = () => {
    setGoalModalVisible(true)
  }

   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!user || Object.keys(user).length == 0 || !allHabits) {
      
    } else {
      // Habit counter by day
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
        const updatedDate = new Date(bestDayArr[0]).setHours(11, 0, 0)
        setBestDay(new Date(updatedDate).toLocaleDateString())
        setBestDaySubmissions(bestDayArr[1])
      }

      // Streak Counter and Days
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

        setStreakStart(new Date(streakInt).toLocaleDateString())
        setStreak(streakLen + 1)
        setStreakEnd(new Date(streakEnd).toLocaleDateString())
      }

      // Most commonly recorded well-being habit
      let habitResult = {}

      allHabits.forEach((habit) => {
        let name = habit.habits.name
        if (habitResult[name]) {
          habitResult[name] += 1;
      } else {
        habitResult[name] = 1;
        }
      })

      const sortedHabitCounter = Object.entries(habitResult).sort((prev, next) => prev[1] - next[1])
      const sortedHabitLength = sortedHabitCounter.length - 1
      const bestHabitArr = sortedHabitCounter[sortedHabitLength]

      if (bestHabitArr && bestHabitArr.length > 0){
        setHabitType(bestHabitArr[0])
        setHabitActivities(bestHabitArr[1])
      }
    }
  }, [allHabits])


  return (
    <>
    { deleteVisible ? <GoalModal heading={"Delete Goal"} item={updateGoal} mode={"delete"} /> : ''}
    { editVisible ? <GoalModal heading={"Update Goal"} item={updateGoal} mode={"edit"} /> : ''}
    { goalModalVisible ? <GoalModal  /> : ''}
    {allHabits && allHabits.length > 0 && bestDay ? 
      <div className={"flex grid grid-rows w-[95%] mx-auto justify-center my-1 md:my-5"}>
        <div className={"flex my-2 mx-auto w-[90%] justify-center"}>
          <Image
            src={"/Images/trophy-solid.svg"}
            height={50}
            width={50}
            alt={"Celebratory tropy"}
            className="hidden md:flex"
            >
          </Image>
          <h2 className="flex w-[100%] md:my-5 justify-center text-md md:text-xl">Take a <span className="flex text-cyan-600 font-semibold mx-1"> moment </span> to celebrate your <span className="flex text-cyan-600 font-semibold mx-1"> progress </span></h2>
          <Image
            src={"/Images/trophy-solid.svg"}
            height={50}
            width={50}
            alt={"Celebratory trophy"}
            className="hidden md:flex"
            >
          </Image>
        </div>
          <p className="text-center md:justify-center w-[100%] text-md">Your best day for taking time for yourself was <span className="font-bold text-cyan-600 mx-1"> {bestDay ? bestDay.split("-").reverse().join("-") : ''} </span>  where you logged <span className="mx-1 font-bold text-cyan-600"> {bestDaySubmissions} {bestDaySubmissions > 1 ? "activities" : "activity"} </span> </p>
          <p className="text-center md:justify-center w-[100%]">Your most frequently recorded well-being habit is <span className="font-bold text-cyan-600 mx-1"> {habitType} </span> which you have recorded  <span className="font-bold text-cyan-600 mx-1"> {habitActivities ? habitActivities : ''} </span>  {habitActivities > 1 ? "activities" : "activity"} </p>
          <p className="text-center md:justify-center w-[100%]">Your best daily streak has been <span className="font-bold text-cyan-600 mx-1"> {streak} {streak > 1 ? "days" : "day"} </span> between  <span className="font-bold text-cyan-600 mx-1"> {streakStart ? streakStart : ''} </span> and <span className="font-bold text-cyan-600 mx-1"> {streakEnd ? streakEnd : ''} </span> </p>
          {goal && goal.length > 0 ?
            <>
            <h2 className="text-center md:justify-center w-[100%] text-lg mt-5">Your current {goal && goal.length > 1 ? "goals are:" : "goal is:"}</h2>
            <table className="mt-2 mx-auto table-fixed md:table-auto border border-2 mx-5 border-cyan-800 border-collapse border-spacing-0.5">
              <tbody>
                {goal && goal.length > 0  ? goal.map((item) =>
                <tr key={item.id}>
                  <td className="text-md text-center">By {item.completion_date ? new Date(item.completion_date).toLocaleDateString('en-AU') : ''} I want to prioritise my self care {item.num_times} {item.num_times > 1 ? "times" : "time"} </td>
                  <td className="border border-1 border-cyan-800 border-spacing-0.5 p-2 md:table-cell">
                    <button 
                        className="flex mx-auto items-center justify-center p-2 rounded-[20px]"
                        onClick={() => handleEdit(item)}
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
                        onClick={() => handleDelete(item)}>
                      <Image
                        src="Images/trash-solid.svg"
                        height={15}
                        width={15}
                        alt="delete habit"
                      />
                      </button>
                  </td>
                </tr> 
                ) : ''}
              </tbody>
            </table>
            </>
            :
            <p className="text-center md:justify-center w-[100%] text-md">Keep it up and set a <button onClick={handleGoalModalClick} className="font-bold text-cyan-600 mx-1">goal</button> for this week</p>
          }
      </div>
      : 
      <p className="text-center md:items-center md:justify-center mx-auto w-[90%] text-2xl mt-10"> Log a habit to start seeing your metrics! </p> }
    </>
  )
}