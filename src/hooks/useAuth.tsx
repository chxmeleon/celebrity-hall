import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = async (data: any) => {
    setUser(data)
    navigate('/home/rooms', { replace: true })
  }

  const logout = () => {
    setUser(null)
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
