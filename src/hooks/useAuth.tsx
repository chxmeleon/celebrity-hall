import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

interface AuthContextData {
  auth: boolean
  login: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<boolean>(false)
  const navigate = useNavigate()
  

  const login = async () => {
    localStorage.setItem('user', 'true')
    setAuth(true)
    navigate('/home/rooms')
  }

  const logout = () => {
    localStorage.removeItem('user')
    setAuth(false)
    navigate('/')
  }

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
