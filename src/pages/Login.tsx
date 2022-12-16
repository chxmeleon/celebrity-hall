import LogoImg from '@/assets/login_logo.webp'
import LoginForm from '@/components/LoginForm'

const Login: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center pt-28 w-full">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div>
              <img src={LogoImg} alt="logo image" className="w-24" />
            </div>
            <div className="pt-10">
              <p>Login</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
