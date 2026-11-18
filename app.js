'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const COL={Forest:'#17382B',Moss:'#5F7A4E',Sage:'#A9BFAA',Sand:'#D8C6A3',Ink:'#111713'};
const SZ=['S','M','L','XL','XXL'],CATS=['Tops','Bottoms','Outerwear','Accessories'],COLLS=['Essentials','Training','Recovery'];
const P={tee:'M30 18L42 14Q50 24 58 14L70 18L92 34L82 47L72 41V86H28V41L18 47L8 34Z',long:'M30 16L42 12Q50 22 58 12L70 16L95 72L85 76L71 45V88H29V45L15 76L5 72Z',tank:'M34 12H42Q50 28 58 12H66L71 32L68 88H32L29 32Z',hoodie:'M30 18L42 14H58L70 18L95 72L85 76L71 45V88H29V45L15 76L5 72Z',crew:'M30 16L42 12H58L70 16L95 72L85 76L71 45V88H29V45L15 76L5 72Z',short:'M26 28H74L84 78H55L50 50L45 78H16Z',jogger:'M28 10H72L77 48L70 92H55L50 40L45 92H30L23 48Z',tight:'M32 10H68L71 50L63 94H54L50 42L46 94H37L29 50Z',jacket:'M28 16L40 12H60L72 16L96 72L86 76L72 46V88H28V46L14 76L4 72Z',cap:'M18 64Q18 26 50 26Q82 26 82 64Z',duffel:'M12 42Q12 34 20 34H80Q88 34 88 42V74Q88 82 80 82H20Q12 82 12 74Z',strap:'M26 18H44V82H26ZM56 18H74V82H56Z'};
const d='stroke="rgba(0,0,0,.3)" fill="none"';
const X={tee:`<path d="M42 14Q50 24 58 14" ${d}/>`,long:`<path d="M42 12Q50 22 58 12" ${d}/>`,tank:`<path d="M42 12Q50 28 58 12" ${d}/>`,hoodie:'<path d="M38 14Q50 38 62 14Q50 4 38 14Z" fill="rgba(0,0,0,.22)"/><rect x="37" y="64" width="26" height="12" rx="3" fill="rgba(0,0,0,.12)"/>',crew:`<path d="M40 12Q50 30 60 12" ${d} stroke-width="3"/><path d="M29 80H71" ${d} stroke-width="3"/>`,short:`<path d="M26 34H74" ${d} stroke-width="3"/>`,jogger:`<path d="M28 18H72M31 86H44M56 86H69" ${d} stroke-width="3"/>`,tight:`<path d="M32 16H68" ${d} stroke-width="3"/>`,jacket:`<path d="M50 12V88M40 12L50 24L60 12" ${d}/>`,cap:'<path d="M58 64Q90 60 96 70L58 70Z" fill="rgba(0,0,0,.25)"/><circle cx="50" cy="27" r="2.5" fill="rgba(0,0,0,.3)"/>',duffel:`<path d="M34 34Q50 8 66 34M12 56H88" ${d} stroke-width="2.5"/>`,strap:'<path d="M26 40H44M56 40H74" stroke="rgba(0,0,0,.3)" stroke-width="6"/>'};
const garment=(t,c)=>`<svg class="g" viewBox="0 0 100 100" aria-hidden="true"><path d="${P[t]}" fill="${c}" stroke="rgba(0,0,0,.3)" stroke-linejoin="round"/>${X[t]}</svg>`;
const rings='<svg class="rings" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+[18,30,42,54].map(r=>`<circle cx="50" cy="62" r="${r}" fill="none" stroke="rgba(23,56,43,.14)"/>`).join('')+'</svg>';
const plate=(kg,f,s)=>`<svg class="plate" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="96" fill="${f}"/><circle cx="100" cy="100" r="86" fill="none" stroke="${s}" stroke-width="2" opacity=".5"/><circle cx="100" cy="100" r="72" fill="none" stroke="${s}" opacity=".5"/><circle cx="100" cy="100" r="56" fill="none" stroke="${s}" stroke-dasharray="4 5"/><circle cx="100" cy="100" r="15" fill="var(--hole)"/><text x="100" y="44" text-anchor="middle" font-family="DM Mono" font-size="12" fill="${s}">${kg} KG</text></svg>`;
const D=[['core-tee','Core Tee','Tops','Essentials',28,'tee',['Forest','Sage','Sand','Ink'],'The everyday tee. Soft, light and cut to move.','Combed cotton with 5% elastane. 160 gsm.'],
['studio-long-sleeve','Studio Long Sleeve','Tops','Essentials',44,'long',['Moss','Sand','Ink'],'A long sleeve for early floors and cold mornings.','Cotton-modal blend with a brushed inside. 180 gsm.'],
['form-tank','Form Tank','Tops','Training',32,'tank',['Ink','Sage','Forest'],'Open at the arm, steady through the shoulder.','Recycled polyester jersey, 4-way stretch. 150 gsm.'],
['layer-hoodie','Layer Hoodie','Outerwear','Recovery',78,'hoodie',['Moss','Forest','Sand'],'A heavy hood for the cooldown and the walk home.','Loopback cotton fleece. 340 gsm.'],
['crew-sweatshirt','Crew Sweatshirt','Tops','Recovery',68,'crew',['Sage','Forest','Ink'],'Plain crew, soft face, ribbed hem.','Cotton-poly French terry. 280 gsm.'],
['standard-short','Standard Short','Bottoms','Training',46,'short',['Ink','Forest','Moss'],'A 7-inch short that stays put through squats and sprints.','Stretch woven nylon, water-resistant finish.'],
['lift-jogger','Lift Jogger','Bottoms','Training',72,'jogger',['Ink','Moss','Sand'],'Tapered, with room in the thigh and a clean ankle.','Brushed 4-way stretch knit. 230 gsm.'],
['base-tight','Base Tight','Bottoms','Training',54,'tight',['Ink','Forest'],'A quiet base layer with a flat waistband.','Compression knit, recycled nylon blend. 210 gsm.'],
['warm-up-jacket','Warm-Up Jacket','Outerwear','Recovery',110,'jacket',['Forest','Sand','Ink'],'Full zip and light insulation for before and after.','Quilted shell with a soft jersey lining.'],
['everyday-cap','Everyday Cap','Accessories','Essentials',30,'cap',['Sand','Forest','Ink'],'Low profile, unlined, adjustable.','Washed cotton twill with a sweatband.'],
['carry-duffel','Carry Duffel','Accessories','Training',98,'duffel',['Forest','Ink','Moss'],'35 litres. Shoe pocket, wet pocket, nothing extra.','Coated recycled canvas, brass hardware.'],
['strap-set','Strap Set','Accessories','Recovery',36,'strap',['Sand','Ink'],'Cotton lifting straps, sold as a pair.','Woven cotton webbing, stitched loop.']];
const PR=D.map(([id,name,cat,coll,price,type,cols,desc,fab])=>({id,name,cat,coll,price,type,cols,desc,fab,acc:cat==='Accessories'}));
const DET={Tops:['Athletic fit, easy through the chest','Flat seams, no neck tag','Reinforced collar'],Bottoms:['Gusseted for full range','Zip pocket for keys','Drawcord waist'],Outerwear:['Roomy layering fit','Zip hand pockets','Ribbed cuffs and hem'],Accessories:['One size','Stitched to last','Packed flat']};
const find=id=>PR.find(p=>p.id===id),$$$=n=>'$'+n;
const swb=(p,c)=>p.cols.map(k=>`<button type="button" data-c="${k}" aria-label="${k}" aria-pressed="${k===c}" style="background:${COL[k]}"></button>`).join('');
const fr=(t,c,cls='')=>`<div class="frame arch ${cls}">${rings}${garment(t,COL[c])}</div>`;
const card=p=>`<article class="card" data-id="${p.id}" data-c="${p.cols[0]}"><a href="product.html#${p.id}" aria-label="${p.name}">${fr(p.type,p.cols[0])}</a><div class="meta"><h3><a href="product.html#${p.id}">${p.name}</a></h3><span class="price">${$$$(p.price)}</span></div><span class="lab">${p.coll}</span><div class="sw" role="group" aria-label="Colors">${swb(p,p.cols[0])}</div><button class="qa" type="button">Quick add</button></article>`;
const recolor=(el,c)=>{const b=$('.g path',el);b&&b.setAttribute('fill',COL[c])};

