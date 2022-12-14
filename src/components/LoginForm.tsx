import { useForm, SubmitHandler } from 'react-hook-form'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { UserIcon, KeyIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Button from './Button'
import { clsx as cx } from 'clsx'

type Inputs = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
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
    border-0 outline-0 focus:border focus:border-theme-300 pl-14 w-full h-12 text-gray-100 rounded-full bg-theme-100
  `
  const notifyAlert = cx(`
    ${notify ? 'opacity-100' : 'opacity-0 -translate-y-16'} 
    transition-all duration-500 ease-in-out fixed top-10 right-10 px-4 py-3 
    text-red-800 bg-red-200 rounded-sm border-l-4 border-l-red-500`)

  return (
    <div className="relative pt-5">
      <div className={notifyAlert}>
        <div className="flex items-center">
          <XCircleIcon className="w-8" />
          <p className="pr-2 pl-3">This field is required</p>
        </div>
      </div>
      <div className="pt-2 w-[480px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-evenly h-[330px]"
        >
          <div className="relative w-full">
            <div className="absolute top-3 left-4">
              <UserIcon className="w-6" />
            </div>
            <input
              autoComplete="off"
              placeholder="Account"
              {...register('email')}
              className={loginFromInput}
            />
          </div>
          <div className="relative w-full">
            <div className="absolute top-3 left-4">
              <KeyIcon className="w-6" />
            </div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className={loginFromInput}
            />
          </div>
          <div className="flex">
            <div className="flex justify-between items-center px-3 m-auto w-1/2 text-sm font-light">
              <p>forgot password</p>
              <p>|</p>
              <p className="text-amber-200">play for free</p>
            </div>
          </div>
          <div className="flex pt-2">
            <Button onClick={handleNotify} text="Login" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
