import { headers } from 'next/headers';
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { OrderStore } from '@/lib/orderStore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: NextRequest) {
  const sig = (await headers()).get('stripe-signature')!;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const buf = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, whSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) OrderStore.markPaid(orderId);
  }
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) OrderStore.markCash(orderId); // mark as cash/expired fallback
  }

  return NextResponse.json({ received: true });
}
