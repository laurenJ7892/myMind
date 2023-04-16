import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'

export default function Custom404() {

    return (
      <div className="flex wrap items-center">
        <div className="flex items-center">
          <p className="mt-5 mx-auto text-2xl text-black-600">Oh No page not found! Head back to MyMind!</p><Link href='/' aria-label="myMind"  className="p-4 font-medium text-gray-900">
            <Image 
              src={"/Images/logo.png"}
              alt={"MyMind Logo"}
              width={100}
              height={100}
              priority
            />
          </Link>
          <div className="flex items-center text-lg leading-5"></div>
        </div>
      </div>
    )

  }