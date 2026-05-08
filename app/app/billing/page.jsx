'use client';

import React from 'react';
import Link from 'next/link';

export default function BillingPage() {
  const [status, setStatus] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const openPortal = async () => {
    setIsLoading(true);
    setStatus('');

    const response = await fetch('/api/stripe/portal', {
      method: 'POST',
    });
    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setStatus(data.error || 'No se pudo abrir el portal.');
      return;
    }

    window.location.href = data.url;
  };

  return (
    <main className="appShell">
      <header className="appHeader">
        <Link className="brand" href="/app">
          <img className="brandLogo" src="/logo.svg" alt="MINEKA AI" />
        </Link>
        <Link href="/app">Dashboard</Link>
      </header>

      <section className="panel formPanel">
        <div className="sectionLabel">Billing</div>
        <h1>Pagos y suscripción</h1>
        <p>Administra tu plan, facturación y método de pago desde Stripe Customer Portal.</p>
        <button className="btn primary" type="button" onClick={openPortal} disabled={isLoading}>
          {isLoading ? 'Abriendo...' : 'Abrir portal de Stripe'}
        </button>
        {status && <p className="formStatus" role="status">{status}</p>}
      </section>
    </main>
  );
}
