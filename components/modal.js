import { useState } from 'react'
import Router from 'next/router'
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

const Modal = ({ heading, text, route, data, date, utcDate, deleteHabit }) => {
  const visibleDate = new Date(date).setHours(11, 0, 0)
  const [showModal, setShowModal] = useState(true)
  const { user, setSuccessModal, session } = useUser()
  const [habit, setHabit] = useState(2)
  const [notes, setNotes] = useState('')

  const handleClick = () => {
    setShowModal(false)
    setSuccessModal(false)
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

    if (!error) {
      setShowModal(false)
      setSuccessModal(true)
    } else {
      alert(error.message)
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('user_habits')
      .delete()
      .eq('id', deleteHabit.id)

      setShowModal(false)
      Router.push("/")
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
                <input 
                  type="date" 
                  disabled 
                  value={new Date(visibleDate).toISOString().substring(0, 10)} 
                  className={"p-3"}/>
              </div>
            ) : '' }
             { deleteHabit ? (
              <div className="relative flex-auto ml-5 p-2">
                <label>Date</label>
                <input type="date" disabled value={new Date(deleteHabit.created_at).toISOString().substring(0, 10)} className={"p-3"}/>
              </div>
            ) : '' }
              <div className="relative flex p-2 ml-5">
                <p className="my-2 text-md leading-relaxed text-cyan-800">{text}</p>
                { data ? (
                <>
                  <select className={"ml-2 w-70%"} 
                    defaultValue={deleteHabit ? deleteHabit.habits.id : 2} 
                    disabled={deleteHabit ? true : false}
                    onChange={(e) => setHabit(e.currentTarget.value)}>
                    {data.props.map(row =>
                      <option key={row.id} value={row.id}>{row.name}</option>
                    )}
                  </select>
                </>
                )
                : '' }
              </div>
              { date ?
              <>
                <input type="text" id="notes" placeholder="Add notes?" maxLength="100" className={"p-3 mx-auto ml-3 w-[90%]"} onChange={(e) => setNotes(e.currentTarget.value)}/>
                <button className="flex bg-blue-800 mx-auto justify-center text-white rounded-[20px] w-[50%] p-4 m-5" onClick={handleSubmit}>Submit</button> 
              </>
              : '' }
               { deleteHabit ?
              <>
                <input type="text" id="notes" placeholder="Add notes?" maxLength="100"  value={deleteHabit.description} className={"p-3 mx-auto ml-3 w-[90%]"} disabled/>
                <button className="flex bg-blue-800 mx-auto justify-center text-white rounded-[20px] w-[50%] p-4 m-5" onClick={handleDelete}>Delete</button> 
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
