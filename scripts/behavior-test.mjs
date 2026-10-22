import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import worker from '../worker.mjs';
import './consent-test.mjs';
const calls=[],env={ASSETS:{fetch:async r=>{calls.push(r);return new Response('missing noindex',{status:404});}}};
for(const origin of ['http://mahaneyehuda.org','https://www.mahaneyehuda.org'])for(const method of ['GET','HEAD']){const r=await worker.fetch(new Request(origin+'/404/?q=x%2Fy&q=2',{method}),env);assert.equal(r.status,301);assert.equal(r.headers.get('Location'),'https://mahaneyehuda.org/404/?q=x%2Fy&q=2');}
assert.equal(calls.length,0);
for(const uri of ['/404','/404/','/404.html','/unknown-test'])for(const method of ['GET','HEAD']){const r=await worker.fetch(new Request('https://mahaneyehuda.org'+uri+'?q=x%2Fy&q=2',{method}),env);assert.equal(r.status,404);assert.equal(r.headers.get('X-Robots-Tag'),'noindex');assert.equal(r.headers.get('Location'),null);assert.equal(await r.text(),method==='HEAD'?'':'missing noindex');assert.equal(new URL(calls.at(-1).url).search,'?q=x%2Fy&q=2');}
assert.equal((await worker.fetch(new Request('https://mahaneyehuda.org/cookies?q=1'),env)).headers.get('Location'),'https://mahaneyehuda.org/cookies/?q=1');
console.log('PASS Worker units: existing canonical priority/query, explicit aliases and unknown GET/HEAD404/noindex. Local www logic is not evidence of public binding scope.');
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
