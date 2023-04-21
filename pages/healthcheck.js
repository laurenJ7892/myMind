import { Inter } from '@next/font/google'
import Header from "../components/header"
import Footer from "../components/footer"
import Link from 'next/link'
import Form from '../components/healthcheckform'
//


const inter = Inter({ subsets: ['latin'] })
const handleClick = () => {
    Router.push('/')
  }
export default function Data() {
  return (
    <>
    <div>
      <Header />
      <main className="flex flex-col w-full h-auto">
      <div className='flex wrap flex-col directoblock flex p-20'>
      <Form></Form>
      </div>
      </main>
      </div>
      <Footer />
      
      </>
  )
}