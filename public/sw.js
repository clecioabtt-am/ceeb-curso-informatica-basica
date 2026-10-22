// Cache somente do shell estático. Conteúdo e mídias publicados usam a rede.
const CACHE='ceeb-academy-pwa-v16';
const SHELL=['/','/index.html','/style.css?v=16','/app.js?v=16','/course.js','/icon-192.png','/icon-512.png','/ceeb-logo.jpg','/manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;if(u.pathname.startsWith('/api/'))return; if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match('/index.html')));return;}e.respondWith(fetch(r).then(response=>{if(response.ok&&['/app.js','/style.css','/course.js','/manifest.webmanifest','/icon-192.png','/icon-512.png','/ceeb-logo.jpg'].includes(u.pathname)){const clone=response.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(r,clone)))}return response}).catch(()=>caches.match(r).then(v=>v||Response.error())))});
