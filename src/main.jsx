import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cable,
  Calendar,
  Check,
  ClipboardList,
  Cpu,
  DatabaseZap,
  Gauge,
  Layers3,
  Mail,
  MessageCircle,
  MessageSquare,
  MonitorSmartphone,
  Radar,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import './styles.css';
import { CONFIG, getMailtoLink, getWhatsAppLink } from './config.js';

const services = [
  {
    icon: Workflow,
    title: 'Automatización de Operaciones',
    text: 'Convertimos tareas repetitivas en flujos automáticos para ahorrar tiempo, reducir errores y ordenar tu operación diaria.'
  },
  {
    icon: BrainCircuit,
    title: 'IA para Negocios',
    text: 'Implementamos asistentes, clasificación inteligente, análisis y generación de contenido aplicado a procesos reales.'
  },
  {
    icon: Cable,
    title: 'Integraciones Tecnológicas',
    text: 'Conectamos WhatsApp, CRM, formularios, calendarios, Google Sheets, emails, bases de datos y dashboards.'
  },
  {
    icon: Cpu,
    title: 'Sistemas a Medida',
    text: 'Creamos portales, CRMs ligeros, paneles internos y apps web para que tu negocio trabaje con estructura.'
  },
  {
    icon: Gauge,
    title: 'Diagnóstico y Estrategia',
    text: 'Detectamos qué procesos conviene automatizar primero, qué herramientas usar y cómo medir impacto.'
  },
  {
    icon: ShieldCheck,
    title: 'Soporte y Evolución',
    text: 'Monitoreo, mejoras y mantenimiento para que tus automatizaciones sigan funcionando conforme crece tu negocio.'
  },
  {
    icon: Layers3,
    title: 'Formación de Equipos',
    text: 'Capacitamos a tu equipo para usar sistemas, IA y flujos automatizados con seguridad y autonomía.'
  },
  {
    icon: DatabaseZap,
    title: 'Presencia Digital Inteligente',
    text: 'Landing pages y sitios web conectados a captación, seguimiento, CRM y reportes automáticos.'
  }
];

const method = [
  ['01', 'Diagnóstico', 'Mapeamos procesos, cuellos de botella y herramientas actuales.'],
  ['02', 'Diseño del sistema', 'Definimos flujos, datos, integraciones y prioridades de implementación.'],
  ['03', 'Implementación', 'Construimos automatizaciones, IA, dashboards o software interno.'],
  ['04', 'Medición y mejora', 'Monitoreamos resultados y evolucionamos el sistema por etapas.']
];

const useCases = [
  'WhatsApp automático para atención y seguimiento',
  'Leads de formularios directo a CRM o Google Sheets',
  'Reportes diarios por email o dashboard',
  'Recordatorios, agendas y confirmaciones automáticas',
  'Análisis de campañas, ventas y operación',
  'Bots internos para consultar información del negocio'
];

const automations = [
  { icon: MessageSquare, title: 'WhatsApp', text: 'Respuestas automáticas, seguimiento de consultas y confirmaciones sin intervención manual.' },
  { icon: UserCheck, title: 'Leads', text: 'Captura desde formularios o anuncios, clasificación y envío inmediato a tu CRM o Sheets.' },
  { icon: Calendar, title: 'Agenda', text: 'Recordatorios, confirmaciones, cancelaciones y reagendamiento automático.' },
  { icon: Mail, title: 'Emails', text: 'Secuencias de bienvenida, seguimiento, reportes y alertas operativas automáticas.' },
  { icon: ClipboardList, title: 'Reportes', text: 'Resúmenes diarios/semanales de ventas, stock, citas o métricas clave por email o dashboard.' },
  { icon: MonitorSmartphone, title: 'Dashboards', text: 'Paneles visuales conectados a tus datos para decisiones rápidas y claras.' },
  { icon: DatabaseZap, title: 'CRM / Sheets', text: 'Sincronización de contactos, estados de clientes y pipelines sin copiar y pegar.' },
  { icon: TrendingUp, title: 'Seguimiento', text: 'Recordatorios de cobranza, postventa, reactivación de clientes y tareas de equipo.' },
];

