// S.S AI Study Guru - Progressive Web App Service Worker
// Founded by Shahid Ahmad Sheikh

const CACHE_NAME = 'ss-study-guru-v7';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/offline.html',
  '/android/launchericon-192x192.png',
  '/android/launchericon-512x512.png',
  '/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache partial fallback:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = event.request.url;

  // Bypass API calls and live Firebase/AI endpoints completely so offline fallback in JS runs immediately
  if (
    requestUrl.includes('/api/') ||
    requestUrl.includes('firebasevertexai.googleapis.com') ||
    requestUrl.includes('firestore.googleapis.com') ||
    requestUrl.includes('identitytoolkit.googleapis.com') ||
    requestUrl.includes('wikipedia.org') ||
    requestUrl.includes('googlesyndication.com')
  ) {
    return;
  }

  // Navigation requests: Network-first, then cached app shell (/ or /index.html) so the full React app opens offline
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
              cache.put('/', responseToCache.clone());
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          return (
            (await caches.match(event.request)) ||
            (await caches.match('/')) ||
            (await caches.match('/index.html')) ||
            (await caches.match('/offline.html')) ||
            new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
          );
        })
    );
    return;
  }

  // Scripts & Styles (including Tailwind CDN & Vite bundles): Network-first with cache fallback
  if (
    event.request.destination === 'script' ||
    event.request.destination === 'style'
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return new Response('', { status: 200, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // Cache-first for images, fonts, and static media with safe offline catch
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => new Response('', { status: 204 }));
    })
  );
});
