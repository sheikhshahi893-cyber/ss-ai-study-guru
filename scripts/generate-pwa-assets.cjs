const sharp = require('sharp');
const fs = require('fs');

const brandIconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="110" fill="#0f172a"/>
  <rect x="24" y="24" width="464" height="464" rx="90" fill="url(#amberGrad)" stroke="#fbbf24" stroke-width="8"/>
  <circle cx="256" cy="256" r="160" fill="#090d16" stroke="#f59e0b" stroke-width="6"/>
  <text x="256" y="275" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="140" font-weight="900" fill="#fbbf24" text-anchor="middle" letter-spacing="-4">S.S</text>
  <text x="256" y="340" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="28" font-weight="800" fill="#f8fafc" text-anchor="middle" letter-spacing="4">STUDY GURU</text>
  <defs>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
  </defs>
</svg>
`;

const maskableIconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0f172a"/>
  <rect x="66" y="66" width="380" height="380" rx="80" fill="url(#amberGrad)" stroke="#fbbf24" stroke-width="6"/>
  <circle cx="256" cy="256" r="130" fill="#090d16" stroke="#f59e0b" stroke-width="4"/>
  <text x="256" y="270" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="110" font-weight="900" fill="#fbbf24" text-anchor="middle" letter-spacing="-3">S.S</text>
  <text x="256" y="325" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="22" font-weight="800" fill="#f8fafc" text-anchor="middle" letter-spacing="3">AI GURU</text>
  <defs>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
  </defs>
</svg>
`;

const screenshotDesktopSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="720" fill="#0b1120"/>
  <rect width="1280" height="64" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <rect x="24" y="14" width="36" height="36" rx="10" fill="#f59e0b"/>
  <text x="42" y="38" font-family="sans-serif" font-size="16" font-weight="900" fill="#090d16" text-anchor="middle">S.S</text>
  <text x="75" y="38" font-family="sans-serif" font-size="18" font-weight="800" fill="#fbbf24">S.S AI Study Guru</text>
  <text x="230" y="38" font-family="sans-serif" font-size="12" font-weight="700" fill="#94a3b8">• Multi-Department Legal &amp; Education Suite</text>

  <rect x="24" y="88" width="280" height="600" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="44" y="125" font-family="sans-serif" font-size="14" font-weight="800" fill="#f59e0b">DEPARTMENTS</text>
  <rect x="40" y="145" width="248" height="42" rx="8" fill="#f59e0b" fill-opacity="0.15"/>
  <text x="56" y="171" font-family="sans-serif" font-size="13" font-weight="700" fill="#fbbf24">⚡ S.S AI Study Guru Chat</text>
  <text x="56" y="215" font-family="sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">⚖️ Citizen Legal Petitions</text>
  <text x="56" y="255" font-family="sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">🗺️ Revenue &amp; Land Records</text>
  <text x="56" y="295" font-family="sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">📝 5-Min Exam Cheat Sheet</text>
  <text x="56" y="335" font-family="sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">🏦 Banking Notices &amp; EMI</text>

  <rect x="328" y="88" width="928" height="600" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <rect x="360" y="120" width="864" height="140" rx="16" fill="url(#heroGrad)" stroke="#f59e0b" stroke-width="1"/>
  <text x="390" y="170" font-family="sans-serif" font-size="24" font-weight="800" fill="#020617">S.S Universal AI Knowledge Engine</text>
  <text x="390" y="205" font-family="sans-serif" font-size="14" font-weight="600" fill="#1e293b">Official AI Education &amp; Multi-Department Suite • Founded by Shahid Ahmad Sheikh</text>

  <rect x="360" y="280" width="864" height="300" rx="12" fill="#1e293b"/>
  <text x="385" y="325" font-family="sans-serif" font-size="15" font-weight="700" fill="#38bdf8">Student Query: "Explain Newton's Laws &amp; Class 10 Light Reflection Formulas"</text>
  <text x="385" y="365" font-family="sans-serif" font-size="14" font-weight="700" fill="#fbbf24">S.S AI Study Guru Verified Response:</text>
  <text x="385" y="395" font-family="sans-serif" font-size="13" font-weight="500" fill="#e2e8f0">**Answer:** 1st Law (Inertia), 2nd Law (F = ma), 3rd Law (Action = Reaction).</text>
  <text x="385" y="425" font-family="sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Mirror Formula: 1/f = 1/v + 1/u • Magnification: m = -v/u = h'/h</text>
  <text x="385" y="455" font-family="sans-serif" font-size="12" font-weight="700" fill="#34d399">✓ 100% Verified Step-by-Step Scoring Points Included</text>

  <rect x="360" y="600" width="864" height="56" rx="14" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="385" y="635" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748b">Poochiye koi bhi sawal (Physics, Maths, Legal Petition, Land Records)...</text>

  <defs>
    <linearGradient id="heroGrad" x1="360" y1="120" x2="1224" y2="260" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
  </defs>
