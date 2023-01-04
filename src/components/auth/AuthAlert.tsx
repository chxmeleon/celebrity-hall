import { useAuth } from '@/contexts/AuthContext'
import { useIntl } from 'react-intl'
import Alert from '../common/Alert'

const AuthAlert: React.FC = () => {
  const { formatMessage } = useIntl()
  const { isError } = useAuth()

  return (
    <Alert isError={isError}>
      {formatMessage({
        id: 'screens.login.wrongPassword',
        defaultMessage: 'password or auount is wrong',
      })}
    </Alert>
  )
}

export default AuthAlert
