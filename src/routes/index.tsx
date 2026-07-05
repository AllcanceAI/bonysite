import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import {
  Headphones, Users, Music, Zap, Star, Crown, Globe, Briefcase,
  Speaker, Gem, CheckCircle2, Play, MessageCircle, Instagram, Youtube,
  Menu, X, Lightbulb, Mic2, Disc3, Sparkles, Volume2, Cable, Mail,
} from "lucide-react";
import logoBony from "@/assets/logo-dj-bony.jpg";
import heroDj from "@/assets/hero-dj.jpg";
import evCasaShow from "@/assets/event-casa-show.jpg";
import evBalada from "@/assets/event-balada.jpg";
import evSocial from "@/assets/event-social.jpg";
import evCorp from "@/assets/event-corporativo.jpg";
import evFesta from "@/assets/event-festa.jpg";
import bigNamesBg from "@/assets/big-names-bg.jpg";
import name1 from "@/assets/joel-jota.webp";
import name2 from "@/assets/pablo-marcal.jpg";
import name3 from "@/assets/dr-jose-silva.jpeg";

import djBonyAvatar from "@/assets/dj-bony-avatar.png";
import b2bAvatar from "@/assets/b2b-avatar.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DJ Bony — Som, Energia e Conexão para o seu evento" },
      { name: "description", content: "DJ Bony: +10 anos de experiência, +200 eventos. Som de alto padrão para casas de show, baladas, eventos sociais e corporativos." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { property: "og:title", content: "DJ Bony — Som, Energia e Conexão" },
      { property: "og:description", content: "Transforme seu evento em uma experiência inesquecível." },
      { property: "og:image", content: heroDj },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "5511974144061";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const YOUTUBE_URL = "https://www.youtube.com/channel/UCeE3gptZro1HQuWIQMNF8Cg";
const SPOTIFY_URL = "https://open.spotify.com/artist/2oV7h8ExkMqUsrF4wIZ0Fg?si=PBcMmqbAR1SevkpsylzVTQ";

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Candle = { open: number; close: number; high: number; low: number };

function makeCandle(prevClose: number): Candle {
  const drift = (Math.random() - 0.45) * 22;
  const open = prevClose;
  const close = Math.max(8, Math.min(92, prevClose + drift));
  const wickUp = Math.random() * 10;
  const wickDown = Math.random() * 10;
  const high = Math.min(100, Math.max(open, close) + wickUp);
  const low = Math.max(0, Math.min(open, close) - wickDown);
  return { open, close, high, low };
}

function Equalizer({ className = "" }: { className?: string }) {
  const COUNT = 28;
  const [candles, setCandles] = useState<Candle[]>(() => {
    const arr: Candle[] = [];
    let prev = 50;
    for (let i = 0; i < COUNT; i++) {
      const c = makeCandle(prev);
      arr.push(c);
      prev = c.close;
    }
    return arr;
  });

  useEffect(() => {
    const id = setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const next = makeCandle(last.close);
        return [...prev.slice(1), next];
      });
    }, 650);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`relative flex items-end gap-[2px] sm:gap-[3px] h-10 sm:h-20 rounded-md border border-primary/20 bg-background/40 px-1.5 sm:px-2 py-1 sm:py-2 backdrop-blur ${className}`}
      aria-label="Gráfico de energia ao vivo"
    >
      {/* grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to top, oklch(0.62 0.24 25 / 0.12) 1px, transparent 1px)",
          backgroundSize: "100% 25%",
        }}
      />
      {/* live tag */}
      <div className="pointer-events-none absolute right-2 top-1 flex items-center gap-1 rounded-sm bg-background/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-primary">
        <span className="h-1 w-1 animate-pulse rounded-full bg-primary box-glow" /> LIVE
      </div>

      {candles.map((c, i) => {
        const up = c.close >= c.open;
        const bodyTop = 100 - Math.max(c.open, c.close);
        const bodyHeight = Math.max(2, Math.abs(c.close - c.open));
        const wickTop = 100 - c.high;
        const wickHeight = Math.max(1, c.high - c.low);
        const isLast = i === candles.length - 1;
        return (
          <div key={i} className="relative h-full flex-1 transition-all duration-500 ease-out">
            {/* wick */}
            <div
              className={`absolute left-1/2 w-px -translate-x-1/2 ${up ? "bg-primary" : "bg-primary/60"}`}
              style={{ top: `${wickTop}%`, height: `${wickHeight}%` }}
            />
            {/* body */}
            <div
              className={`absolute left-1/2 w-[70%] -translate-x-1/2 rounded-[1px] transition-all duration-500 ease-out ${
                up
                  ? "bg-primary shadow-[0_0_6px_var(--neon-glow)]"
                  : "bg-background border border-primary/80"
              } ${isLast ? "ring-1 ring-primary/60" : ""}`}
              style={{ top: `${bodyTop}%`, height: `${bodyHeight}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function LaserBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -left-20 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-primary/30 blur-[120px] strobe" />
      <div className="absolute top-1/3 -right-32 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-[140px] strobe" style={{ animationDelay: "0.8s" }} />
      <div className="absolute inset-0 laser-sweep bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon) 1px, transparent 1px), linear-gradient(90deg, var(--neon) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#estrutura", label: "Estrutura" },
    { href: "#videos", label: "Vídeos" },
    { href: "#contato", label: "Contato" },
  ];
  return (
    <header className="relative z-30 flex items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-5">
      <img src={logoBony} alt="DJ Bony" width={160} height={108} className="h-10 w-auto sm:h-12 md:h-14 mix-blend-screen" />
      <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-wider lg:flex xl:gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-bold uppercase leading-tight tracking-wider text-foreground ring-neon md:inline-flex"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Orçamento<br/>via WhatsApp</span>
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full z-40 mx-4 mt-2 rounded-xl border border-border bg-card/95 backdrop-blur p-4 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary/10 hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground box-glow"
              >
                <MessageCircle className="h-4 w-4" /> Orçamento via WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroDj} alt="" width={1280} height={1600} className="h-full w-full object-cover object-right opacity-80 sm:opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 sm:to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <LaserBackdrop />
      <div className="pointer-events-none absolute right-4 top-16 hidden md:block">
        <div className="h-[420px] w-[260px] border-r-2 border-t-2 border-primary box-glow rotate-6" />
      </div>

      <div className="relative z-10 grid gap-10 px-4 pb-16 pt-4 sm:px-6 md:grid-cols-2 md:px-10 md:pb-32 md:pt-10">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 font-display text-4xl italic leading-tight tracking-wide sm:text-5xl sm:tracking-wider md:text-6xl md:tracking-widest"
          >
            A <span className="text-primary">MÚSICA</span> MOVE, <br />
            A <span className="text-primary">ENERGIA</span> CONECTA, <br />
            E A <span className="text-primary">VIBE</span> FICA!
          </motion.p>
          <p className="mt-6 max-w-md text-base text-foreground/85 sm:text-lg md:text-xl">
            Transformo qualquer evento em uma experiência inesquecível com som,
            energia e conexão do início ao fim.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground box-glow transition-transform hover:scale-[1.02] sm:flex-none sm:px-6 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" /> Fazer Orçamento
            </a>
            <a
              href="https://www.youtube.com/watch?v=6XgUTdCdxmc&t=2s"
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card/70 backdrop-blur px-5 py-3 text-xs font-bold uppercase tracking-wider hover:border-primary sm:flex-none sm:px-6 sm:text-sm"
            >
              <Play className="h-4 w-4 text-primary" /> Assistir Vídeo
            </a>
          </div>
          <div className="mt-8 sm:mt-10">
            <Equalizer className="max-w-sm opacity-80" />
          </div>
        </div>

        <div className="relative hidden md:block">
          <span className="absolute bottom-4 right-4 font-script text-5xl text-foreground/95 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
            DJ Bony
          </span>
        </div>
      </div>
    </section>
  );
}




/* ---------- Continuous horizontal slider ---------- */
function MovingSection<T>({
  id,
  title,
  highlight,
  items,
  itemClassName,
  duration = 28,
  reverse = false,
  renderItem,
}: {
  id?: string;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  items: T[];
  itemClassName: string;
  duration?: number;
  reverse?: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    mode: "pending" as "pending" | "drag" | "scroll",
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const loopedItems = [...items, ...items];
  const marqueeStyle = {
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  const finishDrag = (event?: PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    dragRef.current.mode = "pending";
    setIsDragging(false);
    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id={id} className="relative overflow-hidden py-16 md:py-20" data-reference-image="/uploads/colado-1782532800572.png">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-32 w-[90%] max-w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl strobe" />

      <h2 className="relative px-4 text-center font-display text-2xl tracking-wide sm:px-6 sm:text-3xl md:px-10 md:text-5xl">
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </h2>

      <div className="relative mt-8 sm:mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        <div
          ref={viewportRef}
          className={`marquee-viewport ${isDragging ? "is-dragging" : ""}`}
          onPointerDown={(event) => {
            if (!viewportRef.current || event.button !== 0) return;
            dragRef.current = {
              active: true,
              startX: event.clientX,
              startY: event.clientY,
              scrollLeft: viewportRef.current.scrollLeft,
              mode: "pending",
              moved: false,
            };
            setIsDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const viewport = viewportRef.current;
            const drag = dragRef.current;
            if (!viewport || !drag.active) return;

            const dx = event.clientX - drag.startX;
            const dy = event.clientY - drag.startY;

            if (drag.mode === "pending") {
              if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
              if (Math.abs(dy) > Math.abs(dx)) {
                drag.mode = "scroll";
                finishDrag(event);
                return;
              }
              drag.mode = "drag";
            }

            if (drag.mode === "drag") {
              event.preventDefault();
              drag.moved = true;
              viewport.scrollLeft = drag.scrollLeft - dx;
            }
          }}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerLeave={(event) => {
            if (dragRef.current.active && event.pointerType === "mouse") finishDrag(event);
          }}
          onClickCapture={(event) => {
            if (dragRef.current.moved) {
              event.preventDefault();
              event.stopPropagation();
              dragRef.current.moved = false;
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
            style={marqueeStyle}
          >
            {loopedItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`marquee-item ${itemClassName}`}
              >
                {renderItem(item, i % items.length)}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <p className="relative mt-5 px-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground sm:px-6 md:px-10">
        Segure para pausar • arraste para avançar ou voltar
      </p>
    </section>
  );
}

function EventTypes() {
  const events = [
    { icon: Speaker, label: "Casas de Show", img: evCasaShow },
    { icon: Globe, label: "Baladas", img: evBalada },
    { icon: Crown, label: "Eventos Sociais", img: evSocial },
    { icon: Briefcase, label: "Eventos Corporativos", img: evCorp },
    { icon: Users, label: "Festas Particulares", img: evFesta },
  ];
  return (
    <MovingSection
      id="servicos"
      title="PARA TODO TIPO DE"
      highlight="EVENTO"
      items={events}
      itemClassName="w-[76vw] max-w-[300px] sm:w-[300px] lg:w-[320px]"
      duration={24}
      renderItem={(e) => (
        <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary">
          <div className="aspect-[3/4] w-full overflow-hidden">
            <img
              src={e.img}
              alt={e.label}
              loading="lazy"
              width={640}
              height={800}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-background via-background/85 to-transparent px-3 pb-5 pt-16">
            <div className="rounded-full border border-primary bg-background p-3 ring-neon transition-transform group-hover:scale-110">
              <e.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-center text-xs font-bold uppercase tracking-widest">
              {e.label}
            </p>
          </div>
        </div>
      )}
    />
  );
}

function Packages() {
  const pkgs = [
    {
      icon: Music,
      title: "DJ Casa de Show",
      sub: "Tempo de play + cachê",
      price: "R$ 500",
      unit: "/ hora",
      extra: "Deslocamento até 20 km incluso",
      message:
        "Olá Bony! Tenho interesse no pacote *DJ Casa de Show* (R$ 500/hora). Pode me passar disponibilidade e detalhes?",
      features: [
        "Set personalizado por estilo da casa",
        "Mixagem ao vivo e leitura de pista",
        "Pen drive com repertório próprio",
        "Pontualidade e responsabilidade total",
      ],
    },
    {
      icon: Users,
      title: "Social & Corporativo",
      sub: "Casamentos, aniversários, eventos de marca",
      price: "R$ 1.500",
      unit: "/ evento",
      extra: "Até 3 horas de evento",
      message:
        "Olá Bony! Quero contratar o pacote *Social & Corporativo* (R$ 1.500). Pode me ajudar com um orçamento personalizado?",
      features: [
        "Reunião de alinhamento de repertório",
        "Trilha cerimonial + balada",
        "Microfone para cerimonial / brindes",
        "Iluminação cênica básica inclusa",
      ],
    },
    {
      icon: Speaker,
      title: "Pacote com Som — 1 P.A",
      sub: "Até 350 pessoas",
      price: "R$ 3.500",
      unit: "/ evento",
      extra: "Estrutura entregue, montada e operada",
      message:
        "Olá Bony! Tenho interesse no *Pacote com Som — 1 P.A* (R$ 3.500) para até 350 pessoas. Pode me enviar mais detalhes?",
      features: [
        "Sistema de PA profissional",
        "Mesa de som + monitor de palco",
        "Cabeamento e técnico de som",
        "Montagem e desmontagem incluídas",
      ],
    },
    {
      icon: Speaker,
      title: "P.A 500 a 1.000 Pessoas",
      sub: "Eventos médios e festas privadas",
      price: "R$ 7.500",
      unit: "/ evento",
      extra: "Line array + subwoofers",
      message:
        "Olá Bony! Quero um orçamento do pacote *P.A 500 a 1.000 pessoas* (R$ 7.500). Pode me passar disponibilidade?",
      features: [
        "PA dimensionado para o local",
        "Subwoofers para grave encorpado",
        "Iluminação cênica com moving heads",
        "Equipe técnica especializada",
      ],
    },
    {
      icon: Gem,
      title: "Pacote Som Show",
      sub: "Até 5.000 pessoas",
      price: "R$ 35.000",
      unit: "/ evento",
      extra: "Estrutura completa de grande porte",
      premium: true,
      message:
        "Olá Bony! Quero produzir um evento de grande porte com o *Pacote Som Show* (R$ 35.000, até 5.000 pessoas). Pode me chamar para alinhar os detalhes?",
      features: [
        "Line array de alta potência",
        "Palco, iluminação e backline",
        "Equipe técnica completa (som, luz, palco)",
        "Produção dedicada do início ao fim",
        "Atendimento VIP e gerenciamento total",
      ],
    },
  ];


  return (
    <section id="precos" className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-40 w-[90%] max-w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl strobe" />

      <div className="relative mx-auto max-w-6xl text-center">
        <span className="inline-block rounded-full border border-primary/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          Tabela 2026
        </span>
        <h2 className="mt-4 font-display text-3xl tracking-wide sm:text-4xl md:text-6xl">
          SERVIÇOS & <span className="text-primary text-glow">PACOTES</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Estrutura, som e energia sob medida para o tamanho do seu evento.
          Escolha o pacote ideal — todos incluem montagem, operação técnica e
          a presença marcante do DJ Bony do início ao fim.
        </p>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pkgs.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 sm:p-7 ${
              p.premium ? "border-primary ring-neon" : "border-border hover:border-primary/60"
            }`}
          >
            {p.premium && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
                  <Crown className="h-3 w-3" /> Premium
                </span>
              </>
            )}

            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background">
                <p.icon className="h-7 w-7 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-display text-xl tracking-wide sm:text-2xl">
                {p.title}
              </h3>
              {p.sub && (
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {p.sub}
                </p>
              )}
            </div>

            <div className="relative mt-5 flex items-end gap-2 border-y border-border/60 py-4">
              <span className="font-display text-3xl text-primary text-glow sm:text-4xl">
                {p.price}
              </span>
              <span className="pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {p.unit}
              </span>
            </div>
            {p.extra && (
              <p className="relative mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                {p.extra}
              </p>
            )}

            <ul className="relative mt-5 flex flex-1 flex-col gap-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={waLink(p.message)}
              target="_blank"
              rel="noreferrer"
              className={`relative mt-6 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-xs font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] ${
                p.premium
                  ? "bg-primary text-primary-foreground box-glow"
                  : "border border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <MessageCircle className="h-4 w-4" /> Contratar agora
            </a>

          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
        {[
          "Equipamentos de alta qualidade",
          "Monitoramento total",
          "Equipe técnica especializada",
          "Atendimento personalizado",
        ].map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
          </span>
        ))}
      </div>

      <p className="relative mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
        * Valores podem variar conforme distância, duração do evento e estrutura necessária. Solicite um orçamento personalizado.
      </p>
    </section>
  );
}


function BigNames() {
  const names = [
    { label: "JOEL JOTA", img: name1 },
    { label: "PABLO MARÇAL", img: name2 },
    { label: "DR JOSÉ SILVA", img: name3 },
  ];
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-20">
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 md:block">
        <img src={bigNamesBg} alt="" width={1280} height={1280} loading="lazy" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/50 to-background" />
      </div>
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <img src={bigNamesBg} alt="" width={1280} height={1280} loading="lazy" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      <h2 className="relative font-display text-2xl tracking-wide sm:text-3xl md:text-5xl">
        JÁ TRABALHEI COM <br />
        <span className="italic text-foreground/90">GRANDES </span>
        <span className="italic text-primary">NOMES</span>
      </h2>

      <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:w-3/5">
        {names.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="aspect-square overflow-hidden">
              <img src={n.img} alt={n.label} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover object-top" />
            </div>
            <div className="px-3 py-3 text-center text-xs font-bold uppercase tracking-widest">
              {n.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-6">
        <a
          href="#contato"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground hover:border-primary"
        >
          Ver mais momentos
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <Play className="h-3 w-3 text-primary-foreground" />
          </span>
        </a>
      </div>
    </section>
  );
}

function Estrutura() {
  const items = [
    { icon: Speaker, label: "Caixas de Som", desc: "Line Array, sub-woofers e PA para qualquer porte de evento." },
    { icon: Lightbulb, label: "Iluminação Cênica", desc: "Moving heads, beams, strobos e máquinas de fumaça profissionais." },
    { icon: Mic2, label: "Microfones & Cabines", desc: "Microfones sem fio, in-ear e cabines acústicas premium." },
    { icon: Disc3, label: "Cabine DJ Premium", desc: "Pioneer CDJ-3000, DJM-A9 e setup completo para performance." },
    { icon: Sparkles, label: "Efeitos Especiais", desc: "Co2, confete, laser, faíscas frias e pirotecnia indoor." },
    { icon: Volume2, label: "Estrutura Sob Consulta", desc: "Cada evento pede um setup. Monte o seu pacote com a gente." },
  ];
  return (
    <section id="estrutura" className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center rounded-md border border-primary/60 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.4em] text-primary box-glow">
          Estrutura
        </span>
        <h2 className="mt-4 font-display text-2xl tracking-wide sm:text-3xl md:text-5xl">
          SUB <span className="italic text-primary">CONSULTA</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70 sm:text-base">
          Temos diversos equipamentos para atender o seu evento. Cada festa é única e
          contamos com modelos diferentes disponíveis. <span className="text-foreground">Consulte conosco</span> e
          montamos a estrutura ideal pra você.
        </p>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary box-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{it.label}</p>
                  <p className="mt-1 text-sm text-foreground/80">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-card/70 p-5 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Cable className="h-6 w-6 text-primary" />
          <p className="text-sm font-semibold">
            Quer saber qual estrutura combina com o seu evento?
          </p>
        </div>
        <a
          href="https://wa.me/5511974144061?text=Ol%C3%A1%20Bony%2C%20quero%20consultar%20a%20estrutura%20para%20o%20meu%20evento"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground box-glow transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="h-4 w-4" /> Consultar agora
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden border-t border-primary/40 bg-card">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative grid items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1.4fr_1fr] md:gap-8 md:px-10 md:py-20">
        {/* Left: headline */}
        <div>
          <h3 className="font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
            VAMOS FAZER <br /> SEU EVENTO <br />
            <span className="italic text-primary">INESQUECÍVEL?</span>
          </h3>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Entre em contato agora e garanta a melhor experiência musical para o seu público!
          </p>
        </div>

        {/* Center: phone mockup with CTA */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              className="relative"
            >
              {/* Pulsing glow ring */}
              <div className="absolute inset-0 -m-4 animate-pulse rounded-[3rem] bg-primary/30 blur-2xl" />
              {/* Phone */}
              <div className="relative h-[420px] w-[210px] rounded-[2.2rem] border-[6px] border-foreground/80 bg-background p-2 shadow-[0_0_60px_-10px_var(--neon-glow)] sm:h-[460px] sm:w-[230px]">
                {/* Notch */}
                <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground/80" />
                {/* Screen reflection sweep */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.7rem]">
                  <motion.div
                    className="absolute -inset-y-10 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["0%", "320%"] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                </div>
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.7rem] bg-gradient-to-b from-[#0a0a0a] via-background to-[#0a0a0a]">
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2 pt-6">
                    <div className="h-7 w-7 overflow-hidden rounded-full border border-white/30 bg-card">
                      <img src={djBonyAvatar} alt="Bony Lima" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[11px] font-bold text-white">Bony Lima</p>
                      <p className="text-[8px] text-emerald-200">
                        +55 11 97414-4061 ·{" "}
                        <motion.span
                          className="inline-block"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                        >
                          online
                        </motion.span>
                      </p>
                    </div>
                    <MessageCircle className="ml-auto h-3 w-3 text-white/80" />
                  </div>
                  {/* Chat */}
                  <div className="flex flex-1 flex-col gap-1.5 p-3">
                    {[
                      { side: "start", color: "bg-card text-foreground", html: <>Assim como um <b>perfume</b> traz de volta uma lembrança, cada <b>nota musical</b> eterniza um momento. 🎶</> },
                      { side: "end", color: "bg-[#005C4B] text-white", html: <>Seu evento merece mais que uma festa: merece virar <b>memória</b> que toca toda vez que a música tocar. 🔥</> },
                      { side: "start", color: "bg-card text-foreground", html: <>Vamos <b>fazer história</b> juntos e eternizar essa data na vida de cada convidado. 🙌</> },
                      { side: "end", color: "bg-[#005C4B] text-white", html: <>Quero garantir minha data com o DJ Bony 👇</> },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.35, type: "spring", stiffness: 220, damping: 18 }}
                        className={`max-w-[88%] rounded-lg px-2.5 py-1.5 text-[10px] leading-snug shadow ${m.color} ${m.side === "start" ? "self-start rounded-tl-none" : "self-end rounded-tr-none"}`}
                      >
                        {m.html}
                      </motion.div>
                    ))}
                    <div className="mt-auto flex items-center gap-1.5 rounded-full bg-card px-2 py-1.5 text-[9px] text-muted-foreground">
                      <span className="flex-1 truncate">Quero fechar com o DJ Bony...</span>
                      <motion.span
                        animate={{ scale: [1, 1.18, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      >
                        <MessageCircle className="h-2.5 w-2.5" />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <a
            href={waLink(
              "Olá Bony! Quero garantir minha data e eternizar esse momento com a sua música. Pode me passar disponibilidade e valores?"
            )}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-[0_0_40px_-5px_var(--neon-glow)] transition hover:scale-105 sm:w-auto"
          >
            <span className="absolute inset-0 animate-pulse rounded-full bg-primary/40 blur-md" />
            <MessageCircle className="relative h-5 w-5" />
            <span className="relative">Chamar no WhatsApp</span>
          </a>
        </div>

        {/* Right: socials */}
        <div>
          <h4 className="font-display text-lg tracking-wider text-primary">ME SIGA NAS REDES</h4>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://www.instagram.com/bonylima" target="_blank" rel="noreferrer" aria-label="Instagram DJ Bony" className="rounded-md border border-border p-2 hover:border-primary"><Instagram className="h-5 w-5" /></a>
            <a href="https://www.instagram.com/b2bprodutora" target="_blank" rel="noreferrer" aria-label="Instagram B2B Produtora" className="rounded-md border border-border p-2 hover:border-primary"><Instagram className="h-5 w-5" /></a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="YouTube" className="rounded-md border border-border p-2 hover:border-primary"><Youtube className="h-5 w-5" /></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-md border border-border p-2 hover:border-primary"><MessageCircle className="h-5 w-5" /></a>
            <a href={SPOTIFY_URL} target="_blank" rel="noreferrer" aria-label="Spotify" className="rounded-md border border-border p-2 hover:border-primary"><Headphones className="h-5 w-5" /></a>
            <a href="mailto:contato@djbony.com?subject=Orçamento%20para%20Evento%20-%20DJ%20Bony&body=Olá%20DJ%20Bony,%20tudo%20bem?%0D%0A%0D%0AGostaria%20de%20solicitar%20um%20orçamento%20de%20prestação%20de%20serviço%20de%20DJ%20para%20o%20meu%20evento.%0D%0A%0D%0ADetalhes%20do%20Evento:%0D%0A-%20Tipo%20de%20Evento%20(Casamento,%20Aniversário,%20Corporativo,%20etc.):%20%0D%0A-%20Data%20desejada:%20%0D%0A-%20Local/Cidade:%20%0D%0A-%20Número%20aproximado%20de%20convidados:%20%0D%0A%0D%0AAguardando%20seu%20retorno!%0D%0A%0D%0AAtenciosamente," aria-label="E-mail" className="rounded-md border border-border p-2 hover:border-primary text-foreground hover:text-primary"><Mail className="h-5 w-5" /></a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">contato@djbony.com</p>
        </div>
      </div>
    </footer>
  );
}

function Copyright() {
  return (
    <div className="relative border-t border-border py-4 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
      © {new Date().getFullYear()} DJ Bony — Todos os direitos reservados
    </div>
  );
}



type IgProfile = {
  handle: string;
  name: string;
  url: string;
  bio: string;
  tag: string;
  stats: { posts: string; followers: string; following: string };
  accent: string;
  avatar?: string;
};

function InstagramCard({ profile }: { profile: IgProfile }) {
  const embedSrc = `https://www.instagram.com/${profile.handle}/embed/`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-[0_0_40px_-12px_var(--neon-glow)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-16 opacity-70"
        style={{ background: profile.accent }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
        <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-primary/40 blur-3xl strobe" />
      </div>

      <div className="relative flex flex-col gap-0 md:flex-row">
        {/* Left: info */}
        <div className="flex flex-col md:w-[42%] md:border-r md:border-border">
          <header className="flex items-center gap-3 p-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/60 bg-background sm:h-14 sm:w-14">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`Foto de perfil @${profile.handle}`}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <Instagram className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{profile.tag}</p>
              <h3 className="truncate font-display text-base leading-none tracking-wide sm:text-lg">{profile.name}</h3>
              <a
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-muted-foreground hover:text-primary"
              >
                @{profile.handle}
              </a>
            </div>
          </header>

          <p className="px-4 pb-3 text-xs text-foreground/80">{profile.bio}</p>

          <div className="grid grid-cols-3 gap-px border-y border-border bg-border text-center">
            {[
              { k: "Posts", v: profile.stats.posts },
              { k: "Seguidores", v: profile.stats.followers },
              { k: "Seguindo", v: profile.stats.following },
            ].map((s) => (
              <div key={s.k} className="bg-card px-1.5 py-1.5">
                <div className="font-display text-sm text-primary">{s.v}</div>
                <div className="text-[8px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>

          <footer className="mt-auto flex items-center justify-between gap-2 p-3">
            <p className="text-[10px] text-muted-foreground">via Instagram</p>
            <a
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground box-glow"
            >
              <Instagram className="h-3.5 w-3.5" /> Seguir
            </a>
          </footer>
        </div>

        {/* Right: feed */}
        <div className="relative md:flex-1 bg-background">
          <iframe
            src={embedSrc}
            title={`Instagram @${profile.handle}`}
            loading="lazy"
            className="block h-[300px] w-full border-0 sm:h-[340px] md:h-[420px]"
            scrolling="yes"
            allow="encrypted-media"
          />
        </div>
      </div>
    </motion.article>
  );
}

function AboutInstagram() {
  const profiles: IgProfile[] = [
    {
      handle: "bonylima",
      name: "DJ BONY",
      url: "https://www.instagram.com/bonylima",
      tag: "Perfil oficial",
      bio: "Mais de 10 anos transformando pistas em experiências. Casas de show, baladas, eventos sociais e corporativos.",
      stats: { posts: "500+", followers: "20K+", following: "1.2K" },
      accent: "linear-gradient(135deg, oklch(0.62 0.24 25) 0%, oklch(0.35 0.15 25) 100%)",
      avatar: djBonyAvatar,
    },
    {
      handle: "b2bprodutora",
      name: "B2B PRODUTORA",
      url: "https://www.instagram.com/b2bprodutora",
      tag: "Produtora oficial",
      bio: "Produtora oficial do DJ Bony. Estrutura completa de som, luz e produção para eventos de alto padrão em todo o Brasil.",
      stats: { posts: "300+", followers: "8K+", following: "900" },
      accent: "linear-gradient(135deg, oklch(0.55 0.20 25) 0%, oklch(0.20 0.05 270) 100%)",
      avatar: b2bAvatar,
    },
  ];

  return (
    <section id="sobre" className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24">
      <LaserBackdrop />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary">Sobre & Instagram</p>
          <h2 className="mt-3 font-display text-3xl leading-none tracking-wide sm:text-4xl md:text-5xl">
            CONHEÇA O <span className="italic text-primary text-glow">UNIVERSO BONY</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Acompanhe os bastidores, prévias dos sets e os eventos mais recentes direto pelos perfis oficiais.
          </p>
        </div>

        <div className="mx-auto grid max-w-md gap-5 sm:max-w-2xl md:max-w-4xl md:grid-cols-1 md:gap-5">
          {profiles.map((p) => (
            <InstagramCard key={p.handle} profile={p} />
          ))}
        </div>

        {/* YouTube channel section */}
        <div className="mt-14 md:mt-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary">YouTube</p>
              <h3 className="mt-2 font-display text-2xl leading-none tracking-wide sm:text-3xl md:text-4xl">
                ASSISTA NO <span className="italic text-primary text-glow">CANAL OFICIAL</span>
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Sets ao vivo, bastidores e os melhores momentos das pistas. Inscreva-se para não perder nenhum drop.
              </p>
            </div>
            <a
              href="https://www.youtube.com/channel/UCeE3gptZro1HQuWIQMNF8Cg?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-[0_0_30px_-8px_var(--neon-glow)] hover:scale-105 transition"
            >
              <Youtube className="h-4 w-4" /> Inscrever-se
            </a>
          </div>

          <YouTubeShowcase
            videos={[
              { id: "6XgUTdCdxmc", title: "DJ Bony — Set ao vivo" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function YouTubeShowcase({ videos }: { videos: { id: string; title: string }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <motion.a
          key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-[0_0_30px_-12px_var(--neon-glow)]"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
              title={v.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Vídeo</p>
              <p className="truncate text-sm font-bold">{v.title}</p>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:scale-110">
              <Play className="h-4 w-4" />
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-primary/80 to-primary box-glow"
    />
  );
}

function CursorSpotlight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });
  const background = useTransform(
    [sx, sy] as never,
    ([lx, ly]: number[]) =>
      `radial-gradient(420px circle at ${lx}px ${ly}px, oklch(0.62 0.24 25 / 0.18), transparent 60%)`
  );
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[55] hidden md:block mix-blend-screen"
    />
  );
}


function SpotifyShowcase() {
  const SPOTIFY_ARTIST_ID = "2oV7h8ExkMqUsrF4wIZ0Fg";
  return (
    <section className="relative px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary">Spotify Oficial</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">A trilha sonora do seu próximo evento</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Cada batida foi escolhida para fazer alguém lembrar de você. Aperte o play, sinta o set e imagine essa energia tocando na sua noite.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="group relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f12] to-[#1a0a0e] p-1 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.6)]"
        >
          {/* animated glow ring */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-60 blur-2xl">
            <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-r from-[#1DB954]/30 via-primary/30 to-[#1DB954]/30" />
          </div>

          <div className="relative grid gap-6 rounded-[1.4rem] bg-background/80 p-5 backdrop-blur md:grid-cols-[1.1fr_1fr] md:p-8">
            {/* Left: visual / play */}
            <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1DB954]/15 via-black to-primary/20 p-6 md:p-8">
              {/* vinyl rings */}
              <motion.div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-6 rounded-full border border-white/10" />
                <div className="absolute inset-12 rounded-full border border-white/10" />
                <div className="absolute inset-20 rounded-full border border-primary/40" />
              </motion.div>

              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-[0_0_20px_#1DB954]">
                  {/* Spotify logo SVG */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.32a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.15a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.6 11.66 1.33.36.22.47.69.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.37-1.33 9.79-.68 13.5 1.6.44.28.58.87.31 1.29zm.13-3.4C15.25 8.4 8.5 8.2 4.85 9.31a1.13 1.13 0 1 1-.66-2.16c4.19-1.27 11.64-1.03 16.22 1.69a1.13 1.13 0 0 1-1.16 1.94z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1DB954]">Now Playing</p>
                  <p className="font-display text-lg leading-none">DJ Bony — Sets Oficiais</p>
                </div>
              </div>

              <div className="relative">
                <p className="font-display text-2xl leading-tight md:text-3xl">
                  Notas que viram <span className="text-primary">memória</span>.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Salve a playlist e leve o som que faz a sua festa virar lembrança.
                </p>
              </div>

              <div className="relative flex flex-wrap items-center gap-3">
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative inline-flex items-center gap-3 rounded-full bg-[#1DB954] px-6 py-3 font-bold text-black shadow-[0_0_30px_-5px_#1DB954] transition hover:scale-105 hover:shadow-[0_0_40px_0_#1DB954]"
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#1DB954]">
                    <Play className="h-4 w-4 fill-current" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#1DB954]/40" />
                  </span>
                  Ouvir no Spotify
                </a>
                <a
                  href={SPOTIFY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-foreground/90 transition hover:border-primary hover:text-primary"
                >
                  Seguir Artista
                </a>
              </div>
            </div>

            {/* Right: live embed */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <iframe
                title="Spotify DJ Bony"
                src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="100%"
                style={{ minHeight: 380, border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EndOfPagePopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 120;
      if (scrollPos >= threshold) {
        if (!timerRef.current && !open) {
          timerRef.current = setTimeout(() => {
            setOpen(true);
            timerRef.current = null;
          }, 2000);
        }
      } else if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed, open]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  const message =
    "Olá Bony! Vi o seu site e quero conversar sobre um evento. Pode me ajudar a montar o som perfeito?";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="fixed bottom-4 right-4 left-4 z-50 max-w-sm sm:left-auto sm:right-6 sm:bottom-6"
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/70 bg-card/95 p-5 shadow-[0_0_40px_var(--neon-glow)] backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex items-start gap-3">
              <div className="relative shrink-0">
                <img
                  src={djBonyAvatar}
                  alt="Bony"
                  className="h-12 w-12 rounded-full border-2 border-primary object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-green-500">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-500/70" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display text-lg leading-none">Bony está online</p>
                </div>
                <p className="mt-1 text-xs text-green-400 font-semibold uppercase tracking-wider">
                  Respondendo agora
                </p>
                <p className="mt-2 text-sm text-foreground/90">
                  Pronto pra transformar o seu evento numa noite inesquecível?
                  Fale comigo agora — leva menos de 1 minuto.
                </p>
              </div>
            </div>

            <a
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_24px_rgba(34,197,94,0.55)] transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" /> Falar com Bony no WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <CursorSpotlight />
      <div className="mx-auto w-full max-w-[1440px]">
        <Navbar />
        <Hero />
        <EventTypes />
        <AboutInstagram />
        <BigNames />
        <Estrutura />
        <Packages />
        <Footer />
        <SpotifyShowcase />
        <Copyright />
      </div>
      <EndOfPagePopup />
    </main>
  );
}


