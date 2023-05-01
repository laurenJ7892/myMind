import { Inter } from '@next/font/google'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from "../components/header"
import Footer from "../components/footer"
import Form from '../components/healthcheckform'


const inter = Inter({ subsets: ['latin'] })


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}

export default function HealthCheck() {
  const { t } = useTranslation('common');
  return (
    <>
      <div>
        <Header />
        <main className="flex flex-col w-full h-auto">
          <div className='flex wrap flex-col directoblock flex p-20'>
            <Form/>
          </div>
        </main>
      </div>
      <Footer />  
    </>
  )
}