import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { LoginButton } from '@/components/common/Button'
import { clsx as cx } from 'clsx'
import { useAuth } from '@/contexts/AuthContext'
import { useIntl } from 'react-intl'
import { CREATE_TRIAL } from '@/gql/profile'
import { useMutation } from '@apollo/client'

type Inputs = {
  data(arg0: string): unknown
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const navigate = useNavigate()
  const { login, auth, traitLogin } = useAuth()
  const { formatMessage } = useIntl()

  const [createTrialUser] = useMutation(CREATE_TRIAL)
  const createTrail = async () => {
    const result = await createTrialUser({
      variables: {
        input: {}
      }
    })

    const { token } = result.data.createTrialUser
    traitLogin(token)
  }

  const callback = (res) => {
    if (res.ret === 0) {
      createTrail()
    }

    if (res.ret === 2) {
      window.location.reload()
    }
  }

  const showCaptcha = () => {
    try {
      const captcha = new (window as any).TencentCaptcha('1259693855', callback)
      captcha.show()
    } catch (err) {
      console.log(err);
      
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data.email, data.password)
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
    border-0 outline-none focus:border focus:border-theme-300 pl-14 w-full h-10 text-gray-100 rounded-full bg-theme-100
  `
  const notifyAlert = cx(`
    ${notify ? 'opacity-100' : 'opacity-0 -translate-y-16'} 
    transition-all duration-500 ease-in-out fixed top-10 right-10 px-4 py-3 
    text-red-800 bg-red-200 rounded-sm border-l-4 border-l-red-500`)

  return (
    <>
      <div className="relative pt-5 w-[240px] md:w-[23rem]">
        <div className="flex justify-center w-full">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-between h-[19rem]"
            >
              <div className="relative w-full">
                <div className="absolute top-2 left-4 text-2xl i-heroicons-user-solid"></div>
                <input
                  autoComplete="off"
                  placeholder={formatMessage({
                    id: 'screens.login.username',
                    defaultMessage: 'Account'
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
                    defaultMessage: 'Password'
                  })}
                  {...register('password', { required: true })}
                  className={loginFromInput}
                />
              </div>
              <div className="flex justify-center items-center px-1.5 w-full text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="accent-theme-300 outline-0 focus:outline-0"
                  />
                  <p className="pl-2">
                    {formatMessage({
                      id: 'screens.login.rememberMe',
                      defaultMessage: 'remamber me'
                    })}
                  </p>
                </div>
                <p className="px-7">|</p>
                <div
                  onClick={showCaptcha}
                  className="hover:cursor-pointer hover:text-theme-400 active:text-theme-300"
                >
                  <p className="text-amber-200">
                    {formatMessage({
                      id: 'screens.login.trialLogin',
                      defaultMessage: 'play for free'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex justify-center py-2 text-sm">
                <p>
                  {formatMessage({
                    id: 'screens.login.entertainment',
                    defaultMessage: 'Login'
                  })}
                </p>
              </div>
              <div className="flex justify-center">
                <LoginButton onClick={handleNotify}>
                  <p>
                    {formatMessage({
                      id: 'screens.login.login',
                      defaultMessage: 'Login'
                    })}
                  </p>
                </LoginButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
