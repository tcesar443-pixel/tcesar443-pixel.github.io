const menu=document.querySelector('.menu'), nav=document.querySelector('.navlinks');
if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
function trackAction(name,params={}){if(typeof gtag==='function'){gtag('event',name,params)}}
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>trackAction(el.dataset.track,{link_url:el.href||'',link_text:(el.textContent||'').trim().slice(0,80)})));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
