import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { changeLanguage } from '@/lib/i18n'

function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token and validate session
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Set language based on user preference
      if (parsedUser.language) {
        changeLanguage(parsedUser.language)
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <Component {...pageProps} user={user} setUser={setUser} logout={logout} />
  )
}

export default appWithTranslation(App)
