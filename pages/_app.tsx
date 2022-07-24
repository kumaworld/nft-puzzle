import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import appTheme from '../theme/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={appTheme()}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
