import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'


const inter = Inter({ subsets: ['latin'] })

export default function RequestReset() {
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [error, setError] = useState(null)

  const redirectUrl = process.NEXT_PUBLIC_URL + "/reset-password"
  console.log(redirectUrl)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email != emailConfirm) {
      setError("Please review your email. They do not match! ")
      return
    }

  
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      setError(error.message)
      return;
    } else {
      // TO DO: Add modal for user feedback
      setEmail('')
      setEmailConfirm('')
      Router.push('/')
    }
  }

  const disabled = (email != "") && (emailConfirm != "")

  return (
    <>
      <Header />
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] md:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mt-5 mx-auto text-5xl text-cyan-800">REQUEST PASSWORD RESET</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input
              type="email"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="email"
              name="email"
              placeholder="YOUR EMAIL"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
            />
           </div>
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type="email"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="emailConfirm"
              name="emailConfirm"
              placeholder="CONFIRM NEW EMAIL"
              onChange={(e) => {
                setEmailConfirm(e.target.value)
              }}
              value={emailConfirm}
            />
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              Request Reset Password
           </button>
         </form>
        </div>
      </main>
    </>
  )
}