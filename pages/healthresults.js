import { Inter } from '@next/font/google'
import Header from "../components/header"
import Footer from "../components/footer"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Terms() {
  return (
    <>
      <Header />
      <main className="flex grid grid-rows w-full h-auto">
        <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100">
         <h2 className="flex items-center mx-auto text-2xl font-bold">Health Check Results</h2>
         HEALTH CHECK RESULTS
         <Link href="/">
          <label className="flex text-cyan-800 justify-center text-xl">
            <span className="underline ml-1"> Return Home</span>
          </label>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}