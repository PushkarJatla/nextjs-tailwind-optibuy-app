import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (req) => {
  const data = await req.json();

  try {
    const newProduct = await prisma.product.create({ data });
    return Response.json(newProduct);
  } catch (error) {
    console.error(error);
    return new Response("Error adding product", { status: 500 });
  }
};

export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return Response.json(products);
  } catch (error) {
    console.error(error)
    return new Response("Error fetching products", { status: 500 })
  }
    
}

