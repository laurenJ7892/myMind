import { Inter } from '@next/font/google'
import Header from "../components/header"
import Footer from "../components/footer"
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const handleClick = () => {
    Router.push('/')
}
export default function About() {
    return (
        <>
            <Header />
            <main className="flex grid grid-rows w-full h-auto">
                <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100 padding-right: 20px; padding-left: 20px;">
                    <h2 className="flex items-center mx-auto text-2xl font-bold">About Us</h2>
                    <p>Hi there! We are Lauren, Scott, and Addison, a passionate team of university students committed to improving mental health among young students.
                        <br />
                        <p>Our journey started as a university project, and with the creation of MyMind, we strive to empower young individuals to track their habits, identify triggers, and take control of their mental wellbeing.</p>
                        <br />
                        <p> Through our platform, we aim to provide a safe and supportive space for students to combat depression and anxiety.</p>
                        <br />
                        <p>Join us in fostering a mindful and resilient generation, as we continue to learn, grow, and make a positive impact together.</p>
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

