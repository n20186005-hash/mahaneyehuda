(() => {
 if(!('serviceWorker' in navigator))return;
 navigator.serviceWorker.getRegistrations().then(registrations=>Promise.all(registrations.filter(registration=>{
  const script=registration.active?.scriptURL||registration.waiting?.scriptURL||registration.installing?.scriptURL;
  return script&&new URL(script).origin===location.origin&&new URL(script).pathname==='/sw.js';
 }).map(registration=>registration.update().catch(()=>{})))).catch(()=>{});
 if('caches' in window)caches.keys().then(names=>Promise.all(names.filter(name=>name.startsWith('mahanehuda-')).map(name=>caches.delete(name)))).catch(()=>{});
})();
