import { memo, useState, type FormEvent } from 'react';
import { useT, type L } from '../i18n';
import SectionHead from './SectionHead';

const EMAIL = 'lfelipepassos1@gmail.com';

interface Channel {
  label: L;
  value: L;
  href: string;
  newTab: boolean;
}

const CHANNELS: Channel[] = [
  { label: { pt: 'WhatsApp', en: 'WhatsApp' }, value: { pt: '+55 11 99216-2667', en: '+55 11 99216-2667' }, href: 'https://wa.me/5511992162667', newTab: true },
  { label: { pt: 'E-mail', en: 'Email' }, value: { pt: EMAIL, en: EMAIL }, href: `mailto:${EMAIL}`, newTab: false },
  { label: { pt: 'LinkedIn', en: 'LinkedIn' }, value: { pt: 'linkedin.com/in/luis-galvão', en: 'linkedin.com/in/luis-galvão' }, href: 'https://linkedin.com/in/luis-galvão', newTab: true },
  { label: { pt: 'GitHub', en: 'GitHub' }, value: { pt: 'github.com/Sasuzin', en: 'github.com/Sasuzin' }, href: 'https://github.com/Sasuzin', newTab: true },
  { label: { pt: 'Currículo', en: 'Résumé' }, value: { pt: 'Baixar PDF', en: 'Download PDF (in Portuguese)' }, href: 'uploads/CV%20Luis%20Felipe%20Galvao.pdf', newTab: true },
];

function Contato() {
  const { t } = useT();
  const [form, setForm] = useState({ nome: '', email: '', msg: '' });
  const [err, setErr] = useState('');

  // Envio sem back-end: abre o app de e-mail do visitante com assunto e texto preenchidos
  const send = (e: FormEvent) => {
    e.preventDefault();
    const nome = form.nome.trim(), email = form.email.trim(), msg = form.msg.trim();
    if (!msg) {
      setErr(t({ pt: 'Escreva uma mensagem antes de enviar.', en: 'Write a message before sending.' }));
      return;
    }
    const subject = t({ pt: 'Contato pelo portfólio', en: 'Portfolio contact' }) + (nome ? ` — ${nome}` : '');
    const body = msg + '\n\n' + [nome, email].filter(Boolean).join(' · ');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contato" className="contato" aria-label={t({ pt: 'Contato', en: 'Contact' })}>
      <SectionHead n="07">{t({ pt: 'CONEXÃO', en: 'CONNECT' })}</SectionHead>
      <h2 data-scramble="">{t({ pt: 'Vamos conversar', en: 'Let’s talk' })}</h2>

      <div className="ct-body">
        <form className="ct-form" onSubmit={send} data-reveal="">
          <div className="ct-head">
            <h3>{t({ pt: 'Mande uma mensagem', en: 'Send me a message' })}</h3>
            <span>{t({ pt: 'Preencha abaixo e eu retorno por e-mail.', en: 'Fill in the form and I’ll get back to you by email.' })}</span>
          </div>
          <label className="ct-field">
            {t({ pt: 'Seu nome', en: 'Your name' })}
            <input
              name="nome"
              autoComplete="name"
              value={form.nome}
              onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              placeholder={t({ pt: 'Como posso te chamar?', en: 'What should I call you?' })}
            />
          </label>
          <label className="ct-field">
            {t({ pt: 'Seu e-mail', en: 'Your email' })}
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder={t({ pt: 'nome@empresa.com', en: 'name@company.com' })}
            />
          </label>
          <label className="ct-field">
            {t({ pt: 'Mensagem', en: 'Message' })}
            <textarea
              name="mensagem"
              rows={5}
              aria-required="true"
              aria-invalid={err ? true : undefined}
              aria-describedby={err ? 'ct-err' : undefined}
              value={form.msg}
              onChange={e => {
                setForm(f => ({ ...f, msg: e.target.value }));
                setErr('');
              }}
              placeholder={t({ pt: 'Conte rapidamente sobre a vaga ou o projeto.', en: 'Tell me briefly about the role or the project.' })}
            />
          </label>
          <span id="ct-err" className="ct-err" role="alert" aria-live="polite" hidden={!err}>
            {err}
          </span>
          <button type="submit" className="ct-send">
            {t({ pt: 'Enviar mensagem →', en: 'Send message →' })}
          </button>
          <span className="ct-note">
            {t({ pt: 'Abre o seu aplicativo de e-mail com a mensagem já escrita.', en: 'Opens your email app with the message already written.' })}
          </span>
        </form>

        <div className="ct-direct" data-reveal="" data-delay="120">
          <span className="ct-direct-lbl">{t({ pt: 'OU FALE DIRETO', en: 'OR REACH ME DIRECTLY' })}</span>
          <div className="ct-list">
            {CHANNELS.map(c => (
              <a
                key={c.href}
                href={c.href}
                className="ct-row"
                {...(c.newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="ct-row-lbl">{t(c.label)}</span>
                <span className="ct-row-val">{t(c.value)}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <span className="foot">© 2026 Luis Felipe Galvão Torrado · build 2026.11</span>
    </section>
  );
}

export default memo(Contato);
