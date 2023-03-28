import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

import HabitTracker from "../components/habitTracker"

export default function Dashboard() {
  const { user } = useUser()
    // TO DO: Fix this on back key with persistance

  return (
    <>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md: grid-cols-1 mt-5 flex h-[30vh] md:h-[20vh] w-[90%] mx-auto text-2xl font-bold bg-blue-100">
          <h2 className="flex items-center mx-auto mt-5 w-[90%]">Hey there {user.user_metadata.first_name}</h2>
          <p className="flex w-[90%] text-base mx-auto h-[20vh] md:h-[10vh] bg-blue-100">
            A mini habit is a very small positive behaviour that you force yourself to do every day.
            <br></br>
            Small steps work every time and habits are built by consistency, not perfection.
            <br></br>
            <br></br>
            What will be a positive action that you can do for yourself today?
        </p>
        </div>
        <div>
          <HabitTracker />
        </div>
      </main>
    </>
  )
}