import LogoImg from '@/assets/login_logo.webp'
import LoginForm from '@/components/LoginForm'
import Layout from '@/layouts/Layout'


const Login: React.FC = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="relative">
          <div className="top-0 left-0 fixed z-[-1] bg-[url('../assets/login_bg.avif')] bg-no-repeat bg-cover bg-center bg-fixed w-full">
            <div className="w-full h-screen bg-black/20"></div>
          </div>
        </div>
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
    </Layout>
  )
}

export default Login
