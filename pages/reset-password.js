import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

export default function ResetPassword() {
  const { t } = useTranslation('common');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { setUser, user, session } = useUser()
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [passwordInput, setPasswordInput] = useState("password")

  const togglePassword = () => {
    if (passwordInput === "password") {
      setPasswordInput("text")
    } else {
      setPasswordInput("password")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != passwordConfirm) {
      setError("Please review your passwords. They do not match! ")
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

    if (data.user) {
      setUser(data.user)
      setPassword('')
      setPasswordConfirm('')
      setSubmitted(true)
      
    } else {
      setError(error)
      return;
    }
  }

  const disabled = (password != "") && (passwordConfirm != "")

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={t('resetPassword')} text={t('resetPasswordSuccess')}  />) : ''}
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mt-5 mx-auto text-5xl text-cyan-800">{t('resetPassword')} </h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input
              type={passwordInput}
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              id="password"
              name="password"
              minLength="6"
              placeholder={t('password')} 
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
            />
           </div>
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            <input 
              type={passwordInput}
              className="py-5 text-cyan-800 text-center border-gray-400 focus:border-cyan-800 border border-4 placeholder:text-cyan-800 w-[100%]"
              required
              minLength="6"
              id="passwordConfirm"
              name="passwordConfirm"
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
           {error ? <p>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              {t('resetPassword')} 
           </button>
         </form>
        </div>
      </main>
      <Footer />
    </>
  )
}