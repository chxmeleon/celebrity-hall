import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import useSWRMutation from 'swr/mutation'

interface AuthContextData {
  auth: string 
  login: (account: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

async function sendRequest(url: string, { arg }: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok.')
      }
      return res.json()
    })
    .then((finalData) => finalData)
    .catch((err) => err)
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { trigger } = useSWRMutation(
    'https://staging.vvip99.net/login',
    sendRequest
  )

  const [auth, setAuth] = useLocalStorage('user', '') 
  const navigate = useNavigate()

  const login = async (account: string, password: string) => {
    try {
      const result = await trigger({
        identity: account,
        password: password,
      })
      localStorage.setItem('user', result?.token)
      if (result?.token !== undefined) {
        setAuth(result.token)
      }
      navigate('/home/rooms')
    } catch (error) {
      error
    }
  }

  const logout = () => {
    setAuth('')
    localStorage.setItem('user', '')
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
