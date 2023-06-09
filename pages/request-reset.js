import { Inter } from '@next/font/google'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from "../components/header"
import Footer from "../components/footer"
import { supabase }  from '../lib/supabaseClient'
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


const RequestReset = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  
  const websiteUrl = process.env.VERCEL_URL || "http://localhost:3000";
  const redirectUrl = websiteUrl + "/reset-password"
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email != emailConfirm) {
      setError(t('errorEmailMatch'))
      return
    }

  
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      setError(error.message)
      return;
    } else {
      setEmail('')
      setEmailConfirm('')
      setSubmitted(true)
    }
  }

  const disabled = (email != "") && (emailConfirm != "")

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={t('resetModalHeading')} text={t('aboutUs')}  />) : ''}
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] md:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mt-5 mx-auto text-5xl text-cyan-800">{t('passwordReset')}</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
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
              id="emailConfirm"
              name="emailConfirm"
              placeholder={t('confirmEmail')}
              onChange={(e) => {
                setEmailConfirm(e.target.value)
              }}
              value={emailConfirm}
            />
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              disabled={!disabled}
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
             {t('requestResetPassword')}
           </button>
         </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default RequestReset