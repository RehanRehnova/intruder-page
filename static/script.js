/* ── VOID CANVAS ─────────────────────── */
const vc=document.getElementById('vc'),vx=vc.getContext('2d');
let W,H,stars=[];
function rsz(){W=vc.width=innerWidth;H=vc.height=innerHeight;mkStars()}
function mkStars(){stars=[];const n=Math.floor(W*H/12000);for(let i=0;i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*.9+.1,a:Math.random()*.07+.01,s:Math.random()*.001+.0003,p:Math.random()*Math.PI*2});}
rsz();window.addEventListener('resize',rsz);
let mx=W/2,my=H/2,t=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function frame(){
  t+=.004;vx.clearRect(0,0,W,H);
  const g=vx.createRadialGradient(mx,my,0,mx,my,Math.max(W,H)*.55);
  g.addColorStop(0,'rgba(0,255,157,0.018)');g.addColorStop(1,'rgba(0,0,0,0)');
  vx.fillStyle=g;vx.fillRect(0,0,W,H);
  stars.forEach(s=>{const a=s.a*(1+Math.sin(t*s.s*1000+s.p)*.4);vx.beginPath();vx.arc(s.x,s.y,s.r,0,Math.PI*2);vx.fillStyle=`rgba(255,255,255,${a})`;vx.fill();});
  const sy=((t*20)%H);const sg=vx.createLinearGradient(0,sy-30,0,sy+30);
  sg.addColorStop(0,'rgba(0,255,157,0)');sg.addColorStop(.5,'rgba(0,255,157,0.008)');sg.addColorStop(1,'rgba(0,255,157,0)');
  vx.fillStyle=sg;vx.fillRect(0,0,W,H);
  requestAnimationFrame(frame);
})();

/* ── CURSOR ──────────────────────────── */
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let rx=0,ry=0;
document.addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';rx+=(e.clientX-rx)*.07;ry+=(e.clientY-ry)*.07;});
(function animR(){ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animR)})();
function addHov(sel){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('hov'));el.addEventListener('mouseleave',()=>cur.classList.remove('hov'));});}
addHov('a,button,.htag,.proj-row,.skill-row,.crow,.stmt,.btn,.btn-link,.w-btn,.w-tab,.w-select,.w-input,.w-textarea,.widget');

/* ── NAV ─────────────────────────────── */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>60));
const hbg=document.getElementById('hbg'),drawer=document.getElementById('drawer');
hbg.addEventListener('click',()=>{hbg.classList.toggle('open');drawer.classList.toggle('open')});
function closeD(){hbg.classList.remove('open');drawer.classList.remove('open')}

/* ── MARQUEE ─────────────────────────── */
const items=['rehnova // greenwich collective','bug bounty hunter','if it has a port i have a plan','network recon specialist','phishing simulations','brute force auth audits','red team operations','osint & digital footprinting','responsible disclosure advocate','the quieter you are the more you can hear','hack ethically. disclose responsibly.'];
const m=document.getElementById('marquee');let html='';
for(let i=0;i<2;i++)items.forEach(it=>{html+=`<span class="banner-item">${it}<span class="banner-sep">◆</span></span>`;});
m.innerHTML=html;

/* ── HERO QUOTE ROTATION ─────────────── */
const quotes = [
  'offensive security',
  'engineered precision',
  'one shell to rule them all.'
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
let qi = 0;

const qEl = document.getElementById('heroQuote');

function decryptText(finalText) {
  let iteration = 0;

  const interval = setInterval(() => {
    qEl.textContent = finalText
      .split("")
      .map((char, index) => {
        if (index < iteration) {
          return finalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    iteration += 1 / 2; // speed control (lower = slower decrypt)

    if (iteration >= finalText.length) {
      clearInterval(interval);
      qEl.textContent = finalText;
    }
  }, 30);
}

function changeQuote() {
  qi = (qi + 1) % quotes.length;
  decryptText(quotes[qi]);
}

// initial load
decryptText(quotes[0]);

// change every 4 sec
setInterval(changeQuote, 4000);
/* ── REVEAL ──────────────────────────── */
const obs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');obs.unobserve(en.target)}});},{threshold:.07});
document.querySelectorAll('.r').forEach(el=>obs.observe(el));

/* ── SKILL BARS ──────────────────────── */
const bObs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.querySelectorAll('.skill-fill').forEach((f,i)=>{setTimeout(()=>f.style.width=f.dataset.pct+'%',i*80+300);});bObs.unobserve(en.target);}});},{threshold:.2});
bObs.observe(document.getElementById('skills'));

