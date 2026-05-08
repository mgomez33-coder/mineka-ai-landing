# Setup Supabase + Stripe

## Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/migrations/001_auth_billing_schema.sql` en SQL Editor o con Supabase CLI.
3. En Authentication > Providers, activa Google y Apple.
4. Agrega estas redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://TU_URL_HOSTINGER/auth/callback`
5. Copia `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` a Hostinger.

## Stripe

1. Crea productos y precios en MXN:
   - Diagnóstico Express: pago único, 999 MXN.
   - Automatización Inicial: pago único, 9999 MXN.
   - MINEKA Operación: mensual, 2999 MXN.
   - MINEKA Growth: mensual, 6999 MXN.
   - MINEKA OS: mensual, 14999 MXN.
2. Copia cada Price ID a:
   - `STRIPE_PRICE_DIAGNOSTICO`
   - `STRIPE_PRICE_AUTOMATIZACION`
   - `STRIPE_PRICE_OPERACION`
   - `STRIPE_PRICE_GROWTH`
   - `STRIPE_PRICE_OS`
3. Configura el webhook:
   - URL local con Stripe CLI: `http://localhost:3000/api/stripe/webhook`
   - URL Hostinger: `https://TU_URL_HOSTINGER/api/stripe/webhook`
   - Eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`.
4. Copia `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET` a variables del servidor.

## Hostinger

Usa Node/Next si tu plan lo soporta. Variables necesarias:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_DIAGNOSTICO=
STRIPE_PRICE_AUTOMATIZACION=
STRIPE_PRICE_OPERACION=
STRIPE_PRICE_GROWTH=
STRIPE_PRICE_OS=
NEXT_PUBLIC_SITE_URL=
```

Build:

```bash
npm install
npm run build
npm run start
```

La app compila sin variables reales. Sin credenciales, la landing y páginas visibles cargan; las rutas API devuelven JSON claro al usarlas.
