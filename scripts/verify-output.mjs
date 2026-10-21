import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const walk=p=>readdirSync(p).flatMap(n=>statSync(p+'/'+n).isDirectory()?walk(p+'/'+n):[p+'/'+n]);
const pages=walk('dist').filter(p=>p.endsWith('.html'));
assert.equal(pages.length,5);
const plain=s=>s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#39;|&#x27;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
let faqCount=0;
for(const p of pages){const s=readFileSync(p,'utf8');assert(s.includes('<html lang="he" dir="rtl"'));assert.equal((s.match(/<h1(?:\s|>)/g)||[]).length,1,p);assert.match(s,/<title>[^<]+<\/title>/);assert.match(s,/<meta name="description" content="[^"]+"/);assert.match(s,/<link rel="canonical" href="https:\/\/mahaneyehuda.org\//);for(const lang of ['he','x-default'])assert(s.includes(`hreflang="${lang}"`));
 for(const m of s.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[^"]*)"/g)){const a='dist'+m[1];assert(existsSync(a)||existsSync(a+'/index.html'),p+' resource '+m[1]);}
 assert(!/api.open-meteo|images.unsplash.com|upload.wikimedia.org|navigator.serviceWorker.register|plusCode|Q6M7|\/undefined\/|\/Users\//.test(s),p+' stale/private');
 if(p.endsWith('404.html'))assert(s.includes('noindex'));
 for(const m of s.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){const j=JSON.parse(m[1]);assert(!j.aggregateRating&&!j.openingHoursSpecification&&j.isAccessibleForFree===undefined);if(j['@type']==='FAQPage'){
 const visible=[...s.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>/g)].map(x=>[plain(x[1]).replace(/\s*\+$/,''),plain(x[2])]);const schema=j.mainEntity.map(x=>[plain(x.name),plain(x.acceptedAnswer.text)]);assert.deepEqual(visible,schema);faqCount+=schema.length;}}
}
assert.equal(faqCount,14);
const home=readFileSync('dist/index.html','utf8');assert(home.includes('67124')||home.includes('67,124'));assert(home.includes('31.7848355'));assert(home.includes('35.2126355'));
for(const id of ['FAzZa3YqZ2E','s1Lgyr2zAmY','SM8bQ9qpmXc','YsVdTwo0X1k','45298221191'])assert(home.includes(id));assert(home.includes('creativecommons.org/licenses/by-sa/2.0/'));assert(home.includes('https://ims.gov.il/he/Forecasts'));
const map=readFileSync('dist/sitemap-0.xml','utf8');assert.equal((map.match(/<loc>/g)||[]).length,4);assert(!map.includes('404'));
console.log('PASS 5 Hebrew RTL HTML pages,4 original sitemap routes,14 exact FAQ pairs,metadata/local assets/source credits/scoped schema/static forecast removal.');
