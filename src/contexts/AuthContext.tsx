import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import useSWRMutation from 'swr/mutation'
import axios from 'axios'

type AuthProps = {
  auth: string | null
  isExpired: boolean
  isError: boolean
  login: (account: string, password: string) => Promise<void>
  logout: () => void
  traitLogin: (token: string) => void
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const sendRequest = async (url: string, { arg }: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
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
  const [expiredTime, setExpiredTime] = useLocalStorage<string | number | Date>(
    'exp',
    ' '
  )
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()
  const { trigger: onLogin } = useSWRMutation(
    import.meta.env.VITE_RESTFUL_ENDPOINT,
    sendRequest,
    {
      onSuccess: (result) => {
        if (result?.token !== undefined) {
          setAuth(result?.token)
          setExpiredTime(result?.exp)
          navigate('/home/rooms')
        }
      },
      onError: (err) => {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 2800)
        console.log(err.message)
      }
    }
  )

  const login = useCallback(
    async (account: string, password: string) => {
      onLogin({
        identity: account,
        password: password
      })
    },
    [onLogin]
  )

  const traitLogin = useCallback(
    (token: string) => {
      const tomorrow = new Date(Date.now() + 86400000)
      if (token !== undefined) {
        setAuth(token)
        setExpiredTime(tomorrow)
        navigate('/home/rooms')
      }
    },
    [setAuth, setExpiredTime, navigate]
  )

  const logout = useCallback(() => {
    setAuth(null)
    setExpiredTime('')
    navigate('/')
  }, [navigate, setAuth, setExpiredTime])

  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const expired = new Date(expiredTime)
    if (Date.now() >= expired.getTime()) {
      setIsExpired(true)
    }
    return () => {
      setIsExpired(false)
    }
  }, [expiredTime])

  const value = {
    auth,
    isExpired,
    isError,
    login,
    logout,
    traitLogin
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
