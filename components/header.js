import Link from 'next/link'
import Image from 'next/image'
import headerNavLinks from "../lib/data/headerNavLinks"
import MobileNav from "./mobileNav"
import { useUser } from '../lib/context'

export default function Header () {
  const { user } = useUser()

  return (
    <>
    <div className="flex h-[150px] flex-col mx-auto justify-between px-[50px] py-[30px]">
      <header className="flex items-center justify-between">
        <Link href='/' aria-label="myMind"  className="p-4 font-medium text-gray-900">
          <Image 
            src={"/Images/logo.png"}
            alt={"MyMind Logo"}
            width={100}
            height={100}
            priority
          />
        </Link>
        <div className="flex items-center text-lg leading-5">
            <div className="flex mx-8">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="px-6 py-3 font-medium text-gray-900 border-solid border-2 border-blue-700 hidden sm:block rounded-[20px]"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex">
            {user && user.role == 'authenticated' ? <>
            <Link 
                  href="/dashboard" 
                  aria-label="dashboard" 
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-900 border-solid border-2 border-blue-700 rounded-[20px]">
                  Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  aria-label="profile" 
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-900 border-solid border-2 border-blue-700 rounded-[20px]">
                  Profile
                </Link>
                <Link  
                  href="/logout"
                  aria-label="Logout"  
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-100 bg-blue-700 rounded-[20px]">
                  Logout
                </Link>
              </> : 
              <>
                <Link 
                  href="/login" 
                  aria-label="login" 
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-900 border-solid border-2 border-blue-700 rounded-[20px]">
                  Log In
                </Link>
                <Link  
                  href="/signup" 
                  aria-label="signup"  
                  className="hidden mx-4 sm:block px-6 py-3 font-medium text-gray-100 bg-blue-700 rounded-[20px]">
                  Sign Up 
                </Link>
              </>
            }
          </div>
        </div> 
        <MobileNav />
      </header>
    </div>
    </>
  )
}