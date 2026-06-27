import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  DJ Bony — Intro Overlay Component
//  Aparece ao carregar a página e desaparece
//  automaticamente após a animação completa.
// ─────────────────────────────────────────────

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Remove o overlay após 13.5s — depois que o fade-out (11.5s + 1.6s) termina totalmente
    const t = setTimeout(() => setVisible(false), 13500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        /* ── Overlay ── */
        .dj-intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #0d0000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          pointer-events: none;
          animation: dj-fade-out 1.6s cubic-bezier(0.4,0,0.2,1) 11.5s forwards;
        }

        /* Gradiente de fundo */
        .dj-intro-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,45,45,0.09) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 60%, rgba(255,112,32,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Partículas ── */
        .dj-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .dj-particles span {
          position: absolute;
          width: 2px; height: 2px;
          border-radius: 50%;
          background: #ff2d2d;
          opacity: 0;
          animation: dj-particle 6s ease-in-out infinite;
        }
        .dj-particles span:nth-child(1)  { left:15%;top:70%;animation-delay:0s;  animation-duration:5.2s; }
        .dj-particles span:nth-child(2)  { left:30%;top:80%;animation-delay:.8s; animation-duration:6.4s; width:3px;height:3px; }
        .dj-particles span:nth-child(3)  { left:55%;top:85%;animation-delay:1.4s;animation-duration:5.8s;background:#ff7020; }
        .dj-particles span:nth-child(4)  { left:70%;top:75%;animation-delay:.3s; animation-duration:7.1s; }
        .dj-particles span:nth-child(5)  { left:85%;top:65%;animation-delay:1.9s;animation-duration:5.5s;width:3px;height:3px;background:#ff7020; }
        .dj-particles span:nth-child(6)  { left:10%;top:40%;animation-delay:2.2s;animation-duration:6.8s; }
        .dj-particles span:nth-child(7)  { left:45%;top:20%;animation-delay:.6s; animation-duration:6.0s;background:#ff7020; }
        .dj-particles span:nth-child(8)  { left:75%;top:30%;animation-delay:1.1s;animation-duration:5.3s; }
        .dj-particles span:nth-child(9)  { left:90%;top:50%;animation-delay:1.7s;animation-duration:7.4s;width:3px;height:3px; }

        /* ── Equalizador ── */
        .dj-eq {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 28px;
        }
        .dj-eq-bar {
          width: 4px;
          border-radius: 2px;
          background: linear-gradient(to top, #ff2d2d, #ff7020);
          opacity: 0.6;
          animation: dj-eq-bounce 0.7s ease-in-out infinite alternate;
        }
        .dj-eq-bar:nth-child(1){height:40%;animation-duration:.50s;animation-delay:0s}
        .dj-eq-bar:nth-child(2){height:80%;animation-duration:.62s;animation-delay:.10s}
        .dj-eq-bar:nth-child(3){height:60%;animation-duration:.45s;animation-delay:.20s}
        .dj-eq-bar:nth-child(4){height:100%;animation-duration:.55s;animation-delay:.05s}
        .dj-eq-bar:nth-child(5){height:70%;animation-duration:.68s;animation-delay:.15s}
        .dj-eq-bar:nth-child(6){height:50%;animation-duration:.40s;animation-delay:.08s}
        .dj-eq-bar:nth-child(7){height:30%;animation-duration:.75s;animation-delay:.25s}

        /* ── Rotator de frases ── */
        .dj-rotator {
          position: relative;
          width: 90%;
          max-width: 860px;
          height: 1.4em;
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: clamp(1.9rem, 5vw, 3.8rem);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.02em;
          text-align: center;
          color: rgba(255,255,255,0.93);
        }

        /* ── Frases ── */
        .dj-phrase {
          position: absolute;
          top: 0; left: 50%;
          white-space: nowrap;
          opacity: 0;
          transform: translate(-50%, 40%);
          animation: dj-cycle 2.025s cubic-bezier(0.65,0,0.35,1) forwards;
          will-change: opacity, transform;
        }

        /* Frase final — permite quebra de linha em telas pequenas */
        .dj-phrase.dj-final {
          white-space: normal;
          width: 90vw;
          max-width: 860px;
          text-align: center;
          left: 50%;
          font-size: clamp(1.4rem, 4vw, 3.8rem);
        }

        /* Frase 1 — bloco "Sua festa vai ser [palavra]" */
        .dj-phrase-mais {
          display: inline-grid;
          grid-template-columns: auto auto;
          align-items: baseline;
          column-gap: 0.22em;
          animation: dj-mais-block 6.08s cubic-bezier(0.65,0,0.35,1) 0.16s forwards;
        }
        .dj-static {
          white-space: nowrap;
          color: rgba(255,255,255,0.93);
          font-weight: 300;
        }
        .dj-words {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          justify-items: start;
          align-items: baseline;
        }
        .dj-word {
          grid-column: 1; grid-row: 1;
          opacity: 0;
          transform: translateY(40%);
          animation: dj-word-cycle 2.025s cubic-bezier(0.65,0,0.35,1) forwards;
          will-change: opacity, transform;
          font-weight: 900;
          color: #ff2d2d;
          text-shadow: 0 0 20px rgba(255,45,45,.35), 0 0 50px rgba(255,45,45,.2);
        }
        .dj-word:nth-child(1){animation-delay:.16s}
        .dj-word:nth-child(2){animation-delay:2.19s}
        .dj-word:nth-child(3){animation-delay:4.21s}

        /* Frase 2 */
        .dj-phrase:nth-child(2){animation-delay:6.24s}

        /* Frase 3 — final lento */
        .dj-phrase:nth-child(3){
          animation: dj-final 2.4s cubic-bezier(0.16,1,0.3,1) 8.26s forwards;
        }

        /* Destaque <em> nas frases 2 e 3 */
        .dj-phrase em {
          font-style: normal;
          font-weight: 900;
          color: #ff2d2d;
          text-shadow: 0 0 25px rgba(255,45,45,.35), 0 0 60px rgba(255,45,45,.15);
        }
        /* Destaque final — mesmo vermelho vivo do site */
        .dj-accent-name {
          font-weight: 900;
          color: #ff2d2d;
          text-shadow: 0 0 25px rgba(255,45,45,.45), 0 0 55px rgba(255,45,45,.2);
        }

        /* ── Keyframes ── */
        @keyframes dj-cycle {
          0%  {opacity:0;transform:translate(-50%,40%)}
          20% {opacity:1;transform:translate(-50%,0)}
          80% {opacity:1;transform:translate(-50%,0)}
          100%{opacity:0;transform:translate(-50%,-40%)}
        }
        @keyframes dj-mais-block {
          0%  {opacity:0;transform:translate(-50%,40%)}
          7%  {opacity:1;transform:translate(-50%,0)}
          93% {opacity:1;transform:translate(-50%,0)}
          100%{opacity:0;transform:translate(-50%,-40%)}
        }
        @keyframes dj-word-cycle {
          0%  {opacity:0;transform:translateY(40%)}
          20% {opacity:1;transform:translateY(0)}
          80% {opacity:1;transform:translateY(0)}
          100%{opacity:0;transform:translateY(-40%)}
        }
        @keyframes dj-final {
          from{opacity:0;transform:translate(-50%,40%)}
          to  {opacity:1;transform:translate(-50%,0)}
        }
        @keyframes dj-fade-out {
          0%   { opacity: 1; }
          99%  { opacity: 0; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes dj-particle {
          0%  {opacity:0;transform:translateY(0) scale(1)}
          20% {opacity:.7}
          80% {opacity:.4}
          100%{opacity:0;transform:translateY(-80px) scale(.5)}
        }
        @keyframes dj-eq-bounce {
          from{transform:scaleY(.3)}
          to  {transform:scaleY(1)}
        }
        @media(prefers-reduced-motion:reduce){
          .dj-intro-overlay{animation:none;opacity:0;visibility:hidden}
        }
      `}</style>

      <div className="dj-intro-overlay" aria-hidden="true">

        {/* Partículas */}
        <div className="dj-particles">
          <span/><span/><span/><span/><span/>
          <span/><span/><span/><span/>
        </div>

        {/* Equalizador */}
        <div className="dj-eq">
          <div className="dj-eq-bar"/><div className="dj-eq-bar"/>
          <div className="dj-eq-bar"/><div className="dj-eq-bar"/>
          <div className="dj-eq-bar"/><div className="dj-eq-bar"/>
          <div className="dj-eq-bar"/>
        </div>

        {/* Frases */}
        <div className="dj-rotator">

          {/* Frase 1 — palavras rotativas */}
          <span className="dj-phrase dj-phrase-mais">
            <span className="dj-static">Sua festa vai ser</span>
            <span className="dj-words">
              <span className="dj-word">inesquecível.</span>
              <span className="dj-word">lendária.</span>
              <span className="dj-word">épica.</span>
            </span>
          </span>

          {/* Frase 2 */}
          <span className="dj-phrase">
            Eu não toco música. Eu <em>crio momentos.</em>
          </span>

          {/* Frase 3 — final lento */}
          <span className="dj-phrase dj-final">
            Contrate o DJ que faz{" "}
            <span className="dj-accent-name">seu dia inesquecível.</span>
          </span>

        </div>
      </div>
    </>
  );
}
