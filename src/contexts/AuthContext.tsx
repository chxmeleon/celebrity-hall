import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import useSWRMutation from 'swr/mutation'
import axios from 'axios'

type AuthProps = {
  auth: string | null
  isError: boolean
  login: (account: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const sendRequest = async (url: string, { arg }: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
  const data = await response.json()

  if (response.ok) {
    return data
  } else {
    throw new Error(data.error)
  }
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useLocalStorage<string | null>('user', null)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()
  const { trigger: onLogin } = useSWRMutation(
    import.meta.env.VITE_RESTFUL_ENDPOINT,
    sendRequest,
    {
      onSuccess: (result) => {
        if (result?.token !== undefined) {
          setAuth(result?.token)
          navigate('/home/rooms')
        }
      },
      onError: (err) => {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 2800)
        console.log(err.message)
      },
    }
  )

  const login = async (account: string, password: string) => {
    onLogin({
      identity: account,
      password: password,
    })
  }

  const logout = () => {
    setAuth(null)
    navigate('/')
  }

  const value = useMemo(
    () => ({
      auth,
      isError,
      login,
      logout,
    }),
    [auth, isError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
