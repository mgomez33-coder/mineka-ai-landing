import { NextResponse } from 'next/server';
import { getPlan } from '../../../../lib/stripe/config.js';
import { createStripeClient } from '../../../../lib/stripe/server.js';
import { createAdminClient } from '../../../../lib/supabase/server.js';

export async function POST(request) {
  const stripe = createStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: 'Falta STRIPE_SECRET_KEY.' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  let event;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(body);
    }
  } catch (error) {
    return NextResponse.json({ error: `Webhook inválido: ${error.message}` }, { status: 400 });
  }

  const supabase = await createAdminClient();

  if (event.type === 'checkout.session.completed') {
    await handleCheckoutCompleted(event.data.object, supabase);
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    await handleSubscriptionChanged(event.data.object, supabase);
  }

  if (event.type === 'invoice.payment_succeeded') {
    await handleInvoicePaid(event.data.object, supabase);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session, supabase) {
  if (!supabase) {
    return;
  }

  const userId = session.metadata?.user_id;
  const planId = session.metadata?.plan_id;
  if (!userId || !getPlan(planId)) {
    return;
  }

  if (session.customer) {
    await supabase.from('customers').upsert(
      {
        user_id: userId,
        stripe_customer_id: session.customer,
        email: session.customer_details?.email || session.customer_email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
  }

  if (session.mode === 'payment') {
    await supabase.from('payments').upsert(
      {
        stripe_checkout_session_id: session.id,
        user_id: userId,
        plan_id: planId,
        amount_total: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
      },
      { onConflict: 'stripe_checkout_session_id' }
    );
  }
}

async function handleSubscriptionChanged(subscription, supabase) {
  if (!supabase) {
    return;
  }

  const userId = subscription.metadata?.user_id;
  const planId = subscription.metadata?.plan_id;
  if (!userId || !getPlan(planId)) {
    return;
  }

  await supabase.from('subscriptions').upsert(
    {
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      user_id: userId,
      plan_id: planId,
      status: subscription.status,
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_subscription_id' }
  );
}

async function handleInvoicePaid(invoice, supabase) {
  if (!supabase || !invoice.subscription) {
    return;
  }

  // TODO: Add entitlement refresh, receipt emails, and usage provisioning.
  await supabase.from('payments').upsert(
    {
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: invoice.subscription,
      amount_total: invoice.amount_paid,
      currency: invoice.currency,
      status: invoice.status,
    },
    { onConflict: 'stripe_invoice_id' }
  );
}
