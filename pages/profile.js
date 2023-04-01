import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabaseAdmin }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import Modal from "../components/modal"

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
  const { user, setUser } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const changedFName = firstName ? firstName : user.user_metadata.first_name;
    const changedLName = lastName ? lastName : user.user_metadata.last_name; 
    const changedEmail = email ? email : user.email;
  
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id, {
      email: changedEmail, 
      user_metadata: {
        first_name: changedFName,
        last_name: changedLName,
      }
    });

    if (data.user) {
      setSubmitted(true)
      setDisabled(true)
      setUser(data.user)
      setEmail('')
      setFirstName('')
      setLastName('')
    
      Router.push('/')
    } else {
      console.log(error)
      setError(error.message)
      return;
    }

  }

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={"User Information updated"} text={"If you updated your email, it won't be visible until you confirm your email via email"}  />) : ''}
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-1 mt-5 flex h-[70vh] w-[90%] mx-auto bg-blue-100">
          <div>
            <h2 className="flex items-center my-5 justify-center text-2xl font-bold">Your account information</h2>
            <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%] text-xl font-medium"> 
           <div className="mx-auto w-[80%]">
              <label className="mx-5">First Name</label>
              <input 
                type="text"
                required
                placeholder={user.user_metadata.first_name}
                id="name"
                name="name"
                disabled={disabled}
                className="py-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%] md:w-[80%] my-5 md:mt-0"
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                value={firstName}
              />
            </div>
            <div className="mx-auto w-[80%]">
            <label className="mx-5">Last Name</label>
            <input
              type="text"
              className="p-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%] md:w-[80%] my-5 md:mt-0"
              required
              id="lastName"
              name="lastName"
              disabled={disabled}
              placeholder={user.user_metadata.last_name}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              value={lastName}
              />
           </div>
           <div className="mx-auto w-[80%]">
           <label className="mx-11">Email</label>
            <input
              type="email"
              className="p-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%] md:w-[80%] my-5"
              required
              id="email"
              name="email"
              disabled={disabled}
              placeholder={user.email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
            />
           </div>
           {error ? <p>{error}</p> : ''}
           {disabled ?  
            <button
                onClick={() => setDisabled(false)}
                className="flex justify-center mx-auto w-[95%] md:w-[30%] mt-5 md:mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
                Edit
            </button> : 
            <button
              onClick={handleSubmit}
              disabled={!!submitted}
              className="flex justify-center mx-auto w-[95%] md:w-[30%] mt-5 md:mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              Update
            </button>
        }
         </form>
          </div>
        </div>
      </main>
    </>
  )
}
