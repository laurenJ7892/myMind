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
  const { setUser, user } = useUser()
  
  useEffect(() => {
    //const json = localStorage.getItem("sb-suleascckvruxdkgklay-auth-token")
    // const data = JSON.parse(json)
    const getData = async () => {
      const { data } = await supabase.auth.getUser()
      if (data) {
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
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[40vh] w-[90%] mx-auto text-2xl font-bold bg-blue-100">
         <h2 className="flex items-center ml-5">My Mind is a tool for young adults to find resources and use its tools to identify, manage and overcome depression. We do not collect nor utilise personal data and a free source</h2>
        <Image
          src="/Images/home.png"
          alt="My Mind helping manage anxiety"
          width={500}
          height={500}
          className="flex items-center m-auto"
          priority
        />
        </div>
        <div className="flex h-full w-[60%] mt-[100px] md:mt-8 mx-auto text-lg bg-gray-200">
          <h2>
            Depression Quiz
          </h2>
          <p>
            TO DO CONTENT HERE
          </p>
        </div>
      </main>
    </>
  )
}
