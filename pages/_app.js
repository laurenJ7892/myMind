import "../styles/globals.css"
import { UserContextProvider } from '../lib/context'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({ Component, pageProps }) {

  return (
    <UserContextProvider>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </UserContextProvider>
  )
}
