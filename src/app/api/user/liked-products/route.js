import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { likedProducts: { include: { product: true } } }, // includes full product
    });

    const likedProducts = user?.likedProducts.map((like) => like.product) || [];

    return Response.json({ likedProducts });
  } catch (err) {
    console.error("❌ API Error:", err); // ✅ clear logging
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
