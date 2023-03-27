import "../styles/globals.css"
import { supabase } from "../lib/supabaseClient"
import { UserContextProvider } from '../lib/context'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({ Component, pageProps }) {
// TO DO: Fix up supabase sessions
  return (
    <UserContextProvider>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </UserContextProvider>
  )
}
