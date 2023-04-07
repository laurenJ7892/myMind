import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Lottie from 'lottie-react'
import celebrate from "../public/Animations/celebrate.json"
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import HabitTracker from "../components/habitTracker"
import Metrics from "../components/metrics"
import Modal from "../components/modal"

export async function getServerSideProps() {
  const { data } = await supabase
      .from('habits')
      .select(`*`)


  return {
    props: { data }
  }
}

export default function Dashboard({ data }) {
  const { user, setAllHabits, successModal, setSuccessModal } = useUser()
  const router = useRouter()
 

  const getHabitData = async () => {
    const { data } = await supabase
      .from('user_habits')
      .select(`
        id,
        user_id,
        description,
        habits (
          id,
          name,
          description
        ),
        created_at
        `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
    
    if (data) {
      setAllHabits(data)
    }
  }

  useEffect(() => {
    if (!user || Object.keys(user).length == 0) {
      router.push('/')
    } else {
      getHabitData()
      setSuccessModal(false)
    }
  }, [])

  return (
    <>
      <Header />
      {successModal ? 
        <>
          <Lottie animationData={celebrate} loop={false} />
          <Modal heading="Congratulations" text="You prioritised and took time for yourself!"/>
        </>
        : '' }
      <main className="flex grid grid-cols grid-cols-1 w-[100vw] h-[90vh]">
        <div className="flex h-[5vh] md:h-[5vh] w-[100%] mx-auto">
          <h2 className="flex items-center mx-auto w-[90%] mt-5 justify-center text-2xl text-blue-800 font-bold">Welcome back {user?.user_metadata?.first_name} !</h2>
        </div>
        <div className="flex grid grid-rows h-[50vh] md:h-[30vh] w-[100%] mx-auto">
         <Metrics />
        </div>
        <div div className="flex">
          <HabitTracker props={data}  />
        </div>
      </main>
    </>
  )
}