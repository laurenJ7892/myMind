import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from "../components/header"
import { supabase }  from '../lib/supabaseClient'
import { useUser } from "../lib/context"
import HabitTracker from "../components/habitTracker"


export async function getServerSideProps() {
  const { data } = await supabase
      .from('habits')
      .select(`*`)


  return {
    props: { data }
  }
}

export default function Dashboard({ data }) {
  const { user, setAllHabits } = useUser()
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
    }
  }, [])

  return (
    <>
      <Header />
      <main className="flex grid grid-cols grid-cols-1 md:grid-rows w-full h-full">
        <div className="flex grid grid-rows md:grid-cols md:grid-cols-1 mt-5 flex h-[40vh] md:h-[40vh] w-[90%] mx-auto text-2xl font-bold bg-blue-100">
          <h2 className="flex items-center mx-auto md:mt-5 w-[90%]">Hey there {user?.user_metadata?.first_name}</h2>
          <p className="flex w-[90%] text-base mx-auto h-[20vh] md:h-[15vh]">
            A mini habit is a very small positive behaviour that you force yourself to do every day.
            <br></br>
            <br></br>
            Small steps work every time. Remember habits are built by consistency, not perfection.
            <br></br>
            <br></br>
            What will be a positive action that you can do for yourself today?
        </p>
        </div>
        <div>
          <HabitTracker props={data}  />
        </div>
      </main>
    </>
  )
}