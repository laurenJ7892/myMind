import { Inter } from '@next/font/google'
import Header from "../components/header"
import Footer from "../components/footer"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const handleClick = () => {
    Router.push('/')
  }
export default function Data() {
  return (
    <>
      <Header />
      <main className="flex grid grid-rows w-full h-auto">
        <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100">
         <h2 className="flex items-center mx-auto text-2xl font-bold">Health Check</h2>
         <h4>A short health check supported by ABS data to help you focus on your goals</h4>
         <h4>Add data link here </h4>
         <p className="flex items-center w-[80%] mx-auto mt-5 bg-blue-100">
        </p>
         <Link href="/">
          <label className="flex text-cyan-800 justify-center text-xl">
            <span className="underline ml-1"> Return home</span>
          </label>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}