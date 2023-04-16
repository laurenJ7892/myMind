import Link from 'next/link'
import Image from 'next/image'
import MobileNav from "./mobileNav"

export default function Footer () {
  return (
    <div className="fixed bottom-0 left-0 h-[80px] mt-10 flex-col justify-between w-[100vw] z-5">
      <footer className="hidden sm:flex items-center justify-between">
        <Link href='/' aria-label="myMind"  className="flex p-4 font-medium text-blue-900 underline ml-5">
          Home
        </Link>
        <div className="flex items-center text-sm leading-5 mr-5">
            <div className="flex">
            <Link 
                href="/terms" 
                aria-label="terms" 
                className="hidden mx-4 sm:flex font-medium text-blue-900 underline">
                Terms and conditions
              </Link>
            </div>
        </div> 
      </footer>
    </div>
  )
}