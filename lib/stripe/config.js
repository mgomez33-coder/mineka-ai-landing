export const plans = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico Express',
    description: 'Mapa rápido de procesos, prioridades y roadmap de automatización.',
    priceLabel: '$999 MXN',
    intervalLabel: 'pago único',
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_DIAGNOSTICO',
  },
  {
    id: 'automatizacion',
    name: 'Automatización Inicial',
    description: 'Implementación inicial de flujos prioritarios para operación real.',
    priceLabel: '$9,999 MXN',
    intervalLabel: 'pago único',
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_AUTOMATIZACION',
  },
  {
    id: 'operacion',
    name: 'MINEKA Operación',
    description: 'Soporte mensual para automatizaciones, reportes y mejoras continuas.',
    priceLabel: '$2,999 MXN',
    intervalLabel: 'mensual',
    mode: 'subscription',
    priceEnv: 'STRIPE_PRICE_OPERACION',
  },
  {
    id: 'growth',
    name: 'MINEKA Growth',
    description: 'Automatización, IA aplicada y evolución de sistemas para crecimiento.',
    priceLabel: '$6,999 MXN',
    intervalLabel: 'mensual',
    mode: 'subscription',
    priceEnv: 'STRIPE_PRICE_GROWTH',
  },
  {
    id: 'os',
    name: 'MINEKA OS',
    description: 'Sistema operativo AI con soporte estratégico, integraciones y dashboards.',
    priceLabel: '$14,999 MXN',
    intervalLabel: 'mensual',
    mode: 'subscription',
    priceEnv: 'STRIPE_PRICE_OS',
  },
];

export function getPlan(planId) {
  return plans.find((plan) => plan.id === planId) || null;
}

export function getStripePriceId(plan) {
  return plan ? process.env[plan.priceEnv] : null;
}
