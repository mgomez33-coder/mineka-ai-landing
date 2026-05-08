import Stripe from 'stripe';

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function createStripeClient() {
  if (!isStripeConfigured()) {
    return null;
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}
