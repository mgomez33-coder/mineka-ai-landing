import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser, isSupabaseConfigured } from '../../lib/supabase/server.js';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const configured = isSupabaseConfigured();
  const { user, supabase } = await getUser();

  if (configured && !user) {
    redirect('/login');
  }

  let activePlan = null;
  if (user && supabase) {
    const { data } = await supabase
      .from('subscriptions')
      .select('plan_id,status,current_period_end')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    activePlan = data;
  }

  return (
    <main className="appShell">
      <AppHeader />
      <section className="dashboardGrid">
        <article className="panel">
          <div className="sectionLabel">Dashboard</div>
          <h1>Panel MINEKA AI</h1>
          <p>
            {configured
              ? `Sesión iniciada${user?.email ? ` como ${user.email}` : ''}.`
              : 'Modo sin Supabase: el build funciona y la UI queda lista para conectar credenciales.'}
          </p>
        </article>

        <article className="panel">
          <h2>Plan</h2>
          {activePlan ? (
            <p>Plan activo: {activePlan.plan_id}</p>
          ) : (
            <>
              <p>No hay un plan activo registrado todavía.</p>
              <Link className="btn primary" href="/precios">Elegir plan</Link>
            </>
          )}
        </article>

        <article className="panel">
          <h2>Siguientes pasos</h2>
          <div className="panelActions">
            <Link className="btn ghost" href="/app/onboarding">Completar onboarding</Link>
            <Link className="btn ghost" href="/app/billing">Billing</Link>
          </div>
        </article>
      </section>
    </main>
  );
}

function AppHeader() {
  return (
    <header className="appHeader">
      <Link className="brand" href="/">
        <img className="brandLogo" src="/logo.svg" alt="MINEKA AI" />
      </Link>
      <nav className="panelActions">
        <Link href="/app">Dashboard</Link>
        <Link href="/app/onboarding">Onboarding</Link>
        <Link href="/app/billing">Billing</Link>
      </nav>
    </header>
  );
}
