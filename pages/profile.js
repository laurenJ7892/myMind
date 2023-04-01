import { Inter } from '@next/font/google'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Header from "../components/header"
import { supabaseAdmin, supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import Modal from "../components/modal"


const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
  const { user, setUser } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const [submitted, setSubmitted] = useState(false)
  const [disabled, setDisabled] = useState(true)
  
  const [accountTab, setAccountTab] = useState(true)
  const [passwordTab, setPasswordTab] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [passwordInput, setPasswordInput] = useState("password")

  const handleSubmit = async (e) => {
    if (user && user.user_metadata) {
      e.preventDefault();
      
      const changedFName = firstName ? firstName : user.user_metadata?.first_name;
      const changedLName = lastName ? lastName : user.user_metadata?.last_name; 
      const changedEmail = email ? email : user.email;

      if (changedFName != user.user_metadata?.first_name || changedLName !=  user.user_metadata?.last_name || changedEmail != user.email) {
    
        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
          user.id, {
          email: changedEmail, 
          user_metadata: {
            first_name: changedFName,
            last_name: changedLName,
          }
        });

        if (data.user) {
          setDisabled(true)
          setUser(data.user)
          setEmail('')
          setFirstName('')
          setLastName('')
          setSubmitted(true)
      
        } else {
          setError(error.message)
        }
      }
      else {
        setError("Please change at least one value")
      }
    }
  }

  const toggleActive = () => {
    setError(null)
    setPasswordTab(false)
    setAccountTab(true)
  }

  const togglePassword = () => {
    setError(null)
    setAccountTab(false)
    setPasswordTab(true)
  }

  const togglePassword = () => {
    if (passwordInput === "password") {
      setPasswordInput("text")
    } else {
      setPasswordInput("password")
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password != passwordConfirm) {
      setError("Please review your passwords. They do not match! ")
      // return;
    }

    if (!(/(?=.*\d)/.test(password))){
      setError("Please make sure your password has at least one number character")
      // return;
    }

    if (!(/(?=.*\W)/.test(password))) {
      setError("Please make sure your password has at least one special character")
      // return;
    }

    if (!(/(?=.*[A-Z])/.test(password))) {
      setError("Please make sure your password has at least one uppercase character")
      // return;
    }

    if (!(/(?=.*[a-z])/.test(password))) {
      setError("Please make sure your password has at least one lowercase character")
      // return;
    }

    if (password == passwordConfirm && 
        (/(?=.*[a-z])/.test(password)) &&
        (/(?=.*[A-Z])/.test(password)) &&
        (/(?=.*\W)/.test(password)) && 
        (/(?=.*\d)/.test(password))
    ) {
      const { user, error } = await supabase.auth.update({password: password})

      if (user) {
        setUser(user)
        setPassword('')
        setPasswordConfirm('')
        setSubmitted(true)
      } else {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    if (!user || Object.keys(user).length == 0) {
      Router.push('/')
    }
  }, [])

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={"User Information updated"} text={"If you updated your email, it won't be visible until you confirm your email via email"}  />) : ''}
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[70vh] w-[90%] mx-auto bg-blue-100">
          <div className="flex grid grid-rows mx-auto my-auto">
           <button className="bg-blue-800 text-white rounded-[20px] p-4 my-5" onClick={toggleActive}>Account Information</button>
           <button className="bg-blue-400 text-black rounded-[20px] p-4 my-5" onClick={togglePassword}>Change Password</button>
          </div>
          <div className={accountTab ? 'visible' : 'hidden'}>
            <h2 className="flex items-center my-5 mx-auto justify-center text-2xl font-bold w-[100%] ">Your account information</h2>
            <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%] text-xl font-medium"> 
              <div className="mx-auto w-[80%]">
                  <label className="mx-5">First Name</label>
                  <input 
                    type="text"
                    required
                    placeholder={user.user_metadata?.first_name}
                    id="name"
                    name="name"
                    disabled={disabled}
                    className="py-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%] md:w-[80%] my-5 md:mt-0"
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                    value={firstName}
                  />
                </div>
                <div className="mx-auto w-[80%]">
                <label className="mx-5">Last Name</label>
                <input
                  type="text"
                  className="p-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%] md:w-[80%] my-5 md:mt-0"
                  required
                  id="lastName"
                  name="lastName"
                  disabled={disabled}
                  placeholder={user.user_metadata?.last_name}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  value={lastName}
                  />
              </div>
              <div className="mx-auto w-[80%]">
              <label className="mx-7">Email</label>
                <input
                  type="email"
                  className="p-3 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%] md:w-[80%] my-5 md:mt-0"
                  required
                  id="email"
                  name="email"
                  disabled={disabled}
                  placeholder={user.email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  value={email}
                />
              </div>
              {error ? <p>{error}</p> : ''}
              {disabled ?  
                <button
                    onClick={() => setDisabled(false)}
                    className="flex justify-center mx-auto w-[95%] md:w-[40%] mt-5 md:mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
                    Edit
                </button> : 
                <button
                  onClick={handleSubmit}
                  disabled={!!submitted}
                  className="flex justify-center mx-auto w-[95%] md:w-[40%] mt-5 md:mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
                  Update
                </button>
              }
            </form>
          </div>
          <div className={passwordTab ? 'visible' : 'hidden'}>
          <h2 className="flex items-center mt-5 mx-auto justify-center text-2xl font-bold w-[100%]">Change Password</h2>
          <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input
              type={passwordInput}
              className="py-5 mx-auto text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800  w-[90%] md:w-[80%]"
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
              className="py-5 mx-auto text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[90%] md:w-[80%]"
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
              <Image 
                src={"/Images/eye-solid.svg"}
                height={20}
                width={20}
                onClick={togglePassword}
                alt="show password"/>
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              disabled={password && password === passwordConfirm ? false : true}
              onClick={handlePasswordChange}
              className="flex justify-center mx-auto w-[90%] md:w-[50%] mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              Change password
           </button>
         </form>
          </div>
        </div>
      </main>
    </>
  )
}
