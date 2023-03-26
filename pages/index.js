import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from "../components/header"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    {/* TO DO Make Head a component */}
      <Head>
        <title>myMind</title>
        <meta name="description" content="Help manage anxiety and depression" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-2 mt-5 flex h-[40vh] w-[90%] mx-auto text-2xl font-bold bg-blue-100">
         <h2 className="flex items-center ml-5">My Mind is a tool for young adults to find resources and use its tools to identify, manage and overcome depression. We do not collect nor utilise personal data and a free source</h2>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={200}
          height={200}
          priority
          className="flex items-center m-auto"
        />
        </div>

        <div className="flex h-full w-[60%] mt-8 mx-auto text-lg bg-gray-200">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Depression Quiz
            </h2>
            <p>
              TO DO CONTENT HERE
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
