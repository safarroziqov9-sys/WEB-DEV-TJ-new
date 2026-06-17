import { useEffect, useRef, useState, createContext, useContext } from "react";
import type { FormEvent } from "react";
import * as THREE from "three";
import { translations, languages, type Lang } from "./translations";

/* ================================================================
   3D BACKGROUND — Tech Solar System
================================================================ */
function useBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.2, 24);

    const disposableG: THREE.BufferGeometry[] = [];
    const disposableM: THREE.Material[] = [];
    const disposableT: THREE.Texture[] = [];

    const addG = <T extends THREE.BufferGeometry>(g: T) => { disposableG.push(g); return g; };
    const addM = <T extends THREE.Material>(m: T) => { disposableM.push(m); return m; };

    const makeLabel = (label: string, from: string, to: string) => {
      const c = document.createElement("canvas");
      c.width = 512; c.height = 256;
      const ctx = c.getContext("2d");
      if (!ctx) return null;
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, from); grad.addColorStop(1, to);
      ctx.fillStyle = grad;
      const rr = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      };
      rr(34, 46, 444, 164, 40); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 3;
      rr(34, 46, 444, 164, 40); ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      rr(62, 74, 108, 108, 26); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = "900 56px Orbitron, Arial, sans-serif";
      ctx.fillText(label.slice(0, 2).toUpperCase(), 116, 130);
      ctx.textAlign = "left";
      ctx.font = "800 40px Orbitron, Arial, sans-serif";
      ctx.fillText(label.toUpperCase(), 196, 118);
      ctx.font = "600 18px Inter, Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.fillText("WEB DEV TJ", 198, 156);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      disposableT.push(tex);
      return tex;
    };

    // Stars
    const STAR_COUNT = 2400;
    const starGeo = addG(new THREE.BufferGeometry());
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 95 - 25;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = addM(new THREE.PointsMaterial({
      color: 0xffffff, size: 0.065, transparent: true, opacity: 0.9, sizeAttenuation: true,
    }));
    scene.add(new THREE.Points(starGeo, starMat));

    // Sun
    const sunGeo = addG(new THREE.SphereGeometry(2.15, 64, 64));
    const sunMat = addM(new THREE.MeshBasicMaterial({ color: 0xffb84d }));
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const sunGlowGeo = addG(new THREE.SphereGeometry(3.2, 64, 64));
    const sunGlowMat = addM(new THREE.MeshBasicMaterial({
      color: 0xff6b00, transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    scene.add(new THREE.Mesh(sunGlowGeo, sunGlowMat));

    const coreGlowGeo = addG(new THREE.SphereGeometry(4.8, 64, 64));
    const coreGlowMat = addM(new THREE.MeshBasicMaterial({
      color: 0xff2d95, transparent: true, opacity: 0.08,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    scene.add(new THREE.Mesh(coreGlowGeo, coreGlowMat));

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const sunLight = new THREE.PointLight(0xffa733, 4.2, 80);
    scene.add(sunLight);

    // Orbits & labels
    const orbitRoot = new THREE.Group();
    scene.add(orbitRoot);

    const orbitConfigs = [
      { label: "TG", name: "TELEGRAM", radius: 5.0, size: 1.05, speed: 0.48, color: 0x2aabee, from: "#00f0ff", to: "#2aabee", phase: 0.2 },
      { label: "VS", name: "VS CODE", radius: 6.6, size: 1.05, speed: -0.38, color: 0x007acc, from: "#007acc", to: "#00f0ff", phase: 1.1 },
      { label: "HT", name: "HTML", radius: 8.2, size: 1.0, speed: 0.32, color: 0xff6b35, from: "#ff6b35", to: "#ffbe0b", phase: 2.2 },
      { label: "CS", name: "CSS", radius: 9.7, size: 1.0, speed: -0.28, color: 0x3a86ff, from: "#3a86ff", to: "#00f0ff", phase: 3.0 },
      { label: "JS", name: "JS", radius: 11.2, size: 1.0, speed: 0.24, color: 0xffd60a, from: "#ffbe0b", to: "#ff006e", phase: 3.7 },
      { label: "AI", name: "AI", radius: 12.7, size: 1.05, speed: -0.2, color: 0xa855f7, from: "#8338ec", to: "#ff006e", phase: 4.5 },
      { label: "NT", name: "INTERNET", radius: 14.2, size: 1.05, speed: 0.18, color: 0x00ff88, from: "#00f0ff", to: "#00ff88", phase: 5.2 },
      { label: "PC", name: "COMPUTER", radius: 15.8, size: 1.15, speed: -0.16, color: 0xffffff, from: "#151a2f", to: "#00f0ff", phase: 5.9 },
    ];

    interface OI { group: THREE.Group; object: THREE.Group; radius: number; speed: number; phase: number; tilt: number }
    const orbitItems: OI[] = [];
    orbitConfigs.forEach((cfg, i) => {
      const oG = addG(new THREE.TorusGeometry(cfg.radius, 0.012, 10, 180));
      const oM = addM(new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0x8338ec, transparent: true, opacity: 0.12,
      }));
      const orbit = new THREE.Mesh(oG, oM);
      orbit.rotation.x = Math.PI / 2;
      orbitRoot.add(orbit);

      const group = new THREE.Group();
      orbitRoot.add(group);

      const obj = new THREE.Group();
      const pGeo = addG(new THREE.SphereGeometry(0.28 + cfg.size * 0.08, 32, 32));
      const pMat = addM(new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.95 }));
      obj.add(new THREE.Mesh(pGeo, pMat));

      const tex = makeLabelTexture(cfg.name, cfg.from, cfg.to);
      if (tex) {
        const sM = addM(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.95, depthWrite: false }));
        const sprite = new THREE.Sprite(sM);
        sprite.scale.set(cfg.size * 2.8, cfg.size * 1.4, 1);
        sprite.position.y = 0.86;
        obj.add(sprite);
      }

      if (cfg.label === "PC") {
        const base = new THREE.Mesh(
          addG(new THREE.BoxGeometry(0.95, 0.08, 0.62)),
          addM(new THREE.MeshBasicMaterial({ color: 0x111827 })),
        );
        const screen = new THREE.Mesh(
          addG(new THREE.BoxGeometry(0.9, 0.58, 0.05)),
          addM(new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.72 })),
        );
        screen.position.set(0, 0.42, -0.28);
        screen.rotation.x = -0.72;
        obj.add(base); obj.add(screen);
      }

      orbitItems.push({ group, object: obj, radius: cfg.radius, speed: cfg.speed, phase: cfg.phase, tilt: i * 0.18 });
      group.add(obj);
    });

    function makeLabelTexture(name: string, from: string, to: string) {
      return makeLabel(name, from, to);
    }

    // Flying code bits
    const codeBits: THREE.Mesh[] = [];
    const cbGeo = addG(new THREE.BoxGeometry(0.9, 0.16, 0.02));
    for (let i = 0; i < 36; i++) {
      const mat = addM(new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xff006e, transparent: true, opacity: 0.35,
      }));
      const bit = new THREE.Mesh(cbGeo, mat);
      bit.position.set((Math.random() - 0.5) * 42, (Math.random() - 0.5) * 26, (Math.random() - 0.5) * 32 - 10);
      bit.rotation.set(Math.random(), Math.random(), Math.random());
      codeBits.push(bit); scene.add(bit);
    }

    // AI wireframe sphere
    const aiGeo = addG(new THREE.IcosahedronGeometry(5.5, 2));
    const aiMat = addM(new THREE.MeshBasicMaterial({
      color: 0x8338ec, wireframe: true, transparent: true, opacity: 0.08,
    }));
    const aiSphere = new THREE.Mesh(aiGeo, aiMat);
    aiSphere.position.set(12, -5, -12);
    scene.add(aiSphere);

    // Events
    let scrollPos = window.scrollY;
    let mouseX = 0, mouseY = 0;
    const onScroll = () => { scrollPos = window.scrollY; };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      const dh = document.body.scrollHeight - window.innerHeight;
      const scrollNorm = dh > 0 ? scrollPos / dh : 0;

      camera.position.x += (mouseX * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (1.2 + mouseY * 1.5 - camera.position.y) * 0.04;
      camera.position.z = 24 - scrollNorm * 3.5;
      camera.lookAt(0, 0, 0);

      sun.rotation.y = t * 0.24; sun.rotation.x = t * 0.08;
      orbitRoot.rotation.y = Math.sin(t * 0.08) * 0.08;
      orbitRoot.rotation.x = -0.18 + Math.sin(t * 0.06) * 0.04;

      orbitItems.forEach((it) => {
        const ang = t * it.speed + it.phase;
        it.object.position.set(Math.cos(ang) * it.radius, Math.sin(ang + it.tilt) * 0.85, Math.sin(ang) * it.radius * 0.55);
        it.object.rotation.y = -ang + Math.PI / 2;
        it.object.rotation.x = Math.sin(t + it.phase) * 0.12;
      });

      codeBits.forEach((b, i) => {
        b.rotation.x += 0.002 + i * 0.00002;
        b.rotation.y += 0.004;
        b.position.y += Math.sin(t * 0.7 + i) * 0.003;
      });

      aiSphere.rotation.x = t * 0.08; aiSphere.rotation.y = t * 0.12;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      disposableT.forEach((tx) => tx.dispose());
      disposableM.forEach((m) => m.dispose());
      disposableG.forEach((g) => g.dispose());
    };
  }, []);
  return canvasRef;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12, rootMargin: "-40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ================================================================
   CONTEXT
