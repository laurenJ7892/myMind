import { Inter } from '@next/font/google'
import Header from "../components/header"


const inter = Inter({ subsets: ['latin'] })

export default function Terms() {
  return (
    <>
      <Header />
      <main className="flex grid grid-rows w-full h-full">
        <div className="flex grid grid-rows mt-5 flex h-[70vh] w-[90%] mx-auto bg-blue-100">
         <h2 className="flex items-center mx-auto text-2xl font-bold">Terms and Conditions</h2>
         <p className="flex items-center w-[80%] mx-auto mt-5">
          Welcome to MyMind, a website designed to provide daily tracking for people suffering from depression and anxiety. As a university project, we aim to help those struggling with mental health issues to better understand their emotions and behaviors.
         </p>
         <br />
         <p className="flex items-center w-[80%] mx-auto">
          By accessing this website, you agree to the following terms and conditions. First and foremost, we will not collect any personally identifiable information from our users. All data entered into our tracking system is completely anonymous and will be used solely for research purposes.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto">
          Our website is not intended to replace professional medical advice or treatment. We strongly advise that you seek the guidance of a mental health professional if you are struggling with depression or anxiety.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto">
          While we strive to provide accurate and helpful information, we cannot guarantee the effectiveness of our tracking system or the accuracy of the information provided on this website.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto">
          By using MyMind, you agree to hold harmless and indemnify our team, our university, and our partners against any and all claims, damages, or losses arising from your use of this website.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto">
          We reserve the right to modify these terms and conditions at any time without prior notice. By continuing to use MyMind, you accept any changes made to these terms and conditions.
        </p>
        <br />
        <p className="flex items-center w-[80%] mx-auto mb-5">
          Thank you for using MyMind. We hope that our website can provide you with helpful insights and support as you navigate your mental health journey.
         </p>
        </div>
      </main>
    </>
  )
}