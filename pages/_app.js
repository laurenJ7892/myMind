import "../styles/globals.css"
import { supabase } from "../lib/supabaseClient"
import { UserContextProvider } from '../lib/context'

export default function App({ Component, pageProps }) {
// TO DO: Fix up supabase sessions
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}
