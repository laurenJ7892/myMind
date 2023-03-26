import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"

const inter = Inter({ subsets: ['latin'] })

export default function ResetPassword() {
  const { setUser, setSession } = useUser()
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != passwordConfirm) {
      setError("Please review your email. They do not match! ")
      return;
    }

    if (!(/(?=.*\d)/.test(password))){
      setError("Please make sure your password has at least one number character")
      return;
    }

    if (!(/(?=.*\W)/.test(password))) {
      setError("Please make sure your password has at least one special character")
      return;
    }

    if (!(/(?=.*[A-Z])/.test(password))) {
      setError("Please make sure your password has at least one uppercase character")
      return;
    }

    if (!(/(?=.*[a-z])/.test(password))) {
      setError("Please make sure your password has at least one lowercase character")
      return;
    }
  
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (data.user && data.session) {
      setUser(data.user)
      setSession(data.session)
      setPassword('')
      setPasswordConfirm('')
      
      Router.push('/')
    } else {
      setError(error)
      return;
    }
  }

  const disabled = (password != "") && (passwordConfirm != "")

  return (
    <>
      <Header />
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mt-5 mx-auto text-5xl text-cyan-800">RESET PASSWORD</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input
              type="password"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="password"
              name="password"
              minLength="6"
              placeholder="NEW PASSWORD"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
            />
           </div>
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type="password"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              minLength="6"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="CONFIRM NEW PASSWORD"
              onChange={(e) => {
                setPasswordConfirm(e.target.value)
              }}
              value={passwordConfirm}
            />
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              Reset Password
           </button>
         </form>
        </div>
      </main>
    </>
  )
}