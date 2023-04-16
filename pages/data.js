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
         <h2 className="flex items-center mx-auto text-2xl font-bold">Our Data Policy</h2>
         <p className="flex items-center w-[80%] mx-auto mt-5 bg-blue-100">
         MyMind was developed after examining the <a href="https://www.abs.gov.au/statistics/health/mental-health/national-study-mental-health-and-wellbeing/latest-release#media-releases">
         Australian Bureau of Statistics. (2022, July). National Study of Mental Health and Wellbeing, 2020-21</a>
         </p>
         <br />
         <p className="flex items-center w-[80%] mx-auto bg-blue-100">
          By accessing this website, you agree to the following terms and conditions. First and foremost, we will not collect any personally identifiable information from our users. All data entered into our tracking system is completely anonymous and will be used solely for research purposes.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
          Our website is not intended to replace professional medical advice or treatment. We strongly advise that you seek the guidance of a mental health professional if you are struggling with depression or anxiety.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
          While we strive to provide accurate and helpful information, we cannot guarantee the effectiveness of our tracking system or the accuracy of the information provided on this website.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
          By using MyMind, you agree to hold harmless and indemnify our team, our university, and our partners against any and all claims, damages, or losses arising from your use of this website.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto bg-blue-100">
          We reserve the right to modify these terms and conditions at any time without prior notice. By continuing to use MyMind, you accept any changes made to these terms and conditions.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto mb-5 bg-blue-100">
          Thank you for using MyMind. We hope that our website can provide you with helpful insights and support as you navigate your mental health journey.
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