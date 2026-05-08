import { NextResponse } from 'next/server';
import { createStripeClient } from '../../../../lib/stripe/server.js';
import { getUser, isSupabaseConfigured } from '../../../../lib/supabase/server.js';

export async function POST(request) {
  const stripe = createStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: 'Falta STRIPE_SECRET_KEY.' }, { status: 500 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Falta configurar Supabase para buscar stripe_customer_id.' }, { status: 500 });
  }

  const { user, supabase } = await getUser();
  if (!user || !supabase) {
    return NextResponse.json({ error: 'Inicia sesión para abrir billing.' }, { status: 401 });
  }

  const { data } = await supabase
    .from('customers')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!data?.stripe_customer_id) {
    return NextResponse.json({ error: 'No hay stripe_customer_id asociado al usuario.' }, { status: 404 });
  }

  const origin = request.headers.get('origin') || new URL(request.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: data.stripe_customer_id,
    return_url: `${origin}/app/billing`,
  });

  return NextResponse.json({ url: session.url });
}
