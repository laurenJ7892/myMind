import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Lottie from 'lottie-react'
import welcome from "../public/Animations/welcome.json"

import Header from "../components/header"
import Footer from "../components/footer"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import Modal from "../components/modal"

const inter = Inter({ subsets: ['latin'] })

// Need this for useTranslation to Run
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}

export default function SignUp() {
  const { t } = useTranslation('common');
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
      setError("Please review your passwords. They do not match! ")
      return;
    }

    if (!(/(?=.*\d)/.test(password))){
      setError("Please make sure your password has at least one number")
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
        setError(t('errorSignUpAuth'))
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
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[90%] mt-5 mx-auto text-5xl text-cyan-800">{t('signUp')} </h2>
         <div className="flex w-[90%] mt-5 mx-auto text-2xl text-red-600">{t('fieldsCompulsory')}</div>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex justify-between mx-auto w-[95%] md:w-full grid grid-cols grid-cols-1 md:flex">
            <input 
              type="text"
              required
              placeholder={t('firstName')}
              maxLength="20"
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
              placeholder={t('lastName')}
              maxLength="20"
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
              placeholder={t('email')}
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
              placeholder={t('confirmEmail')}
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
              placeholder={t('password')}
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
           {submitted ? (
              <>
                <Modal heading={t('signupSuccessHeading')} text={t('signupSuccessText')} />
                <Lottie animationData={welcome} loop={true} />
            </>
            ) : ''}
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type={passwordInput}
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="confirmPassword"
              name="confirmPassword"
              placeholder={t('confirmPassword')}
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
              <Link href="/terms">
                <label className="ml-5 text-cyan-800 text-lg">{t('acceptSignup')} <span className="underline">{t('termsConditions')}</span></label>
              </Link>
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              {t('signUp')}
           </button>
         </form>
        </div>
      </main>
      <Footer />
    </>
  )
}