================================================================ */
interface AppCtx {
  t: typeof translations[Lang];
  lang: Lang;
  setLang: (l: Lang) => void;
}
const AppContext = createContext<AppCtx | null>(null);
const useT = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext missing");
  return ctx;
};

/* ================================================================
   APP
================================================================ */
export default function App() {
  const canvasRef = useBackground3D();
  useReveal();

  const [lang, setLang] = useState<Lang>("tg");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [modal, setModal] = useState<null | "websites" | "bots" | "portfolio">(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    let p = 0;
    const id = window.setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) { p = 100; window.clearInterval(id); window.setTimeout(() => setLoaderDone(true), 450); }
      setLoaderProgress(p);
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "skills", "services", "portfolio", "why", "contact"];
    const h = () => {
      const pos = window.scrollY + window.innerHeight * 0.36;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id); break;
        }
      }
    };
    window.addEventListener("scroll", h, { passive: true }); h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openModal = (type: "websites" | "bots" | "portfolio") => {
    setModal(type);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => { setModal(null); document.body.style.overflow = ""; };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSending(true);
    const txt = `Салом! Ман — ${form.name}\nТелефон: ${form.phone}\n\nПаём:\n${form.message}`;
    window.setTimeout(() => {
      window.open(`https://t.me/+992903030497?text=${encodeURIComponent(txt)}`, "_blank");
      setSending(false);
      setForm({ name: "", phone: "", message: "" });
    }, 700);
  };

  const navLinks = [
    { id: "about", label: t.navAbout },
    { id: "skills", label: t.navSkills },
    { id: "services", label: t.navServices },
    { id: "portfolio", label: t.navPortfolio },
    { id: "why", label: t.navWhy },
    { id: "contact", label: t.navContact },
  ];

  const ctxValue: AppCtx = { t, lang, setLang };

  return (
    <AppContext.Provider value={ctxValue}>
      <AppContent
        canvasRef={canvasRef}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeSection={activeSection}
        modal={modal}
        loaderDone={loaderDone}
        loaderProgress={loaderProgress}
        form={form}
        setForm={setForm}
        sending={sending}
        scrollTo={scrollTo}
        openModal={openModal}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        navLinks={navLinks}
      />
    </AppContext.Provider>
  );
}

