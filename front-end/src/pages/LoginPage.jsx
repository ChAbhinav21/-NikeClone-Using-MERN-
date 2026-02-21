import Navbar from '../components/Navbar';
import Footer from '../components/landingpage/Footer';
import { Link, Navigate ,useLocation} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../assets/favicon.ico';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectCurrentUser, selectLogginError } from '../features/auth/AuthSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const logginError = useSelector(selectLogginError);
 
  const location = useLocation()
  const from = location.state?.from || "/home"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(fetchUserAsync(data));
  };

  // Redirect if already logged in
  if (currentUser) return <Navigate to={from} replace />;

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-16" src={logo} alt="Your Company" />
          <h2 className="mt-2 text-center text-xl font-bold tracking-tight text-gray-900 uppercase font-Oswald">
            Your Account for <br /> everything Nike
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register('email', {
                  required: 'Email required',
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'Email is not valid',
                  },
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password required' })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {logginError && <p className="text-red-500 text-xs mt-1 text-center">{logginError}</p>}

            <div className="text-right text-sm mt-1">
              <Link to="/forgotPassword" className="font-semibold opacity-50">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-sm bg-black px-3 py-1.5 text-sm font-semibold text-white uppercase font-Oswald tracking-tighter shadow-sm hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold underline text-black">
              Join us
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
