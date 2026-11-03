const $=s=>document.querySelector(s),sel=new Map(),ex={src:0,minor:0,major:0};
const fmt=n=>n>=1e6?(n/1e6).toString().replace(".",",")+" jt":(n/1e3)+" rb";
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const ic='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
const chip=d=>d.src?'<span class="chip">Source code termasuk</span>':'';
const card=d=>`<article class="card"><div class="top"><span class="code">${d.c}</span></div><h3>${d.n}</h3><p class="tg">${d.tag}</p><div class="price">${d.p}<small>per proyek</small></div><div class="meta"><span>↻ Revisi ${d.r}</span>${chip(d)}</div><ul class="ck">${d.s.map(x=>`<li>${x}</li>`).join("")}</ul><details><summary>Hasil akhir yang diterima</summary><p>${d.o}</p></details><div class="act"><button class="btn p" data-c="${d.c}">+ Tambah ke estimasi</button><a class="btn ic" target="_blank" rel="noopener" href="${wa(`Halo, saya ingin memesan jasa pembuatan website dengan paket ${d.n} (${d.c}). Estimasi harga: Rp ${fmt(d.lo)} – ${fmt(d.hi)}.`)}" aria-label="Pesan paket ${d.n} via WhatsApp">${ic}</a></div></article>`;
const row=d=>`<tr><td class="nw"><b>${d.c}</b></td><td><b>${d.n}</b><div class="mu">${d.tag}</div>${d.src?'<div style="margin-top:8px">'+chip(d)+'</div>':''}</td><td>${d.s.join("; ")}</td><td>${d.o}</td><td class="nw">${d.r}</td><td class="tr nw"><b>${d.p}</b><div class="mu">per proyek</div></td><td><button class="btn p sq" data-c="${d.c}" aria-label="Tambah ${d.n} ke estimasi">+</button></td></tr>`;
$("#g").innerHTML=D.map(card).join("");
$("#tb").innerHTML=D.map(row).join("");
["#wa0","#wa1","#wa2"].forEach(i=>{$(i).href=wa("Halo, saya ingin konsultasi gratis tentang pembuatan website.")});
$("#send").innerHTML=ic+"Kirim estimasi via WhatsApp";
const idr=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,".");
const rng=(a,b)=>"Rp "+idr(a)+(a===b?"":" – "+idr(b));
const calc=()=>{
 const it=D.filter(d=>sel.has(d.c)).map(d=>({d,q:sel.get(d.c)}));
 const sum=f=>it.reduce((a,{d,q})=>a+f(d)*q,0);
 const sub=[sum(d=>d.lo),sum(d=>d.hi)];
 const sc=ex.src?[sum(d=>d.src?0:d.lo*X.src.pct),sum(d=>d.src?0:d.hi*X.src.pct)]:[0,0];
 const ln=[];
 if(sc[1])ln.push(["Source code",rng(sc[0],sc[1])]);
 if(ex.minor)ln.push(["Revisi minor"+(ex.minor>1?` (${ex.minor}x)`:""),rng(ex.minor*X.minor.lo,ex.minor*X.minor.hi)]);
 if(ex.major)ln.push(["Revisi major"+(ex.major>1?` (${ex.major}x)`:""),rng(ex.major*X.major.lo,ex.major*X.major.hi)]);
 return{it,sub,ln,t:[sub[0]+sc[0]+ex.minor*X.minor.lo+ex.major*X.major.lo,sub[1]+sc[1]+ex.minor*X.minor.hi+ex.major*X.major.hi]};
};
const stp=(a,t)=>`<div class="stp"><button ${a} data-s="-1" aria-label="Kurangi">−</button><i>${t}</i><button ${a} data-s="1" aria-label="Tambah">+</button></div>`;
const panel=it=>it.map(({d,q})=>`<div class="it"><div class="t"><span><b>${d.n}</b><em>${d.c}</em></span><button class="lnk" data-rm="${d.c}">Hapus</button></div><div class="b">${stp(`data-q="${d.c}"`,q+" proyek")}<b>${rng(d.lo*q,d.hi*q)}</b></div></div>`).join("")
 +`<label class="opt"><input type="checkbox" data-opt="src"${ex.src?" checked":""}><span><b>${X.src.n}</b><small>${X.src.d}</small></span></label>`
 +["minor","major"].map(k=>`<div class="rv"><span><b>${X[k].n}</b><small>${X[k].d}</small></span>${stp(`data-ex="${k}"`,ex[k])}</div>`).join("");