const audiences = [
  { icon: Store, title: 'Negocios locales', text: 'Restaurantes, tiendas, talleres y servicios que necesitan ordenar su operación sin contratar más personal.' },
  { icon: Stethoscope, title: 'Clínicas y consultorios', text: 'Agendas, recordatorios, historial de pacientes y seguimiento de tratamientos automatizados.' },
  { icon: Users, title: 'Servicios profesionales', text: 'Contadores, abogados, arquitectos y agencias que pierden tiempo en tareas administrativas repetidas.' },
  { icon: ShoppingBag, title: 'E-commerce pequeño', text: 'Confirmaciones de pedido, seguimiento de envíos, stock y atención al cliente por WhatsApp/email.' },
  { icon: Workflow, title: 'Equipos manuales', text: 'Empresas donde todo pasa por WhatsApp personal, planillas sueltas y memoria de cada empleado.' },
];

const packages = [
  {
    name: 'Diagnóstico Express',
    tag: 'Ideal para empezar',
    description: 'Reunión de 45 min + mapa de procesos y propuesta priorizada de automatizaciones rápidas.',
    features: ['Mapeo de 3 procesos clave', 'Identificación de cuellos de botella', 'Roadmap de 30/60/90 días', 'Propuesta de herramientas'],
    cta: 'Agendar diagnóstico',
  },
  {
    name: 'Automatización Inicial',
    tag: 'Impacto inmediato',
    description: 'Implementamos 1-2 flujos prioritarios (WhatsApp, leads, agenda o reportes) en 2-3 semanas.',
    features: ['1-2 automatizaciones activas', 'Integración con herramientas actuales', 'Dashboard básico o reportes', 'Capacitación del equipo'],
    cta: 'Solicitar propuesta',
  },
  {
    name: 'Sistema Operativo AI',
    tag: 'Transformación completa',
    description: 'Diseñamos un sistema operativo conectado: IA, flujos, dashboards, CRM y soporte continuo.',
    features: ['Sistema operativo a medida', 'IA aplicada a procesos reales', 'Dashboards y reportes automáticos', 'Soporte y evolución mensual'],
    cta: 'Conversar con un especialista',
  },
];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="MINEKA AI inicio">
      <span className="brandMark"><span>M</span></span>
      <span className="brandText">
        <strong>MINEKA</strong>
        <em>AI OPERATIONS</em>
      </span>
    </a>
  );
}

