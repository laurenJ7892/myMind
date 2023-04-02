import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import Modal from "../components/modal"

const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const { setUser, setSession } = useUser()
  const [accept, setAccept] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const [passwordInput, setPasswordInput] = useState("password")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email != emailConfirm) {
      setError("Please review your email. They do not match! ")
      return
    }

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

    const { data, error } = await supabase.auth.signUp({
      email: email, 
      password: password,
      options: {
        data: {
          first_name: firstName, 
          last_name: lastName, 
        }
      }
    });

    if (data.user && data.session) {
      setUser(data.user)
      setSession(data.session)
      setSubmitted(true)
      
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
     
      
      Router.push('/dashboard')
    } else {
      if (error.name == "AuthApiError"){
        setError("Have you already signed up? Try to login!")
      } else {
        setError(error.message)
      }
      return;
    }
  }

  const togglePassword = () => {
    if (passwordInput === "password") {
      setPasswordInput("text")
    } else {
      setPasswordInput("password")
    }
  }

  const disabled = (firstName != "") && (lastName != "") && (email != "") && (password != "") && (accept) && (emailConfirm != "") && (passwordConfirm != "")

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={"Signup Success"} text={"Your account has successfully been created"}  />) : ''}
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[90%] mt-5 mx-auto text-5xl text-cyan-800">SIGN UP</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex justify-between mx-auto w-[95%] md:w-full grid grid-cols grid-cols-1 md:flex">
            <input 
              type="text"
              required
              placeholder="FIRST NAME"
              id="name"
              name="name"
              className="py-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 md:w-[50%] my-5 md:mt-0"
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              value={firstName}
            />
            <div className="mx-2"></div>
            <input
              type="text"
              className="py-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 md:w-[50%] my-5 md:mt-0"
              required
              id="lastName"
              name="lastName"
              placeholder="LAST NAME"
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              value={lastName}
              />
           </div>
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
              type="email"
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="confirmEmail"
              name="confirmEmail"
              placeholder="CONFIRM EMAIL"
              onChange={(e) => {
                setEmailConfirm(e.target.value)
              }}
              value={emailConfirm}
              />
           </div>
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type={passwordInput}
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
            <Image 
                src={"/Images/eye-solid.svg"}
                height={20}
                width={20}
                onClick={togglePassword}
                alt="show password"/>
           </div>
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type={passwordInput}
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="confirmPassword"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              onChange={(e) => {
                setPasswordConfirm(e.target.value)
              }}
              value={passwordConfirm}
            />
             <Image 
                src={"/Images/eye-solid.svg"}
                height={20}
                width={20}
                onClick={togglePassword}
                alt="show password"/>
           </div>
           <div className="flex mx-auto w-[95%] md:w-full mt-3">
             <input
             onChange={(e) => {
                setAccept(!accept)
              }}
              required
              value={accept}
              type="checkbox"/>
              <a href="/terms">
                <label className="ml-5 text-cyan-800 text-lg">Accept <span className="font-bold">terms and conditions</span></label>
              </a>
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              SIGN UP
           </button>
         </form>
        </div>
      </main>
    </>
  )
}