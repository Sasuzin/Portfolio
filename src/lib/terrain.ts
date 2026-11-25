/* Modelo C — terreno de dados em ondas (sceneTerrain de referencia/portfolio-fx.js) */
import * as THREE from 'three';

// A referência usa three r128, sem gerenciamento de cor: as cores hex entram no shader como estão.
THREE.ColorManagement.enabled = false;

export interface Terrain {
  setColor(hex: string): void;
  setIntensity(v: number): void;
  setMode(light: boolean): void;
  destroy(): void;
}

interface Options {
  color?: string;
  intensity?: number;
  /** prefers-reduced-motion: renderiza um quadro estático, sem animação */
  still?: boolean;
}

const circleFrag = (body: string) =>
  `uniform vec3 uCol;varying float vA;varying float vD;void main(){float l=length(gl_PointCoord-.5);if(l>.5)discard;float a=smoothstep(.5,.12,l);${body}}`;

export function sceneTerrain(host: HTMLElement, o: Options = {}): Terrain | null {
  // Celular/tablet: menos pontos e resolução limitada para manter 60fps e poupar bateria.
  // O tamanho do ponto acompanha o dpr, então o visual em CSS px fica o mesmo.
  const small = Math.min(innerWidth, innerHeight) < 700 || matchMedia('(pointer: coarse)').matches;

  let r: THREE.WebGLRenderer;
  try {
    r = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: small ? 'low-power' : 'default' });
  } catch {
    return null; // sem WebGL: fica só o fundo liso
  }
  r.outputColorSpace = THREE.LinearSRGBColorSpace;
  const dpr = Math.min(devicePixelRatio, small ? 1.5 : 2);
  r.setPixelRatio(dpr);
  host.appendChild(r.domElement);
  r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
  const pg = small ? new THREE.PlaneGeometry(70, 90, 128, 166) : new THREE.PlaneGeometry(70, 90, 170, 220);
  pg.rotateX(-Math.PI / 2);

  const U = {
    uBase: { value: new THREE.Color(0.32, 0.36, 0.42) },
    uAl: { value: 0.95 },
    uT: { value: 0 },
    uAmp: { value: 1 },
    uM: { value: new THREE.Vector2(0, 0) },
    uCol: { value: new THREE.Color(o.color || '#4C8FE0') },
    uSize: { value: 1.8 * dpr },
    // ajustes do modo claro (no escuro ficam 1 e 2, idênticos à referência)
    uSzK: { value: 1 },
    uPow: { value: 2 },
  };

  const tm = new THREE.ShaderMaterial({
    uniforms: U,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `uniform float uT;uniform float uAmp;uniform vec2 uM;uniform float uSize;uniform float uSzK;varying float vA;varying float vD;void main(){vec3 p=position;float h=sin(p.x*.32+uT)*.55+cos(p.z*.26+uT*.7)*.55+sin((p.x+p.z)*.14+uT*.45)*.9;float md=length(p.xz-uM);h+=exp(-md*md*.05)*1.8*sin(md*1.3-uT*3.2);p.y=h*uAmp;vD=h;vec4 mv=modelViewMatrix*vec4(p,1.);vA=clamp(1.-(-mv.z)/42.,0.,1.);gl_PointSize=uSize*uSzK*(9./-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:
      `uniform vec3 uBase;uniform float uAl;uniform float uPow;` +
      circleFrag(`vec3 c=mix(uBase,uCol,smoothstep(-.4,1.6,vD));gl_FragColor=vec4(c,a*pow(vA,uPow)*uAl);`),
  });
  const points = new THREE.Points(pg, tm);
  scene.add(points);

  let mx = 0,
    my = 0,
    tx = 0,
    ty = 0,
    raf = 0,
    inten = o.intensity ?? 1;
  const t0 = performance.now();
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  const ndc = new THREE.Vector2();
  const tmp = new THREE.Vector2();

  const mv = (e: PointerEvent) => {
    tx = (e.clientX / innerWidth) * 2 - 1;
    ty = (e.clientY / innerHeight) * 2 - 1;
  };

  const frame = (animate: boolean) => {
    if (animate) {
      U.uT.value = ((performance.now() - t0) / 1000) * (0.4 + inten * 0.6);
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
    }
    U.uAmp.value = 0.5 + inten * 0.5;
    const H = document.documentElement.scrollHeight - innerHeight;
    const p = animate && H > 0 ? scrollY / H : 0;
    cam.position.set(mx * 1.5, 3.2 - my * 0.6 + p * 1.5, 26 - p * 46);
    cam.lookAt(mx * 4, -my * 0.5, cam.position.z - 14);
    if (animate) {
      ndc.set(tx, -ty);
      ray.setFromCamera(ndc, cam);
      if (ray.ray.intersectPlane(plane, hit)) U.uM.value.lerp(tmp.set(hit.x, hit.z), 0.12);
    }
    r.render(scene, cam);
  };

  const still = !!o.still;
  const rs = () => {
    const w = host.clientWidth || innerWidth,
      h = host.clientHeight || innerHeight;
    r.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    if (still) frame(false);
  };
  rs();
  addEventListener('resize', rs);

  if (still) {
    frame(false);
  } else {
    addEventListener('pointermove', mv);
    const loop = () => {
      frame(true);
      raf = requestAnimationFrame(loop);
    };
    loop();
  }

  return {
    setColor: h => {
      U.uCol.value.set(h);
      if (still) frame(false);
    },
    setIntensity: v => {
      inten = v;
    },
    setMode(light) {
      tm.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      tm.needsUpdate = true;
      // claro: pontos em slate mais escuro, opacos, maiores e com fade de distância mais suave,
      // para terem contraste sobre o fundo claro (a referência usava cinza 62–74% e sumia)
      U.uBase.value.setRGB(...((light ? [0.36, 0.43, 0.54] : [0.32, 0.36, 0.42]) as [number, number, number]));
      U.uAl.value = light ? 1 : 0.95;
      U.uSzK.value = light ? 1.35 : 1;
      U.uPow.value = light ? 1.4 : 2;
      if (still) frame(false);
    },
    destroy() {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', mv);
      removeEventListener('resize', rs);
      pg.dispose();
      tm.dispose();
      r.dispose();
      r.domElement.remove();
    },
  };
}
