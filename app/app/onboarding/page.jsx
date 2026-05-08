import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser, isSupabaseConfigured } from '../../../lib/supabase/server.js';

export const dynamic = 'force-dynamic';

async function saveOnboarding(formData) {
  'use server';

  const { user, supabase } = await getUser();
  if (!supabase || !user) {
    return;
  }

  await supabase.from('onboarding').upsert(
    {
      user_id: user.id,
      business_name: formData.get('business_name'),
      industry: formData.get('industry'),
      team_size: formData.get('team_size'),
      main_process: formData.get('main_process'),
      tools: formData.get('tools'),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
}

export default async function OnboardingPage() {
  const configured = isSupabaseConfigured();
  const { user } = await getUser();

  if (configured && !user) {
    redirect('/login');
  }

  return (
    <main className="appShell">
      <header className="appHeader">
        <Link className="brand" href="/app">
          <img className="brandLogo" src="/logo.svg" alt="MINEKA AI" />
        </Link>
        <Link href="/app">Dashboard</Link>
      </header>

      <section className="panel formPanel">
        <div className="sectionLabel">Onboarding</div>
        <h1>Datos de negocio</h1>
        <p>
          Esta información prepara el diagnóstico y la priorización de automatizaciones.
        </p>
        {!configured && (
          <div className="notice">Formulario en modo placeholder. Con Supabase configurado guardará en `onboarding`.</div>
        )}

        <form className="form" action={saveOnboarding}>
          <label>
            Nombre del negocio
            <input name="business_name" placeholder="MINEKA AI" />
          </label>
          <label>
            Industria
            <input name="industry" placeholder="Servicios, clínica, retail..." />
          </label>
          <label>
            Tamaño del equipo
            <select name="team_size" defaultValue="">
              <option value="" disabled>Selecciona una opción</option>
              <option>1-5</option>
              <option>6-20</option>
              <option>21-50</option>
              <option>50+</option>
            </select>
          </label>
          <label>
            Proceso más urgente
            <textarea name="main_process" placeholder="Describe el flujo que más tiempo consume o más errores genera." />
          </label>
          <label>
            Herramientas actuales
            <textarea name="tools" placeholder="WhatsApp, Sheets, CRM, calendario, email, etc." />
          </label>
          <button className="btn submit" type="submit">Guardar onboarding</button>
        </form>
      </section>
    </main>
  );
}
