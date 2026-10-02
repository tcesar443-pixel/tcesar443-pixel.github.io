const menu=document.querySelector('.menu'), nav=document.querySelector('.navlinks');
if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
function trackAction(name,params={}){if(typeof gtag==='function'){gtag('event',name,params)}}
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>trackAction(el.dataset.track,{link_url:el.href||'',link_text:(el.textContent||'').trim().slice(0,80)})));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const imageAssets={
  hero:{count:3,prefix:'assets/imgdata/hero45-',type:'image/avif'},
  sobre:{count:4,prefix:'assets/imgdata/sobre45-',type:'image/avif'},
  capa:{count:4,prefix:'assets/imgdata/capa45-',type:'image/avif'}
};
const imageDataCache=new Map();
async function getImageData(key){
  if(imageDataCache.has(key)) return imageDataCache.get(key);
  const conf=imageAssets[key];
  if(!conf) return null;
  const promise=Promise.all(Array.from({length:conf.count},(_,i)=>{
    const file=conf.prefix+String(i).padStart(2,'0')+'.txt';
    return fetch(file,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(file+' '+r.status);return r.text()});
  })).then(parts=>'data:'+conf.type+';base64,'+parts.join(''));
  imageDataCache.set(key,promise);
  return promise;
}
async function loadChunkedImage(img){
  try{
    const data=await getImageData(img.dataset.asset);
    if(data){img.src=data; img.removeAttribute('srcset');}
  }catch(err){console.error('Falha ao carregar imagem',img.dataset.asset,err)}
}
document.querySelectorAll('img[data-asset]').forEach(loadChunkedImage);
const pressDownload=document.getElementById('download-photo');
if(pressDownload){
  getImageData('sobre').then(data=>{
    if(data){pressDownload.href=data;pressDownload.download='thiago-murro-imprensa.avif'}
  }).catch(()=>{});
}
