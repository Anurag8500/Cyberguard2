import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token and validate session
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
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
