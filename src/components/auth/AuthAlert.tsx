import { useAuth } from '@/contexts/AuthContext'
import { useIntl } from 'react-intl'

const AuthAlert: React.FC = () => {
  const { formatMessage } = useIntl()
  const { isError } = useAuth()
  
  return (
    <div
      className={`${isError ? "block translate-y-0 opacity-100" : "opacity-0 hidden -translate-y-10"} absolute w-full top-9 z-30 transition-all duration-500 ease-in-out`}
    >
      <div className="flex w-full">
        <div className="flex justify-between py-3 px-5 m-auto text-red-900 bg-red-400">
          <div className="text-2xl i-heroicons-information-circle-20-solid"></div>
          <div className="px-2">
            {formatMessage({
              id: 'screens.login.wrongPassword',
              defaultMessage: 'password or auount is wrong',
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthAlert
