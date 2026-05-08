import './globals.css';

export const metadata = {
  title: 'MINEKA AI | Automatiza procesos. Conecta datos. Escala mejor.',
  description:
    'MINEKA AI diseña sistemas inteligentes para negocios: automatización de operaciones, IA aplicada e integraciones.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'MINEKA AI | Automatiza procesos. Conecta datos. Escala mejor.',
    description: 'Sistemas inteligentes para negocios reales. Automatización, IA e integraciones sin caos.',
    siteName: 'MINEKA AI',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
