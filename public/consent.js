(() => {
  const KEY='mahaneYehudaCookiePreferences', DENY='mahaneYehuda-analytics-denied', MARK='|mahaneYehuda-analytics-denied|', ID='G-HXM22WWPKP';
  let knownRefusal=false;
  function denied(){
    if(window.__mahaneYehudaDenied){knownRefusal=true;return true;}
    try{if(sessionStorage.getItem(DENY)==='1'){knownRefusal=true;return true;}}catch{return true;}
    try{const refused=window.name.includes(MARK);if(refused)knownRefusal=true;return refused;}catch{return true;}
  }
  function markDeny(){
    knownRefusal=true;window.__mahaneYehudaDenied=true;window['ga-disable-'+ID]=true;
    let retained=false;
    try{sessionStorage.setItem(DENY,'1');retained=sessionStorage.getItem(DENY)==='1';}catch{}
    try{window.name=window.name.split(MARK).join('')+MARK;retained=window.name.includes(MARK)||retained;}catch{}
    return retained;
  }
  function clearDeny(){
    // Verify tab-local veto removal before publishing a shared grant.
    sessionStorage.removeItem(DENY);
    if(sessionStorage.getItem(DENY)==='1')throw Error('Session refusal remains');
    window.name=window.name.split(MARK).join('');
    if(window.name.includes(MARK))throw Error('Tab refusal remains');
    knownRefusal=false;
  }
  function read(){
    if(denied())return null;
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      // A stale stored grant must not revive while writes are blocked.
      localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');
      return saved && typeof saved.analytics==='boolean'?saved:null;
    }catch{return null;}
  }
  let active=false;
  function apply(grant){
    active=grant===true;
    window['ga-disable-'+ID]=!grant;
    if(!grant){window.gtag?.('consent','update',{analytics_storage:'denied'});return;}
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    if(document.getElementById('mahaneYehuda-ga4')){window.gtag('consent','update',{analytics_storage:'granted'});return;}
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    const script=document.createElement('script');script.id='mahaneYehuda-ga4';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(script);
    window.gtag('js',new Date());window.gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  }
  let retainedDenial=false;
  function save(analytics){
    analytics=analytics===true;
    if(!analytics){retainedDenial=markDeny();apply(false);}
    try{
      if(analytics){clearDeny();localStorage.getItem(KEY);localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');}
      localStorage.setItem(KEY,JSON.stringify({analytics}));
      if(analytics)window.__mahaneYehudaDenied=false;
      apply(read()?.analytics===true);return true;
    }catch{retainedDenial=markDeny();apply(false);return false;}
  }
  window.marketConsent={read,save};
  const saved=read();apply(saved?.analytics===true);
  const checkbox=document.getElementById('analytics'),status=document.getElementById('saved');
  const banner=document.getElementById('cookie-banner'),bannerStatus=document.getElementById('cookie-banner-status');
  if(checkbox)checkbox.checked=active;
  if(banner)banner.setAttribute('data-open',!saved&&!knownRefusal?'true':'false');
  function message(stored,requested){
    return stored
      ?active?'ההסכמה ל-Google Analytics נשמרה; הניתוח פעיל בכרטיסייה זו.':requested?'הבחירה נשמרה, אך לא ניתן לאמת את אחסון הדפדפן ולכן Google Analytics כבוי בכרטיסייה זו.':'הדחייה נשמרה; Google Analytics כבוי בכרטיסייה זו.'
      :retainedDenial?'Google Analytics כבוי בכרטיסייה זו, גם במעבר בין עמודים וברענון. הבחירה הקבועה לא נשמרה; ייתכן שבכרטיסיות אחרות נותרה הרשאה ישנה. להסרתה יש למחוק את נתוני האתר בהגדרות הדפדפן.'
        :'Google Analytics כבוי בעמוד זה. הבחירה לא נשמרה; לפני מעבר לעמוד אחר או רענון יש למחוק את נתוני האתר בהגדרות הדפדפן.';
  }
  function choose(value){
    const stored=save(value),feedback=message(stored,value),complete=stored&&(!value||active);
    if(checkbox)checkbox.checked=active;
    if(status)status.textContent=feedback;
    if(banner)banner.setAttribute('data-open',complete?'false':'true');
    if(bannerStatus)bannerStatus.textContent=complete?'':feedback;
  }
  checkbox?.addEventListener('change',()=>{if(status)status.textContent='';});
  document.getElementById('cookie-form')?.addEventListener('submit',event=>{event.preventDefault();choose(checkbox?.checked===true);});
  document.getElementById('cookies-essential')?.addEventListener('click',()=>choose(false));
  document.getElementById('cookies-accept')?.addEventListener('click',()=>choose(true));
  document.getElementById('save-preferences')?.addEventListener('click',()=>choose(checkbox?.checked===true));
  document.getElementById('reject-all')?.addEventListener('click',()=>choose(false));
  window.addEventListener('storage',event=>{
    if(event.key!==KEY&&event.key!==null)return;
    let grant=false;try{grant=JSON.parse(event.newValue||'null')?.analytics===true;}catch{}
    if(!grant)markDeny();
    apply(read()?.analytics===true);
    if(checkbox)checkbox.checked=active;
    const feedback=active?'Google Analytics פעיל בכרטיסייה זו.':'Google Analytics כבוי בכרטיסייה זו.';
    if(status)status.textContent=feedback;
    if(bannerStatus)bannerStatus.textContent=feedback;
    if(banner)banner.setAttribute('data-open','false');
  });
})();
