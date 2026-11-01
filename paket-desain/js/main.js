const $=s=>document.querySelector(s),sel=new Set();
const fmt=n=>n>=1e6?(n/1e6).toString().replace(".",",")+" jt":(n/1e3)+" rb";
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const ic='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
const chip=d=>d.src?'<span class="chip">Source code termasuk</span>':'';
const card=d=>`<article class="card"><div class="top"><span class="code">${d.c}</span></div><h3>${d.n}</h3><p class="tg">${d.tag}</p><div class="price">${d.p}<small>per proyek</small></div><div class="meta"><span>↻ Revisi ${d.r}</span>${chip(d)}</div><ul class="ck">${d.s.map(x=>`<li>${x}</li>`).join("")}</ul><details><summary>Hasil akhir yang diterima</summary><p>${d.o}</p></details><div class="act"><button class="btn p" data-c="${d.c}">+ Tambah ke estimasi</button><a class="btn ic" target="_blank" rel="noopener" href="${wa(`Halo, saya ingin tanya paket ${d.n} (${d.c}).`)}" aria-label="Tanya paket ${d.n} via WhatsApp">${ic}</a></div></article>`;
const row=d=>`<tr><td class="nw"><b>${d.c}</b></td><td><b>${d.n}</b><div class="mu">${d.tag}</div>${d.src?'<div style="margin-top:8px">'+chip(d)+'</div>':''}</td><td>${d.s.join("; ")}</td><td>${d.o}</td><td class="nw">${d.r}</td><td class="tr nw"><b>${d.p}</b><div class="mu">per proyek</div></td><td><button class="btn p sq" data-c="${d.c}" aria-label="Tambah ${d.n} ke estimasi">+</button></td></tr>`;
$("#g").innerHTML=D.map(card).join("");
$("#tb").innerHTML=D.map(row).join("");
["#wa0","#wa1","#wa2"].forEach(i=>{$(i).href=wa("Halo, saya ingin konsultasi gratis tentang pembuatan website.")});
function upd(){
 document.querySelectorAll("[data-c]").forEach(b=>{const on=sel.has(b.dataset.c),sq=b.classList.contains("sq");b.classList.toggle("on",on);b.classList.toggle("p",!on);b.textContent=sq?(on?"✓":"+"):(on?"✓ Ditambahkan":"+ Tambah ke estimasi")});
 const L=D.filter(d=>sel.has(d.c)),lo=L.reduce((a,d)=>a+d.lo,0),hi=L.reduce((a,d)=>a+d.hi,0);
 $("#est").classList.toggle("show",L.length>0);
 $("#cnt").textContent=`${L.length} paket dipilih · estimasi total`;
 $("#tot").textContent=`Rp ${fmt(lo)} – ${fmt(hi)}`;
 $("#send").href=wa(`Halo, saya ingin konsultasi gratis untuk paket ${L.map(d=>d.n).join(" + ")}. Estimasi awal: Rp ${fmt(lo)} – ${fmt(hi)}.`);
}
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-c]");
 if(b){const c=b.dataset.c;sel.has(c)?sel.delete(c):sel.add(c);upd()}
 const v=e.target.closest("[data-v]");
 if(v){$("#g").hidden=v.dataset.v!=="g";$("#t").hidden=v.dataset.v!=="t";document.querySelectorAll("[data-v]").forEach(x=>x.setAttribute("aria-pressed",x===v))}
 if(e.target.id==="clr"){sel.clear();upd()}
});
upd();
