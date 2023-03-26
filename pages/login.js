import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const { setUser, setSession } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email, 
      password: password,
    });

    if (data.user && data.session) {
      setUser(data.user)
      setSession(data.session)
      setEmail('')
      setPassword('')
      
      Router.push('/')
    } else {
      setError(error.message)
      return;
    }
  }

  const disabled = (email != "") && (password != "")

  return (
    <>
      <Header />
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mx-auto text-5xl text-cyan-800">LOGIN</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input
              type="email"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="email"
              name="email"
              placeholder="EMAIL"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
            />
           </div>
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type="password"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              minLength="6"
              id="password"
              name="password"
              placeholder="PASSWORD"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
            />
           </div>
           {error ? <p className={"flex mx-auto w-[95%] md:w-full my-5"}>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              Login
           </button>
         </form>
         <Link href='/reset-password' aria-label="reset-your-password"  className="flex p-4 mt-4 justify-end text-base font-light text-black-200">
          Forgot your password?
        </Link>
        </div>
      </main>
    </>
  )
}