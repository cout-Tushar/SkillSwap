import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import User from "./model/User"
import {connectToDatabase} from "./lib/mongodb"
import bcrypt from "bcrypt"

await connectToDatabase()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
  async authorize(credentials) {

  if (!credentials?.email || !credentials?.password) return null

  const user = await User.findOne({ email: credentials.email })

  if (!user) return null

  const isValid = await bcrypt.compare(
    credentials.password,
    user.password
  )

  if (!isValid) return null

  return {
    id: user._id.toString(),
    email: user.email
  }
},
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
})  