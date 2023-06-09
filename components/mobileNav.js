import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import headerNavLinks from "../lib/data/headerNavLinks"
import { useUser } from '../lib/context'

export default function MobileNav () {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false)
  const { user } = useUser()

  const onToggleNav = () => {
    setVisible((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
    <div className="sm:hidden">
    {visible ? '' :  
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
}
      <div
        className={`fixed top-0 left-0 z-20 h-[120vh] w-full transform bg-white-200 duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full' }`}
      >
        <div className="bg-white flex justify-end">
          <button
            type="button"
            className="mt-10 mr-5 bg-white h-8 w-8 rounded"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      <nav className="fixed w-full h-full bg-white">
        <div>
        {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-8">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900"
                onClick={onToggleNav}
              >
                 {t(`${link.title}`)}
              </Link>
            </div>
          ))}
        </div>
        <div key={'terms'} className="px-12 py-8">
          <Link
            href={"/terms"}
            className="text-2xl font-bold tracking-widest text-gray-900"
            onClick={onToggleNav}
          >
            {t('termsConditions')}
          </Link>
        </div>
        <div key={'about'} className="px-12 py-8">
          <Link
            href={"/about"}
            className="text-2xl font-bold tracking-widest text-gray-900"
            onClick={onToggleNav}
          >
            {t('aboutUs')}
          </Link>
        </div>
        <div key={'data'} className="px-12 py-8">
          <Link 
            href="/data" 
            aria-label="data" 
            className="text-2xl font-bold tracking-widest text-gray-900"
            onClick={onToggleNav}
            >
              {t('dataPolicy')}
          </Link>
        </div>
        {user && user.role == 'authenticated' ? <>
                <Link 
                  href="/healthcheck" 
                  aria-label="healthcheck" 
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-900 border-solid border-2 border-blue-700 rounded-[20px]">
                  {t('healthCheck')}
                </Link>
                <Link 
                  href="/dashboard" 
                  aria-label="dashboard" 
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-900 border-solid border-2 border-blue-700 rounded-[20px]">
                  {t('dashboard')}
                </Link>
              <Link 
                href="/profile" 
                aria-label="profile" 
                className="block w-full text-2xl font-bold tracking-widest text-gray-900 px-12 py-8">
                 {t('profile')}
              </Link>
              <Link  
                href="/logout"
                aria-label="Logout"  
                className="block w-full text-2xl font-bold tracking-widest text-gray-100 bg-blue-700 px-12 py-8">
                 {t('logout')}
              </Link>
            </> : 
            <>
              <Link 
                  href="/" 
                  aria-label="home" 
                  className="block w-full text-2xl font-bold tracking-widest text-gray-900 px-12 py-8"
                  onClick={onToggleNav}
                  >
                  {t('home')}
              </Link>
              <Link 
                href="/login" 
                aria-label="login" 
                className="block w-full text-2xl font-bold tracking-widest text-gray-900 px-12 py-8">
                 {t('login')}
              </Link>
              <Link  
                href="/signup" 
                aria-label="signup"  
                className="block w-full text-2xl font-bold tracking-widest text-gray-100 bg-blue-700 px-12 py-8">
                 {t('signUp')}
              </Link>
            </>
          }
      </nav>
    </div>
    </div>
    </>
  )
}