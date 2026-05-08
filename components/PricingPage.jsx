'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { plans } from '../lib/stripe/config.js';

export default function PricingPage() {
  const [status, setStatus] = React.useState('');
  const [loadingPlan, setLoadingPlan] = React.useState('');

  const startCheckout = async (planId) => {
    setStatus('');
    setLoadingPlan(planId);

    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    });
    const data = await response.json();
    setLoadingPlan('');

    if (!response.ok) {
      setStatus(data.error || 'No se pudo iniciar checkout.');
      return;
    }

    window.location.href = data.url;
  };

  const oneTimePlans = plans.filter((plan) => plan.mode === 'payment');
  const subscriptionPlans = plans.filter((plan) => plan.mode === 'subscription');

  return (
    <main className="pricingPage">
      <nav className="appHeader">
        <Link className="brand" href="/">
          <img className="brandLogo" src="/logo.svg" alt="MINEKA AI" />
        </Link>
        <div className="panelActions">
          <Link href="/">Landing</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="pricingHero">
        <div className="sectionLabel">Precios</div>
        <h1>Elige cómo empezar con MINEKA AI</h1>
        <p>Pagos únicos para arrancar rápido y suscripciones para operar, evolucionar y escalar.</p>
        {status && <div className="notice" role="status">{status}</div>}
      </section>

      <PricingSection title="Pagos únicos" plans={oneTimePlans} loadingPlan={loadingPlan} onCheckout={startCheckout} />
      <PricingSection title="Suscripciones" plans={subscriptionPlans} loadingPlan={loadingPlan} onCheckout={startCheckout} />
    </main>
  );
}

function PricingSection({ title, plans: sectionPlans, loadingPlan, onCheckout }) {
  return (
    <section className="section pricingSection">
      <h2>{title}</h2>
      <div className="packageGrid">
        {sectionPlans.map((plan) => (
          <article className="packageCard" key={plan.id}>
            <div className="packageTag">{plan.intervalLabel}</div>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="priceLine">
              <strong>{plan.priceLabel}</strong>
              <span>{plan.intervalLabel}</span>
            </div>
            <ul>
              <li><Check size={16} /> Checkout seguro con Stripe</li>
              <li><Check size={16} /> Acceso al dashboard MINEKA</li>
              <li><Check size={16} /> Facturación preparada para MXN</li>
            </ul>
            <button className="btn primary" type="button" onClick={() => onCheckout(plan.id)} disabled={loadingPlan === plan.id}>
              {loadingPlan === plan.id ? 'Abriendo...' : 'Comprar'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
