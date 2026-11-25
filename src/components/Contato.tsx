import { memo } from 'react';
import SectionHead from './SectionHead';

function Contato() {
  return (
    <section id="contato" className="contato" aria-label="Contato">
      <SectionHead n="07">CONEXÃO</SectionHead>
      <h2 data-scramble="">Vamos conversar</h2>
      <div data-reveal="" className="term">
        <div className="term-bar">
          <i />
          <i />
          <i />
          <span>contato.sh</span>
        </div>
        <div className="term-body">
          <div>
            <span className="cmd">$ echo $EMAIL</span>
            <a href="mailto:lfelipepassos1@gmail.com" className="term-email">
              lfelipepassos1@gmail.com ↗
            </a>
          </div>
          <div>
            <span className="cmd">$ open linkedin</span>
            <a href="https://linkedin.com/in/luis-galvão" target="_blank" rel="noreferrer">
              linkedin.com/in/luis-galvão ↗
            </a>
          </div>
          <div>
            <span className="cmd">$ open github</span>
            <a href="https://github.com/Sasuzin" target="_blank" rel="noreferrer">
              github.com/Sasuzin ↗
            </a>
          </div>
          <div>
            <span className="cmd">$ cat curriculo.pdf</span>
            <a href="uploads/CV%20Luis%20Felipe%20Galvao.pdf" target="_blank" rel="noreferrer">
              baixar currículo ↗
            </a>
          </div>
          <div>
            <span className="cmd">$ call</span>
            <a href="tel:+5511992162667">+55 11 99216-2667</a>
          </div>
        </div>
      </div>
      <span className="foot">© 2026 Luis Felipe Galvão Torrado · build 2026.11</span>
    </section>
  );
}

export default memo(Contato);
