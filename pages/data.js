import { Inter } from '@next/font/google'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Header from "../components/header"
import Footer from "../components/footer"


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

export default function Data() {
  const { t } = useTranslation('common');
  return (
    <>
      <Header />
      <main className="flex grid grid-rows w-full h-auto">
        <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100">
         <h2 className="flex items-center mx-auto text-2xl font-bold">{t('dataHeading')}</h2>
         <p className="flex items-center w-[80%] mx-auto mt-5 bg-blue-100"> {t('dataLine1Start')}
          <a href="https://www.abs.gov.au/statistics/health/mental-health/national-study-mental-health-and-wellbeing/latest-release#media-releases">
          {t('dataLine1End')}
         </a>
         </p>
         <br />
         <p className="flex items-center w-[80%] mx-auto bg-blue-100">
         {t('dataLine2')}
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
        {t('dataLine3')}
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
        {t('dataLine4')}
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
        {t('dataLine5')}
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
        {t('dataLine6')}
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto mb-5 bg-blue-100">
        {t('dataLine7')}
         </p>
         <Link href="/">
          <label className="flex text-cyan-800 justify-center text-xl">
            <span className="underline ml-1">{t('home')}</span>
          </label>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}