/* ── PROJECT TOGGLE ──────────────────── */
function toggleProj(row){const was=row.classList.contains('open');document.querySelectorAll('.proj-row.open').forEach(r=>r.classList.remove('open'));if(!was)row.classList.add('open');}

/* ── HERO NAME GLOW ──────────────────── */
const hn=document.getElementById('heroName');
hn.addEventListener('mousemove',e=>{const r=hn.getBoundingClientRect();const px=((e.clientX-r.left)/r.width*100).toFixed(1);const py=((e.clientY-r.top)/r.height*100).toFixed(1);hn.querySelector('.hero-name-glow').style.background=`radial-gradient(ellipse at ${px}% ${py}%,rgba(0,255,157,0.06),transparent 70%)`;});

/* ── TERMINAL ────────────────────────── */
const tOut=document.getElementById('term-out'),tIn=document.getElementById('term-in');
const CMDS={
  whoami:`<span class="to thi">rehnova // Rehan</span>\n<span class="to">role     : Security Researcher & Penetration Tester</span>\n<span class="to">location : Greenwich Underground Collective</span>\n<span class="to">active   : bug bounty, red teams, CTF, phishing sims</span>`,
  skills:`<span class="to">phishing      ─────────────────────── 93%</span>\n<span class="to">brute force   ──────────────────────  88%</span>\n<span class="to">network recon ─────────────────────── 95%</span>\n<span class="to">bug bounty    ──────────────────────  91%</span>\n<span class="to">osint         ─────────────────────  87%</span>\n<span class="to">red teaming   ────────────────────   84%</span>`,
  contact:`<span class="to">email    <span class="tac">rehnova@proton.me</span></span>\n<span class="to">h1       <span class="tac">hackerone.com/rehnova</span></span>\n<span class="to">github   <span class="tac">github.com/rehnova</span></span>\n<span class="to">telegram <span class="tac">@rehnova_sec</span></span>\n<span class="to">pgp      A3F2 9B1C 4E87 D02A</span>`,
  projects:`<span class="to">01  Operation Mirror Lake    phishing sim     <span class="tac">active</span></span>\n<span class="to">02  Project Locksmith        auth bypass       disclosed</span>\n<span class="to">03  DarkMap Suite            network recon     <span class="tac">ongoing</span></span>\n<span class="to">04  CVE-2024-REHNOVA-01      bug bounty        <span class="twarn">$8,500</span></span>\n<span class="to">05  Operation Threadfinder   red team          delivered</span>\n<span class="to">06  Ghost Chain XSS          bug bounty        <span class="twarn">$12,000</span></span>`,
  certs:`<span class="to">CEH      Certified Ethical Hacker</span>\n<span class="to">OSCP     Offensive Security Certified Professional</span>\n<span class="to">eWPT     Web Application Penetration Tester</span>\n<span class="to">Sec+     CompTIA Security+</span>\n<span class="to">HTB      Pro Hacker</span>`,
  quote:`<span class="to tac">"${quotes[Math.floor(Math.random()*quotes.length)]}"</span>`,
  ls:`<span class="to">projects/  skills/  certs/  tools/  ctf/  contact/  exploits/</span>`,
  pwd:`<span class="to">/home/rehnova/greenwich-collective</span>`,
  date:`<span class="to">${new Date().toUTCString()}</span>`,
  uptime:`<span class="to">6 years, 247 days. zero downtime.</span>`,
  clear:'__clear__',
  help:`<span class="to thi">available commands</span>\n<span class="to">whoami · skills · projects · contact · certs · quote · ls · pwd · date · uptime · clear</span>`,
};
function tlog(cmd,out){if(out==='__clear__'){tOut.innerHTML='';return}tOut.innerHTML+=`<div><span><span class="tp">~$</span> <span class="tc">${cmd}</span></span>\n${out}<br></div>`;tOut.scrollTop=tOut.scrollHeight;}
tIn.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const raw=tIn.value.trim().toLowerCase();tIn.value='';if(!raw)return;const out=CMDS[raw]||`<span class="to" style="color:var(--t1)">command not found: ${raw} — try 'help'</span>`;tlog(raw,out);});

