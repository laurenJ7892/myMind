import "../styles/globals.css"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { appWithTranslation } from 'next-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState, useEffect } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { UserContextProvider } from '../lib/context'
import {supabase} from "../lib/supabaseClient"

const App = ({ Component, pageProps }) => {
  
  const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      
      return () => subscription.unsubscribe()
    }, [])

  
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={session}
    >
      <UserContextProvider setSession={session}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </UserContextProvider>
    </SessionContextProvider>
  )
}

export default appWithTranslation(App)