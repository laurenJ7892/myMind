import { Inter } from '@next/font/google'
import Rating from '@mui/material/Rating';
import Header from "../components/header"
import { supabase as supabaseClient }  from '../lib/supabaseClient'


const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const { data } = await supabaseClient
      .from('user_reviews')
      .select(`*`)
      .eq(`published`, true)

  return {
    props: { 
      data
    },
  }
}

export default function Reviews({data}) {

  return (
    <>
      <Header />
      <main className="flex grid grid-rows w-full h-[100%]">
        <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto bg-blue-100">
          <h2 className="flex items-center mx-auto text-2xl font-bold">Reviews</h2>
          <p className="flex w-[80%] mx-auto mt-5 h-auto bg-blue-100">
            We pride ourselves of being able to inspire our users to take control and create healthier self care habits.  But don't just take our words for it, have a read of what they have to say.
          </p>
          <div>
            {data && data.length > 0 ? data.map((item) => (
              <div className="flex grid grid-rows md:grid-cols grid-cols-3 auto-cols-min justify-center bg-gray-800 mx-auto my-3 h-auto p-3 w-[80%]">
                <Rating
                  name="rating-read-only"
                  size="large"
                  value={item.rating}
                  readOnly
                  className="flex w-[100%] mt-5 ml-[15%]"
                />
                <textarea
                  disabled
                  type="text"
                  value={item.review}
                  className={"flex bg-transparent text-xl text-center w-[100%] justify-center md:text-left text-sky-200 py-2 col-span-2"}
                />
              </div>
            )) : ''}
        </div>
        </div>
      </main>
    </>
  )
}