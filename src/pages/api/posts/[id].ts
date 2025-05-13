
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  if (req.method === "DELETE") {
    try {
      // Verify the post belongs to the user
      const post = await prisma.post.findFirst({
        where: {
          id,
          userId: session.user.id,
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Delete the post
      await prisma.post.delete({ where: { id } });

      // If user is free, decrement the post count
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });
      
      if (user && user.role === "free" && user.postCount > 0) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { postCount: { decrement: 1 } },
        });
      }

      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ error: "Failed to delete post" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
