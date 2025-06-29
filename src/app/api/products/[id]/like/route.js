import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = parseInt(params.id);
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await prisma.productLike.findUnique({
      where: {
        productId_userId: {
          productId,
          userId: user.id,
        },
      },
    });

    if (existingLike) {
      return Response.json({ message: "Already liked" });
    }

    // Create like
    await prisma.productLike.create({
      data: {
        productId,
        userId: user.id,
      },
    });

    // Increment like count
    await prisma.product.update({
      where: { id: productId },
      data: { likes: { increment: 1 } },
    });

    return Response.json({ message: "Liked successfully" });
  } catch (err) {
    console.error("❌ POST /like error:", err); // ✅ log error
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
