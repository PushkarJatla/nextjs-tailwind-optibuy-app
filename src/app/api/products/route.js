import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse } from 'next/server';


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

// Handle GET request - Fetch all or by category
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const products = await prisma.product.findMany({
      where: category
        ? {
            category: {
              equals: category,
              mode: 'insensitive',
            },
          }
        : {},
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        rating: true,
        site: true,
        link: true,
        likes: true,
      },
      orderBy: {
        likes: 'desc',
      },
    });

    return NextResponse.json(products ?? []);
  } catch (error) {
    console.error("GET error:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
};
