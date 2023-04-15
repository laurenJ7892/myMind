import { useState } from 'react'
import Router from 'next/router'
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')

const GoalModal = ({ data, mode, item, heading }) => {
  const [showModal, setShowModal] = useState(true)
  const [date, setDate] = useState(undefined)
  const [goalHabit, setGoalHabit] = useState(null)
  const [goalAmount, setGoalAmount] = useState(null)
  const { user, setGoal, setSuccessModal, session } = useUser()

  const habitGoalFrequency = [...Array(8).keys()]
  
  const handleClick = () => {
    setShowModal(false)
    if (session && session.user) {
    } else {
      Router.push("/")
    }
  }

  const handleSubmit = async () => {
    const utcDate = new Date(date).toUTCString()
    const habit_id = goalHabit ? goalHabit : null

    const { data, error } = await supabase
      .from('user_goals')
      .insert({
        user_id: user.id,
        completion_date: utcDate,
        habit_id: habit_id,
        num_times: goalAmount
        })
      .select()
    
    if (data) {
      setGoal(data)
      setShowModal(false)
      setSuccessModal(true)
    } else {
      console.log(error)
    }
  }


  const handleDelete = async () => {
    console.log("delete called")
    const { error } = await supabase
      .from('user_goals')
      .delete()
      .eq('id', item.id)
    if (error) {
      console.log(error)
    }
    setShowModal(false)
    if (session && session.user) {
      } else {
        Router.push("/")
      }
  }

  const handleEdit = async () => {
    const utcDate = date ? new Date(date).toUTCString() : item.completion_date
    const habit_id = goalHabit ? goalHabit : item && item.habits && item.habits.id ? item.habits.id : null
    const updatedNumTimes = goalAmount ? goalAmount : item.num_times

    const { data, error } = await supabase
      .from('user_goals')
      .update({
        completion_date: utcDate,
        habit_id: habit_id,
        num_times: updatedNumTimes
        })
      .eq('id', item.id)
      .select()
    
    if (data) {
      setGoal(data)
      setShowModal(false)
      setSuccessModal(true)
    } else {
      console.log(error)
    }
  }



  const disabled = (date != "") && (goalHabit != "")

  return (
    <div>
      {showModal ? (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-4 mx-auto w-[50%] h-[50%]">
            <div className="relative flex w-full h-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h5 className="text-2xl font-semibold">{ heading ? heading : "Add a goal"}</h5>
                <button className="" onClick={handleClick}>
                  X
                </button>
              </div>
              { mode == "delete" ? 
              <>
                <div className="relative flex-auto ml-5 p-2">
                <h3 className="text-lg font-semibold mt-10">Are you sure you want to delete your goal?</h3>
                <p className="text-lg font-cyan-800">By {item ? new Date(item.completion_date).toLocaleDateString('en-AU') : ''} I want to prioritise my self care {item ? item.num_times : ''} {item && item.num_times > 1 ? "times" : "time"} </p>
                </div>
                <button 
                  className="flex bg-blue-800 justify-center text-white rounded-[20px] w-[30%] p-4 m-5"
                  onClick={handleDelete}>Delete my goal</button>
              </> : 
              <>
              <div className="relative flex-auto ml-5 p-2">
                <label>Completion date</label>
                <input 
                  type="date"
                  value={date}
                  min={new Date(dayjs()).toISOString().substring(0, 10)}
                  max={new Date(dayjs().add(7, 'days')).toISOString().substring(0, 10)}
                  className={"p-3 ml-2"}
                  onChange={(e) => setDate(e.currentTarget.value)}/>
              </div>
              <div className="relative flex-auto ml-5 p-2">
                <label>How many times do you want to aim to prioritise your self care by then?</label>
                <select className={"ml-2 w-50%"} 
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.currentTarget.value)}>
                  {habitGoalFrequency.map(row =>
                    <option key={row} value={row}>{row}</option>
                  )}
                </select>
              </div>
              <div className="relative flex p-2 ml-5">
               {/* <label>Do you want to specify the type of activity?</label>
                 {data ? 
                  <select className={"ml-2 w-90%"} 
                    defaultValue={2}
                    onChange={(e) => setGoalHabit(e.currentTarget.value)}>
                    {data.props.map(row =>
                      <option key={row.id} value={row.id}>{row.name}</option>
                    )}
                  </select> : '' } */}
              </div>
              { date && goalAmount ? 
              <>
                <div className="relative flex-auto ml-5 p-2">
                <h3 className="text-lg font-semibold">Goal:</h3>
                <p className="text-lg">By {date ? new Date(date).toLocaleDateString('en-AU') : ''} I want to prioritise my self care {goalAmount} {goalAmount > 1 ? "times" : "time"} </p>
                </div>
                {mode == "edit" ? 
                <button 
                  className="flex bg-blue-800 justify-center text-white rounded-[20px] w-[30%] p-4 m-5"
                  onClick={handleEdit}>Update
                </button> : 
                <button 
                  className="flex bg-blue-800 justify-center text-white rounded-[20px] w-[30%] p-4 m-5"
                  onClick={handleSubmit}>Submit
                </button> }
              </> : '' }
              </> }
            </div>
          </div>
        </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default GoalModal
