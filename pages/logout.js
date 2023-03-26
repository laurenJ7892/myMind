import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

const inter = Inter({ subsets: ['latin'] })

export default function Logout() {
  const { setUser, setSession } = useUser()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error)
      return;
    } else {
      setUser({})
      setSession({})
      Router.push('/')
    }
  }

  return (
    <>
      <Header />
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mt-5 mx-auto text-5xl text-cyan-800">LOGOUT</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            Are you sure you want to log out?
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              Logout
           </button>
         </form>
        </div>
      </main>
    </>
  )
}