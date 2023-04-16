import { Inter } from '@next/font/google'
import Rating from '@mui/material/Rating';
import Header from "../components/header"
import Footer from "../components/footer"
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
      <main className="flex flex-grow w-[100vw]">
        <div className="flex grid grid-rows mt-5 flex h-[100%] md:h-[70vh] w-[90%] mx-auto">
          <h2 className="flex items-center mx-auto text-2xl font-bold">Reviews</h2>
          <p className="flex w-[80%] mx-auto mt-5 h-auto">
            We pride ourselves of being able to inspire our users to take control and create healthier self care habits.  But do not just take our words for it, have a read of what they have to say.
          </p>
          <div className="flex grid grid-rows grid-rows-2 h-max-content">
            {data && data.length > 0 ? data.map((item) => (
              <div
                key={item.id}
                className="flex grid grid-rows grid-rows-3 md:grid-cols md:grid-cols-3 md:auto-cols-min justify-center bg-gray-800 mx-auto my-3 h-auto p-3 w-[80%]">
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
                  className={"flex bg-transparent text-xl text-center w-[100%] justify-center md:text-left text-sky-200 py-2 row-span-2 md:col-span-2"}
                />
              </div>
            )) : ''}
        </div>
        </div>
      </main>
      <Footer />
    </>
  )
}