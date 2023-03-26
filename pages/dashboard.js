import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"



export default function Dashboard() {
  const { user } = useUser()
  console.log(user)
  
  // TO DO: If no user => redirect to home page

  return (
    <>
      <Header />
      <div>
        <h2>Hey there, {user?.user_metadata?.first_name}</h2>
      </div>
    </>
  )
}