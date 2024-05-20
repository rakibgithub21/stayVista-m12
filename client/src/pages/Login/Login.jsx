import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from 'react';
const Login = () => {
  const { signInWithGoogle, loading, setLoading, signIn, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const location = useLocation()
  const form = location?.state || '/'
  
  const handleLoginin = async (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    setEmail(email)
    const password = form.password.value;

    try {

      setLoading(true)
      await signIn(email, password)
      navigate(form)
      toast.success('Login Successfully')



    }

    catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.message)
    }
  }

  const handleResetPassword = async() => {
    if (!email) {
      return toast.error('Please write your email first')
    }
    try {
      await resetPassword(email)
      toast.success('Request Success ! Check Your Email 😒')
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      navigate(form)
      toast.success('Google Login Successfully')
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLoginin}
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                onBlur={(e)=>setEmail(e.target.value)}
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto text-lg' /> : 'Sign In'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <button disabled={loading} onClick={handleGoogleSignIn} className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
