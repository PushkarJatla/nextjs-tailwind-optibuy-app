import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req) {
  const data = await req.json()

  try {
    const newProduct = await prisma.product.create({ data })
    return Response.json(newProduct)
  } catch (error) {
    console.error(error)
    return new Response("Error adding product", { status: 500 })
  }
}
