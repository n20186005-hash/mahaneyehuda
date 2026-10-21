// Retire only this site's legacy cache and registration; do not intercept requests.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const name of await caches.keys())if(name.startsWith('mahanehuda-'))await caches.delete(name);
 await self.registration.unregister();
})()));
