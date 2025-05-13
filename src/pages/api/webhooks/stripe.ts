
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook error: ${error.message}`);
    return res.status(400).json(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract userId from metadata
    const userId = session.metadata?.userId;
    
    if (userId) {
      try {
        // Update user to premium role
        await prisma.user.update({
          where: { id: userId },
          data: { role: "premium" },
        });
        console.log(`User ${userId} upgraded to premium`);
      } catch (error) {
        console.error("Error upgrading user:", error);
        return res.status(500).json({ error: "Failed to process payment" });
      }
    }
  }

  return res.status(200).json({ received: true });
}
