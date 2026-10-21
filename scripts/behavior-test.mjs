import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import worker from '../worker.mjs';
let assetCalls=0;const env={ASSETS:{fetch:async()=>{assetCalls++;return new Response('missing',{status:404});}}};
for(const u of ['http://mahaneyehuda.org/privacy/?q=1','https://www.mahaneyehuda.org/privacy/?q=1']){const r=await worker.fetch(new Request(u),env);assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://mahaneyehuda.org/privacy/?q=1');}
let r=await worker.fetch(new Request('https://mahaneyehuda.org/cookies?q=1'),env);assert.equal(r.headers.get('location'),'https://mahaneyehuda.org/cookies/?q=1');r=await worker.fetch(new Request('https://mahaneyehuda.org/missing'),env);assert.equal(r.status,404);assert.equal(await r.text(),'missing');assert.match(r.headers.get('X-Robots-Tag'),/noindex/);assert.equal(assetCalls,1);
const code=readFileSync('public/consent.js','utf8');
let raw=JSON.stringify({analytics:true}), writable=true, session={};
const storage={getItem:()=>raw,setItem:(k,v)=>{if(!writable)throw Error('blocked');if(k==='mahaneYehudaCookiePreferences')raw=v;},removeItem:()=>{if(!writable)throw Error('blocked');}};
const sessionStorage={getItem:k=>session[k]||null,setItem:(k,v)=>{session[k]=v},removeItem:k=>{delete session[k]}};
function page(name=''){const scripts=[];const window={name};const document={documentElement:{lang:"en"},getElementById:id=>scripts.find(s=>s.id===id),createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}};vm.runInNewContext(code,{window,document,localStorage:storage,sessionStorage});return {window,scripts};}
let p=page();assert.equal(p.scripts.length,1);writable=false;assert.equal(p.window.marketConsent.save(false),false);assert.equal(p.window['ga-disable-G-HXM22WWPKP'],true);
let next=page(p.window.name);assert.equal(next.scripts.length,0);assert.equal(next.window['ga-disable-G-HXM22WWPKP'],true);assert.equal(JSON.parse(raw).analytics,true);
// Even if session/name cannot carry the tombstone, blocked writes refuse a stale grant.
session={};next=page();assert.equal(next.scripts.length,0);assert.equal(next.window.marketConsent.save(true),false);assert.equal(next.scripts.length,1);assert.equal(page().scripts.length,0);
writable=true;const chosen=page();chosen.window.marketConsent.save(false);assert.equal(page(chosen.window.name).scripts.length,0);chosen.window.marketConsent.save(true);assert.equal(page(chosen.window.name).scripts.length,1);
storage.getItem=()=>{throw Error('blocked read')};assert.equal(page().scripts.length,0);
console.log('PASS Worker 301/query/ASSETS404; consent immediate refusal, failed writes and stale grants across pages.');
// Refusal must survive same-tab navigation even when session storage is unavailable.
raw=JSON.stringify({analytics:true});writable=true;storage.getItem=()=>raw;
sessionStorage.getItem=()=>{throw Error('session blocked')};sessionStorage.setItem=()=>{throw Error('session blocked')};sessionStorage.removeItem=()=>{throw Error('session blocked')};
p=page();assert.equal(p.scripts.length,1);writable=false;p.window.marketConsent.save(false);writable=true;next=page(p.window.name);assert.equal(next.scripts.length,0);assert.equal(next.window['ga-disable-G-HXM22WWPKP'],true);
console.log('PASS session-storage failure: window-name veto prevents stale-grant recovery in same tab.');
// Banner controls remain usable when both reads and writes throw.
const ui=Object.fromEntries(['cookie-banner','cookie-banner-status','cookies-essential','cookies-accept'].map(id=>[id,{attrs:{},handlers:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,v){this.handlers[k]=v}}]));
const scripts=[];const win={name:''};
vm.runInNewContext(code,{window:win,document:{documentElement:{lang:"en"},getElementById:id=>ui[id]||scripts.find(s=>s.id===id),createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},localStorage:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}},sessionStorage});
assert.equal(ui['cookie-banner'].attrs['data-open'],'true');
ui['cookies-essential'].handlers.click();assert.equal(win['ga-disable-G-HXM22WWPKP'],true);assert.equal(scripts.length,0);assert.match(ui['cookie-banner-status'].textContent,/לא נשמרה/);
ui['cookies-accept'].handlers.click();assert.equal(scripts.length,1);assert.match(ui['cookie-banner-status'].textContent,/לא נשמרה/);
console.log('PASS banner storage exceptions: rejection disables immediately; explicit grant only; failure is visible.');
// Same-page allow -> deny -> allow must change effective consent while retaining one loader.
raw=JSON.stringify({analytics:true});writable=true;storage.getItem=()=>raw;
const roundtrip=page();
assert.equal(roundtrip.scripts.length,1);
roundtrip.window.marketConsent.save(false);
assert.equal(roundtrip.window['ga-disable-G-HXM22WWPKP'],true);
let events=roundtrip.window.dataLayer.map(args=>Array.from(args));
assert.equal(events.filter(e=>e[0]==='consent'&&e[1]==='update').at(-1)[2].analytics_storage,'denied');
roundtrip.window.marketConsent.save(true);
assert.equal(roundtrip.window['ga-disable-G-HXM22WWPKP'],false);
events=roundtrip.window.dataLayer.map(args=>Array.from(args));
assert.equal(events.filter(e=>e[0]==='consent'&&e[1]==='update').at(-1)[2].analytics_storage,'granted');
assert.equal(roundtrip.scripts.length,1);
assert.equal(events.filter(e=>e[0]==='config').length,1);
for(const saved of ['null','{}','[]','false','1','"bad"','{']){raw=saved;assert.equal(page().scripts.length,0,saved);}
console.log('PASS actual consent update allow/deny/reallow with one loader/config and no reload; null/malformed JSON fails closed.');
// Retirement is restricted to the known cache prefix and exact SW path.
let updates=0;const deleted=[];
const retire=readFileSync('public/retire-offline.js','utf8');
vm.runInNewContext(retire,{navigator:{serviceWorker:{getRegistrations:async()=>[
 {active:{scriptURL:'https://mahaneyehuda.org/sw.js'},update:async()=>{updates++;}},
 {active:{scriptURL:'https://mahaneyehuda.org/other/sw.js'},update:async()=>{throw Error('unrelated');}},
 {active:{scriptURL:'https://other.example/sw.js'},update:async()=>{throw Error('foreign');}}
]}},location:{origin:'https://mahaneyehuda.org'},window:{caches:true},caches:{keys:async()=>['mahanehuda-v1','unrelated-v1'],delete:async k=>{deleted.push(k);}},URL});
await new Promise(resolve=>setTimeout(resolve,10));assert.equal(updates,1);assert.deepEqual(deleted,['mahanehuda-v1']);
let activation,unregisters=0;const swDeletes=[];
vm.runInNewContext(readFileSync('public/sw.js','utf8'),{self:{skipWaiting:()=>{},registration:{unregister:async()=>{unregisters++;}},addEventListener:(type,handler)=>{if(type==='activate')activation=handler;}},caches:{keys:async()=>['mahanehuda-v1','other-cache'],delete:async name=>swDeletes.push(name)}});
let complete=Promise.resolve();activation({waitUntil:promise=>{complete=promise;}});await complete;assert.equal(unregisters,1);assert.deepEqual(swDeletes,['mahanehuda-v1']);
const attrs={};let menuHandler;
vm.runInNewContext(readFileSync('public/menu.js','utf8'),{document:{getElementById:id=>id==='menu-toggle'?{getAttribute:k=>attrs[k]||'false',setAttribute:(k,v)=>attrs[k]=v,addEventListener:(_type,cb)=>menuHandler=cb}:{setAttribute:(k,v)=>attrs['nav-'+k]=v}}});menuHandler();assert.equal(attrs['aria-expanded'],'true');assert.equal(attrs['nav-data-open'],'true');menuHandler();assert.equal(attrs['aria-expanded'],'false');
console.log('PASS owned SW/cache retirement and menu toggle semantics (VM, not browser geometry).');
