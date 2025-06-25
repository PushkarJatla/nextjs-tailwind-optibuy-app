import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return new Response("User not found", { status: 404 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return new Response("Invalid credentials", { status: 401 })
    }

    return Response.json({ message: "Login successful", userId: user.id })
  } catch (error) {
    console.error("Login error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