function upd(){
 document.querySelectorAll("[data-c]").forEach(b=>{const on=sel.has(b.dataset.c),sq=b.classList.contains("sq");b.classList.toggle("on",on);b.classList.toggle("p",!on);b.textContent=sq?(on?"✓":"+"):(on?"✓ Dalam estimasi":"+ Tambah ke estimasi")});
 const{it,sub,ln,t}=calc(),n=it.length,tot=rng(t[0],t[1]);
 $("#est").classList.toggle("show",n>0);
 $("#cnt").textContent=n+" layanan dipilih";
 $("#tot").textContent=tot;
 $("#dbody").innerHTML=n?panel(it):'<p class="empty">Belum ada paket dipilih. Tambahkan paket untuk melihat estimasi.</p>';
 $("#sub").textContent=rng(sub[0],sub[1]);
 $("#ext").innerHTML=ln.map(([l,v])=>`<div class="sr"><span>${l}</span><b>+ ${v}</b></div>`).join("");
 $("#grand").textContent=tot;
 const add=[ex.src&&"butuh source code",ex.minor&&ex.minor+"x revisi tambahan minor",ex.major&&ex.major+"x revisi tambahan major"].filter(Boolean);
 $("#send").href=wa(`Halo, saya ingin memesan jasa pembuatan website dengan paket ${it.map(({d,q})=>d.n+(q>1?` (${q}x)`:"")).join(", ")}.${add.length?" Tambahan: "+add.join(", ")+".":""} Estimasi harga: ${tot}.`);
 $("#send").classList.toggle("dis",!n);
 $("#send").tabIndex=n?0:-1;
}
const dr=$("#dr"),ov=$("#ov");let last;
const openDr=()=>{last=document.activeElement;dr.classList.add("open");ov.classList.add("open");$("#close").focus()};
const closeDr=()=>{dr.classList.remove("open");ov.classList.remove("open");last&&last.focus&&last.focus()};
document.addEventListener("click",e=>{
 const g=a=>e.target.closest(`[${a}]`);let b;
 if(b=g("data-c")){const c=b.dataset.c;sel.has(c)?sel.delete(c):sel.set(c,1);upd()}
 else if(b=g("data-rm")){sel.delete(b.dataset.rm);upd()}
 else if(b=g("data-q")){const c=b.dataset.q;sel.set(c,Math.max(1,Math.min(99,sel.get(c)+ +b.dataset.s)));upd()}
 else if(b=g("data-ex")){const k=b.dataset.ex;ex[k]=Math.max(0,Math.min(99,ex[k]+ +b.dataset.s));upd()}
 else if(b=g("data-v")){$("#g").hidden=b.dataset.v!=="g";$("#t").hidden=b.dataset.v!=="t";document.querySelectorAll("[data-v]").forEach(x=>x.setAttribute("aria-pressed",x===b))}
 else if(e.target.closest("#open,#open2"))openDr();
 else if(e.target.closest("#close")||e.target===ov)closeDr();
 else if(e.target.id==="clr"){sel.clear();ex.src=ex.minor=ex.major=0;upd();closeDr()}
});
document.addEventListener("change",e=>{if(e.target.dataset.opt){ex.src=e.target.checked?1:0;upd()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&dr.classList.contains("open"))closeDr()});
upd();
