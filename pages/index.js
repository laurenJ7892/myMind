import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from "../components/header"
import Footer from "../components/footer"
import Router from 'next/router'
import { useUser } from "../lib/context"
import {supabase} from "../lib/supabaseClient"

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

export default function Home() {
  
  const { t } = useTranslation('common');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { setUser, setSession, session } = useUser()
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getData = async () => {
      const { data: { user }} = await supabase.auth.getUser()
      const { data: { session }, error } = await supabase.auth.getSession()
    
      if (user && session) {
        setUser(user)
        setSession(session)
        Router.push("/dashboard")
      }
    }

    if (session && session.user){
      setUser(session.user)
      Router.push("/dashboard")
    } else {
      getData()
    }
  }, [])

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content="Help manage anxiety and depression" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/favicon.ico" />
      </Head>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[60vh] md:h-[50vh] w-[90%] mx-auto text-2xl bg-blue-100">
          <div className="flex grid grid-rows">
            <h2 className="flex items-center justify-center text-center font-bold">{t('indexWelcome')}</h2>
            <h4 className="flex items-center justify-center text-center">{t('indexWelcome2')}</h4>
            <button className="bg-blue-800 text-white rounded-[20px] w-[50%] md:h-[50%] mx-auto">
              <Link href="/signup" className="flex items-center justify-center text-center font-bold">{t('indexSignCTA')}</Link>
            </button>
          </div>
          <Image
            src="/Images/home2.jpg"
            alt="My Mind helping manage anxiety"
            width={500}
            height={500}
            className="flex items-center m-auto"
            priority
          />
        </div>
        <div className="flex grid grid-rows h-full w-[90%] mt-5 md:mt-[5] md:mt-8 mx-auto text-lg bg-gray-200 p-10">
          <h2 className="flex items-center ml-5 font-bold text-xl">
            {t('indexWhoAreWe')}
          </h2>
          <p className="flex items-center w-[90%] mx-auto">
          {t('indexWhoAreWe2')}
          </p>
          <p className="flex items-center w-[90%] mx-auto">{t('indexGoal')}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
