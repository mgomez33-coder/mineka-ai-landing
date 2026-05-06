// MINEKA AI — Configuración editable provisional
// TODO: Reemplazar placeholders antes de publicar en dominio definitivo.

export const CONFIG = {
  brand: 'MINEKA AI',
  tagline: 'Automatiza procesos. Conecta datos. Escala mejor.',

  // Contacto provisional
  email: 'hola@mineka.ai',          // TODO: crear/verificar buzón
  whatsapp: '',                     // TODO: agregar número de WhatsApp business, ej: '5491112345678'
  whatsappMessage: 'Hola MINEKA AI, quiero agendar un diagnóstico de automatización.',
  city: '',                         // TODO: ciudad principal de operación, ej: 'Buenos Aires'
  market: 'Latinoamérica',          // mercado objetivo (puede ser país/región)

  // Redes (opcional, dejar vacío si no existen aún)
  linkedin: '',
  instagram: '',

  // SEO básico
  seo: {
    title: 'MINEKA AI | Automatiza procesos. Conecta datos. Escala mejor.',
    description:
      'MINEKA AI diseña sistemas inteligentes para negocios: automatización de operaciones, IA aplicada, integraciones con WhatsApp, CRM, Google Sheets y más.',
    ogImage: '', // TODO: ruta/absoluta o URL pública de imagen OG
  },
};

// Helpers de contacto
export function getMailtoLink({ name = '', interest = '', message = '' } = {}) {
  const subject = encodeURIComponent(`Consulta MINEKA AI${name ? ` - ${name}` : ''}`);
  const body = encodeURIComponent(
    `Nombre: ${name || '(no especificado)'}\nInterés: ${interest || '(no especificado)'}\n\n${message || ''}\n\n---\nEnviado desde mineka-ai-landing`
  );
  return `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
}

export function getWhatsAppLink(text = CONFIG.whatsappMessage) {
  if (!CONFIG.whatsapp) return '';
  const clean = CONFIG.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}
