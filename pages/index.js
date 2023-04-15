import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import Header from "../components/header"
import Router from 'next/router'
import { useUser } from "../lib/context"
import {supabase} from "../lib/supabaseClient"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { setUser, setSession, session } = useUser()
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getData = async () => {
      const { data: { user }} = await supabase.auth.getUser()
      const { data: { session }, error } = await supabase.auth.getSession()
    
      if (user && session) {
        setUser(user)
        setSession(session)
        Router.push("/dashboard")
      }
    }

    if (session && session.user){
      setUser(session.user)
      Router.push("/dashboard")
    } else {
      getData()
    }
  }, [])

  return (
    <>
      <Head>
        <title>MyMind</title>
        <meta name="description" content="Help manage anxiety and depression" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[60vh] md:h-[50vh] w-[90%] mx-auto text-2xl bg-blue-100">
          <div className="flex grid grid-rows">
            <h2 className="flex items-center justify-center text-center font-bold">We are here to help with your anxiety.</h2>
            <h4 className="flex items-center justify-center text-center">Start creating healthier self-care habits with the MyMind tracker</h4>
            <button className="bg-blue-800 text-white rounded-[20px] w-[50%] md:h-[50%] mx-auto">
              <Link href="/signup" className="flex items-center justify-center text-center font-bold">Sign up here</Link>
            </button>
          </div>
          <Image
            src="/Images/home2.jpg"
            alt="My Mind helping manage anxiety"
            width={500}
            height={500}
            className="flex items-center m-auto"
            priority
          />
        </div>
        <div className="flex grid grid-rows h-full w-[90%] mt-5 md:mt-[5] md:mt-8 mx-auto text-lg bg-gray-200 p-10">
          <h2 className="flex items-center ml-5 font-bold text-xl">
            Who are we?
          </h2>
          <p className="flex items-center w-[90%] mx-auto">
            MyMind is a tool aimed at first-year online students to help manage their anxiety or depression. We are a free resource and collect minimal personal information to best protect your privacy.
          </p>
          <p className="flex items-center w-[90%] mx-auto">Our goal is to help you create a healthier habits by focusing on what you can do and encouraging self-care behaviours. These behaviours are in line with research from top psychologists to best manage anxiety and depression</p>
        </div>
      </main>
    </>
  )
}
