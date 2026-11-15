const toggle=document.getElementById('langToggle');
let language='en';
function setLanguage(next){language=next;document.documentElement.lang=next;document.querySelectorAll('[data-en][data-hi]').forEach(el=>{el.innerHTML=el.dataset[next]});toggle.textContent=next==='en'?'हिंदी':'English';}
toggle.addEventListener('click',()=>setLanguage(language==='en'?'hi':'en'));
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

// Search and filter the public service directory.
const serviceSearch=document.getElementById('serviceSearch');
const serviceCards=[...document.querySelectorAll('#serviceGrid .service-card')];
const filterButtons=[...document.querySelectorAll('.filter-btn')];
const noResults=document.getElementById('noResults');
let activeFilter='all';
function filterServices(){
  const q=(serviceSearch?.value||'').trim().toLowerCase();
  let shown=0;
  serviceCards.forEach(card=>{
    const category=card.dataset.category||'';
    const haystack=(card.dataset.search+' '+card.innerText).toLowerCase();
    const matchCategory=activeFilter==='all'||category===activeFilter;
    const matchQuery=!q||haystack.includes(q);
    const visible=matchCategory&&matchQuery;
    card.hidden=!visible;
    if(visible) shown++;
  });
  if(noResults) noResults.hidden=shown!==0;
}
serviceSearch?.addEventListener('input',filterServices);
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  filterButtons.forEach(item=>item.classList.toggle('active',item===button));
  filterServices();
}));
