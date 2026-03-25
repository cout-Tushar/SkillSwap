"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { LogOut, Mail, Lock, Github, ArrowRight } from "lucide-react"
import { useState } from "react"

interface Inputs {
  email: string
  password: string
}

export default function LoginPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    })
    setIsLoading(false)
  }

  if (session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-in-up {
            animation: slideInUp 0.6s ease-out forwards;
          }
        `}</style>

        <div className="w-full max-w-sm">
          <div className="glass-effect relative rounded-3xl p-10 shadow-2xl border border-red-900/30 bg-white/5 backdrop-blur-xl animate-slide-in-up">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-3xl font-bold select-none mx-auto mb-6 shadow-lg shadow-red-900/40">
              {session.user?.email?.[0].toUpperCase()}
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm">Signed in as</p>
              <p className="text-white font-semibold mt-2 truncate max-w-xs">
                {session.user?.email}
              </p>
            </div>

            <button
              onClick={() => signOut()}
              className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white border border-red-600 hover:border-red-500 transition-all duration-300 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-0.5"
            >
              <LogOut size={18} />
              Sign out
            </button>

            <p className="text-center text-gray-500 text-xs mt-6">
              Come back soon! 👋
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">


      {/* Animated Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-700/15 blur-3xl rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/10 blur-3xl rounded-full animate-float pointer-events-none" style={{ animationDelay: "1s" }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-in-up">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 mx-auto mb-6 shadow-lg shadow-red-900/40" />
          <h1 className="text-white text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to your SkillSwap account</p>
        </div>

        {/* Card */}
        <div className="glass-effect rounded-3xl p-8 shadow-2xl flex flex-col gap-5 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
          {/* GitHub Button */}
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-300 rounded-xl py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Github size={18} />
            Continue with GitHub
          </button>

      

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gradient-to-r from-red-900/0 via-red-900/30 to-red-900/0" />
            <span className="text-gray-500 text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-red-900/0 via-red-900/30 to-red-900/0" />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className="input-field w-full bg-gray-900/40 border border-red-900/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="input-field w-full bg-gray-900/40 border border-red-900/20 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-2">{errors.password.message}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-400 hover:text-gray-300 cursor-pointer transition">
              <input type="checkbox" className="w-4 h-4 rounded border-red-900/30 accent-red-600" />
              Remember me
            </label>
            <a href="#" className="text-gray-400 hover:text-red-400 transition">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-white rounded-xl py-3 text-sm font-semibold shadow-lg shadow-red-900/30 hover:shadow-red-900/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in with Email
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-400 hover:text-red-300 font-semibold transition">
            Sign up
          </a>
        </p>
        <p className="text-center text-gray-600 text-xs mt-4">
          By signing in, you agree to our{" "}
          <a href="#" className="text-gray-400 hover:text-red-400 transition">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-gray-400 hover:text-red-400 transition">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}