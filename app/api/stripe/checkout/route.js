import { NextResponse } from 'next/server';
import { getPlan, getStripePriceId } from '../../../../lib/stripe/config.js';
import { createStripeClient } from '../../../../lib/stripe/server.js';
import { getUser, isSupabaseConfigured } from '../../../../lib/supabase/server.js';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const plan = getPlan(payload?.planId);
  if (!plan) {
    return NextResponse.json({ error: 'planId inválido.' }, { status: 400 });
  }

  const stripe = createStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: 'Falta STRIPE_SECRET_KEY.' }, { status: 500 });
  }

  const price = getStripePriceId(plan);
  if (!price) {
    return NextResponse.json({ error: `Falta ${plan.priceEnv}.` }, { status: 500 });
  }

  const configured = isSupabaseConfigured();
  const { user, supabase } = await getUser();
  if (configured && !user) {
    return NextResponse.json({ error: 'Inicia sesión antes de comprar.' }, { status: 401 });
  }

  let customerId = null;
  if (user && supabase) {
    const { data } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();
    customerId = data?.stripe_customer_id || null;
  }

  const origin = request.headers.get('origin') || new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: plan.mode,
    customer: customerId || undefined,
    customer_email: customerId ? undefined : user?.email || undefined,
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/app?checkout=success`,
    cancel_url: `${origin}/precios?checkout=cancelled`,
    metadata: {
      plan_id: plan.id,
      user_id: user?.id || '',
    },
    subscription_data:
      plan.mode === 'subscription'
        ? {
            metadata: {
              plan_id: plan.id,
              user_id: user?.id || '',
            },
          }
        : undefined,
  });

  return NextResponse.json({ url: session.url });
}
