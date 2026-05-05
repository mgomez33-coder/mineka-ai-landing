import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cable,
  Check,
  Cpu,
  DatabaseZap,
  Gauge,
  Layers3,
  MessageCircle,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap
} from 'lucide-react';
import './styles.css';

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
          <a href="#metodo">Método</a>
          <a href="#casos">Casos de uso</a>
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
            <h1 id="hero-title">Automatiza procesos. Conecta datos. Escala mejor.</h1>
            <p className="heroLead">
              En <strong>MINEKA AI</strong> diseñamos sistemas inteligentes que conectan tus procesos,
              herramientas y datos para que tu negocio ahorre tiempo, reduzca errores y opere sin caos.
            </p>
            <div className="heroActions">
              <a className="btn primary" href="#contacto">Agenda un diagnóstico <ArrowRight size={18} /></a>
              <a className="btn ghost" href="#servicios">Ver servicios</a>
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
            <a className="btn primary" href="mailto:hola@mineka.ai?subject=Diagn%C3%B3stico%20MINEKA%20AI">
              <MessageCircle size={18} /> Solicitar diagnóstico
            </a>
          </div>
          <form className="form" onSubmit={(event) => event.preventDefault()}>
            <label>Nombre<input type="text" placeholder="Tu nombre" /></label>
            <label>Email<input type="email" placeholder="tu@empresa.com" /></label>
            <label>Interés
              <select defaultValue="">
                <option value="" disabled>Selecciona una opción</option>
                <option>Automatización de Operaciones</option>
                <option>IA para Negocios</option>
                <option>Integraciones Tecnológicas</option>
                <option>Sistemas a Medida</option>
                <option>Diagnóstico y Estrategia</option>
              </select>
            </label>
            <label>Mensaje<textarea placeholder="Cuéntanos qué proceso quieres automatizar" /></label>
            <button className="btn submit" type="submit">Enviar mensaje</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <Logo />
        <p>© {new Date().getFullYear()} MINEKA AI. Sistemas inteligentes para negocios reales.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
