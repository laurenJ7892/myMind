import { useState } from 'react'
import Router from 'next/router'
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

const Modal = ({ heading, text, route, data, date, utcDate }) => {
  const [showModal, setShowModal] = useState(true)
  const { user } = useUser()
  const [habit, setHabit] = useState(0)
  const [notes, setNotes] = useState('')

  const handleClick = () => {
    setShowModal(false)
    if (route) {
      Router.push(route)
    } else {
      Router.push("/")
    }
  }

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('user_habits')
      .insert({ 
        user_id: user.id, 
        habit_id: habit,
        description: notes,
        created_at: utcDate
       })

    console.log(error)
    if (!error) {
      alert("Saved")
      setShowModal(false)
      if (route) {
        Router.push(route)
      } else {
        Router.push("/")
      }
    }
  }

  return (
    <div>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-[75%] max-w-lg">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h5 className="text-2xl font-semibold">{heading}</h5>
                <button className="" onClick={handleClick}>
                  X
                </button>
              </div>
              { date ? (
              <div className="relative flex-auto ml-5 p-2">
                <label>Date</label>
                <input type="date" disabled value={date} className={"p-3"}/>
              </div>
            ) : '' }
              <div className="relative flex p-2 ml-5">
                <p className="my-2 text-md leading-relaxed text-cyan-800">{text}</p>
                { data ? (
                <>
                  <select className={"ml-2 w-70%"} onChange={(e) => setHabit(e.currentTarget.value)}>
                    {data.map(row =>
                      <option key={row.id} value={row.id}>{row.name}</option>
                    )}
                  </select>
                </>
                )
                : '' }
              </div>
              { data ?
              <>
                <input type="text" id="notes" placeholder="Add notes?" maxlength="100" className={"p-3 mx-auto ml-3 w-[90%]"} onChange={(e) => setNotes(e.currentTarget.value)}/>
                <button className="flex bg-blue-800 mx-auto justify-center text-white rounded-[20px] w-[50%] p-4 m-5" onClick={handleSubmit}>Submit</button> 
              </>
              : '' }
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Modal
