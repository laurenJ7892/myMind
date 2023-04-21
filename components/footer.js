import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export default function Footer () {
  const { t } = useTranslation('common');

  return (
    <div className="fixed bottom-0 left-0 h-[80px] mt-10 flex-col justify-between w-[100vw] z-5">
      <footer className="hidden sm:flex items-center justify-between">
        <Link href='/' aria-label="myMind"  className="flex p-4 font-medium text-blue-900 underline ml-5">
          {t('home')}
        </Link>
        <div className="flex items-center text-sm leading-5 mr-5">
            <div className="flex">
            <Link 
                href="/about" 
                aria-label="about" 
                className="hidden mx-4 sm:flex font-medium text-blue-900 underline">
                {t('aboutUs')}
              </Link>
            <Link 
                href="/data" 
                aria-label="data" 
                className="hidden mx-4 sm:flex font-medium text-blue-900 underline">
                 {t('dataPolicy')}
              </Link>
            <Link 
                href="/terms" 
                aria-label="terms" 
                className="hidden mx-4 sm:flex font-medium text-blue-900 underline">
                 {t('termsConditions')}
              </Link>
              
            </div>
        </div> 
      </footer>
    </div>
  )
}