'use client';

import React from 'react';
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
import { CONFIG, getMailtoLink, getWhatsAppLink } from '../lib/config.js';
import { translations } from '../lib/i18n.js';

const LANG_STORAGE_KEY = 'mineka-lang';

const serviceItems = [
  { key: 'operations', icon: Workflow },
  { key: 'ai', icon: BrainCircuit },
  { key: 'integrations', icon: Cable },
  { key: 'customSystems', icon: Cpu },
  { key: 'strategy', icon: Gauge },
  { key: 'support', icon: ShieldCheck },
  { key: 'training', icon: Layers3 },
  { key: 'presence', icon: DatabaseZap },
];

const methodItems = [
  { num: '01', key: 'diagnosis' },
  { num: '02', key: 'design' },
  { num: '03', key: 'implementation' },
  { num: '04', key: 'optimization' },
];

const useCaseItems = ['whatsapp', 'leads', 'reports', 'reminders', 'analytics', 'internalBots'];

const automationItems = [
  { key: 'whatsapp', icon: MessageSquare },
  { key: 'leads', icon: UserCheck },
  { key: 'schedule', icon: Calendar },
  { key: 'emails', icon: Mail },
  { key: 'reports', icon: ClipboardList },
  { key: 'dashboards', icon: MonitorSmartphone },
  { key: 'crm', icon: DatabaseZap },
  { key: 'followUp', icon: TrendingUp },
];

const audienceItems = [
  { key: 'local', icon: Store },
  { key: 'clinics', icon: Stethoscope },
  { key: 'professional', icon: Users },
  { key: 'ecommerce', icon: ShoppingBag },
  { key: 'manualTeams', icon: Workflow },
];

const packageItems = ['diagnostic', 'starter', 'operatingSystem'];
const formOptions = ['operations', 'ai', 'integrations', 'customSystems', 'strategy'];

function getNestedValue(source, key) {
  return key.split('.').reduce((current, segment) => current?.[segment], source);
}

function buildContactMessage({ name = '', email = '', interest = '', message = '' } = {}, t) {
  return [
    t('contact.message.intro'),
    '',
    `${t('contact.message.name')}: ${name || t('contact.message.unspecified')}`,
    `${t('contact.message.email')}: ${email || t('contact.message.unspecified')}`,
    `${t('contact.message.interest')}: ${interest || t('contact.message.unspecified')}`,
    '',
    message || t('contact.message.noMessage'),
  ].join('\n');
}

function Logo({ t }) {
  return (
    <a className="brand" href="#top" aria-label={t('nav.homeAria')}>
      <img className="brandLogo" src="/logo.svg" alt="MINEKA AI" />
    </a>
  );
}

function LanguageToggle({ lang, setLang, t }) {
  const switchLanguage = () => setLang(lang === 'es' ? 'en' : 'es');

  return (
    <button
      className="languageToggle"
      type="button"
      onClick={switchLanguage}
      aria-label={t('nav.language')}
      aria-pressed={lang === 'en'}
    >
      <span className={lang === 'es' ? 'active' : ''}>ES</span>
      <span className={lang === 'en' ? 'active' : ''}>EN</span>
    </button>
  );
}

