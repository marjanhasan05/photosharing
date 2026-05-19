import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-screen justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your email and password to sign in!
        </p>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 mb-6">
          <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 transition-colors">
            {/* Google SVG */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L15.9087 16.6126C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                fill="#4285F4"
              />
              <path
                d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L2.23868 13.8295C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                fill="#34A853"
              />
            </svg>
            Sign in with Google
          </button>

          <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 transition-colors">
            {/* X (Twitter) icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.12 9.12 0 0 1-2.88 1.1 4.52 4.52 0 0 0-7.7 4.13A12.84 12.84 0 0 1 1.67 2.15 4.48 4.48 0 0 0 3.05 7.6 4.49 4.49 0 0 1 .88 7v.05a4.52 4.52 0 0 0 3.63 4.44 4.5 4.5 0 0 1-2 .08 4.52 4.52 0 0 0 4.22 3.13A9.06 9.06 0 0 1 0 19.54a12.82 12.82 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.42-.02-.63A9.22 9.22 0 0 0 23 3z" />
            </svg>
            Sign in with X
          </button>
        </div>

        {/* Divider */}
        <div className="relative py-3 sm:py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-gray-50 dark:bg-gray-900 text-gray-400">
              Or
            </span>
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="info@gmail.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white sm:text-sm"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </span>
            </div>
          </div>

          {/* Remember me and forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Keep me logged in
              </span>
            </label>
            <Link
              to="/reset-password"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
