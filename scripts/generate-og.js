import sharp from 'sharp';
import fs from 'fs';

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Resize logos
  const logoKodam = await sharp('src/assets/tuankutambusai.png')
    .resize({ height: 110, fit: 'inside' })
    .toBuffer();
    
  const logoSiak = await sharp('src/assets/siak.png')
    .resize({ height: 110, fit: 'inside' })
    .toBuffer();

  // Create circular masked Pangdam
  const pangdamSize = 130;
  const pangdamCircle = Buffer.from(`<svg width="${pangdamSize}" height="${pangdamSize}"><circle cx="${pangdamSize/2}" cy="${pangdamSize/2}" r="${pangdamSize/2}" fill="#fff"/></svg>`);
  const pangdamResized = await sharp('src/assets/pangdam.png')
    .resize(pangdamSize, pangdamSize, { fit: 'cover', position: 'top' })
    .composite([{ input: pangdamCircle, blend: 'dest-in' }])
    .toBuffer();

  // Create circular masked Bupati
  const bupatiSize = 130;
  const bupatiCircle = Buffer.from(`<svg width="${bupatiSize}" height="${bupatiSize}"><circle cx="${bupatiSize/2}" cy="${bupatiSize/2}" r="${bupatiSize/2}" fill="#fff"/></svg>`);
  const bupatiResized = await sharp('src/assets/bupatisiak.png')
    .resize(bupatiSize, bupatiSize, { fit: 'cover', position: 'top' })
    .composite([{ input: bupatiCircle, blend: 'dest-in' }])
    .toBuffer();

  // Create circular masked Is K
  const iskSize = 150;
  const iskCircle = Buffer.from(`<svg width="${iskSize}" height="${iskSize}"><circle cx="${iskSize/2}" cy="${iskSize/2}" r="${iskSize/2}" fill="#fff"/></svg>`);
  const iskResized = await sharp('src/assets/isk.png')
    .resize(iskSize, iskSize, { fit: 'cover', position: 'top' })
    .composite([{ input: iskCircle, blend: 'dest-in' }])
    .toBuffer();

  // SVG Overlay for typography, frames, golden ornaments, badges, and background graphics
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1E2C12" />
        <stop offset="40%" stop-color="#141C0D" />
        <stop offset="100%" stop-color="#0A0F06" />
      </linearGradient>
      <radialGradient id="goldGlowCenter" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.22" />
        <stop offset="60%" stop-color="#D4AF37" stop-opacity="0.03" />
        <stop offset="100%" stop-color="#141C0D" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#C59B27" />
        <stop offset="50%" stop-color="#FDF0CD" />
        <stop offset="100%" stop-color="#D4AF37" />
      </linearGradient>
      <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#9E1A1A" />
        <stop offset="50%" stop-color="#D32F2F" />
        <stop offset="100%" stop-color="#9E1A1A" />
      </linearGradient>
      <pattern id="kawungPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="8" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-opacity="0.15" />
        <circle cx="30" cy="10" r="8" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-opacity="0.15" />
        <circle cx="10" cy="30" r="8" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-opacity="0.15" />
        <circle cx="30" cy="30" r="8" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-opacity="0.15" />
        <circle cx="20" cy="20" r="8" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-opacity="0.12" />
      </pattern>
      <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.8" />
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#kawungPattern)" />
    <rect width="${width}" height="${height}" fill="url(#goldGlowCenter)" />

    <!-- Outer Frame and Corner Ornaments -->
    <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.45" />
    <rect x="32" y="32" width="1136" height="566" rx="12" fill="none" stroke="#D4AF37" stroke-width="0.8" stroke-dasharray="6 4" stroke-opacity="0.3" />

    <!-- Decorative Corner Gold Lines -->
    <path d="M24 60 L60 60 L60 24" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
    <path d="M1176 60 L1140 60 L1140 24" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
    <path d="M24 570 L60 570 L60 606" fill="none" stroke="url(#goldGrad)" stroke-width="3" />
    <path d="M1176 570 L1140 570 L1140 606" fill="none" stroke="url(#goldGrad)" stroke-width="3" />

    <!-- Top Red-White Ribbon Bar -->
    <rect x="24" y="24" width="1152" height="6" fill="#D32F2F" />
    <rect x="400" y="24" width="400" height="6" fill="#FFFFFF" opacity="0.9" />

    <!-- Top Header Badge -->
    <g transform="translate(600, 70)">
      <rect x="-240" y="-18" width="480" height="36" rx="18" fill="#1C2814" stroke="url(#goldGrad)" stroke-width="1.5" filter="url(#goldShadow)" />
      <text x="0" y="6" font-family="'Cinzel', 'Times New Roman', serif" font-size="14" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">
        UNDANGAN RESMI &amp; KONSER AMAL
      </text>
    </g>

    <!-- Subtitle Penyelenggara -->
    <text x="600" y="125" font-family="'Inter', 'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#E5C365" text-anchor="middle" letter-spacing="4">
      KODAM XIX/TUANKU TAMBUSAI &amp; BUPATI SIAK
    </text>
    <text x="600" y="148" font-family="'Inter', 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#F5EFE6" opacity="0.8" text-anchor="middle" letter-spacing="2">
      SEMPENA DIRGAHAYU RI KE-81 &amp; HUT KE-1 KODAM XIX/TT
    </text>

    <!-- Gold Divider with Stars -->
    <line x1="420" y1="164" x2="780" y2="164" stroke="url(#goldGrad)" stroke-width="1.2" opacity="0.7" />
    <polygon points="600,158 604,164 600,170 596,164" fill="#FDF0CD" />
    <polygon points="520,160 523,164 520,168 517,164" fill="#D4AF37" />
    <polygon points="680,160 683,164 680,168 677,164" fill="#D4AF37" />

    <!-- Main Title: KONSER AMAL -->
    <text x="600" y="240" font-family="'Brush Script MT', 'Great Vibes', cursive, serif" font-size="74" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" filter="url(#goldShadow)">
      Konser Amal
    </text>

    <!-- Artist and Event Focus -->
    <g transform="translate(600, 285)">
      <rect x="-160" y="-16" width="320" height="32" rx="16" fill="#B7292F" filter="url(#goldShadow)" />
      <text x="0" y="6" font-family="'Cinzel', 'Times New Roman', serif" font-size="17" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">
        IS K VIOLIN
      </text>
    </g>
    <text x="600" y="325" font-family="'Inter', 'Segoe UI', sans-serif" font-size="13" font-style="italic" font-weight="600" fill="#FDF0CD" text-anchor="middle" letter-spacing="2">
      &quot;Dari Anak Untuk Anak&quot;
    </text>

    <!-- Purpose / Humanitarian Notice -->
    <text x="600" y="360" font-family="'Cinzel', 'Times New Roman', serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
      UNTUK ANAK-ANAK PALESTINA &amp; KORBAN BENCANA GEMPA NTT
    </text>

    <!-- Circular Gold Rings for Photos -->
    <!-- Left Photo (Pangdam): cx=170, cy=350 -->
    <circle cx="170" cy="350" r="69" fill="none" stroke="url(#goldGrad)" stroke-width="3" filter="url(#goldShadow)" />
    <text x="170" y="438" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" fill="#E5C365" text-anchor="middle" letter-spacing="1">PANGDAM XIX/TT</text>
    <text x="170" y="452" font-family="'Inter', sans-serif" font-size="8.5" fill="#F5EFE6" opacity="0.9" text-anchor="middle">Mayjen TNI Dr. Agus Hadi Waluyo</text>

    <!-- Right Photo (Bupati Siak): cx=1030, cy=350 -->
    <circle cx="1030" cy="350" r="69" fill="none" stroke="url(#goldGrad)" stroke-width="3" filter="url(#goldShadow)" />
    <text x="1030" y="438" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" fill="#E5C365" text-anchor="middle" letter-spacing="1">BUPATI SIAK</text>
    <text x="1030" y="452" font-family="'Inter', sans-serif" font-size="8.5" fill="#F5EFE6" opacity="0.9" text-anchor="middle">Dr. Afni Z, S.A.P., M.Si</text>

    <!-- Center Is K Photo Ring: cx=600, cy=425 -->
    <circle cx="600" cy="425" r="79" fill="none" stroke="url(#goldGrad)" stroke-width="4" filter="url(#goldShadow)" />

    <!-- Event Date and Venue Bottom Info Card -->
    <g transform="translate(600, 545)">
      <rect x="-380" y="-28" width="760" height="56" rx="28" fill="#1C2814" stroke="url(#goldGrad)" stroke-width="1.8" filter="url(#goldShadow)" />
      
      <!-- Calendar Icon Simple Graphic -->
      <g transform="translate(-320, -10)">
        <rect x="0" y="0" width="20" height="20" rx="3" fill="none" stroke="#D4AF37" stroke-width="1.5" />
        <line x1="0" y1="6" x2="20" y2="6" stroke="#D4AF37" stroke-width="1.5" />
        <circle cx="5" cy="11" r="1.5" fill="#D4AF37" />
        <circle cx="10" cy="11" r="1.5" fill="#D4AF37" />
        <circle cx="15" cy="11" r="1.5" fill="#D4AF37" />
      </g>
      
      <text x="-285" y="-3" font-family="'Cinzel', 'Times New Roman', serif" font-size="14" font-weight="bold" fill="#FFFFFF" letter-spacing="1">
        SABTU, 29 AGUSTUS 2026
      </text>
      <text x="-285" y="15" font-family="'Inter', sans-serif" font-size="11" fill="#D4AF37" font-weight="600">
        Pukul 18.00 WIB s/d Selesai
      </text>

      <line x1="-50" y1="-18" x2="-50" y2="18" stroke="#D4AF37" stroke-width="1" opacity="0.4" />

      <!-- Location Pin Simple Graphic -->
      <g transform="translate(-25, -10)">
        <path d="M8 0 C3.5 0 0 3.5 0 8 C0 14 8 20 8 20 C8 20 16 14 16 8 C16 3.5 12.5 0 8 0 Z M8 11 C6.3 11 5 9.7 5 8 C5 6.3 6.3 5 8 5 C9.7 5 11 6.3 11 8 C11 9.7 9.7 11 8 11 Z" fill="#D4AF37" />
      </g>

      <text x="0" y="-3" font-family="'Cinzel', 'Times New Roman', serif" font-size="13" font-weight="bold" fill="#FFFFFF" letter-spacing="1">
        LAPANGAN UTAMA MAKODAM XIX/TT
      </text>
      <text x="0" y="15" font-family="'Inter', sans-serif" font-size="11" fill="#D4AF37" font-weight="600">
        Pekanbaru, Riau - Indonesia
      </text>
    </g>

  </svg>
  `;

  const baseSvgBuffer = Buffer.from(svgOverlay);

  // Composite all together
  await sharp(baseSvgBuffer)
    .composite([
      // Logos at top left and top right
      { input: logoKodam, top: 48, left: 60 },
      { input: logoSiak, top: 48, left: 1040 },
      // People photos inside golden rings
      { input: pangdamResized, top: 285, left: 105 },
      { input: bupatiResized, top: 285, left: 965 },
      { input: iskResized, top: 350, left: 525 }
    ])
    .jpeg({ quality: 92 })
    .toFile('public/og-image.jpg');

  // Also create a PNG version
  await sharp(baseSvgBuffer)
    .composite([
      { input: logoKodam, top: 48, left: 60 },
      { input: logoSiak, top: 48, left: 1040 },
      { input: pangdamResized, top: 285, left: 105 },
      { input: bupatiResized, top: 285, left: 965 },
      { input: iskResized, top: 350, left: 525 }
    ])
    .png()
    .toFile('public/og-image.png');

  console.log('OG Images created successfully: public/og-image.jpg & public/og-image.png');
}

createOgImage().catch(console.error);
