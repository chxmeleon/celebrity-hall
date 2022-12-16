import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { LoginButton } from './Button'
import { clsx as cx } from 'clsx'

type Inputs = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
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
    <div className="relative pt-5 w-full">
      {/* <div className={notifyAlert}> */}
      {/*   <div className="flex items-center "> */}
      {/*     <div className="text-2xl i-heroicons-x-circle" /> */}
      {/*     <p className="pr-2 pl-3">This field is required</p> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="flex justify-center pt-4 w-full">
        <div className="w-[25rem]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-[16rem]"
          >
            <div className="relative w-full">
              <div className="absolute top-3 left-4 text-2xl i-heroicons-user-solid"></div>
              <input
                autoComplete="off"
                placeholder="Account"
                {...register('email')}
                className={loginFromInput}
              />
            </div>
            <div className="relative w-full">
              <div className="absolute top-3 left-4 text-2xl i-heroicons-key-solid"></div>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className={loginFromInput}
              />
            </div>
            <div className="pl-2">
              <input type="checkbox" name="" id="" className="accent-theme-300" />
            </div>
            <div className="flex">
              <div className="flex justify-between items-center m-auto w-2/3 text-sm font-light">
                <p>forgot password</p>
                <p>|</p>
                <p className="text-amber-200">play for free</p>
              </div>
            </div>
            <div className="flex pt-2">
              <LoginButton onClick={handleNotify} text="Login" />
            </div>
          </form>
          <div className="flex justify-center py-10 px-1 w-full text-2xl">
            <button>
              <div className="i-heroicons-globe-alt"></div>
            </button>
            <button className="ml-6">
              <div className="i-heroicons-arrow-top-right-on-square"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
