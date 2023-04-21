import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useState } from 'react'
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

export default function Logout() {
  const { t } = useTranslation('common');
  const { setUser, setSession } = useUser()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error)
      return;
    } else {
      setUser({})
      setSession({})
      setSubmitted(true)
    }
  }

  return (
    <>
      <Header />
      {submitted ? (<Modal heading={t('logOutModalHeading')} text={t('logOutModalText')}  />) : ''}
      <main className="flex w-[100vw] h-[100vh]">
        <div className="w-[90%] lg:w-[40%] mx-auto text-2xl font-bold">
         <h2 className="flex w-[95%] mt-5 mx-auto text-5xl text-cyan-800">{t('logout')}</h2>
         <form className="flex mt-[10%] grid grid-rows items-center mx-auto w-[100%]"> 
           <div className="flex mx-auto w-[95%] md:w-full my-5">
            {t('logOutConfirmation')}
           </div>
           {error ? <p>{error}</p> : ''}
           <button
              onClick={handleSubmit}
              className="flex justify-center mx-auto w-[95%] md:w-full mt-10 bg-cyan-800 text-white p-5 disabled:bg-gray-400">
              {t('logout')}
           </button>
         </form>
        </div>
      </main>
      <Footer />
    </>
  )
}