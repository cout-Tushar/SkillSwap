"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

export default function LoginPage() {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    })
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 flex flex-col items-center gap-6 shadow-2xl w-full max-w-sm">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold select-none">
            {session.user?.email?.[0].toUpperCase()}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">Signed in as</p>
            <p className="text-white font-semibold mt-1 truncate max-w-xs">
              {session.user?.email}
            </p>
          </div>



          <button
            onClick={() => signOut()}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 transition-all duration-200 rounded-xl py-3 text-sm font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-4">

          {/* GitHub */}
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 transition-all duration-200 rounded-xl py-3 text-sm font-semibold"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Credentials */}
          <form action=""></form>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email", { required: true })} placeholder="Email" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
            <input type="password" {...register("password", { required: true })} placeholder="Password" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 rounded-xl py-3 text-sm font-semibold shadow-lg shadow-blue-950"
            >
              Sign in with Credentials
            </button>

          </form>


        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By signing in, you agree to our{" "}
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Terms</span>{" "}
          and{" "}
          <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}