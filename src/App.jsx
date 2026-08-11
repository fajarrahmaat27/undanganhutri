import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Flag, MailOpen, Quote, Clock, Check, Heart, Trophy, Users, Baby, Volume2, VolumeX, Music } from 'lucide-react';

const tailwindStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Inter:wght@300;400;600;700&family=Great+Vibes&display=swap');

  .font-serif { font-family: 'Cinzel', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
  .font-script { font-family: 'Great Vibes', cursive; }

  body {
    margin: 0;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    background: radial-gradient(ellipse at 50% 0%, #6e1220 0%, #5C0B15 45%, #4a0810 75%, #3b0a12 100%);
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

// Komponen Gelombang dengan Garis Emas
const ShapeDivider = ({ topColor, bottomColor, isFlipped = false }) => {
  return (
    <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20" style={{ transform: isFlipped ? 'scaleX(-1)' : 'none' }}>
      <svg className="block w-[calc(100%+2px)] h-[70px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,40 C300,100 900,10 1200,50 L1200,120 L0,120 Z" fill="#D4AF37" />
        <path d="M0,50 C300,110 900,20 1200,60 L1200,120 L0,120 Z" fill={bottomColor} />
      </svg>
    </div>
  );
};

// ---- Figur manusia siluet yang lebih realistis, dipakai berulang ----
const PersonFigure = ({ pose = 'stand', flip = false }) => {
  const poses = {
    // berdiri santai, tangan di samping
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
    // memegang tiang bendera tinggi ke atas
    flagBearer: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        {/* lengan terangkat memegang tiang */}
        <path d="M4,-30 C8,-40 12,-55 14,-72 L11,-73 C8,-56 5,-42 1,-32 Z" />
        <path d="M-6,-29 C-9,-27 -11,-18 -10,-10 L-7,-11 C-8,-18 -6,-25 -4,-28 Z" />
        {/* tiang bendera */}
        <line x1="14" y1="-72" x2="14" y2="10" stroke="currentColor" strokeWidth="1.6" />
        {/* bendera berkibar */}
        <path d="M14,-72 C24,-70 30,-66 40,-68 C36,-63 36,-58 40,-53 C30,-55 24,-51 14,-53 Z" />
      </>
    ),
    // hormat / salute militer
    salute: (
      <>
        <path d="M-7,-40 C-7,-46 7,-46 7,-40 L7,-33 L-7,-33 Z" /> {/* topi */}
        <circle cx="0" cy="-32" r="6.5" />
        <path d="M-6,-25 C-6,-25 -9,-6 -8,6 L-2,6 L0,-10 L2,6 L8,6 C9,-6 6,-25 6,-25 C6,-25 0,-28 0,-28 C0,-28 -6,-25 -6,-25 Z" />
        <path d="M-8,6 L-10,26 L-4,26 L-1,8 Z" />
        <path d="M8,6 L10,26 L4,26 L1,8 Z" />
        {/* tangan hormat ke dahi */}
        <path d="M5,-24 C9,-27 10,-31 8,-34 L5,-32 C6,-30 5,-27 2,-25 Z" />
        <path d="M-6,-23 C-9,-21 -11,-12 -10,-4 L-7,-5 C-8,-12 -6,-19 -4,-22 Z" />
      </>
    ),
    // dua orang berpegangan tangan (gotong royong)
    holdHands: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        {/* lengan terulur menyamping untuk berpegangan */}
        <path d="M6,-29 C11,-27 15,-22 17,-16 L14,-14 C12,-20 9,-24 4,-27 Z" />
        <path d="M-6,-29 C-9,-27 -11,-18 -10,-10 L-7,-11 C-8,-18 -6,-25 -4,-28 Z" />
      </>
    ),
    // berpegangan tangan dua sisi (kiri & kanan), untuk dirangkai jadi rantai orang bergandengan tangan
    chainHold: (
      <>
        <circle cx="0" cy="-38" r="7" />
        <path d="M-6,-31 C-6,-31 -9,-10 -8,4 L-2,4 L0,-14 L2,4 L8,4 C9,-10 6,-31 6,-31 C6,-31 0,-34 0,-34 C0,-34 -6,-31 -6,-31 Z" />
        <path d="M-8,4 L-10,26 L-4,26 L-1,6 Z" />
        <path d="M8,4 L10,26 L4,26 L1,6 Z" />
        {/* lengan kanan terulur menyamping */}
        <path d="M6,-29 C11,-27 15,-22 17,-16 L14,-14 C12,-20 9,-24 4,-27 Z" />
        {/* lengan kiri terulur menyamping (cermin) */}
        <path d="M-6,-29 C-11,-27 -15,-22 -17,-16 L-14,-14 C-12,-20 -9,-24 -4,-27 Z" />
      </>
    ),
  };

  return <g transform={flip ? 'scale(-1,1)' : undefined}>{poses[pose]}</g>;
};

// Rumah adat: bentuk disederhanakan agar jelas terbaca sebagai rumah panggung beratap pelana
const RumahAdatShape = ({ x = 0, scale = 1 }) => (
  <g transform={`translate(${x},0) scale(${scale})`}>
    {/* atap pelana melengkung lembut, ujung sedikit naik — silhouette rumah adat yang jelas */}
    <path d="M-34,2 C-30,-9 -18,-11 -14,-21 C-9,-15 9,-15 14,-21 C18,-11 30,-9 34,2 Z" />
    {/* badan rumah */}
    <rect x="-26" y="2" width="52" height="15" />
    {/* pintu */}
    <rect x="-6" y="8" width="12" height="9" fill="#5C0B15" opacity="0.55" />
    {/* tiang panggung */}
    <rect x="-22" y="17" width="4" height="9" />
    <rect x="18" y="17" width="4" height="9" />
    <rect x="-2" y="17" width="4" height="9" />
  </g>
);

// Kumpulan Siluet SVG — versi lebih hidup & terperinci
const Silhouettes = {
  // Sinar matahari setengah — garis memancar dari satu titik di bawah,
  // mekar setengah lingkaran ke atas seperti matahari terbit.
  Fighters: () => {
    const numRays = 15;
    const rays = Array.from({ length: numRays }).map((_, i) => {
      const angle = -90 + (180 / (numRays - 1)) * i;
      const len = i % 2 === 0 ? 72 : 50;
      return { angle, len };
    });

    return (
      <svg viewBox="0 0 200 140" className="absolute bottom-0 left-0 w-full h-52 opacity-[0.22] text-white pointer-events-none" fill="currentColor">
        <g transform="translate(100,120) scale(1.7)">
          {rays.map((r, i) => (
            <path key={i} transform={`rotate(${r.angle})`} d={`M-3,0 L3,0 L0,${-r.len} Z`} />
          ))}
        </g>
      </svg>
    );
  },
  // Bergandengan tangan terus-menerus, lengan kiri & kanan saling menyambung
  People: () => (
    <svg viewBox="0 0 200 100" className="absolute bottom-10 left-0 w-full h-28 opacity-[0.09] text-[#8A1321] pointer-events-none" fill="currentColor">
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
  // Motif pita chevron emas (kesan lencana/pangkat kemiliteran), menggantikan pola bintang
  Military: () => (
    <svg viewBox="0 0 200 50" className="absolute bottom-8 left-0 w-full h-20 opacity-[0.2] text-[#D4AF37] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: 13 }).map((_, i) => (
        <path key={i} d={`M${i * 16 + 2},36 L${i * 16 + 10},22 L${i * 16 + 18},36`} />
      ))}
      <line x1="0" y1="42" x2="200" y2="42" opacity="0.55" />
      <line x1="0" y1="46" x2="200" y2="46" opacity="0.3" />
    </svg>
  ),
  // Rangkaian bendera segitiga (bunting) menggantung di tali LURUS —
  // versi sederhana sesuai permintaan, bendera menempel langsung di garis.
  Skyline: () => {
    const width = 400;
    const lineY = 10;
    const flagColors = ['#D4AF37', '#FDFBF7', '#B71C1C'];
    const flagCount = 26;
    const flagSpacing = width / flagCount;

    return (
      <svg viewBox={`0 0 ${width} 40`} className="absolute top-0 left-0 w-full h-12 pointer-events-none" fill="none">
        {/* tali lurus */}
        <line x1="0" y1={lineY} x2={width} y2={lineY} stroke="#FDFBF7" strokeWidth="1.5" opacity="0.65" />
        {/* bendera segitiga, sisi atas menempel persis di tali */}
        {Array.from({ length: flagCount }).map((_, i) => {
          const x = (i + 0.5) * flagSpacing;
          const y = lineY - 0.6; // sedikit overlap ke tali agar menyatu
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
  // Footer adat — deretan rumah tradisional dengan atap tanduk melengkung, warna emas agar jelas terlihat
  RumahAdat: () => (
    <svg viewBox="0 0 200 48" className="absolute bottom-0 left-0 w-full h-auto text-[#D4AF37] opacity-[0.45] pointer-events-none" fill="currentColor">
      <RumahAdatShape x={34} scale={0.8} />
      <RumahAdatShape x={100} scale={1} />
      <RumahAdatShape x={166} scale={0.8} />
      <rect x="0" y="32" width="200" height="2" opacity="0.6" />
    </svg>
  ),
};

const LombaCard = ({ icon: Icon, title, time, items, borderColor, textColor, bgLight, delay = 0 }) => {
  const [ref, visible] = useReveal(0.15);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`reveal ${visible ? 'visible' : ''} bg-white rounded-xl p-5 shadow-lg border-l-4 ${borderColor} relative overflow-hidden transform transition hover:scale-105`}
    >
      <Icon className={`absolute -right-2 -top-2 w-16 h-16 ${bgLight} opacity-30 transform rotate-12`} />
      <h5 className={`font-serif font-bold ${textColor} text-lg mb-1 relative z-10`}>{title}</h5>
      <p className="font-sans text-xs text-gray-500 mb-3 relative z-10 flex items-center">
        <Clock className="w-3 h-3 mr-1" /> {time}
      </p>
      <ul className="font-sans text-sm text-gray-700 space-y-2 relative z-10">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <Check className={`w-4 h-4 mr-2 ${textColor}`} /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);
  const [confetti, setConfetti] = useState([]);
  const idCounter = useRef(0);
  const CARD_WIDTH = 448; // sesuai max-w-md (28rem)

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
        '*'
      );
    }
  };

  const toggleMusic = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = nextState ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
    }
  };

  // Confetti dua fase: pertama kali buka -> memenuhi seluruh layar,
  // lalu setelah beberapa detik -> hanya jatuh di sisi kiri & kanan yang polos (di luar kartu)
  useEffect(() => {
    if (!isOpened) return;
    const colors = ['#D32F2F', '#FFFFFF', '#D4AF37', '#8A1321'];
    let phase = 'burst';

    const getGutter = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : CARD_WIDTH;
      const gutter = Math.max(0, (vw - CARD_WIDTH) / 2);
      return { vw, gutter };
    };

    const spawn = () => {
      const { vw, gutter } = getGutter();
      // Di layar lebar ada gutter asli di luar kartu; di HP (kartu penuh layar)
      // pakai zona pinggir ~14% lebar layar supaya confetti tetap di sisi, bukan di tengah teks.
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
      setConfetti((prev) => [...prev, ...batch].slice(-140)); // cap agar tetap ringan
    };

    spawn();
    const burstInterval = setInterval(spawn, 200);

    // Setelah ledakan awal, alihkan ke mode "hanya di sisi kiri-kanan"
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

  // Refs reveal untuk tiap section
  const [heroRef, heroVisible] = useReveal(0.15);
  const [salamRef, salamVisible] = useReveal(0.15);
  const [upacaraRef, upacaraVisible] = useReveal(0.15);
  const [lombaTitleRef, lombaTitleVisible] = useReveal(0.15);
  const [footerRef, footerVisible] = useReveal(0.15);

  return (
    <>
      <style>{tailwindStyles}</style>

      {/* Hidden YouTube Audio Player */}
      <iframe
        ref={iframeRef}
        className="hidden"
        src="https://www.youtube.com/embed/E9sABy_xvzE?enablejsapi=1&autoplay=0&loop=1&playlist=E9sABy_xvzE"
        title="Background Music"
        allow="autoplay"
      />

      {/* Container Utama pembatas ukuran HP — gutter kini bernuansa merah-emas, bukan hitam polos */}
      <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-[#7a1524] via-[#5C0B15] to-[#3b0a12] relative overflow-hidden">
        <div className="absolute inset-0 bg-batik-gold opacity-70"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12), transparent 60%)' }}></div>
        <div className="w-full max-w-md bg-white relative shadow-[0_0_60px_rgba(0,0,0,0.7)] overflow-hidden">

          {/* Tombol Pause/Play Musik di Pojok Kanan Bawah (di dalam kartu undangan) */}
          {isOpened && (
            <button
              onClick={toggleMusic}
              className="absolute bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#D4AF37] text-[#5C0B15] shadow-2xl flex items-center justify-center border-2 border-[#5C0B15] transition-all hover:scale-110 active:scale-95 cursor-pointer"
              title={isPlaying ? "Jeda Musik" : "Putar Musik"}
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 animate-pulse" />
              ) : (
                <VolumeX className="w-5 h-5 opacity-70" />
              )}
            </button>
          )}

          {/* Cover */}
          <div
            className={`absolute inset-0 z-50 bg-gradient-to-br from-[#8A1321] via-[#5C0B15] to-[#3b0005] flex flex-col items-center justify-center p-6 text-center transition-transform duration-1000 ease-in-out ${isOpened ? '-translate-y-full' : 'translate-y-0'}`}
          >
            <div className="absolute inset-0 bg-batik opacity-50"></div>

            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] opacity-60"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] opacity-60"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] opacity-60"></div>

            <div className="z-10 relative flex flex-col items-center">
              <div className="w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-[#D4AF37]/20 border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-bounce">
                <Flag className="w-10 h-10 text-[#D4AF37]" />
              </div>

              <h2 className="font-sans text-[#D4AF37] tracking-[0.2em] text-xs font-semibold mb-3 uppercase">
                Undangan Terhormat
              </h2>
              <h1 className="font-script text-white text-6xl mb-2 drop-shadow-md">Pesta Rakyat</h1>
              <p className="font-serif text-[#D4AF37] text-lg font-bold tracking-widest uppercase">
                & HUT KODAM
              </p>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-10"></div>

              <button
                onClick={handleOpenInvitation}
                className="pulse-btn group relative bg-gradient-to-r from-[#D4AF37] to-[#B8972E] text-[#5C0B15] font-sans font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <MailOpen className="w-5 h-5" />
                Buka Undangan
              </button>
            </div>
          </div>

          <main className="scroll-container bg-[#FDFBF7] relative w-full h-full">

            {/* Section 1: Hero Merah Menyala */}
            <section className="relative bg-gradient-to-b from-[#C62828] to-[#8A1321] pt-16 pb-28 px-6 text-center">
              <div className="absolute inset-0 bg-batik opacity-30"></div>
              <Silhouettes.Fighters />

              <div ref={heroRef} className={`reveal ${heroVisible ? 'visible' : ''} relative z-10 flex flex-col items-center`}>
                <div className="inline-block bg-[#D4AF37] text-[#5C0B15] font-sans font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-md">
                  Dirgahayu Republik Indonesia ke-81
                </div>

                <h1 className="font-script text-5xl mb-2 text-[#FDE047] drop-shadow-lg">Syukuran & Pesta</h1>
                <h2 className="font-serif text-3xl font-bold tracking-wider mb-2 text-white">HUT KODAM</h2>

                <p className="font-sans text-sm text-[#F5EFE6] mt-6 leading-relaxed max-w-[280px]">
                  Merayakan kemerdekaan dan kebersamaan dalam balutan semangat persatuan, "Bersama Rakyat, TNI Kuat".
                </p>
              </div>
              <ShapeDivider topColor="#8A1321" bottomColor="#FDFBF7" />
            </section>

            {/* Section 2: Salam */}
            <section className="relative bg-[#FDFBF7] pt-12 pb-24 px-8 text-center">
              <Silhouettes.People />

              <div ref={salamRef} className={`reveal ${salamVisible ? 'visible' : ''} relative z-10`}>
                <Quote className="w-10 h-10 text-[#D4AF37]/30 mx-auto mb-4" />
                <h3 className="font-script text-4xl text-[#8A1321] mb-6">Salam Hangat,</h3>

                <p className="font-sans text-sm text-gray-700 leading-relaxed mb-6">
                  Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam Puncak Peringatan HUT Kodam yang dirangkaikan dengan Semarak Kemerdekaan RI.
                </p>
                <div className="bg-white/60 p-4 rounded-xl border border-[#EBE1D1] inline-block mb-8 shadow-sm">
                  <p className="font-sans text-sm font-bold text-[#C62828]">
                    Senin, 17 Agustus 2026<br />
                    <span className="text-gray-600 font-normal">Lapangan Utama Makodam</span>
                  </p>
                </div>
              </div>
              <ShapeDivider topColor="#FDFBF7" bottomColor="#2C3A1D" isFlipped={true} />
            </section>

            {/* Section 3: Upacara TNI */}
            <section className="relative bg-gradient-to-b from-[#2C3A1D] to-[#1E2714] pt-14 pb-28 px-6">
              <div className="absolute inset-0 bg-batik opacity-20"></div>
              <Silhouettes.Military />

              <div ref={upacaraRef} className={`reveal ${upacaraVisible ? 'visible' : ''} relative z-10`}>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-[1px] w-10 bg-[#D4AF37]"></div>
                  <h3 className="font-serif text-2xl font-bold text-[#D4AF37] tracking-widest uppercase">Upacara Tni</h3>
                  <div className="h-[1px] w-10 bg-[#D4AF37]"></div>
                </div>

                <div className="bg-[#1a2311]/80 backdrop-blur-sm border border-[#D4AF37]/40 rounded-xl p-5 text-center shadow-lg">
                  <Flag className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                  <h4 className="font-serif text-white font-bold mb-2">Detik-Detik Proklamasi</h4>
                  <p className="font-sans text-xs text-gray-300 mb-4">07:30 WIB - Selesai</p>
                  <div className="text-xs text-[#D4AF37] font-sans space-y-1">
                    <p>• Pengibaran Sang Saka Merah Putih</p>
                    <p>• Defile Pasukan & Alutsista</p>
                  </div>
                </div>
              </div>
              <ShapeDivider topColor="#1E2714" bottomColor="#B71C1C" />
            </section>

            {/* Section 4: Lomba 17-an */}
            <section className="relative bg-[#B71C1C] pt-14 pb-24 px-6">
              <div className="absolute inset-0 bg-batik opacity-20"></div>
              <Silhouettes.Skyline />

              <div className="relative z-10">
                <div ref={lombaTitleRef} className={`reveal ${lombaTitleVisible ? 'visible' : ''} text-center mb-10 mt-4`}>
                  <h3 className="font-script text-4xl text-[#FDE047] mb-1">Semarak</h3>
                  <h4 className="font-serif text-2xl font-bold text-white tracking-widest">LOMBA 17-AN</h4>
                </div>

                <div className="space-y-4">
                  <LombaCard
                    icon={Baby} title="Kategori Anak" time="09:00 - 12:00 WIB"
                    items={['Balap Karung Helm', 'Makan Kerupuk']}
                    borderColor="border-[#D4AF37]" textColor="text-[#8A1321]" bgLight="text-[#D4AF37]"
                    delay={0}
                  />
                  <LombaCard
                    icon={Users} title="Kategori Emak-Emak" time="13:00 - 15:00 WIB"
                    items={['Rias Wajah Tertutup', 'Estafet Tepung']}
                    borderColor="border-[#B71C1C]" textColor="text-[#B71C1C]" bgLight="text-[#B71C1C]"
                    delay={120}
                  />
                  <LombaCard
                    icon={Trophy} title="Bapak & Prajurit" time="15:30 - Selesai"
                    items={['Tarik Tambang Panser', 'Panjat Pinang']}
                    borderColor="border-[#2C3A1D]" textColor="text-[#2C3A1D]" bgLight="text-[#2C3A1D]"
                    delay={240}
                  />
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#5C0B15] pt-12 pb-6 px-6 text-center text-[#D4AF37] relative overflow-hidden">

              <div ref={footerRef} className={`reveal-scale ${footerVisible ? 'visible' : ''} relative z-10`}>
                <p className="font-script text-3xl mb-2">Sampai Jumpa,</p>
                <p className="font-sans text-[10px] text-gray-300 tracking-[0.2em] uppercase mb-6">Di Pesta Rakyat</p>
              </div>
            </footer>
          </main>
        </div>

        {/* Confetti — dirender di level terluar (bukan di dalam kartu) agar bisa jatuh
            memenuhi seluruh layar di awal, lalu hanya di sisi kiri & kanan setelahnya */}
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
      </div>
    </>
  );
}