let cart=[];try{cart=(JSON.parse(localStorage.getItem('dn-cart'))||[]).filter(i=>find(i.id))}catch(e){}
const save=()=>{try{localStorage.setItem('dn-cart',JSON.stringify(cart))}catch(e){}};
function add(id,color,size,qty=1){const k=cart.find(i=>i.id===id&&i.color===color&&i.size===size);k?k.qty+=qty:cart.push({id,color,size,qty});save();drawCart();openCart()}
let last=null;
function openCart(){last=document.activeElement;$('#drawer').classList.add('open');$('#ov').classList.add('open');$('#drawer').setAttribute('aria-hidden','false');$('.x').focus()}
function closeCart(){$('#drawer').classList.remove('open');$('#ov').classList.remove('open');$('#drawer').setAttribute('aria-hidden','true');last&&last.focus()}
function drawCart(){
 const tot=cart.reduce((s,i)=>s+find(i.id).price*i.qty,0),n=cart.reduce((s,i)=>s+i.qty,0);
 $('#cc').textContent=n;$('#tt').textContent=$$$(tot);
 const left=120-tot;
 $('#ship').innerHTML=`<span class="lab">${left>0?`${$$$(left)} away from free shipping`:'Free shipping unlocked'}</span><div class="bg"><i style="width:${Math.min(100,tot/1.2)}%"></i></div>`;
 $('#cb').innerHTML=cart.length?cart.map((i,x)=>{const p=find(i.id);return `<div class="ci"><div class="frame arch">${rings}${garment(p.type,COL[i.color])}</div><div><h3>${p.name}</h3><span class="lab">${i.color} / ${i.size}</span><div class="q"><button data-x="${x}" data-d="-1" aria-label="Decrease quantity">−</button><output>${i.qty}</output><button data-x="${x}" data-d="1" aria-label="Increase quantity">+</button><button data-x="${x}" data-d="0">Remove</button></div></div><span class="price">${$$$(p.price*i.qty)}</span></div>`}).join(''):'<p class="lab" style="padding:20px 0">Your cart is empty.</p>';
}
function chrome(){
 $('#top').innerHTML=`<div class="ann"><span class="dot"></span>Free shipping over $120. Fictional portfolio project.</div><header class="hd"><div class="wrap bar"><a class="logo" href="index.html" aria-label="D&N home">D&amp;N</a><button class="menu" aria-label="Menu" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav" aria-label="Main"><a href="shop.html">Shop</a><a href="shop.html#essentials">Essentials</a><a href="shop.html#training">Training</a><a href="shop.html#recovery">Recovery</a><a href="about.html">About</a></nav><button class="cartbtn" aria-label="Open cart">Cart <b id="cc">0</b></button></div></header>`;
 $('#bottom').innerHTML=`<footer><div class="wrap"><div class="fg"><div><a class="logo" href="index.html" style="opacity:1;font-size:1.6rem">D&amp;N</a><p>Built for the work.</p></div><div><a href="shop.html">Shop</a><a href="about.html">About</a></div><div><a href="shop.html#training">Training</a><a href="shop.html#recovery">Recovery</a></div></div><p class="lab fn">D&amp;N is a fictional brand and a design portfolio project. Nothing here is for sale.</p></div></footer><div class="ov" id="ov"></div><aside class="drawer" id="drawer" aria-label="Shopping cart" aria-hidden="true"><div class="dh"><h2>Cart</h2><button class="x" aria-label="Close cart">✕</button></div><div class="ship" id="ship"></div><div class="db" id="cb"></div><div class="df"><div class="tot"><span class="lab">Total</span><b id="tt"></b></div><button class="btn" disabled>Checkout<i>→</i></button><p class="lab">Checkout is disabled in this demo.</p></div></aside>`;
 const m=$('.menu'),nav=$('#nav');m.onclick=()=>{const o=nav.classList.toggle('open');m.setAttribute('aria-expanded',o)};
 $('.cartbtn').onclick=openCart;$('.x').onclick=closeCart;$('#ov').onclick=closeCart;
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
 $('#cb').onclick=e=>{const b=e.target.closest('[data-x]');if(!b)return;const i=cart[+b.dataset.x],dd=+b.dataset.d;if(!dd)cart.splice(+b.dataset.x,1);else{i.qty+=dd;if(i.qty<1)cart.splice(+b.dataset.x,1)}save();drawCart()};
 document.addEventListener('click',e=>{
  const c=e.target.closest('.card');if(!c)return;const p=find(c.dataset.id),s=e.target.closest('.sw button');
  if(s){c.dataset.c=s.dataset.c;$$('.sw button',c).forEach(b=>b.setAttribute('aria-pressed',b===s));recolor(c,s.dataset.c)}
  else if(e.target.closest('.qa'))add(p.id,c.dataset.c,p.acc?'One':'M')});
 drawCart();
}
function fill(){
 $$('[data-g]').forEach(e=>{const[t,c]=e.dataset.g.split(',');e.innerHTML=rings+garment(t,COL[c])});
 $$('[data-plate]').forEach(e=>{const[k,f,s]=e.dataset.plate.split('|');e.innerHTML=plate(k,f,s)});
}
function home(){
 const t=['Built for the work','Dawn','Night','Free shipping over $120','Twelve pieces','20 / 15 / 10 KG'].map(s=>`<span>${s}</span>`).join('');
 $('#tick').innerHTML=`<div class="track">${t+t+t+t}</div>`;
 $('#feat').innerHTML=['core-tee','layer-hoodie','lift-jogger','warm-up-jacket'].map(i=>card(find(i))).join('');
 $('#nl').onsubmit=e=>{e.preventDefault();$('#nm').textContent='Thanks. This is a demo, so nothing was sent.';e.target.reset()};
}
function shop(){
 const st={cat:'',coll:'',color:'',size:'',sort:'f'};
 const G=[['cat','Category',CATS],['coll','Collection',COLLS],['color','Color',Object.keys(COL)],['size','Size',SZ]];
 const preset=()=>{const h=location.hash.slice(1).toLowerCase();st.cat=CATS.find(c=>c.toLowerCase()===h)||'';st.coll=COLLS.find(c=>c.toLowerCase()===h)||''};
 function draw(){
  $('#filters').innerHTML=G.map(([k,l,o])=>`<fieldset><legend class="lab">${l}</legend>${['',...o].map(v=>`<button type="button" class="chip${st[k]===v?' on':''}" data-k="${k}" data-v="${v}" aria-pressed="${st[k]===v}">${k==='color'&&v?`<span class="swd" style="background:${COL[v]}"></span>`:''}${v||'All'}</button>`).join('')}</fieldset>`).join('')+`<label class="lab">Sort<br><select id="sort"><option value="f">Featured</option><option value="l"${st.sort==='l'?' selected':''}>Price: low to high</option><option value="h"${st.sort==='h'?' selected':''}>Price: high to low</option><option value="n"${st.sort==='n'?' selected':''}>Name</option></select></label>`;
  let r=PR.filter(p=>(!st.cat||p.cat===st.cat)&&(!st.coll||p.coll===st.coll)&&(!st.color||p.cols.includes(st.color))&&(!st.size||!p.acc));
  if(st.sort==='l')r.sort((a,b)=>a.price-b.price);if(st.sort==='h')r.sort((a,b)=>b.price-a.price);if(st.sort==='n')r.sort((a,b)=>a.name.localeCompare(b.name));
  $('#grid').innerHTML=r.map(card).join('');$('#empty').hidden=!!r.length;$('#count').textContent=`${r.length} of ${PR.length} pieces`;
 }
 $('#filters').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;st[b.dataset.k]=b.dataset.v;draw();$(`[data-k="${b.dataset.k}"][data-v="${b.dataset.v}"]`).focus()};
 $('#filters').onchange=e=>{st.sort=e.target.value;draw();$('#sort').focus()};
 $('#filters').onsubmit=e=>e.preventDefault();
 $('#clr').onclick=()=>{Object.assign(st,{cat:'',coll:'',color:'',size:'',sort:'f'});history.replaceState(null,'','shop.html');draw()};
 addEventListener('hashchange',()=>{preset();draw()});preset();draw();
}
function product(){
 let p,c,s,q,tab=0;
 const TAB=[['Details',()=>`<ul>${DET[p.cat].map(x=>`<li>${x}</li>`).join('')}<li>${p.desc}</li></ul>`],['Fabric and care',()=>`<p>${p.fab}</p><p>Wash cold with like colors. Hang dry. Do not bleach.</p>`],['Shipping and returns',()=>'<p>Free shipping over $120. Otherwise a flat $8. Returns within 30 days, unworn. This is a fictional store, so nothing ships.</p>']];
 const tabs=()=>{$('#tb').innerHTML=TAB.map((t,i)=>`<button class="chip${i===tab?' on':''}" role="tab" aria-selected="${i===tab}" data-t="${i}">${t[0]}</button>`).join('');$('#tp').innerHTML=TAB[tab][1]()};
 function draw(){
  p=find(location.hash.slice(1))||PR[0];c=p.cols[0];s=p.acc?'One':'M';q=1;tab=0;document.title=p.name+' — D&N';$('#bc').textContent=p.name;
  $('#pdp').innerHTML=`<div id="pf">${fr(p.type,c,'big')}</div><div class="info"><p class="lab">${p.coll} / ${p.cat}</p><h1>${p.name}</h1><p class="price big">${$$$(p.price)}</p><p>${p.desc}</p><p class="lab">Color: <span id="cn">${c}</span></p><div class="sw" id="psw" role="group" aria-label="Color">${swb(p,c)}</div><p class="lab">Size</p><div class="sizes" id="psz" role="group" aria-label="Size">${(p.acc?['One']:SZ).map(z=>`<button type="button" class="chip${z===s?' on':''}" data-z="${z}" aria-pressed="${z===s}">${z}</button>`).join('')}</div><div class="qty"><button type="button" aria-label="Decrease quantity" data-q="-1">−</button><output id="qv">1</output><button type="button" aria-label="Increase quantity" data-q="1">+</button></div><div><button class="btn" id="ab" type="button">Add to cart<i>→</i></button></div><div class="tabs" id="tb" role="tablist"></div><div id="tp" role="tabpanel"></div></div>`;
  tabs();$('#rel').innerHTML=[...PR.filter(x=>x.id!==p.id&&x.coll===p.coll),...PR.filter(x=>x.id!==p.id&&x.coll!==p.coll)].slice(0,4).map(card).join('');
 }
 $('#pdp').onclick=e=>{
  const sw=e.target.closest('#psw button'),z=e.target.closest('[data-z]'),qb=e.target.closest('[data-q]'),t=e.target.closest('[data-t]');
  if(sw){c=sw.dataset.c;$$('#psw button').forEach(b=>b.setAttribute('aria-pressed',b===sw));$('#cn').textContent=c;recolor($('#pf'),c)}
  if(z){s=z.dataset.z;$$('#psz .chip').forEach(b=>{b.classList.toggle('on',b===z);b.setAttribute('aria-pressed',b===z)})}
  if(qb){q=Math.max(1,Math.min(9,q+ +qb.dataset.q));$('#qv').textContent=q}
  if(t){tab=+t.dataset.t;tabs()}
  if(e.target.closest('#ab'))add(p.id,c,s,q)};
 addEventListener('hashchange',()=>{draw();scrollTo(0,0)});draw();
}
chrome();fill();
({home,shop,product}[document.body.dataset.page]||(()=>{}))();
