import fs from 'fs';
import path from 'path';

// Generate lightweight crisp Android / PWA icons in public/android directory
const androidDir = path.join(process.cwd(), 'public', 'android');
if (!fs.existsSync(androidDir)) {
  fs.mkdirSync(androidDir, { recursive: true });
}

const sizes = [48, 72, 96, 144, 192, 512];

const generateSvgForSize = (size: number) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.floor(size * 0.22)}" fill="url(#bgGrad)" stroke="#f59e0b" stroke-width="${Math.max(2, Math.floor(size * 0.03))}"/>
  <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.38}" fill="none" stroke="#334155" stroke-width="${Math.max(1, Math.floor(size * 0.015))}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system, system-ui, sans-serif" font-weight="900" font-size="${Math.floor(size * 0.38)}px" fill="url(#goldGrad)">S.S</text>
  <text x="50%" y="82%" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system, system-ui, sans-serif" font-weight="700" font-size="${Math.max(6, Math.floor(size * 0.08))}px" fill="#94a3b8" letter-spacing="1">STUDY GURU</text>
</svg>
`;

sizes.forEach((size) => {
  const svg = generateSvgForSize(size);
  const svgPath = path.join(androidDir, `launchericon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svg.trim());
  console.log(`Generated SVG icon: ${svgPath}`);
});

console.log('Android icons generation complete!');
