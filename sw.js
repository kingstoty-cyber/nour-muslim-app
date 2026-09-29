const CACHE='nour-muslim-v5';
const CORE=['./','index.html','style.css','app.js','adhkar-data.json','quran-data/chapters.json','quran-data/uthmani.json','quran-data/surah-reciters.json','assets/logo.png','assets/fonts/kufi-r.ttf','assets/fonts/title-bold.ttf','assets/illustrations/home-hero.webp','assets/illustrations/quran-hero.webp','assets/illustrations/adhkar-morning.webp','assets/illustrations/audio-hero.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r})))})

