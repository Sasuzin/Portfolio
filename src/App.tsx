import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import type { Mode } from './data/palettes';
import { DEFAULT_MODE, applyTheme, sceneColors } from './lib/theme';
import { cursor, prefersReducedMotion, reveal, scrambleOnView } from './lib/fx';
import type { Terrain } from './lib/terrain';
import Nav from './components/Nav';
import HudBottom from './components/HudBottom';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Projetos from './components/Projetos';
import GitHub from './components/GitHub';
import Trajetoria from './components/Trajetoria';
import Stack from './components/Stack';
import Certificados from './components/Certificados';
import Contato from './components/Contato';

export default function App() {
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const terrain = useRef<Terrain | null>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const syncScene = useCallback((m: Mode) => {
    const t = terrain.current;
    if (!t) return;
    const c = sceneColors(m);
    t.setColor(c.color);
    t.setMode(c.light);
  }, []);

  // Tema → variáveis CSS + cena 3D
  useLayoutEffect(() => {
    applyTheme(mode);
    syncScene(mode);
  }, [mode, syncScene]);

  // Efeitos globais: reveal, scramble e cursor
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const offs = [reveal(root), scrambleOnView(root), cursor(curRef.current)];
    return () => offs.forEach(f => f());
  }, []);

  // Terreno 3D (three.js carregado sob demanda)
  useEffect(() => {
    let dead = false;
    import('./lib/terrain').then(({ sceneTerrain }) => {
      if (dead || !canvasRef.current) return;
      terrain.current = sceneTerrain(canvasRef.current, {
        color: sceneColors(modeRef.current).color,
        intensity: 1,
        still: prefersReducedMotion(),
      });
      syncScene(modeRef.current);
    });
    return () => {
      dead = true;
      terrain.current?.destroy();
      terrain.current = null;
    };
  }, [syncScene]);

  const toggleTheme = useCallback(
    (e?: MouseEvent) => {
      const next: Mode = modeRef.current === 'claro' ? 'escuro' : 'claro';
      const x = e?.clientX ?? innerWidth - 60,
        y = e?.clientY ?? 30;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const run = () => {
        applyTheme(next);
        syncScene(next);
        flushSync(() => setMode(next));
      };
      const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
      if (!doc.startViewTransition || prefersReducedMotion()) return run();
      doc
        .startViewTransition(run)
        .ready.then(() =>
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 750, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
          ),
        )
        .catch(() => {});
    },
    [syncScene],
  );

  return (
    <div ref={rootRef} className="root">
      <div ref={canvasRef} className="bg-canvas" />
      <div className="bg-fade" />
      <div ref={curRef} className="cursor" />

      <div className="hud-frame" aria-hidden="true">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>

      <Nav mode={mode} onToggleTheme={toggleTheme} />
      <HudBottom />

      <main>
        <Hero />
        <Sobre />
        <Projetos />
        <GitHub />
        <Trajetoria />
        <Stack />
        <Certificados />
        <Contato />
      </main>

      {/* modais (projeto e certificado) são renderizados aqui via portal, fora do z-index das seções */}
      <div id="modal-root" />
    </div>
  );
}