/* ================================================================
   UI (child that consumes context)
================================================================ */
interface ContentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  scrolled: boolean; mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  activeSection: string;
  modal: null | "websites" | "bots" | "portfolio";
  loaderDone: boolean; loaderProgress: number;
  form: { name: string; phone: string; message: string };
  setForm: (v: { name: string; phone: string; message: string }) => void;
  sending: boolean;
  scrollTo: (id: string) => void;
  openModal: (type: "websites" | "bots" | "portfolio") => void;
  closeModal: () => void;
  handleSubmit: (ev: FormEvent<HTMLFormElement>) => void;
  navLinks: { id: string; label: string }[];
}

function AppContent(p: ContentProps) {
  const { t } = useT();
  const { setLang, lang } = useT() as unknown as { setLang: (l: Lang) => void; lang: Lang };
  const skills = t.skills;
  const why = t.whyItems;
  const feats = t.feats;

  return (
    <>
      <div className={p.loaderDone ? "loader hidden" : "loader"}>
        <div className="loader-cube">
          <div className="loader-face" />
          <div className="loader-face" />
          <div className="loader-face" />
          <div className="loader-face" />
          <div className="loader-face" />
          <div className="loader-face" />
        </div>
        <div className="loader-bar"><div className="loader-fill" style={{ width: p.loaderProgress + "%" }} /></div>
        <div className="loader-text">WEB DEV TJ</div>
      </div>

      <canvas ref={p.canvasRef} id="bg-canvas" />
      <div className="bg-vignette" />

      {/* NAVBAR */}
      <nav className={p.scrolled ? "navbar scrolled" : "navbar"}>
        <div className="nav-inner">
          <div className="logo" onClick={() => p.scrollTo("home")} role="button" tabIndex={0}>
            <span className="logo-dot" />
            <span>WEB DEV <span className="gradient-text">TJ</span></span>
          </div>

          <div className="nav-menu">
            {p.navLinks.map((l) => (
              <button key={l.id} type="button"
                className={p.activeSection === l.id ? "nav-link active" : "nav-link"}
                onClick={() => p.scrollTo(l.id)}>{l.label}</button>
            ))}
          </div>

          <div className="nav-right">
            <div className="lang-switch">
              {languages.map((l) => (
                <button key={l.code} type="button"
                  className={lang === l.code ? "lang-btn active" : "lang-btn"}
                  onClick={() => setLang(l.code)}>
                  <span className="lang-flag">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
            <button type="button" className="btn btn-primary nav-cta" onClick={() => p.scrollTo("contact")}>
              {t.navCta}
            </button>
            <button type="button" className={p.mobileOpen ? "burger open" : "burger"} onClick={() => p.setMobileOpen(!p.mobileOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={p.mobileOpen ? "mobile-menu open" : "mobile-menu"}>
        {p.navLinks.map((l) => (
          <button key={l.id} type="button" className="mobile-link" onClick={() => p.scrollTo(l.id)}>{l.label}</button>
        ))}
        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem" }}>
          {languages.map((l) => (
            <button key={l.code} type="button"
              className={lang === l.code ? "mobile-link" : "mobile-link"}
              style={{ flex: 1, textAlign: "center", borderColor: lang === l.code ? "rgba(0,240,255,0.4)" : undefined, color: lang === l.code ? "var(--accent)" : undefined }}
              onClick={() => setLang(l.code)}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. HERO */}
      <section id="home" className="section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="reveal"><span className="section-label">{t.heroBadge}</span></div>
              <h1 className="hero-title reveal">
                WEB DEV TJ<br />
                <span className="gradient-text">{t.cardName}</span>
              </h1>
              <p className="hero-sub reveal">FULL-STACK DEVELOPER · WEBSITES · TELEGRAM BOTS</p>
              <p className="hero-desc reveal">{t.heroDesc}</p>
              <div className="hero-cta reveal">
                <button type="button" className="btn btn-primary" onClick={() => p.scrollTo("portfolio")}>{t.heroCtaPrimary}</button>
                <button type="button" className="btn btn-outline" onClick={() => p.scrollTo("contact")}>{t.heroCtaSecondary}</button>
              </div>
              <div className="hero-stats reveal">
                <div><div className="hstat-num">50+</div><div className="hstat-label">{t.hstatProjects}</div></div>
                <div><div className="hstat-num">3+</div><div className="hstat-label">{t.hstatYears}</div></div>
                <div><div className="hstat-num">24/7</div><div className="hstat-label">{t.hstatAccess}</div></div>
              </div>
            </div>
            <div className="reveal">
              <div className="hero-visual">
                <div className="chip chip-1">
                  <div className="chip-ic">⚡</div>
                  <div><div className="chip-label">{t.chipSpeedLabel}</div><div className="chip-val">{t.chipSpeedVal}</div></div>
                </div>
                <div className="chip chip-2">
                  <div className="chip-ic">★</div>
                  <div><div className="chip-label">{t.chipQualityLabel}</div><div className="chip-val">{t.chipQualityVal}</div></div>
                </div>
                <div className="hero-card">
                  <div className="avatar-ring"><div className="avatar-core">RA</div></div>
                  <div className="card-name">{t.cardName}</div>
                  <div className="card-role">{t.cardRole}</div>
                  <div className="card-tags">
                    <span className="tag">Python</span>
                    <span className="tag">JS</span>
                    <span className="tag">HTML</span>
                    <span className="tag">CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">{t.aboutLabel}</span>
            <h2 className="section-title">{t.aboutHeading}</h2>
          </div>
          <div className="about-grid">
            <div className="reveal">
              <div className="about-visual">
                <div className="blob blob-1" /><div className="blob blob-2" />
                <div className="about-card">
                  <div className="about-card-glow" />
                  <div className="ac-inner">
                    <div className="avatar-ring"><div className="avatar-core">RA</div></div>
                    <div className="card-name">{t.cardName}</div>
                    <div className="card-role">Full-Stack · TJ</div>
                    <div className="card-tags">
                      <span className="tag">Python</span>
                      <span className="tag">JS</span>
                      <span className="tag">Telegram</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-text reveal">
              <span className="about-greeting">{t.aboutGreeting}</span>
              <h3 className="about-heading">{t.aboutHeading}</h3>
              <p className="about-bio">{t.aboutBio}</p>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div><div className="info-label">{t.infoLocation}</div><div className="info-value">{t.infoLocVal}</div></div>
                </div>
                <div className="info-item">
                  <div className="info-icon">💼</div>
                  <div><div className="info-label">{t.infoSpec}</div><div className="info-value">{t.infoSpecVal}</div></div>
                </div>
                <div className="info-item">
                  <div className="info-icon">⏱️</div>
                  <div><div className="info-label">{t.infoExp}</div><div className="info-value">{t.infoExpVal}</div></div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🌐</div>
                  <div><div className="info-label">{t.infoLang}</div><div className="info-value">{t.infoLangVal}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">{t.skillsLabel}</span>
            <h2 className="section-title">{t.skillsTitle}</h2>
            <p className="section-desc">{t.skillsDesc}</p>
          </div>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <div key={s.name} className="skill-card reveal" style={{ transitionDelay: i * 60 + "ms" }}>
                <div className={s.name === "Python" ? "skill-icon" :
                  s.name === "JavaScript" ? "skill-icon c2" :
                  s.name === "HTML5" ? "skill-icon c3" :
                  s.name === "CSS3" ? "skill-icon c4" :
                  s.name === "Telegram API" ? "skill-icon c5" : "skill-icon c6"}>
                  {s.name.slice(0, 2)}
                </div>
                <div className="skill-name">{s.name}</div>
                <div className="skill-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">{t.servicesLabel}</span>
            <h2 className="section-title">{t.servicesTitle}</h2>
            <p className="section-desc">{t.servicesDesc}</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal" onClick={() => p.openModal("websites")}>
              <div className="service-body">
                <div className="service-icon-wrap"><div className="service-icon">🌐</div></div>
                <div className="service-title">{t.svWeb}</div>
                <div className="service-desc">{t.svWebDesc}</div>
                <div className="service-feats">
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.landing}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.corp}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.shop}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.portf}</div>
                </div>
                <div className="service-more">{t.moreBtn}</div>
              </div>
            </div>
            <div className="service-card reveal" onClick={() => p.openModal("bots")}>
              <div className="service-body">
                <div className="service-icon-wrap"><div className="service-icon">🤖</div></div>
                <div className="service-title">{t.svBot}</div>
                <div className="service-desc">{t.svBotDesc}</div>
                <div className="service-feats">
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.crm}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.orders}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.news}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.api}</div>
                </div>
                <div className="service-more">{t.moreBtn}</div>
              </div>
            </div>
            <div className="service-card reveal">
              <div className="service-body">
                <div className="service-icon-wrap"><div className="service-icon">⚙️</div></div>
                <div className="service-title">{t.svBack}</div>
                <div className="service-desc">{t.svBackDesc}</div>
                <div className="service-feats">
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.rest}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.db}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.auto}</div>
                </div>
              </div>
            </div>
            <div className="service-card reveal">
              <div className="service-body">
                <div className="service-icon-wrap"><div className="service-icon">📱</div></div>
                <div className="service-title">{t.svMob}</div>
                <div className="service-desc">{t.svMobDesc}</div>
                <div className="service-feats">
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.resp}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.speed}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.ux}</div>
                </div>
              </div>
            </div>
            <div className="service-card reveal">
              <div className="service-body">
                <div className="service-icon-wrap"><div className="service-icon">🔗</div></div>
                <div className="service-title">{t.svInt}</div>
                <div className="service-desc">{t.svIntDesc}</div>
                <div className="service-feats">
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.tw}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.pay}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.extApi}</div>
                </div>
              </div>
            </div>
            <div className="service-card reveal">
              <div className="service-body">
                <div className="service-icon-wrap"><div className="service-icon">🛠️</div></div>
                <div className="service-title">{t.svSup}</div>
                <div className="service-desc">{t.svSupDesc}</div>
                <div className="service-feats">
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.sup24}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.upd}</div>
                  <div className="service-feat"><span className="feat-check">✓</span>{feats.backup}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">{t.portfolioLabel}</span>
            <h2 className="section-title">{t.portfolioTitle}</h2>
            <p className="section-desc">{t.portfolioDesc}</p>
          </div>
          <div className="portfolio-grid">
            <div className="pf-card reveal" onClick={() => window.open("https://remonttj.netlify.app", "_blank")}>
              <img src="/images/websites-showcase.jpg" alt="" />
              <div className="pf-arrow">↗</div>
              <div className="pf-overlay">
                <div className="pf-title">{t.pfCommercial}</div>
                <div className="pf-desc">{t.pfCommercialDesc}</div>
                <div className="pf-tags"><span className="pf-tag">HTML / CSS / JS</span><span className="pf-tag">{t.pfLive}</span></div>
              </div>
            </div>
            <div className="pf-card reveal" onClick={() => window.open("https://t.me/tajik_construction_crm_bot", "_blank")}>
              <img src="/images/telegram-bot.jpg" alt="" />
              <div className="pf-arrow">↗</div>
              <div className="pf-overlay">
                <div className="pf-title">{t.pfBotCrm}</div>
                <div className="pf-desc" style={{ color: "#ff5fa8" }}>{t.pfBotCrmDesc}</div>
                <div className="pf-tags"><span className="pf-tag">Python</span><span className="pf-tag">Telegram Bot</span></div>
              </div>
            </div>
            <div className="pf-card reveal" onClick={() => p.openModal("portfolio")}>
              <img src="/images/portfolio-modern.jpg" alt="" />
              <div className="pf-arrow">↗</div>
              <div className="pf-overlay">
                <div className="pf-title">{t.pfLanding}</div>
                <div className="pf-desc">{t.pfLandingDesc}</div>
                <div className="pf-tags"><span className="pf-tag">{t.pf3d}</span><span className="pf-tag">{t.pfResp}</span></div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="https://remonttj.netlify.app" target="_blank" rel="noreferrer" className="btn btn-outline">{t.pfViewBtn}</a>
          </div>
        </div>
      </section>

      {/* 6. WHY */}
      <section id="why" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">{t.whyLabel}</span>
            <h2 className="section-title">{t.whyTitle}</h2>
          </div>
          <div className="why-grid">
            {why.map((w, i) => {
              const icons: string[] = ["💬", "⏰", "🎯", "🛡️"];
              return (
                <div key={w.title} className="why-card reveal" style={{ transitionDelay: i * 70 + "ms" }}>
                  <div className="why-icon">{icons[i] || (w.icon ?? "★")}</div>
                  <div className="why-title">{w.title}</div>
                  <div className="why-desc">{w.desc}</div>
                </div>
              );
            })}
          </div>
          <div className="stats-wrap reveal">
            <div className="stats-grid">
              <div><div className="stat-big">50+</div><div className="stat-cap">{t.sstatProjects}</div></div>
              <div><div className="stat-big">98%</div><div className="stat-cap">{t.sstatSatisfaction}</div></div>
              <div><div className="stat-big">3+</div><div className="stat-cap">{t.sstatExperience}</div></div>
              <div><div className="stat-big">24/7</div><div className="stat-cap">{t.sstatSupport}</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">{t.contactLabel}</span>
            <h2 className="section-title">{t.contactTitle}</h2>
            <p className="section-desc">{t.contactDesc}</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card reveal">
              <div className="contact-title">{t.contactInfoTitle}</div>
              <p className="contact-note">{t.contactNote}</p>
              <a href="tel:+992078147007" className="cmethod">
                <div className="cicon">📱</div>
                <div><div className="cmeta">{t.contactPhone}</div><div className="cvalue">+992 078 147 007</div></div>
              </a>
              <a href="https://wa.me/992078147007" target="_blank" rel="noreferrer" className="cmethod">
                <div className="cicon">💬</div>
                <div><div className="cmeta">{t.contactWhatsApp}</div><div className="cvalue">+992 078 147 007</div></div>
              </a>
              <a href="https://t.me/+992903030497" target="_blank" rel="noreferrer" className="cmethod">
                <div className="cicon">✈️</div>
                <div><div className="cmeta">{t.contactTelegram}</div><div className="cvalue">+992 903 030 497</div></div>
              </a>
              <a href="https://t.me/tajik_construction_crm_bot" target="_blank" rel="noreferrer" className="cmethod">
                <div className="cicon">🤖</div>
                <div><div className="cmeta">{t.contactBot}</div><div className="cvalue">@tajik_construction_crm_bot</div></div>
              </a>
            </div>
            <form className="contact-card reveal" onSubmit={p.handleSubmit}>
              <div className="form-grid">
                <div>
                  <label className="field-label" htmlFor="fn">{t.fieldName}</label>
                  <input id="fn" placeholder={t.fieldNamePh} value={p.form.name} onChange={(e) => p.setForm({ ...p.form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="field-label" htmlFor="fp">{t.fieldPhone}</label>
                  <input id="fp" placeholder={t.fieldPhonePh} value={p.form.phone} onChange={(e) => p.setForm({ ...p.form, phone: e.target.value })} required />
                </div>
                <div className="full">
                  <label className="field-label" htmlFor="fm">{t.fieldMsg}</label>
                  <textarea id="fm" placeholder={t.fieldMsgPh} value={p.form.message} onChange={(e) => p.setForm({ ...p.form, message: e.target.value })} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={p.sending}>
                {p.sending ? t.btnSending : t.btnSend}
              </button>
              <p style={{ textAlign: "center", marginTop: "0.9rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{t.formHint}</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">WEB DEV <span className="gradient-text">TJ</span></div>
            <div className="footer-copy">© {new Date().getFullYear()} {t.cardName} · {t.footerAllRights}</div>
          </div>
          <div className="footer-status"><span className="status-dot" />{t.footerStatus}</div>
        </div>
      </footer>

      {/* MODALS */}
      {p.modal && (
        <div className="modal" onClick={p.closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">
                {p.modal === "websites" && t.mWebTitle}
                {p.modal === "bots" && t.mBotTitle}
                {p.modal === "portfolio" && "📁 " + t.portfolioTitle}
              </div>
              <button type="button" className="close-x" onClick={p.closeModal}>×</button>
            </div>
            <div className="modal-body">
              {p.modal === "websites" && <ModalWeb t={t} />}
              {p.modal === "bots" && <ModalBot t={t} />}
              {p.modal === "portfolio" && <ModalPortfolio t={t} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ModalWeb({ t }: { t: typeof translations[Lang] }) {
  return (
    <>
      <div className="modal-hero">
        <div>
          <div className="modal-kicker">{t.mWebKicker}</div>
          <div className="modal-big-title">{t.mWebBig1}<br /><span className="gradient-text">{t.mWebBig2}</span><br />{t.mWebBig3}</div>
          <p className="modal-lead">{t.mWebLead}</p>
        </div>
        <div className="modal-shot">
          <img src="/images/websites-showcase.jpg" alt="" />
          <div className="modal-shot-badge">{t.mWebBadge}</div>
        </div>
      </div>
      <div className="modal-highlight">
        <p>{t.mWebP1}</p>
        <p>{t.mWebP2}</p>
      </div>
      <div className="modal-grid">
        {[0, 1, 2, 3].map((i) => {
          const keys = [
            { t: t.mWebF1T, d: t.mWebF1D, ic: "01" },
            { t: t.mWebF2T, d: t.mWebF2D, ic: "02" },
            { t: t.mWebF3T, d: t.mWebF3D, ic: "03" },
            { t: t.mWebF4T, d: t.mWebF4D, ic: "04" },
          ][i];
          return (
            <div key={i} className="modal-feature">
              <div className="modal-feature-icon">{keys.ic}</div>
              <div><strong>{keys.t}</strong><span>{keys.d}</span></div>
            </div>
          );
        })}
      </div>
      <h4>{t.mWebSubtitle}</h4>
      <p>{t.mWebBuildDesc}</p>
      <p>{t.mWebSample} <a href="https://remonttj.netlify.app" target="_blank" rel="noreferrer" style={{ color: "#00f0ff" }}>remonttj.netlify.app</a></p>
    </>
  );
}

function ModalBot({ t }: { t: typeof translations[Lang] }) {
  return (
    <>
      <div className="modal-hero">
        <div>
          <div className="modal-kicker">{t.mBotKicker}</div>
          <div className="modal-big-title">{t.mBotBig1}<br /><span className="gradient-text">{t.mBotBig2}</span><br />{t.mBotBig3}</div>
          <p className="modal-lead">{t.mBotLead}</p>
        </div>
        <div className="modal-shot">
          <img src="/images/telegram-bot.jpg" alt="" />
          <div className="modal-shot-badge">{t.mBotBadge}</div>
        </div>
      </div>
      <div className="modal-highlight">
        <p>{t.mBotP1}</p>
        <p>{t.mBotP2}</p>
      </div>
      <div className="modal-grid">
        {[
          { t: t.mBotF1T, d: t.mBotF1D, ic: "TG" },
          { t: t.mBotF2T, d: t.mBotF2D, ic: "CRM" },
          { t: t.mBotF3T, d: t.mBotF3D, ic: "API" },
          { t: t.mBotF4T, d: t.mBotF4D, ic: "AI" },
        ].map((k, i) => (
          <div key={i} className="modal-feature">
            <div className="modal-feature-icon">{k.ic}</div>
            <div><strong>{k.t}</strong><span>{k.d}</span></div>
          </div>
        ))}
      </div>
      <p className="modal-warn">{t.mBotWarn}</p>
      <h4>{t.mBotSubtitle}</h4>
      <p>{t.mBotWhyDesc}</p>
    </>
  );
}

function ModalPortfolio({ t }: { t: typeof translations[Lang] }) {
  return (
    <>
      <p>{t.mPortIntro}</p>
      <h4>{t.mPortHeading}</h4>
      <p><strong style={{ color: "#00f0ff" }}>{t.mPortP1T}</strong><br />
        <a href="https://remonttj.netlify.app" target="_blank" rel="noreferrer" style={{ color: "#00f0ff" }}>remonttj.netlify.app</a><br />
        {t.mPortP1D}
      </p>
      <p><strong style={{ color: "#00f0ff" }}>{t.mPortP2T}</strong><br />{t.mPortP2D}</p>
      <p className="modal-warn">{t.mPortWarn}</p>
      <p><strong style={{ color: "#00f0ff" }}>{t.mPortP3T}</strong><br />{t.mPortP3D}</p>
      <p>{t.mPortClosing}</p>
    </>
  );
}