function App() {
  return (
    <main id="top">
      <nav className="nav">
        <Logo />
        <div className="navLinks" aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#automatizamos">Qué automatizamos</a>
          <a href="#para-quien">Para quién</a>
          <a href="#paquetes">Paquetes</a>
          <a href="#metodo">Método</a>
          <a href="#casos">Casos</a>
          <a href="#contacto">Contacto</a>
        </div>
        <a className="navCta" href="#contacto">
          Contacto
        </a>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow"><Sparkles size={16} /> Automatización + Inteligencia Artificial</p>
            <h1 id="hero-title">Tu negocio opera solo. Tú decides el rumbo.</h1>
            <p className="heroLead">
              En <strong>MINEKA AI</strong> diseñamos sistemas inteligentes que conectan tus procesos,
              herramientas y datos para que ahorres horas, reduzcas errores y escales sin caos.
            </p>
            <div className="heroActions">
              <a className="btn primary" href="#contacto">Agenda un diagnóstico <ArrowRight size={18} /></a>
              <a className="btn ghost" href="#automatizamos">Ver qué automatizamos</a>
            </div>
            <div className="trustRow" aria-label="Beneficios principales">
              <span><Check size={16} /> IA práctica</span>
              <span><Check size={16} /> Flujos medibles</span>
              <span><Check size={16} /> Sistemas a medida</span>
            </div>
          </div>

          <div className="orbitalCard" aria-label="Visual de núcleo operativo MINEKA AI">
            <div className="orbitalGlow" />
            <div className="core">
              <Radar className="coreIcon" size={52} />
              <span>NÚCLEO OPERATIVO</span>
            </div>
            <div className="node nodeOne"><Bot size={18} /> WhatsApp AI</div>
            <div className="node nodeTwo"><DatabaseZap size={18} /> Datos</div>
            <div className="node nodeThree"><Zap size={18} /> Flujos</div>
            <div className="node nodeFour"><Gauge size={18} /> Reportes</div>
          </div>
        </div>
      </section>

      <section className="problem section">
        <div className="sectionLabel">El problema</div>
        <h2>Muchos negocios crecen, pero sus procesos siguen siendo manuales.</h2>
        <p>
          La información vive dispersa, el seguimiento depende de personas ocupadas y las decisiones se toman tarde.
          MINEKA AI convierte esa operación fragmentada en un sistema conectado, automatizado y medible.
        </p>
      </section>

      <section className="section" id="servicios">
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">Servicios</div>
            <h2>Líneas de automatización inteligente</h2>
          </div>
          <p>Soluciones modulares para implementar desde una automatización sencilla hasta un sistema operativo completo.</p>
        </div>
        <div className="serviceGrid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="serviceCard" key={service.title}>
                <div className="iconWrap"><Icon size={22} /></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="automatizamos" aria-labelledby="automatizamos-title">
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">Qué automatizamos</div>
            <h2 id="automatizamos-title">Ejemplos prácticos que ya funcionan</h2>
          </div>
          <p>Automatizaciones reales que liberan horas y reducen errores desde la primera semana.</p>
        </div>
        <div className="automationGrid">
          {automations.map((a) => {
            const Icon = a.icon;
            return (
              <article className="automationCard" key={a.title}>
                <div className="iconWrap"><Icon size={22} /></div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="para-quien" aria-labelledby="para-quien-title">
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">Para quién es</div>
            <h2 id="para-quien-title">Diseñado para negocios que operan de verdad</h2>
          </div>
          <p>Sin importar el tamaño: si usas WhatsApp, planillas o papel, hay procesos que podemos automatizar.</p>
        </div>
        <div className="audienceGrid">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <article className="audienceCard" key={a.title}>
                <div className="iconWrap"><Icon size={22} /></div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="paquetes" aria-labelledby="paquetes-title">
        <div className="sectionHeader compact">
          <div>
            <div className="sectionLabel">Soluciones iniciales</div>
            <h2 id="paquetes-title">Paquetes para empezar con resultados</h2>
          </div>
          <p>Desde un diagnóstico rápido hasta un sistema operativo completo. Sin precios engañosos: cada propuesta se ajusta a tu realidad.</p>
        </div>
        <div className="packageGrid">
          {packages.map((pkg) => (
            <article className="packageCard" key={pkg.name}>
              <div className="packageTag">{pkg.tag}</div>
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <ul>
                {pkg.features.map((f) => (
                  <li key={f}><Check size={16} /> {f}</li>
                ))}
              </ul>
              <a className="btn primary" href="#contacto">{pkg.cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="method section" id="metodo">
        <div className="sectionHeader compact">
          <div>
            <div className="sectionLabel">Método MINEKA</div>
            <h2>De procesos sueltos a sistemas inteligentes.</h2>
          </div>
        </div>
        <div className="methodGrid">
          {method.map(([num, title, text]) => (
            <article className="methodCard" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="useCases section" id="casos">
        <div className="useCasesCopy">
          <div className="sectionLabel">Casos de uso</div>
          <h2>Automatizaciones que generan impacto desde el primer mes.</h2>
          <p>
            Empezamos por lo que más tiempo consume o más dinero pierde: atención, seguimiento, reportes,
            captura de leads y tareas operativas repetidas.
          </p>
        </div>
        <div className="caseList">
          {useCases.map((item) => <div className="caseItem" key={item}><Check size={18} /> {item}</div>)}
        </div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contactCard">
          <div>
            <div className="sectionLabel">Contacto</div>
            <h2>¿Listo para convertir tu operación en un sistema inteligente?</h2>
            <p>
              Agenda un diagnóstico y revisamos qué procesos puedes automatizar primero para obtener resultados rápidos.
            </p>
            <div className="contactActions">
              <a className="btn primary" href={`mailto:${CONFIG.email}?subject=Diagn%C3%B3stico%20MINEKA%20AI`}>
                <MessageCircle size={18} /> Solicitar diagnóstico
              </a>
              {CONFIG.whatsapp && (
                <a className="btn ghost" href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                  <MessageSquare size={18} /> WhatsApp
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="footer">
        <Logo />
        <p>© {new Date().getFullYear()} MINEKA AI. Sistemas inteligentes para negocios reales.</p>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [interest, setInterest] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const wa = getWhatsAppLink();
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.href = getMailtoLink({ name, interest, message });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Nombre<input type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>Email<input type="email" placeholder="tu@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Interés
        <select value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="" disabled>Selecciona una opción</option>
          <option>Automatización de Operaciones</option>
          <option>IA para Negocios</option>
          <option>Integraciones Tecnológicas</option>
          <option>Sistemas a Medida</option>
          <option>Diagnóstico y Estrategia</option>
        </select>
      </label>
      <label>Mensaje<textarea placeholder="Cuéntanos qué proceso quieres automatizar" value={message} onChange={(e) => setMessage(e.target.value)} /></label>
      <button className="btn submit" type="submit">Enviar mensaje</button>
    </form>
  );
}

createRoot(document.getElementById('root')).render(<App />);
