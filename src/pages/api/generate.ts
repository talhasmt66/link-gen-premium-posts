
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get user session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { topic, tone, style } = req.body;
    
    if (!topic || !tone || !style) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get the user from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check post limit for free users
    if (user.role === "free" && user.postCount >= 20) {
      return res.status(403).json({ error: "Post limit reached. Upgrade to premium to continue." });
    }

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using the latest model available
      messages: [
        { 
          role: "system", 
          content: "You are a professional LinkedIn post writer. Write engaging, authentic content that resonates with a professional audience." 
        },
        { 
          role: "user", 
          content: `Write a LinkedIn post about "${topic}" in a ${tone} tone and ${style} style. Make it engaging and professional.` 
        },
      ],
    });

    const postContent = response.choices[0].message.content;

    // Save the post to database
    const post = await prisma.post.create({
      data: {
        topic,
        tone,
        style,
        content: postContent || "No content generated",
        userId: session.user.id,
      },
    });

    // Increment post count for free users
    if (user.role === "free") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { postCount: { increment: 1 } },
      });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error generating post:", error);
    return res.status(500).json({ error: "Failed to generate post" });
  }
}
