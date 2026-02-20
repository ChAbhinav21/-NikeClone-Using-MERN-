import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import { useForm } from "react-hook-form";
import logo from "../assets/favicon.ico";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync , selectCreateUser ,   } from "../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectCreateUser);
  console.log(user)
return (
  <>
    {user && <Navigate to="/"></Navigate>}

    <Navbar />

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

        {/* Logo & Title */}
        <div className="text-center">
          <img
            className="mx-auto w-14 mb-3"
            src={logo}
            alt="Your Company"
          />
          <h2 className="text-xl font-Oswald uppercase tracking-wide text-gray-900">
            Become a Nike Member
          </h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Create your profile and get first access to the best of Nike.
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-6 space-y-4"
          noValidate
          onSubmit={handleSubmit((data) => {
            dispatch(createUserAsync(data));
            console.log(data);
          })}
        >

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "Email is not valid",
                },
              })}
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message:
                    "Min 8 chars, 1 uppercase, 1 lowercase & 1 number",
                },
              })}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords not matching",
              })}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div>
            <input
              type="text"
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              {...register("lastName", {
                required: "Last name is required",
              })}
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <p className="text-[11px] text-gray-500 text-center leading-tight">
            By creating an account, you agree to Nike's{" "}
            <span className="underline cursor-pointer">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer">
              Terms of Use
            </span>.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm uppercase font-Oswald tracking-wide hover:bg-gray-800 transition duration-200"
          >
            Join Us
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs text-gray-600 mt-5">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold underline text-black"
          >
            Login
          </Link>
        </p>
      </div>
    </div>

    <Footer />
  </>
);

};

export default SignupPage;