/* ══════════════════════════════════════
   WIDGET LOGIC
══════════════════════════════════════ */
function setOut(id,html){document.getElementById(id).innerHTML=html}
function animProg(fillId,pctId,ms,cb){
  const fill=document.getElementById(fillId),pct=document.getElementById(pctId);
  let p=0;const step=100/(ms/40);
  const iv=setInterval(()=>{p=Math.min(100,p+step+Math.random()*step*.4);fill.style.width=p+'%';pct.textContent=(p|0)+'%';if(p>=100){clearInterval(iv);if(cb)cb();}},40);
}

/* PORT SCANNER */
const SVC={21:'ftp',22:'ssh',23:'telnet',25:'smtp',53:'dns',80:'http',110:'pop3',135:'msrpc',139:'netbios',143:'imap',443:'https',445:'smb',993:'imaps',995:'pop3s',1723:'pptp',3306:'mysql',3389:'rdp',5900:'vnc',8080:'http-proxy',8443:'https-alt',3000:'dev-server',5432:'postgres',6379:'redis',27017:'mongodb',9200:'elasticsearch'};
const TOP20=[21,22,23,25,53,80,110,135,139,143,443,445,993,995,1723,3306,3389,5900,8080,8443];
const TOP100=[...TOP20,20,24,26,69,81,88,106,111,119,179,389,427,444,465,513,514,548,587,631,873,990,1080,1433,1521,1720,2049,2121,3000,5000,5432,6379,8000,8888,9200,10000,27017,32768,49152];
function runScan(){
  const ip=document.getElementById('scan-ip').value.trim()||'192.168.1.1';
  const range=document.getElementById('scan-range').value;
  const btn=document.getElementById('scan-btn'),prog=document.getElementById('scan-prog');
  btn.disabled=true;prog.style.display='flex';
  setOut('scan-out',`<span class="wl info">initiating scan on ${ip}...</span><span class="wl dim">sending SYN packets...</span>`);
  const ports=range==='top20'?TOP20:range==='top100'?TOP100:Array.from({length:1024},(_,i)=>i+1);
  const ms=range==='full'?3600:range==='top100'?2200:1200;
  animProg('scan-fill','scan-pct',ms,()=>{
    const openCnt=2+Math.floor(Math.random()*5);
    const openSet=new Set();
    while(openSet.size<openCnt)openSet.add(ports[Math.floor(Math.random()*ports.length)]);
    let h=`<span class="wl acc">nmap scan report for ${ip}</span><span class="wl dim">host is up (0.0${Math.floor(Math.random()*90+10)}s latency)</span><span class="wl dim">─────────────────────────────────</span>`;
    h+=`<span class="wl dim">PORT     STATE   SERVICE</span>`;
    [...openSet].sort((a,b)=>a-b).forEach(p=>{const svc=SVC[p]||'unknown';h+=`<span class="wl open">${String(p+'/tcp').padEnd(9)}open    ${svc}</span>`;});
    h+=`<span class="wl dim">─────────────────────────────────</span><span class="wl info">${openCnt} open port${openCnt>1?'s':''} — ${ports.length} scanned</span>`;
    setOut('scan-out',h);prog.style.display='none';btn.disabled=false;
    document.getElementById('scan-fill').style.width='0%';document.getElementById('scan-pct').textContent='0%';
  });
}

