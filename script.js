const toggle=document.getElementById('langToggle');
let language='en';
function setLanguage(next){language=next;document.documentElement.lang=next;document.querySelectorAll('[data-en][data-hi]').forEach(el=>{el.innerHTML=el.dataset[next]});toggle.textContent=next==='en'?'हिंदी':'English';}
toggle.addEventListener('click',()=>setLanguage(language==='en'?'hi':'en'));
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
