import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Lottie from 'lottie-react'
import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
import celebrate from "../public/Animations/celebrate.json"

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from "../components/header"
import Footer from "../components/footer"
import { supabase as supabaseClient }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import HabitTracker from "../components/habitTracker"
import Metrics from "../components/metrics"
import Modal from "../components/modal"



export async function getServerSideProps() {
  const { data } = await supabaseClient
      .from('habits')
      .select(`*`)

  return {
    props: { 
      data
    },
  }
}

export default function Dashboard({data}) {
  const supabase = useSupabaseClient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { user, setAllHabits, successModal, setSuccessModal, setGoal, setAchievedGoals } = useUser()
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
        getGoalData(data)
      }
  }

  const checkGoalCompletion = (data, habitData) => {
    let achievedGoalsCheck = []
    let toDoGoals = []
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const goalItem = data[i]
        const startDate = goalItem.created_at
        const endDate = goalItem.completion_date
        const habitGoalData = habitData.filter(({ created_at }) => created_at >= startDate && created_at <= endDate).map(({created_at}) => new Date(created_at).getDate())
        if (habitGoalData.length >= goalItem.num_times) {
          achievedGoalsCheck.push(goalItem)
        } else {
          toDoGoals.push(goalItem)
        }
      }
      setAchievedGoals(achievedGoalsCheck)
      setGoal(toDoGoals)
    }
  }

  const getGoalData = async (habitData) => {
    const { data } = await supabase
      .from('user_goals')
      .select(`
        id,
        user_id,
        habits (
          id,
          name,
          description
        ),
        completion_date,
        num_times,
        created_at
        `)
      .eq('user_id', user.id)
      .gt(`completion_date`, new Date(dayjs().startOf('month')).toUTCString())
      .lte('completion_date', new Date(dayjs().endOf('month')).toUTCString())
    
    if (data) {
      checkGoalCompletion(data, habitData)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <main className="flex flex-grow grid grid-cols grid-cols-1 w-[100vw] h-[80vh] divide-y divide-blue-200">
        <div className="flex h-[5vh] md:h-[5vh] w-[100%] mx-auto">
          <h2 className="flex items-center mx-auto w-[90%] mt-5 justify-center text-2xl text-blue-800 font-bold">Welcome {user?.user_metadata?.first_name}</h2>
        </div>
        <div className="flex flex-grow grid grid-rows my-5 w-[100%] mx-auto divide-y">
         <Metrics />
        </div>
        {successModal ? 
        <>
          <Lottie animationData={celebrate} loop={false} />
          <Modal heading="Congratulations" text="You took time and prioritised your well-being!"/>
        </>
        : '' }
        <div className="flex flex-grow">
          <HabitTracker props={data}  />
        </div>
      </main>
      <Footer />
    </>
  )
}