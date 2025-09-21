import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { OrderStore } from '@/lib/orderStore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion:"2024-06-20" });

export async function POST(req: NextRequest) {
  const { total, method, items } = await req.json();
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const orderId = OrderStore.create(total);

  if (method==="online") {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${base}/success?order=${orderId}&method=online`,
      cancel_url: `${base}/cancel?order=${orderId}`,
      line_items: items.map((l:any)=>({
        price_data: {
          currency: 'thb',
          product_data: { name:l.product.name },
          unit_amount: l.product.price,
        },
        quantity: l.qty,
      })),
      metadata:{ orderId },
    });
    return NextResponse.json({ url: session.url, orderId });
  }

  if (method==="cash") {
    OrderStore.markCash(orderId);
    return NextResponse.json({ orderId });
  }

  return NextResponse.json({ error:"invalid method" },{status:400});
}
