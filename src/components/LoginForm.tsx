import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { LoginButton } from './Button'
import { clsx as cx } from 'clsx'
import { useAuth } from '@/hooks/useAuth'
import { useIntl } from 'react-intl'

type Inputs = {
  data(arg0: string): unknown
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const { login } = useAuth()

  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   login({
  //     email: data.email,
  //     password: data.password,
  //   })
  // }

  const onSubmit = () => {
    login()
  }

  const isError = errors.password?.type === 'required'
  const [notify, setNotify] = useState<boolean>(false)
  const handleNotify = () => {
    if (isError) {
      setNotify(true)
    }
    setTimeout(() => {
      setNotify(false)
    }, 5000)
  }

  const loginFromInput = cx`
    border-0 outline-0 focus:border focus:border-theme-300 pl-14 w-full h-10 text-gray-100 rounded-full bg-theme-100
  `
  const notifyAlert = cx(`
    ${notify ? 'opacity-100' : 'opacity-0 -translate-y-16'} 
    transition-all duration-500 ease-in-out fixed top-10 right-10 px-4 py-3 
    text-red-800 bg-red-200 rounded-sm border-l-4 border-l-red-500`)

  const { formatMessage } = useIntl()

  return (
    <div className="relative pt-5 w-full">
      <div className="flex justify-center w-full">
        <div className="w-[23rem]">
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-between h-[19rem]"
          >
            <div className="relative w-full">
              <div className="absolute top-2 left-4 text-2xl i-heroicons-user-solid"></div>
              <input
                autoComplete="off"
                placeholder={formatMessage({
                  id: 'screens.login.username',
                  defaultMessage: 'Account',
                })}
                {...register('email')}
                className={loginFromInput}
              />
            </div>
            <div className="relative w-full">
              <div className="absolute top-2 left-4 text-2xl i-heroicons-key-solid"></div>
              <input
                type="password"
                placeholder={formatMessage({
                  id: 'screens.login.password',
                  defaultMessage: 'Password',
                })}
                {...register('password', { required: true })}
                className={loginFromInput}
              />
            </div>
            <div className="flex justify-center items-center px-1.5 w-full text-sm">
              <div className="flex items-center">
                <input type="checkbox" className="accent-theme-300 outline-0 focus:outline-0" />
                <p className="pl-2">
                  {formatMessage({
                    id: 'screens.login.rememberMe',
                    defaultMessage: 'remamber me',
                  })}
                </p>
              </div>
              <p className="px-7">|</p>
              <p className="text-amber-200">
                {formatMessage({
                  id: 'screens.login.trialLogin',
                  defaultMessage: 'play for free',
                })}
              </p>
            </div>
            <div className="flex justify-center py-2 text-sm">
              <p>
                {formatMessage({
                  id: 'screens.login.entertainment',
                  defaultMessage: 'Login',
                })}
              </p>
            </div>
            <div className="flex justify-center">
              <LoginButton
                onClick={handleNotify}
                text={formatMessage({
                  id: 'screens.login.login',
                  defaultMessage: 'Login',
                })}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
