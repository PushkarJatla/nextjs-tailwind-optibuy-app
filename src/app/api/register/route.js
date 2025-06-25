import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'


const prisma = new PrismaClient()

export async function POST(req) {
  const { name, email, password } = await req.json()

  if (!email || !password || !name) {
    return new Response("All fields are required", { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    return Response.json({ message: "User registered", userId: user.id })
  } catch (err) {
    console.error(err)
    return new Response("User already exists or error occurred", { status: 500 })
  }
}
