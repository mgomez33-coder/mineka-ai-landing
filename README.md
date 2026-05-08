# MINEKA AI

Landing y app privada para **MINEKA AI**, agencia de automatización e inteligencia artificial para negocios.

## Stack

- React
- Next.js App Router
- Supabase Auth
- Stripe Checkout + Customer Portal
- CSS puro
- Lucide React icons

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

La app debe compilar sin variables reales. Si faltan credenciales, la landing funciona y las rutas API devuelven errores JSON controlados.

## Variables

Copia `.env.example` a `.env.local` para desarrollo. No incluyas secretos reales en git.

Variables principales:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_DIAGNOSTICO`
- `STRIPE_PRICE_AUTOMATIZACION`
- `STRIPE_PRICE_OPERACION`
- `STRIPE_PRICE_GROWTH`
- `STRIPE_PRICE_OS`

## Hostinger

Para URL temporal en Hostinger, configura las variables de entorno en el panel del runtime Node/Next y ejecuta:

```bash
npm install
npm run build
npm run start
```

Si el hosting sólo permite salida estática, las rutas de auth, Stripe y dashboard no funcionarán como APIs de servidor. Usa un plan/runtime Node compatible con Next.js.

## Setup externo

Consulta `docs/setup-supabase-stripe.md` para Supabase Auth, productos/precios de Stripe, webhook y migración SQL.

## Marca inicial

- Nombre: **MINEKA AI**
- Tagline: **Automatiza procesos. Conecta datos. Escala mejor.**
- Estilo: dark premium, cian + verde lima
- Posicionamiento: sistemas inteligentes para negocios reales.
