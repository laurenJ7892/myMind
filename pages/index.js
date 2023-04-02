import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import Header from "../components/header"
import Router from 'next/router'
import { useUser } from "../lib/context"
import {supabase} from "../lib/supabaseClient"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { setUser } = useUser()
  
  useEffect(() => {
    //const json = localStorage.getItem("sb-suleascckvruxdkgklay-auth-token")
    // const data = JSON.parse(json)
    const getData = async () => {
      const { data } = await supabase.auth.getUser()
      if (data && data.user && data.user.id) {
        setUser(data.user)
        Router.push("/dashboard")
      }
    }
    getData()
  }, [])

  return (
    <>
    {/* TO DO Make Head a component for SEO */}
      <Head>
        <title>myMind</title>
        <meta name="description" content="Help manage anxiety and depression" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[60vh] md:h-[40vh] w-[90%] mx-auto text-2xl bg-blue-100">
          <div className="flex grid grid-rows">
            <h2 className="flex items-center justify-center text-center font-bold">Take control of your anxiety or depression!</h2>
            <h4 className="flex items-center justify-center text-center">Start creating healthier self-care habits with the MyMind tracker</h4>
            <button className="bg-blue-800 text-white rounded-[20px] w-[50%] md:h-[50%] mx-auto">
              <a href="/signup" className="flex items-center justify-center text-center font-bold">Sign up here</a>
            </button>
          </div>
          <Image
            src="/Images/home.png"
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
            MyMind is a tool aimed at first year online students to help manage their anxiety or depression. We are a free resource and collect minimal personal information to best protect your privacy.
          </p>
          <p className="flex items-center w-[90%] mx-auto">Our goal is to help you create a healthier habits by focusing on what you can do and encouraging self-care behaviours. These behaviours are in line with research from top psychologists to best manage anxiety and depression</p>
        </div>
      </main>
    </>
  )
}