/* CIPHER */
let cMode='enc';
const MORSE={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--.','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.', ' ':'/'};
const MREV=Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));
function setTab(btn,mode){document.querySelectorAll('.w-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');cMode=mode;setOut('cipher-out','<span class="w-ph">output will appear here...</span>');document.getElementById('copy-btn').style.display='none';}
async function runCipher(){
  const text=document.getElementById('cipher-in').value;
  const method=document.getElementById('cipher-method').value;
  if(!text.trim()){setOut('cipher-out','<span class="wl warn">no input provided</span>');return;}
  let res='';
  try{
    if(cMode==='hash'){const enc=new TextEncoder().encode(text);const buf=await crypto.subtle.digest('SHA-256',enc);const hex=Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');res=`<span class="wl info">SHA-256:</span><span class="wl acc" style="word-break:break-all;font-size:.62rem">${hex}</span>`;}
    else if(cMode==='enc'){
      if(method==='b64')res=`<span class="wl acc" style="word-break:break-all">${btoa(unescape(encodeURIComponent(text)))}</span>`;
      else if(method==='rot13')res=`<span class="wl acc">${text.replace(/[a-zA-Z]/g,c=>String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26))}</span>`;
      else if(method==='hex')res=`<span class="wl acc" style="word-break:break-all;font-size:.62rem">${Array.from(text).map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join(' ')}</span>`;
      else if(method==='rev')res=`<span class="wl acc">${[...text].reverse().join('')}</span>`;
      else if(method==='morse')res=`<span class="wl acc" style="word-break:break-all;line-height:2.4">${text.toUpperCase().split('').map(c=>MORSE[c]||'?').join(' ')}</span>`;
    }else{
      if(method==='b64'){try{res=`<span class="wl acc">${decodeURIComponent(escape(atob(text.trim())))}</span>`}catch{res='<span class="wl warn">invalid base64</span>'}}
      else if(method==='rot13')res=`<span class="wl acc">${text.replace(/[a-zA-Z]/g,c=>String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26))}</span>`;
      else if(method==='hex'){try{res=`<span class="wl acc">${text.trim().split(/\s+/).map(h=>String.fromCharCode(parseInt(h,16))).join('')}</span>`}catch{res='<span class="wl warn">invalid hex</span>'}}
      else if(method==='rev')res=`<span class="wl acc">${[...text].reverse().join('')}</span>`;
      else if(method==='morse')res=`<span class="wl acc">${text.trim().split(' ').map(c=>MREV[c]||'?').join('')}</span>`;
    }
  }catch{res='<span class="wl warn">error processing input</span>'}
  setOut('cipher-out',res);document.getElementById('copy-btn').style.display='block';
}
function copyCipher(){const t=document.getElementById('cipher-out').textContent;navigator.clipboard.writeText(t).catch(()=>{});const b=document.getElementById('copy-btn');b.textContent='copied ✓';b.classList.add('copied');setTimeout(()=>{b.textContent='copy output';b.classList.remove('copied')},2000);}

/* BREACH LOOKUP */
const BREACHES=[{src:'linkedin-2021',records:'700M',data:'emails, names, phones, urls'},{src:'rockyou2024',records:'9.9B',data:'plaintext password compilation'},{src:'facebook-2019',records:'533M',data:'phone numbers, names, emails'},{src:'adobe-2013',records:'153M',data:'emails, encrypted passwords'},{src:'twitter-2022',records:'400M',data:'emails, usernames, phones'},{src:'dropbox-2012',records:'68.6M',data:'emails, hashed passwords'},{src:'myspace-2008',records:'360M',data:'emails, sha1 passwords'},{src:'darkweb-combo-2023',records:'26B',data:'credentials, plaintext passwords'}];
function runBreach(){
  const val=document.getElementById('breach-in').value.trim();
  const btn=document.getElementById('breach-btn');
  if(!val){setOut('breach-out','<span class="wl warn">enter a target</span>');return;}
  btn.disabled=true;
  setOut('breach-out','<span class="wl info">querying 47 breach datasets...</span><span class="wl dim">cross-referencing leaked databases...</span>');
  setTimeout(()=>{
    const hits=BREACHES.sort(()=>Math.random()-.5).slice(0,2+Math.floor(Math.random()*4));
    const risk=hits.length>=5?'CRITICAL':hits.length>=3?'HIGH':'MEDIUM';
    const rc=risk==='CRITICAL'?'rgba(255,59,59,.75)':risk==='HIGH'?'rgba(200,255,0,.6)':'rgba(0,255,157,.5)';
    let h=`<span class="wl acc">${val}</span><span class="wl dim">risk score: <span style="color:${rc}">${risk}</span> — found in ${hits.length} breach${hits.length>1?'es':''}</span><span class="wl dim">──────────────────────────────</span>`;
    hits.forEach(b=>{h+=`<div class="breach-hit"><div class="breach-src">⚠ ${b.src}</div><div class="breach-det">${b.records} records — ${b.data}</div></div>`;});
    h+=`<span class="wl dim" style="margin-top:4px">recommendation: rotate credentials immediately</span>`;
    setOut('breach-out',h);btn.disabled=false;
  },1800);
}

/* PACKET SNIFFER VISUALIZER */
const pktCanvas=document.getElementById('pkt-canvas');
const pktCtx=pktCanvas.getContext('2d');
let pktRunning=false,pktInterval=null,pktCount=0,pktPackets=[];
const PROTOS=['TCP','UDP','HTTP','HTTPS','DNS','ARP','ICMP','TLS'];
const COLORS={TCP:'rgba(0,255,157,0.7)',UDP:'rgba(0,212,255,0.7)',HTTP:'rgba(200,255,0,0.7)',HTTPS:'rgba(0,255,157,0.9)',DNS:'rgba(160,160,255,0.7)',ARP:'rgba(255,150,50,0.6)',ICMP:'rgba(255,100,100,0.6)',TLS:'rgba(0,255,157,0.5)'};
const FILTER_MAP={all:PROTOS,tcp:['TCP'],udp:['UDP'],http:['HTTP','HTTPS']};

function randIP(){return `${(Math.random()*254|0)+1}.${(Math.random()*254|0)+1}.${(Math.random()*254|0)+1}.${(Math.random()*254|0)+1}`}
function randPort(){const ports=[80,443,22,53,8080,3306,8443,21,25,3389];return ports[Math.floor(Math.random()*ports.length)];}

function drawPkt(){
  const W=pktCanvas.width,H=pktCanvas.height;
  pktCtx.clearRect(0,0,W,H);
  // grid
  pktCtx.strokeStyle='rgba(255,255,255,0.03)';pktCtx.lineWidth=1;
  for(let x=0;x<W;x+=40){pktCtx.beginPath();pktCtx.moveTo(x,0);pktCtx.lineTo(x,H);pktCtx.stroke();}
  for(let y=0;y<H;y+=20){pktCtx.beginPath();pktCtx.moveTo(0,y);pktCtx.lineTo(W,y);pktCtx.stroke();}
  // packets as flowing dots
  pktPackets.forEach((p,i)=>{
    p.x+=p.speed;
    const alpha=Math.max(0,1-p.age/60);
    pktCtx.beginPath();pktCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
    pktCtx.fillStyle=p.color.replace('0.7',alpha.toFixed(2)).replace('0.9',alpha.toFixed(2)).replace('0.5',alpha.toFixed(2));
    pktCtx.fill();
    // trail
    pktCtx.beginPath();pktCtx.moveTo(p.x-p.size*3,p.y);pktCtx.lineTo(p.x,p.y);
    pktCtx.strokeStyle=p.color.replace('0.7',(alpha*.3).toFixed(2)).replace('0.9',(alpha*.3).toFixed(2)).replace('0.5',(alpha*.2).toFixed(2));
    pktCtx.lineWidth=1;pktCtx.stroke();
    p.age++;
  });
  pktPackets=pktPackets.filter(p=>p.x<pktCanvas.width+20&&p.age<60);
}

function spawnPkt(){
  const filter=document.getElementById('pkt-filter').value;
  const allowed=FILTER_MAP[filter];
  const proto=allowed[Math.floor(Math.random()*allowed.length)];
  const H=pktCanvas.height;
  pktPackets.push({x:-5,y:10+Math.random()*(H-20),speed:1.5+Math.random()*3,size:2+Math.random()*2.5,color:COLORS[proto],proto,age:0,src:randIP(),dst:randIP(),port:randPort(),bytes:Math.floor(Math.random()*1400+64)});
  pktCount++;
  document.getElementById('pkt-count').textContent=pktCount+' pkts';
  const p=pktPackets[pktPackets.length-1];
  const log=document.getElementById('pkt-log');
  const line=document.createElement('span');
  line.className='wl';line.style.color=COLORS[proto];
  const time=new Date().toLocaleTimeString('en',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
  line.textContent=`[${time}] ${proto.padEnd(6)} ${p.src}:${Math.floor(Math.random()*65535)} → ${p.dst}:${p.port}  ${p.bytes}B`;
  log.appendChild(line);log.appendChild(document.createElement('br'));
  while(log.children.length>18)log.removeChild(log.firstChild);
  log.scrollTop=log.scrollHeight;
}

let pktAnimId=null;
function pktFrame(){drawPkt();pktAnimId=requestAnimationFrame(pktFrame);}

function togglePkt(){
  const btn=document.getElementById('pkt-btn');
  if(!pktRunning){
    pktRunning=true;btn.textContent='STOP';
    pktCanvas.width=pktCanvas.parentElement.clientWidth||340;
    document.getElementById('pkt-log').innerHTML='';pktCount=0;
    document.getElementById('pkt-count').textContent='0 pkts';
    pktInterval=setInterval(spawnPkt,280+Math.random()*200);
    pktFrame();
  }else{
    pktRunning=false;btn.textContent='START';
    clearInterval(pktInterval);cancelAnimationFrame(pktAnimId);
    pktPackets=[];drawPkt();
  }
}
// resize canvas
window.addEventListener('resize',()=>{if(pktRunning){pktCanvas.width=pktCanvas.parentElement.clientWidth||340;}});

/* HASH CRACKER */
const KNOWN={'5f4dcc3b5aa765d61d8327deb882cf99':'password','25d55ad283aa400af464c76d713c07ad':'12345678','e10adc3949ba59abbe56e057f20f883e':'123456','098f6bcd4621d373cade4e832627b4f6':'test','5ebe2294ecd0e0f08eab7690d2a6ee69':'secret','d8578edf8458ce06fbc5bb76a58c5ca4':'qwerty','96e79218965eb72c92a549dd5a330112':'111111','25f9e794323b453885f5181f1b624d0b':'123456789','f25a2fc72690b780b2a14e140ef6a9e0':'iloveyou','e99a18c428cb38d5f260853678922e03':'abc123'};
const WORDLISTS={rockyou:'rockyou.txt (14.3M entries)',common:'common-10k.txt (10,000 entries)',dark:'darkweb-2024.txt (2.1B entries)'};
function runCrack(){
  const hash=document.getElementById('crack-in').value.trim().toLowerCase();
  const list=document.getElementById('crack-list').value;
  const btn=document.getElementById('crack-btn'),prog=document.getElementById('crack-prog');
  if(!hash){setOut('crack-out','<span class="wl warn">paste a hash first</span>');return;}
  btn.disabled=true;prog.style.display='flex';
  const type=hash.length===32?'MD5':hash.length===40?'SHA-1':hash.length===64?'SHA-256':'UNKNOWN';
  setOut('crack-out',`<span class="wl info">detected: ${type}</span><span class="wl dim">loading ${WORDLISTS[list]}...</span>`);
  const found=KNOWN[hash];
  animProg('crack-fill','crack-pct',1400+Math.random()*1600,()=>{
    prog.style.display='none';btn.disabled=false;
    document.getElementById('crack-fill').style.width='0%';document.getElementById('crack-pct').textContent='0%';
    if(found){setOut('crack-out',`<span class="wl acc">── CRACKED ──</span><span class="wl dim">hash   : ${hash}</span><span class="wl acc">plain  : ${found}</span><span class="wl dim">type   : ${type}</span><span class="wl dim">source : ${WORDLISTS[list]}</span>`);}
    else{setOut('crack-out',`<span class="wl warn">not found in wordlist</span><span class="wl dim">hash   : ${hash.slice(0,28)}...</span><span class="wl dim">type   : ${type}</span><span class="wl dim">tried  : ${(Math.random()*900+100).toFixed(0)}K candidates</span><span class="wl dim">hint   : try md5('password') = 5f4dcc3b...</span>`);}
  });
}

/* OSINT RECON */
const OSINT_STEPS=['whois lookup...','dns enumeration...','subdomain bruteforce...','certificate transparency...','shodan passive scan...','email harvesting...','technology fingerprint...','wayback machine crawl...','building footprint report...'];
function runOsint(){
  const domain=document.getElementById('osint-in').value.trim()||'target.com';
  const btn=document.getElementById('osint-btn'),prog=document.getElementById('osint-prog');
  btn.disabled=true;prog.style.display='flex';
  let step=0;setOut('osint-out',`<span class="wl info">starting passive recon on ${domain}...</span>`);
  const stepInt=setInterval(()=>{
    if(step<OSINT_STEPS.length){
      const log=document.getElementById('osint-out');
      const sp=document.createElement('span');sp.className='wl dim';sp.textContent=`[+] ${OSINT_STEPS[step]}`;
      log.appendChild(sp);log.appendChild(document.createElement('br'));
      log.scrollTop=log.scrollHeight;step++;
    }
  },350);
  animProg('osint-fill','osint-pct',OSINT_STEPS.length*360,()=>{
    clearInterval(stepInt);
    const subs=['mail','vpn','dev','api','staging','admin','cdn','static','auth','portal'].sort(()=>Math.random()-.5).slice(0,3+Math.floor(Math.random()*4));
    const techs=['nginx/1.24','PHP/8.1','WordPress 6.4','Cloudflare','jQuery 3.6','React 18'].sort(()=>Math.random()-.5).slice(0,3);
    const emails=[`admin@${domain}`,`security@${domain}`,`info@${domain}`].slice(0,1+Math.floor(Math.random()*2));
    let h=`<span class="wl acc">── OSINT REPORT: ${domain} ──</span>`;
    h+=`<span class="wl dim">registrar  : ${['Namecheap','GoDaddy','Cloudflare','AWS Route53'][Math.floor(Math.random()*4)]}</span>`;
    h+=`<span class="wl dim">created    : 201${Math.floor(Math.random()*9)} — expires 202${5+Math.floor(Math.random()*3)}</span>`;
    h+=`<span class="wl dim">ip         : ${randIP()}</span>`;
    h+=`<span class="wl info">subdomains (${subs.length} found)</span>`;
    subs.forEach(s=>h+=`<span class="wl open">  ${s}.${domain}</span>`);
    h+=`<span class="wl info">technologies</span>`;
    techs.forEach(t=>h+=`<span class="wl dim">  ${t}</span>`);
    h+=`<span class="wl info">emails (${emails.length} found)</span>`;
    emails.forEach(e=>h+=`<span class="wl acc">  ${e}</span>`);
    setOut('osint-out',h);prog.style.display='none';btn.disabled=false;
    document.getElementById('osint-fill').style.width='0%';document.getElementById('osint-pct').textContent='0%';
  });
}