'use client';

import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '../../lib/supabase/client.js';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const configured = isSupabaseConfigured();

  const signInWithProvider = async (provider) => {
    setStatus('');
    const supabase = createClient();
    if (!supabase) {
      setStatus('Supabase no está configurado todavía. Agrega las variables públicas en Hostinger o .env.local.');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus(error.message);
    }
  };

  const sendMagicLink = async (event) => {
    event.preventDefault();
    setStatus('');
    setIsLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setStatus('Magic link listo en UI. Falta configurar Supabase para enviarlo.');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setIsLoading(false);
    setStatus(error ? error.message : 'Revisa tu email para continuar.');
  };

  return (
    <main className="authPage">
      <section className="authPanel">
        <a className="brand authBrand" href="/">
          <img className="brandLogo" src="/logo.svg" alt="MINEKA AI" />
        </a>
        <div className="sectionLabel">
          <ShieldCheck size={16} /> Acceso privado
        </div>
        <h1>Entra a MINEKA AI</h1>
        <p>
          Accede al dashboard, onboarding y billing. La autenticación queda activa cuando Supabase esté configurado.
        </p>

        {!configured && (
          <div className="notice">
            Faltan `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
          </div>
        )}

        <div className="authActions">
          <button className="btn primary" type="button" onClick={() => signInWithProvider('google')}>
            Continuar con Google
          </button>
          <button className="btn ghost" type="button" onClick={() => signInWithProvider('apple')}>
            Continuar con Apple
          </button>
        </div>

        <form className="form" onSubmit={sendMagicLink}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              placeholder="tu@empresa.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <button className="btn submit" type="submit" disabled={isLoading}>
            <Mail size={18} /> {isLoading ? 'Enviando...' : 'Continuar con email'}
          </button>
        </form>

        {status && <p className="formStatus" role="status">{status}</p>}
      </section>
    </main>
  );
}
