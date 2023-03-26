import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from "../components/header"


const inter = Inter({ subsets: ['latin'] })

export default function Resources() {
  return (
    <>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[40vh] w-[90%] mx-auto text-2xl font-bold bg-blue-100">
         <h2 className="flex items-center ml-5">TO DO - resources</h2>
        </div>
      </main>
    </>
  )
}