function useScrollEnhancements() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll(
      '.section, .serviceCard, .automationCard, .audienceCard, .packageCard, .methodCard, .caseItem, .contactCard'
    );

    revealItems.forEach((item) => item.classList.add('reveal'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return isScrolled;
}

export default function LandingPage() {
  const isScrolled = useScrollEnhancements();
  const [lang, setLang] = React.useState('es');

  React.useEffect(() => {
    const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (storedLang === 'en' || storedLang === 'es') {
      setLang(storedLang);
    }
  }, []);

  const locale = translations[lang] ?? translations.es;
  const t = React.useCallback((key) => getNestedValue(locale, key) ?? key, [locale]);

  React.useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.title = t('seo.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('seo.description'));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('seo.title'));
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('seo.ogDescription'));
  }, [lang, t]);

  return (
    <main id="top">
      <nav className={`nav${isScrolled ? ' is-scrolled' : ''}`}>
        <Logo t={t} />
        <div className="navLinks" aria-label={t('nav.aria')}>
          <a href="#servicios">{t('nav.services')}</a>
          <a href="#automatizamos">{t('nav.automations')}</a>
          <a href="#para-quien">{t('nav.audience')}</a>
          <a href="#paquetes">{t('nav.packages')}</a>
          <a href="#metodo">{t('nav.method')}</a>
          <a href="#casos">{t('nav.cases')}</a>
          <a href="/precios">Precios</a>
          <a href="#contacto">{t('nav.contact')}</a>
        </div>
        <div className="navActions">
          <LanguageToggle lang={lang} setLang={setLang} t={t} />
          <a className="navCta" href="/login">
            Login
          </a>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow"><Sparkles size={16} /> {t('hero.tagline')}</p>
            <h1 id="hero-title">{t('hero.title')}</h1>
            <p className="heroLead">
              {t('hero.subtitlePrefix')} <strong>MINEKA AI</strong> {t('hero.subtitle')}
            </p>
            <div className="heroActions">
              <a className="btn primary" href="#contacto">{t('hero.primaryCta')} <ArrowRight size={18} /></a>
              <a className="btn ghost" href="/precios">Ver precios</a>
              <a className="btn ghost" href="/login">Entrar</a>
            </div>
            <div className="trustRow" aria-label={t('hero.trustAria')}>
              {t('hero.badges').map((badge) => (
                <span key={badge}><Check size={16} /> {badge}</span>
              ))}
            </div>
          </div>

          <div className="orbitalCard" aria-label={t('hero.visualAria')}>
            <div className="orbitalGlow" />
            <div className="networkLine lineWhatsApp" />
            <div className="networkLine lineDatos" />
            <div className="networkLine lineFlujos" />
            <div className="networkLine lineReportes" />
            <div className="networkLine lineClientes" />
            <div className="networkLine lineAutomatizacion" />
            <div className="core networkCore">
              <Radar className="coreIcon" size={52} />
              <span>{t('hero.core')}</span>
            </div>
            <div className="node nodeWhatsApp"><Bot size={18} /> {t('hero.nodes.whatsapp')}</div>
            <div className="node nodeDatos"><DatabaseZap size={18} /> {t('hero.nodes.data')}</div>
            <div className="node nodeFlujos"><Zap size={18} /> {t('hero.nodes.workflows')}</div>
            <div className="node nodeReportes"><Gauge size={18} /> {t('hero.nodes.reports')}</div>
            <div className="node nodeClientes"><Users size={18} /> {t('hero.nodes.clients')}</div>
            <div className="node nodeAutomatizacion"><Workflow size={18} /> {t('hero.nodes.automation')}</div>
          </div>
        </div>
      </section>

      <section className="problem section">
        <div className="sectionLabel">{t('problem.label')}</div>
        <h2>{t('problem.title')}</h2>
        <p>{t('problem.description')}</p>
      </section>

      <section className="section" id="servicios">
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">{t('services.label')}</div>
            <h2>{t('services.title')}</h2>
          </div>
          <p>{t('services.description')}</p>
        </div>
        <div className="serviceGrid">
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <article className="serviceCard" key={service.key}>
                <div className="iconWrap"><Icon size={22} /></div>
                <h3>{t(`services.items.${service.key}.title`)}</h3>
                <p>{t(`services.items.${service.key}.text`)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="automatizamos" aria-labelledby="automatizamos-title">
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">{t('automations.label')}</div>
            <h2 id="automatizamos-title">{t('automations.title')}</h2>
          </div>
          <p>{t('automations.description')}</p>
        </div>
        <div className="automationGrid">
          {automationItems.map((automation) => {
            const Icon = automation.icon;
            return (
              <article className="automationCard" key={automation.key}>
                <div className="iconWrap"><Icon size={22} /></div>
                <h3>{t(`automations.items.${automation.key}.title`)}</h3>
                <p>{t(`automations.items.${automation.key}.text`)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="para-quien" aria-labelledby="para-quien-title">
        <div className="sectionHeader">
          <div>
            <div className="sectionLabel">{t('audience.label')}</div>
            <h2 id="para-quien-title">{t('audience.title')}</h2>
          </div>
          <p>{t('audience.description')}</p>
        </div>
        <div className="audienceGrid">
          {audienceItems.map((audience) => {
            const Icon = audience.icon;
            return (
              <article className="audienceCard" key={audience.key}>
                <div className="iconWrap"><Icon size={22} /></div>
                <h3>{t(`audience.items.${audience.key}.title`)}</h3>
                <p>{t(`audience.items.${audience.key}.text`)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="paquetes" aria-labelledby="paquetes-title">
        <div className="sectionHeader compact">
          <div>
            <div className="sectionLabel">{t('packages.label')}</div>
            <h2 id="paquetes-title">{t('packages.title')}</h2>
          </div>
          <p>{t('packages.description')}</p>
        </div>
        <div className="packageGrid">
          {packageItems.map((pkgKey) => {
            const pkg = t(`packages.items.${pkgKey}`);
            return (
              <article className="packageCard" key={pkgKey}>
                <div className="packageTag">{pkg.tag}</div>
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                <ul>
                  {pkg.features.map((feature) => (
                    <li key={feature}><Check size={16} /> {feature}</li>
                  ))}
                </ul>
                <a className="btn primary" href="/precios">{pkg.cta}</a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="method section" id="metodo">
        <div className="sectionHeader compact">
          <div>
            <div className="sectionLabel">{t('method.label')}</div>
            <h2>{t('method.title')}</h2>
          </div>
          <p>{t('method.description')}</p>
        </div>
        <div className="methodGrid">
          {methodItems.map((step) => (
            <article className="methodCard" key={step.num}>
              <span>{step.num}</span>
              <h3>{t(`method.steps.${step.key}.title`)}</h3>
              <p>{t(`method.steps.${step.key}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="useCases section" id="casos">
        <div className="useCasesCopy">
          <div className="sectionLabel">{t('cases.label')}</div>
          <h2>{t('cases.title')}</h2>
          <p>{t('cases.description')}</p>
        </div>
        <div className="caseList">
          {useCaseItems.map((item) => (
            <div className="caseItem" key={item}>
              <Check size={18} />
              <div>
                <strong>{t(`cases.items.${item}.title`)}</strong>
                <span>{t(`cases.items.${item}.text`)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contactCard">
          <div>
            <div className="sectionLabel">{t('contact.label')}</div>
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.description')}</p>
            <div className="contactActions">
              <a className="btn primary" href={`mailto:${CONFIG.email}?subject=${encodeURIComponent(t('contact.mailSubject'))}`}>
                <MessageCircle size={18} /> {t('contact.primaryCta')}
              </a>
              {CONFIG.whatsapp && (
                <a className="btn ghost" href={getWhatsAppLink(t('whatsapp.defaultMessage'))} target="_blank" rel="noreferrer">
                  <MessageSquare size={18} /> {t('contact.whatsappCta')}
                </a>
              )}
            </div>
          </div>
          <ContactForm t={t} />
        </div>
      </section>

      <footer className="footer">
        <Logo t={t} />
        <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
      </footer>

      <WhatsAppFloatingButton t={t} />
    </main>
  );
}

function ContactForm({ t }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [interest, setInterest] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formPayload = { name, email, interest, message };
    const contactMessage = buildContactMessage(formPayload, t);
    const wa = getWhatsAppLink(contactMessage);
    setSubmitted(true);
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.href = getMailtoLink({ ...formPayload, message: contactMessage });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setInterest('');
    setMessage('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="formConfirmation" role="status" aria-live="polite">
        <div className="confirmationIcon"><Check size={36} /></div>
        <h3>{t('contact.confirmation.title')}</h3>
        <p>{t('contact.confirmation.text')}</p>
        <button className="btn ghost" type="button" onClick={handleReset}>{t('contact.confirmation.button')}</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        {t('contact.form.name')}
        <input type="text" placeholder={t('contact.form.namePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        {t('contact.form.email')}
        <input type="email" placeholder={t('contact.form.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        {t('contact.form.interest')}
        <select value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="" disabled>{t('contact.form.interestPlaceholder')}</option>
          {formOptions.map((option) => (
            <option key={option}>{t(`contact.form.options.${option}`)}</option>
          ))}
        </select>
      </label>
      <label>
        {t('contact.form.message')}
        <textarea placeholder={t('contact.form.messagePlaceholder')} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button className="btn submit" type="submit">{t('contact.form.submit')}</button>
    </form>
  );
}

function WhatsAppFloatingButton({ t }) {
  const href = getWhatsAppLink(t('whatsapp.defaultMessage'));

  if (!href) return null;

  return (
    <a
      className="whatsappFloat"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsapp.aria')}
    >
      <MessageCircle size={28} />
      <span className="whatsappTooltip">{t('whatsapp.tooltip')}</span>
    </a>
  );
}
