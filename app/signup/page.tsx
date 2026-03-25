"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { Mail, Lock, Github, ArrowRight } from "lucide-react"
import { useState } from "react"
import { signIn } from "next-auth/react"

interface Inputs {
  email: string
  password: string
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)

      const res = await fetch("/api/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || "Signup failed")
      }

      alert("Account created successfully 🎉")
      
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">

      <div className="w-full max-w-sm relative z-10">
        
        <div className="text-center mb-10">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Join SkillSwap today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="glass-effect rounded-3xl p-8 shadow-2xl flex flex-col gap-5">

            {/* GitHub Signup */}
            <button
              type="button"
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl py-3 text-sm font-semibold"
            >
              <Github size={18} />
              Signup with GitHub
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Enter your email"
                className="w-full bg-gray-900 border rounded-xl px-4 py-3 pl-10 text-white"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className="w-full bg-gray-900 border rounded-xl px-4 py-3 pl-10 text-white"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating Account..." : (
                <>
                  Sign up
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </div>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8">
          Already have an account?{" "}
          <a href="/Signin" className="text-red-400 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}