</svg>
`;

const screenshotMobileSvg = `
<svg width="720" height="1280" viewBox="0 0 720 1280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="1280" fill="#0b1120"/>
  <rect width="720" height="90" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <rect x="24" y="24" width="44" height="44" rx="12" fill="#f59e0b"/>
  <text x="46" y="52" font-family="sans-serif" font-size="20" font-weight="900" fill="#090d16" text-anchor="middle">S.S</text>
  <text x="80" y="52" font-family="sans-serif" font-size="20" font-weight="800" fill="#fbbf24">S.S AI Study Guru</text>

  <rect x="24" y="115" width="672" height="190" rx="20" fill="url(#mobileHeroGrad)"/>
  <text x="50" y="170" font-family="sans-serif" font-size="26" font-weight="900" fill="#020617">S.S AI Study Guru</text>
  <text x="50" y="210" font-family="sans-serif" font-size="15" font-weight="700" fill="#1e293b">All-in-One Education &amp; Citizen Legal Suite</text>
  <text x="50" y="245" font-family="sans-serif" font-size="13" font-weight="800" fill="#047857">✓ 100% Safe &amp; Verified Academic Engine</text>

  <rect x="24" y="330" width="324" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="44" y="375" font-family="sans-serif" font-size="22">⚡</text>
  <text x="80" y="375" font-family="sans-serif" font-size="16" font-weight="800" fill="#fbbf24">AI Study Chat</text>
  <text x="80" y="405" font-family="sans-serif" font-size="12" font-weight="500" fill="#94a3b8">Instant Homework Solver</text>

  <rect x="372" y="330" width="324" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="392" y="375" font-family="sans-serif" font-size="22">⚖️</text>
  <text x="428" y="375" font-family="sans-serif" font-size="16" font-weight="800" fill="#38bdf8">Citizen Legal</text>
  <text x="428" y="405" font-family="sans-serif" font-size="12" font-weight="500" fill="#94a3b8">Court &amp; Govt Petitions</text>

  <rect x="24" y="460" width="324" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="44" y="505" font-family="sans-serif" font-size="22">📝</text>
  <text x="80" y="505" font-family="sans-serif" font-size="16" font-weight="800" fill="#a78bfa">Exam Sheet</text>
  <text x="80" y="535" font-family="sans-serif" font-size="12" font-weight="500" fill="#94a3b8">5-Minute Revision Map</text>

  <rect x="372" y="460" width="324" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="392" y="505" font-family="sans-serif" font-size="22">🗺️</text>
  <text x="428" y="505" font-family="sans-serif" font-size="16" font-weight="800" fill="#34d399">Land Records</text>
  <text x="428" y="535" font-family="sans-serif" font-size="12" font-weight="500" fill="#94a3b8">Khasra / Khatauni Hub</text>

  <rect x="24" y="595" width="672" height="490" rx="20" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="50" y="640" font-family="sans-serif" font-size="15" font-weight="700" fill="#f59e0b">Q: Solve Quadratic Equation 2x² + 5x - 3 = 0</text>
  <rect x="45" y="665" width="630" height="2" fill="#334155"/>
  <text x="50" y="700" font-family="sans-serif" font-size="14" font-weight="800" fill="#fbbf24">S.S AI GURU Step-by-Step Solution:</text>
  <text x="50" y="735" font-family="sans-serif" font-size="13" font-weight="500" fill="#e2e8f0">1. Formula: x = [-b ± √(b² - 4ac)] / (2a)</text>
  <text x="50" y="770" font-family="sans-serif" font-size="13" font-weight="500" fill="#e2e8f0">2. Discriminant: D = 25 - 4(2)(-3) = 25 + 24 = 49</text>
  <text x="50" y="805" font-family="sans-serif" font-size="13" font-weight="500" fill="#e2e8f0">3. Roots: x = (-5 ± 7) / 4</text>
  <text x="50" y="840" font-family="sans-serif" font-size="14" font-weight="800" fill="#34d399">✓ Final Answers: x = 1/2  or  x = -3</text>

  <rect x="24" y="1110" width="672" height="64" rx="16" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
  <text x="50" y="1150" font-family="sans-serif" font-size="15" font-weight="600" fill="#94a3b8">Type your question or scan photo...</text>
  <circle cx="650" cy="1142" r="20" fill="#f59e0b"/>
  <text x="650" y="1148" font-family="sans-serif" font-size="16" font-weight="900" fill="#020617" text-anchor="middle">➔</text>

  <defs>
    <linearGradient id="mobileHeroGrad" x1="24" y1="115" x2="696" y2="305" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
  </defs>
</svg>
`;

async function generateAll() {
  const iconSizes = [
    { name: 'public/android/launchericon-48x48.png', size: 48 },
    { name: 'public/android/launchericon-72x72.png', size: 72 },
    { name: 'public/android/launchericon-96x96.png', size: 96 },
    { name: 'public/android/launchericon-144x144.png', size: 144 },
    { name: 'public/android/launchericon-192x192.png', size: 192 },
    { name: 'public/android/launchericon-512x512.png', size: 512 },
    { name: 'public/apple-touch-icon.png', size: 180 },
  ];

  console.log('Generating Brand PNG icons...');
  for (const item of iconSizes) {
    await sharp(Buffer.from(brandIconSvg))
      .resize(item.size, item.size)
      .png({ quality: 95 })
      .toFile(item.name);
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }

  console.log('Generating Maskable 512x512 Icon...');
  await sharp(Buffer.from(maskableIconSvg))
    .resize(512, 512)
    .png({ quality: 95 })
    .toFile('public/icon-maskable-512.png');
  console.log('Generated public/icon-maskable-512.png (512x512)');

  console.log('Generating Desktop Screenshot...');
  await sharp(Buffer.from(screenshotDesktopSvg))
    .resize(1280, 720)
    .png({ quality: 90 })
    .toFile('public/screenshot-desktop.png');
  console.log('Generated public/screenshot-desktop.png (1280x720)');

  console.log('Generating Mobile Screenshot...');
  await sharp(Buffer.from(screenshotMobileSvg))
    .resize(720, 1280)
    .png({ quality: 90 })
    .toFile('public/screenshot-mobile.png');
  console.log('Generated public/screenshot-mobile.png (720x1280)');

  console.log('All PWA assets generated with exact pixel dimensions successfully!');
}

generateAll().catch(err => {
  console.error('Error generating PWA assets:', err);
  process.exit(1);
});
