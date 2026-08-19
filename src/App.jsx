import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MailOpen, Quote, Clock, Heart, Users, Music2, HeartHandshake, Image as ImageIcon, PlayCircle } from 'lucide-react';
import heroImg from './assets/hero.png';
import iskImg from './assets/isk.png';
import pangdamImg from './assets/pangdam.png';
import tuankuTambusaiImg from './assets/tuankutambusai.png';
import siakImg from './assets/siak.png';

const tailwindStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Inter:wght@300;400;600;700&family=Great+Vibes&display=swap');

  .font-serif { font-family: 'Cinzel', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
  .font-script { font-family: 'Great Vibes', cursive; }

  body {
    margin: 0;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    background: radial-gradient(ellipse at 50% 0%, #4B6130 0%, #33481F 45%, #22301A 75%, #141C0D 100%);
  }

  .bg-batik {
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2v-2.5h2v-4h-2v-2h2v-4h-2v-2h2v-4h-2V0h2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2.5H20zm0 0h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v-20.5zm-2 0H0v2h18v2H0v2h18v2H0v2h18v2H0v2h18v2H0v2h18v2H0v2h18v-20.5z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  .bg-batik-gold {
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2v-2.5h2v-4h-2v-2h2v-4h-2v-2h2v-4h-2V0h2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2.5H20zm0 0h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v2h20v2H20v-20.5zm-2 0H0v2h18v2H0v2h18v2H0v2h18v2H0v2h18v2H0v2h18v2H0v2h18v-20.5z' fill='%23D4AF37' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  .bg-kawung {
      background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='1'%3E%3Ccircle cx='16' cy='16' r='11' opacity='0.55'/%3E%3Ccircle cx='48' cy='16' r='11' opacity='0.55'/%3E%3Ccircle cx='16' cy='48' r='11' opacity='0.55'/%3E%3Ccircle cx='48' cy='48' r='11' opacity='0.55'/%3E%3Ccircle cx='32' cy='32' r='11' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E");
      background-size: 64px 64px;
  }

  .motif-corner {
      position: absolute;
      width: 90px; height: 90px;
      border: 1px solid rgba(212,175,55,0.35);
      pointer-events: none;
  }

  /* Loreng / camo blotch texture — tiga-empat warna khas seragam lapangan TNI AD,
     dipakai sebagai aksen pita, bukan sebagai latar penuh, supaya tetap elegan. */
  .bg-loreng {
      background-color: #3b4a2a;
      background-image:
        radial-gradient(ellipse 60% 45% at 12% 30%, #5c6b3a 0%, transparent 62%),
        radial-gradient(ellipse 55% 50% at 78% 20%, #232f1a 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 45% 75%, #6b5a34 0%, transparent 58%),
        radial-gradient(ellipse 45% 40% at 92% 70%, #232f1a 0%, transparent 55%),
        radial-gradient(ellipse 65% 45% at 30% 95%, #4a5a2c 0%, transparent 60%),
        radial-gradient(ellipse 40% 55% at 60% 40%, #232f1a 0%, transparent 55%);
      background-size: 130px 130px;
  }

  .loreng-dot {
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      flex-shrink: 0;
      background-color: #3b4a2a;
      background-image:
        radial-gradient(circle at 25% 30%, #6b5a34 0%, transparent 55%),
        radial-gradient(circle at 75% 25%, #232f1a 0%, transparent 55%),
        radial-gradient(circle at 40% 75%, #5c6b3a 0%, transparent 55%),
        radial-gradient(circle at 80% 80%, #232f1a 0%, transparent 50%);
      border: 1px solid rgba(0,0,0,0.25);
  }

  .merah-putih-rule {
      height: 3px;
      background: linear-gradient(90deg, #B7292F 0 33%, #FDFBF7 33% 66%, #B7292F 66% 100%);
      opacity: 0.85;
  }

  .loreng-strip {
      height: 10px;
      background-color: #3b4a2a;
      background-image:
        radial-gradient(ellipse 70% 220% at 8% 50%, #6b5a34 0%, transparent 60%),
        radial-gradient(ellipse 60% 220% at 26% 50%, #232f1a 0%, transparent 62%),
        radial-gradient(ellipse 65% 220% at 46% 50%, #5c6b3a 0%, transparent 58%),
        radial-gradient(ellipse 55% 220% at 64% 50%, #232f1a 0%, transparent 60%),
        radial-gradient(ellipse 70% 220% at 84% 50%, #6b5a34 0%, transparent 60%),
        radial-gradient(ellipse 60% 220% at 98% 50%, #232f1a 0%, transparent 58%);
      background-size: 120px 10px;
  }

  /* Ikon musik bergaya "equalizer" 3-batang, meniru referensi tombol bulat.
     Batangnya statis saat musik jeda, dan naik-turun pelan saat musik main. */
  @keyframes eq-bounce {
      0%, 100% { transform: scaleY(0.4); }
      50% { transform: scaleY(1); }
  }
  .eq-bar {
      transform-origin: center;
  }
  .eq-bar.playing {
      animation: eq-bounce 0.9s ease-in-out infinite;
  }
  .eq-bar.playing:nth-child(1) { animation-delay: -0.4s; }
  .eq-bar.playing:nth-child(2) { animation-delay: -0.15s; }
  .eq-bar.playing:nth-child(3) { animation-delay: -0.6s; }

  .scroll-container {
      overflow-y: auto; overflow-x: hidden; height: 100vh; scrollbar-width: none;
  }

  .scroll-container::-webkit-scrollbar { display: none; }

  @keyframes pulse-glow {
      0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6); }
      70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
      100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
  }
  .pulse-btn { animation: pulse-glow 2s infinite; }

  @keyframes fall {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 1;}
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }
  .confetti-piece {
      position: absolute; z-index: 60; pointer-events: none; animation: fall linear forwards;
  }

  .reveal {
      opacity: 0;
      transform: translateY(48px);
      transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
      will-change: opacity, transform;
  }
  .reveal.visible {
      opacity: 1;
      transform: translateY(0);
  }
  .reveal-scale {
      opacity: 0;
      transform: scale(0.85);
      transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-scale.visible {
      opacity: 1;
      transform: scale(1);
  }

  /* Panel dudukan foto orang — glow radial + vignette bawah supaya PNG transparan
     tidak terasa "ngambang" saat ditumpuk di atas latar gelap. */
  .portrait-stage {
      position: relative;
      background:
        radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.28) 0%, transparent 70%),
        linear-gradient(180deg, #22301A 0%, #141C0D 100%);
      border-radius: 1rem;
      overflow: hidden;
  }
  .portrait-stage::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 45%;
      background: linear-gradient(180deg, transparent 0%, rgba(20,28,13,0.9) 100%);
      pointer-events: none;
  }
  .portrait-img {
      position: relative;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom center;
      filter: drop-shadow(0 10px 14px rgba(0,0,0,0.45));
  }
`;

// Hook animasi reveal saat elemen masuk viewport (scroll)
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const rootEl = node.closest('.scroll-container');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { root: rootEl || null, threshold, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// Komponen Gelombang dengan Garis Emas + trim merah-putih tipis di bawahnya
const ShapeDivider = ({ topColor, bottomColor, isFlipped = false, trim = true }) => {
  return (
    <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20" style={{ transform: isFlipped ? 'scaleX(-1)' : 'none' }}>
      <svg className="block w-[calc(100%+2px)] h-[70px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,40 C300,100 900,10 1200,50 L1200,120 L0,120 Z" fill="#D4AF37" />
        {trim && (
          <>
            <path d="M0,40 C300,100 900,10 1200,50" fill="none" stroke="#B7292F" strokeWidth="2.5" transform="translate(0,3)" opacity="0.85" />
            <path d="M0,40 C300,100 900,10 1200,50" fill="none" stroke="#FDFBF7" strokeWidth="2" transform="translate(0,6)" opacity="0.85" />
          </>
        )}
        <path d="M0,50 C300,110 900,20 1200,60 L1200,120 L0,120 Z" fill={bottomColor} />
      </svg>
    </div>
  );
};

// ---- Figur manusia siluet yang lebih realistis, dipakai berulang ----
const PersonFigure = ({ pose = 'stand', flip = false }) => {
  const poses = {
    stand: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        <path d="M-6,-29 C-9,-27 -11,-18 -10,-10 L-7,-11 C-8,-18 -6,-25 -4,-28 Z" />
        <path d="M6,-29 C9,-27 11,-18 10,-10 L7,-11 C8,-18 6,-25 4,-28 Z" />
      </>
    ),
    flagBearer: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        <path d="M4,-30 C8,-40 12,-55 14,-72 L11,-73 C8,-56 5,-42 1,-32 Z" />
        <path d="M-6,-29 C-9,-27 -11,-18 -10,-10 L-7,-11 C-8,-18 -6,-25 -4,-28 Z" />
        <line x1="14" y1="-72" x2="14" y2="10" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14,-72 C24,-70 30,-66 40,-68 C36,-63 36,-58 40,-53 C30,-55 24,-51 14,-53 Z" />
      </>
    ),
    salute: (
      <>
        <path d="M-7,-40 C-7,-46 7,-46 7,-40 L7,-33 L-7,-33 Z" />
        <circle cx="0" cy="-32" r="6.5" />
        <path d="M-6,-25 C-6,-25 -9,-6 -8,6 L-2,6 L0,-10 L2,6 L8,6 C9,-6 6,-25 6,-25 C6,-25 0,-28 0,-28 C0,-28 -6,-25 -6,-25 Z" />
        <path d="M-8,6 L-10,26 L-4,26 L-1,8 Z" />
        <path d="M8,6 L10,26 L4,26 L1,8 Z" />
        <path d="M5,-24 C9,-27 10,-31 8,-34 L5,-32 C6,-30 5,-27 2,-25 Z" />
        <path d="M-6,-23 C-9,-21 -11,-12 -10,-4 L-7,-5 C-8,-12 -6,-19 -4,-22 Z" />
      </>
    ),
    holdHands: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        <path d="M6,-29 C11,-27 15,-22 17,-16 L14,-14 C12,-20 9,-24 4,-27 Z" />
        <path d="M-6,-29 C-9,-27 -11,-18 -10,-10 L-7,-11 C-8,-18 -6,-25 -4,-28 Z" />
      </>
    ),
    chainHold: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        <path d="M6,-29 C11,-27 15,-22 17,-16 L14,-14 C12,-20 9,-24 4,-27 Z" />
        <path d="M-6,-29 C-11,-27 -15,-22 -17,-16 L-14,-14 C-12,-20 -9,-24 -4,-27 Z" />
      </>
    ),
  };

  return <g transform={flip ? 'scale(-1,1)' : undefined}>{poses[pose]}</g>;
};

// Ikon "equalizer" 3-batang — dipakai di tombol musik, meniru gaya referensi
const SoundBars = ({ active = false, className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="7" y1="10" x2="7" y2="14" className={`eq-bar ${active ? 'playing' : ''}`} />
    <line x1="12" y1="7" x2="12" y2="17" className={`eq-bar ${active ? 'playing' : ''}`} />
    <line x1="17" y1="10" x2="17" y2="14" className={`eq-bar ${active ? 'playing' : ''}`} />
  </svg>
);

// Bintang pangkat kecil — dipakai sebagai aksen sudut pengganti motif generik
const RankStar = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1.5l2.9 6.62 7.1.63-5.4 4.77 1.62 6.98L12 16.9l-6.22 3.6 1.62-6.98L2 9.75l7.1-.63L12 1.5z" />
  </svg>
);

// Rumah adat: bentuk disederhanakan agar jelas terbaca sebagai rumah panggung beratap pelana
const RumahAdatShape = ({ x = 0, scale = 1 }) => (
  <g transform={`translate(${x},0) scale(${scale})`}>
    <path d="M-34,2 C-30,-9 -18,-11 -14,-21 C-9,-15 9,-15 14,-21 C18,-11 30,-9 34,2 Z" />
    <rect x="-26" y="2" width="52" height="15" />
    <rect x="-6" y="8" width="12" height="9" fill="#141C0D" opacity="0.55" />
    <rect x="-22" y="17" width="4" height="9" />
    <rect x="18" y="17" width="4" height="9" />
    <rect x="-2" y="17" width="4" height="9" />
  </g>
);

// Kumpulan Siluet SVG — versi lebih hidup & terperinci
const Silhouettes = {
  Fighters: () => {
    const numRays = 15;
    const rays = Array.from({ length: numRays }).map((_, i) => {
      const angle = -90 + (180 / (numRays - 1)) * i;
      const len = i % 2 === 0 ? 72 : 50;
      return { angle, len };
    });

    return (
      <svg viewBox="0 0 200 140" className="absolute bottom-0 left-0 w-full h-52 opacity-[0.22] text-white pointer-events-none" fill="currentColor">
        <g transform="translate(100,120) scale(1.3)">
          {rays.map((r, i) => (
            <path key={i} transform={`rotate(${r.angle})`} d={`M-3,0 L3,0 L0,${-r.len} Z`} />
          ))}
        </g>
      </svg>
    );
  },
  People: () => (
    <svg viewBox="0 0 200 100" className="absolute bottom-10 left-0 w-full h-28 opacity-[0.09] text-[#33481F] pointer-events-none" fill="currentColor">
      <line x1="6" y1="70" x2="194" y2="70" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <g transform="translate(16,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
      <g transform="translate(44,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
      <g transform="translate(72,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
      <g transform="translate(100,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
      <g transform="translate(128,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
      <g transform="translate(156,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
      <g transform="translate(184,90) scale(0.95)"><PersonFigure pose="chainHold" /></g>
    </svg>
  ),
  Military: () => (
    <>
      <svg viewBox="0 0 200 60" className="absolute bottom-6 left-0 w-full h-24 opacity-[0.16] pointer-events-none" fill="currentColor">
        <ellipse cx="14" cy="22" rx="20" ry="12" className="text-[#5c6b3a]" transform="rotate(-12 14 22)" />
        <ellipse cx="52" cy="10" rx="16" ry="10" className="text-[#232f1a]" transform="rotate(8 52 10)" />
        <ellipse cx="92" cy="28" rx="22" ry="13" className="text-[#6b5a34]" transform="rotate(-6 92 28)" />
        <ellipse cx="134" cy="8" rx="18" ry="11" className="text-[#232f1a]" transform="rotate(14 134 8)" />
        <ellipse cx="172" cy="24" rx="20" ry="12" className="text-[#5c6b3a]" transform="rotate(-10 172 24)" />
      </svg>
      <svg viewBox="0 0 200 50" className="absolute bottom-8 left-0 w-full h-20 opacity-[0.2] text-[#D4AF37] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {Array.from({ length: 13 }).map((_, i) => (
          <path key={i} d={`M${i * 16 + 2},36 L${i * 16 + 10},22 L${i * 16 + 18},36`} />
        ))}
        <line x1="0" y1="42" x2="200" y2="42" opacity="0.55" />
        <line x1="0" y1="46" x2="200" y2="46" opacity="0.3" />
      </svg>
    </>
  ),
  Skyline: () => {
    const width = 400;
    const lineY = 10;
    const flagColors = ['#D4AF37', '#FDFBF7', '#33481F'];
    const flagCount = 26;
    const flagSpacing = width / flagCount;

    return (
      <svg viewBox={`0 0 ${width} 40`} className="absolute top-0 left-0 w-full h-12 pointer-events-none" fill="none">
        <line x1="0" y1={lineY} x2={width} y2={lineY} stroke="#FDFBF7" strokeWidth="1.5" opacity="0.65" />
        {Array.from({ length: flagCount }).map((_, i) => {
          const x = (i + 0.5) * flagSpacing;
          const y = lineY - 0.6;
          const fill = flagColors[i % flagColors.length];
          return (
            <path
              key={i}
              d={`M${(x - 6.5).toFixed(1)},${y.toFixed(1)} L${(x + 6.5).toFixed(1)},${y.toFixed(1)} L${x.toFixed(1)},${(y + 15).toFixed(1)} Z`}
              fill={fill}
              opacity="0.8"
            />
          );
        })}
      </svg>
    );
  },
  RumahAdat: () => (
    <svg viewBox="0 0 200 48" className="absolute bottom-0 left-0 w-full h-auto text-[#D4AF37] opacity-[0.45] pointer-events-none" fill="currentColor">
      <RumahAdatShape x={34} scale={0.8} />
      <RumahAdatShape x={100} scale={1} />
      <RumahAdatShape x={166} scale={0.8} />
      <rect x="0" y="32" width="200" height="2" opacity="0.6" />
    </svg>
  ),
};

// Item timeline Storyboard — gaya "love story" tapi ditulis ulang dengan palet hijau-emas Kodam
const StoryboardItem = ({ year, title, description, icon: Icon, delay = 0, isLast = false, photo }) => {
  const [ref, visible] = useReveal(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`reveal ${visible ? 'visible' : ''} relative pl-11 ${isLast ? '' : 'pb-10'}`}
    >
      {!isLast && <div className="absolute left-[13px] top-8 bottom-0 w-[1.5px] bg-[#D4AF37]/30"></div>}
      <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-[#33481F] border-2 border-[#D4AF37] flex items-center justify-center shadow-sm">
        <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
      </div>
      <p className="font-sans text-[#B7292F] text-[11px] font-bold tracking-[0.15em] uppercase mb-1">{year}</p>
      <h5 className="font-serif text-[#33481F] font-bold text-lg mb-2">{title}</h5>
      {photo && (
        <div className="portrait-stage w-full h-56 mb-3">
          <img src={photo.src} alt={photo.alt} className="portrait-img" />
          <div className="absolute bottom-2 left-0 right-0 text-center z-10">
            <p className="font-sans text-[9px] text-[#D4AF37] tracking-[0.1em] uppercase px-2">{photo.caption}</p>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-[#EBE1D1]">
        <p className="font-sans text-xs text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Kartu galeri foto/video — placeholder bertema, siap diganti foto asli nantinya
const GalleryTile = ({ icon: Icon, label, isVideo, delay = 0, photo }) => {
  const [ref, visible] = useReveal(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`reveal-scale ${visible ? 'visible' : ''} group relative aspect-[4/5] rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-br from-[#33481F] to-[#1C2814] transition-transform hover:scale-[1.04]`}
    >
      {photo ? (
        <>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 25%, rgba(212,175,55,0.25) 0%, transparent 70%)' }}></div>
          <img src={photo} alt={label} className="absolute inset-0 w-full h-full object-contain object-bottom scale-110 origin-bottom" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#141C0D] to-transparent"></div>
          <p className="absolute bottom-2 left-0 right-0 text-center font-sans text-[10px] leading-tight text-[#F5EFE6] tracking-wide px-2 z-10">{label}</p>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-batik opacity-30"></div>
          {isVideo && (
            <span className="absolute top-2 right-2 bg-[#D4AF37] text-[#141C0D] text-[8px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full z-10">
              Video
            </span>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Icon className="w-7 h-7 text-[#D4AF37] relative z-10" strokeWidth={1.5} />
            <p className="font-sans text-[9px] text-[#F5EFE6]/80 tracking-wide text-center px-2 relative z-10 leading-tight">{label}</p>
          </div>
        </>
      )}
    </div>
  );
};

// Hitung mundur ke tanggal acara — update tiap detik
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const CountdownBox = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="bg-[#1C2814] border border-[#D4AF37]/50 rounded-lg w-[52px] h-[52px] flex items-center justify-center shadow-inner">
      <span className="font-serif text-xl font-bold text-[#D4AF37] tabular-nums">{String(value).padStart(2, '0')}</span>
    </div>
    <span className="font-sans text-[8px] text-[#F5EFE6]/70 tracking-widest uppercase">{label}</span>
  </div>
);

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const idCounter = useRef(0);
  const CARD_WIDTH = 448;

  // Musik latar — pakai YouTube IFrame Player disembunyikan (bukan re-upload/hosting
  // file lagu, jadi tetap memutar langsung dari sumber resminya) supaya bisa
  // diputar/dijeda dari tombol speaker mengambang.
  // CATATAN PENTING: YouTube IFrame API mengganti elemen target-nya sendiri
  // menjadi <iframe> (bukan cuma mengisi kontennya). Kalau elemen target itu
  // dirender oleh React, React jadi bingung karena node yang dia kira masih ada
  // sudah diganti pihak lain -> error "insertBefore ... not a child of this node".
  // Solusinya: sediakan wrapper kosong yang direnderin React (tidak pernah
  // punya children lewat JSX), lalu di dalamnya kita buat elemen div mentah lewat
  // document.createElement secara imperatif untuk jadi target YouTube. Karena
  // div mentah itu tidak pernah ada di JSX, React tidak pernah mencoba
  // mengelola ulang node tersebut, jadi aman walau YouTube menggantinya.
  const YT_VIDEO_ID = 'pSIHGuR_DCw';
  const ytWrapperRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initPlayer = () => {
      if (cancelled || !ytWrapperRef.current || ytPlayerRef.current) return;

      // Buat target mentah di luar kendali React
      const target = document.createElement('div');
      ytWrapperRef.current.appendChild(target);

      ytPlayerRef.current = new window.YT.Player(target, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: YT_VIDEO_ID,
        },
        events: {
          onReady: () => setIsPlayerReady(true),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousReady) previousReady();
        initPlayer();
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (ytPlayerRef.current && ytPlayerRef.current.playVideo) {
      ytPlayerRef.current.playVideo();
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!ytPlayerRef.current) return;
    if (isMusicPlaying) {
      ytPlayerRef.current.pauseVideo();
      setIsMusicPlaying(false);
    } else {
      ytPlayerRef.current.playVideo();
      setIsMusicPlaying(true);
    }
  };


  useEffect(() => {
    if (!isOpened) return;
    const colors = ['#4B6130', '#FFFFFF', '#D4AF37', '#141C0D'];
    let phase = 'burst';

    const getGutter = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : CARD_WIDTH;
      const gutter = Math.max(0, (vw - CARD_WIDTH) / 2);
      return { vw, gutter };
    };

    const spawn = () => {
      const { vw, gutter } = getGutter();
      const edgeZone = gutter > 24 ? gutter : vw * 0.14;

      const batch = Array.from({ length: phase === 'burst' ? 8 : 5 }).map(() => {
        idCounter.current += 1;
        let leftPx;
        if (phase === 'burst') {
          leftPx = Math.random() * vw;
        } else {
          const onLeft = Math.random() < 0.5;
          leftPx = onLeft ? Math.random() * edgeZone : vw - Math.random() * edgeZone;
        }
        return {
          id: idCounter.current,
          left: `${leftPx}px`,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: `${Math.random() * 6 + 6}px`,
          duration: `${Math.random() * 3 + 4}s`,
          delay: `${Math.random() * 0.5}s`,
          borderRadius: Math.random() > 0.5 ? '50%' : '0px',
        };
      });
      setConfetti((prev) => [...prev, ...batch].slice(-140));
    };

    spawn();
    const burstInterval = setInterval(spawn, 200);

    const phaseTimeout = setTimeout(() => {
      clearInterval(burstInterval);
      phase = 'side';
      spawn();
    }, 2200);

    const sideInterval = setInterval(() => {
      if (phase === 'side') spawn();
    }, 400);

    return () => {
      clearInterval(burstInterval);
      clearInterval(sideInterval);
      clearTimeout(phaseTimeout);
    };
  }, [isOpened]);

  const removePiece = useCallback((id) => {
    setConfetti((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const [heroRef, heroVisible] = useReveal(0.15);
  const [storyTitleRef, storyTitleVisible] = useReveal(0.15);
  const [isKRef, isKVisible] = useReveal(0.15);
  const [galeriTitleRef, galeriTitleVisible] = useReveal(0.15);
  const [footerRef, footerVisible] = useReveal(0.15);

  const timeLeft = useCountdown('2026-08-29T18:00:00+07:00');

  const galleryTiles = [
    { photo: pangdamImg, label: 'Mayjen TNI Dr. Agus Hadi Waluyo, S.A.P., M.M., CHRMP' },
    { photo: iskImg, label: 'Is K Violin' },
  ];

  return (
    <>
      <style>{tailwindStyles}</style>

      <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-[#4B6130] via-[#33481F] to-[#141C0D] relative overflow-hidden">
        <div className="absolute inset-0 bg-batik-gold opacity-70"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12), transparent 60%)' }}></div>
        <div className="w-full max-w-md bg-white relative shadow-[0_0_60px_rgba(0,0,0,0.7)] overflow-hidden">

          {/* Cover */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                initial={{ y: 0 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 z-50 bg-gradient-to-br from-[#33481F] via-[#22301A] to-[#141C0D] flex flex-col items-center justify-center p-6 text-center"
              >
            <div className="absolute inset-0 bg-batik opacity-50"></div>

            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] opacity-60"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] opacity-60"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] opacity-60"></div>
            <RankStar className="absolute top-4 left-4 w-4 h-4 text-[#D4AF37] opacity-80" />
            <RankStar className="absolute top-4 right-4 w-4 h-4 text-[#D4AF37] opacity-80" />
            <RankStar className="absolute bottom-4 left-4 w-4 h-4 text-[#D4AF37] opacity-80" />
            <RankStar className="absolute bottom-4 right-4 w-4 h-4 text-[#D4AF37] opacity-80" />
            <div className="absolute top-0 left-0 w-full loreng-strip opacity-90"></div>
            <div className="absolute bottom-0 left-0 w-full loreng-strip opacity-90"></div>

            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                }
              }}
              className="z-10 relative flex flex-col items-center"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="flex gap-4 justify-center items-center mb-6">
                <img src={tuankuTambusaiImg} alt="Kodam XIX/Tuanku Tambusai" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                <img src={siakImg} alt="Bupati Siak" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
              </motion.div>

              <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-[#D4AF37] tracking-[0.2em] text-xs font-semibold mb-3 uppercase">
                Undangan Terhormat
              </motion.h2>

              {/* Judul poster: Penyelenggara -> Present bintang tamu -> JUDUL BESAR -> keterangan rangka acara */}
              <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-[#D4AF37] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
                Kodam XIX/Tuanku Tambusai & Bupati Siak
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-[#D4AF37]/70 text-[9px] tracking-[0.2em] uppercase mb-4">
                Present Is K Violin
              </motion.p>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-script text-white text-5xl mb-2 drop-shadow-md">Konser Amal</motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-serif text-[#D4AF37] text-lg font-bold tracking-widest uppercase">
                Anak-Anak Palestine & Korban Bencana Gempa NTT
              </motion.p>

              <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-[#F5EFE6]/70 text-[9px] tracking-[0.15em] uppercase mt-3 max-w-[240px] leading-relaxed">
                Sempena HUT RI ke-81 & HUT ke-1 Kodam XIX/TT
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }} className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-10"></motion.div>

              <motion.button
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                onClick={handleOpenInvitation}
                className="pulse-btn group relative bg-gradient-to-r from-[#D4AF37] to-[#B8972E] text-[#141C0D] font-sans font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <MailOpen className="w-5 h-5" />
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>

          <main className="scroll-container bg-[#FDFBF7] relative w-full h-full">

            {/* Section 1: Hero Hijau Kodam */}
            <section className="relative bg-gradient-to-b from-[#4B6130] to-[#33481F] pt-16 pb-28 px-6 text-center">
              <div className="absolute inset-0 bg-batik opacity-30"></div>
              <Silhouettes.Fighters />

              <motion.div
                initial="hidden"
                animate={isOpened ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
                }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Judul poster (sama urutannya dengan Cover): Penyelenggara -> Present -> JUDUL -> rangka acara */}
                <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                  Kodam XIX/Tuanku Tambusai
                </motion.p>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#33481F] font-sans font-bold text-[10px] uppercase tracking-widest pl-1.5 pr-4 py-1.5 rounded-full mb-6 mt-1 shadow-md">
                  <span className="loreng-dot"></span>
                  Present Is K Violin
                </motion.div>

                <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-script text-5xl mb-2 text-[#FDE047] drop-shadow-lg">Konser Amal</motion.h1>
                <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-serif text-3xl font-bold tracking-wider mb-2 text-white">ANAK-ANAK PALESTINE</motion.h2>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } } }} className="merah-putih-rule w-14 rounded-full mt-3 mb-1"></motion.div>

                <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-[#D4AF37]/80 text-[9px] tracking-[0.15em] uppercase mt-3">
                  Sempena HUT RI ke-81 & HUT ke-1 Kodam XIX/TT
                </motion.p>

                <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="font-sans text-sm text-[#F5EFE6] mt-4 leading-relaxed max-w-[280px]">
                  Konser Amal untuk anak-anak Palestina ini lahir dari kepedulian yang menyatu — pertemuan CEO 'Muhammad', Irawan Adi Syah Putra bersama jajaran Kodam XIX/Tuanku Tambusai, hingga terwujud dalam sebuah panggung kemanusiaan bersama violinist cilik Is K.
                </motion.p>

                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="flex items-center gap-2.5 mt-8">
                  <CountdownBox value={timeLeft.days} label="Hari" />
                  <span className="text-[#D4AF37]/60 font-serif text-lg -mt-3">:</span>
                  <CountdownBox value={timeLeft.hours} label="Jam" />
                  <span className="text-[#D4AF37]/60 font-serif text-lg -mt-3">:</span>
                  <CountdownBox value={timeLeft.minutes} label="Menit" />
                  <span className="text-[#D4AF37]/60 font-serif text-lg -mt-3">:</span>
                  <CountdownBox value={timeLeft.seconds} label="Detik" />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="inline-block rounded-xl overflow-hidden mt-5 shadow-sm">
                  <div className="loreng-strip w-full"></div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 border-x border-b border-[#D4AF37]/30">
                    <p className="font-sans text-sm font-bold text-white">
                      Sabtu, 29 Agustus 2026<br />
                      <span className="text-[#F5EFE6]/80 font-normal">Lapangan Utama Makodam XIX/Tuanku Tambusai</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              <ShapeDivider topColor="#33481F" bottomColor="#FDFBF7" />
            </section>

            {/* Section 2: Storyboard — perjalanan lahirnya konser, gaya timeline "love story" */}
            <section className="relative bg-[#FDFBF7] pt-12 pb-24 px-8">
              <div ref={storyTitleRef} className={`reveal ${storyTitleVisible ? 'visible' : ''} text-center mb-10`}>
                <Quote className="w-8 h-8 text-[#D4AF37]/40 mx-auto mb-3" />
                <h3 className="font-script text-4xl text-[#33481F] mb-1">Storyboard</h3>
                <p className="font-sans text-xs text-gray-500 tracking-wide">Perjalanan lahirnya Konser Amal ini</p>
              </div>

              <div className="relative">
                <StoryboardItem
                  year="Juli 2026"
                  icon={Music2}
                  isLast={true}
                  delay={240}
                  description="Di salah satu hotel di Pekanbaru, terjadi pertemuan tim 'Is K' dengan Kasdam XIX/TT, Bapak Brigjen TNI Rudi Hermawan, S.E., M.M. Tak disangka, beliau yang berjiwa seni sangat setuju Konser Amal untuk anak-anak Palestina dan bantuan korban bencana NTT ini dilaksanakan sempena HUT RI ke-81 & HUT ke-1 Kodam XIX/Tuanku Tambusai — namun beliau meminta waktu beberapa hari untuk berkonsultasi dengan Bapak Pangdam. Alhamdulillah, penantian itu berbuah manis: jiwa kemanusiaan yang tumbuh subur pada diri Pangdam Tuanku Tambusai, Bapak Mayjen TNI Dr. Agus Hadi Waluyo, S.A.P., M.M., CHRMP, mengaminkan Konser Amal untuk anak-anak Palestina dan bantuan korban bencana NTT ini. Beliau menyatakan konser tersebut ditaja langsung oleh Kodam XIX/TT — mengingat beliau sebelumnya pernah mengadakan konser amal di tahun 2025 — dan beliau setuju konser ini ditalentai oleh violinist cilik dari Kabupaten Siak, 'Is K'."
                />
              </div>
              <ShapeDivider topColor="#FDFBF7" bottomColor="#33481F" isFlipped={true} />
            </section>

            {/* Section 3: Persembahan — Is K Violin */}
            <section className="relative bg-gradient-to-b from-[#33481F] to-[#22301A] pt-14 pb-28 px-6">
              <div className="absolute inset-0 bg-batik opacity-20"></div>

              <div ref={isKRef} className={`reveal ${isKVisible ? 'visible' : ''} relative z-10`}>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-[1px] w-10 bg-[#D4AF37]"></div>
                  <h3 className="font-serif text-2xl font-bold text-[#D4AF37] tracking-widest uppercase">Persembahan</h3>
                  <div className="h-[1px] w-10 bg-[#D4AF37]"></div>
                </div>

                <div className="bg-[#1C2814]/80 backdrop-blur-sm border border-[#D4AF37]/40 rounded-xl overflow-hidden text-center shadow-lg">
                  <div className="loreng-strip w-full"></div>
                  <div className="p-6">
                    <Music2 className="w-9 h-9 text-[#D4AF37] mx-auto mb-3" />
                    <p className="font-sans text-[#D4AF37]/70 text-[9px] tracking-[0.25em] uppercase mb-1">
                      Kodam XIX/Tuanku Tambusai Present
                    </p>
                    <h4 className="font-script text-4xl text-white mb-2">Is K Violin</h4>
                    <p className="font-sans text-xs text-gray-300 mb-1">Violinist Cilik dari Kabupaten Siak</p>
                    <p className="font-sans text-[11px] text-[#D4AF37] flex items-center justify-center gap-1 mb-4">
                      <Clock className="w-3 h-3" /> 19:30 - 19:50 WIB
                    </p>
                    <div className="text-xs text-[#D4AF37] font-sans space-y-1">
                      <p>Ditaja Langsung oleh Kodam XIX/Tuanku Tambusai</p>
                    </div>
                  </div>
                </div>
              </div>
              <ShapeDivider topColor="#22301A" bottomColor="#141C0D" />
            </section>

            {/* Section 4: Galeri Foto & Video */}
            <section className="relative bg-gradient-to-b from-[#141C0D] to-[#0f150a] pt-14 pb-20 px-6 overflow-hidden">
              <div className="absolute inset-0 bg-batik-gold opacity-40"></div>

              <div ref={galeriTitleRef} className={`reveal ${galeriTitleVisible ? 'visible' : ''} relative z-10 text-center mb-8`}>
                <div className="loreng-strip w-16 rounded-full mx-auto mb-5 opacity-80"></div>
                <h4 className="font-serif text-3xl font-bold text-[#FDE047] tracking-widest uppercase">GALERI</h4>
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-6 max-w-xs mx-auto">
                {galleryTiles.map((tile, idx) => (
                  <GalleryTile key={idx} icon={tile.icon} label={tile.label} isVideo={tile.isVideo} photo={tile.photo} delay={idx * 90} />
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#24331a] pt-16 pb-12 px-6 text-center relative overflow-hidden">
              <div ref={footerRef} className={`reveal-scale ${footerVisible ? 'visible' : ''} relative z-10`}>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-[#D4AF37]/40"></div>
                  <RankStar className="w-4 h-4 text-[#D4AF37]" />
                  <div className="w-12 h-[1px] bg-[#D4AF37]/40"></div>
                </div>

                <p className="font-script text-4xl text-[#D4AF37] mb-3">Konser Amal</p>
                <p className="font-sans text-[10px] text-gray-300 tracking-[0.2em] uppercase mb-8">29 Agustus 2026</p>

                <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-[280px] mx-auto mb-6">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan turut mendukung Konser Amal untuk anak-anak Palestina ini.
                </p>
                <p className="font-sans text-sm font-bold text-white mb-10">Terima Kasih.</p>

                <div className="w-full max-w-full h-[1px] bg-white/70 mx-auto mb-6"></div>

                <a
                  href="https://seikat.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] text-gray-400 hover:text-white transition-colors"
                >
                  seikat.my.id
                </a>
              </div>
            </footer>

          </main>

          {/* Tombol musik mengambang — muncul begitu undangan dibuka */}
          {isOpened && (
            <button
              onClick={toggleMusic}
              disabled={!isPlayerReady}
              aria-label={isMusicPlaying ? 'Matikan musik' : 'Putar musik'}
              className="absolute bottom-5 right-5 z-[70] w-12 h-12 rounded-full bg-[#354326] border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            >
              <SoundBars
                active={isMusicPlaying}
                className={`w-5 h-5 ${isMusicPlaying ? 'text-white' : 'text-white/50'}`}
              />
            </button>
          )}
        </div>

        {confetti.map((c) => (
          <div
            key={c.id}
            className="confetti-piece"
            onAnimationEnd={() => removePiece(c.id)}
            style={{
              left: c.left, backgroundColor: c.color, width: c.size, height: c.size,
              animationDuration: c.duration, animationDelay: c.delay, borderRadius: c.borderRadius,
            }}
          ></div>
        ))}

        {/* Wrapper kosong & stabil — React tidak pernah merender children di sini lewat JSX,
            jadi aman ditukar YouTube jadi <iframe> di baliknya tanpa bikin React bingung */}
        <div ref={ytWrapperRef} style={{ position: 'fixed', width: 1, height: 1, bottom: 0, left: 0, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }}></div>
      </div>
    </>
  );
}