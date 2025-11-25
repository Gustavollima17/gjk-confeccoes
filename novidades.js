// === Filtro e Busca ===
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll('.filter-group input');
function filtrarECampos() {
  let termo = searchInput.value.toLowerCase();
  let checks = {};
  filters.forEach(f => {
    if (f.checked) { (checks[f.name] ||= []).push(f.value);}
  });
  document.querySelectorAll('.produto-card').forEach(card => {
    let visivel = true;
    let nome = card.dataset.nome.toLowerCase();
    for (const k in checks){
      if(checks[k].length && !checks[k].includes(card.dataset[k])) visivel=false;
    }
    if (termo && !nome.includes(termo)) visivel = false;
    card.style.display = visivel ? "" : "none";
  });
}
searchInput.addEventListener("input", filtrarECampos);
filters.forEach(f => f.addEventListener("change", filtrarECampos));

// === Wishlist ===
let wishlist = JSON.parse(localStorage.getItem('wishlist')||"[]");
function atualizarWishlistUI() {
  document.querySelectorAll('.wishlist-btn').forEach((b,i) => {
    const pid = b.closest('.produto-card').dataset.id;
    b.classList.toggle("active", wishlist.includes(pid));
    b.onclick = () => {
      if(wishlist.includes(pid)){ wishlist = wishlist.filter(x=>x!==pid);}
      else{ wishlist.push(pid);}
      localStorage.setItem('wishlist',JSON.stringify(wishlist));
      atualizarWishlistUI();
      showToast(wishlist.includes(pid) ? "Adicionado aos favoritos!" : "Removido dos favoritos");
    }
  });
  // atualizar painel
  document.querySelector(".wishlist-panel .wishlist-list").innerHTML =
    wishlist.map(pid=>{
      let prod = document.querySelector(`.produto-card[data-id='${pid}']`);
      return prod?`<li>${prod.dataset.nome}</li>`:"";
    }).join('');
  document.querySelector('.wishlist-count').textContent = wishlist.length;
}
window.addEventListener('DOMContentLoaded', atualizarWishlistUI);

// === Comparador ===
let compareList = [];
function atualizarCompareUI(){
  document.querySelectorAll('.compare-btn').forEach(btn=>{
    const pid = btn.closest('.produto-card').dataset.id;
    btn.classList.toggle("active", compareList.includes(pid));
    btn.onclick = ()=>{
      if(compareList.includes(pid)){ compareList=compareList.filter(x=>x!==pid);}
      else if(compareList.length<3) { compareList.push(pid);}
      else {showToast("Você pode comparar até 3 produtos!");}
      atualizarCompareUI();
      atualizarPainelCompare();
    }
  });
}
function atualizarPainelCompare(){
  const painel = document.querySelector('.compare-panel');
  painel.classList.toggle("active", !!compareList.length);
  painel.querySelector('.compare-list').innerHTML =
    compareList.map(pid=>{
      let prod = document.querySelector(`.produto-card[data-id='${pid}']`);
      return prod?`<div>${prod.dataset.nome}</div>`:"";
    }).join('');
}
document.querySelector('.close-compare').onclick = ()=>{compareList=[]; atualizarCompareUI(); atualizarPainelCompare();}
window.addEventListener('DOMContentLoaded', atualizarCompareUI);

// === Galeria Zoom ===
document.querySelectorAll('.galeria-btn, .produto-img img').forEach(btn=>{
  btn.onclick=()=>{
    const prod = btn.closest('.produto-card');
    let content = `<img src="${prod.querySelector('img').src}" alt="Foto do produto">`;
    // fotos extras fictícias:
    if(prod.dataset.id==="1") content+=`<img src="img/vestido_feminino_extra.jpg" alt="Detalhe 2">`;
    if(prod.dataset.id==="2") content+=`<img src="img/camisa_masculina_extra.jpg" alt="Detalhe 2">`;
    document.getElementById('galeria-modal').classList.add('active');
    document.querySelector('.galeria-content').innerHTML = content;
  }
});
document.querySelector('.close-galeria').onclick = ()=> document.getElementById('galeria-modal').classList.remove('active');
document.getElementById('galeria-modal').onclick = e=> {if(e.target.classList.contains('galeria-modal')) document.getElementById('galeria-modal').classList.remove('active');};

// === FAQ Accordion ===
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.onclick = function(){
    this.parentElement.classList.toggle('open');
  };
});

// === Contador de Estoque e Notificação ===
document.querySelectorAll('.notify-btn').forEach(btn=>{
  btn.onclick = ()=>{
    showToast("Você será avisado quando esse produto chegar!");
  };
});
document.querySelectorAll('.stock-bar').forEach(bar=>{
  let qtd=parseInt(bar.closest('.produto-card').dataset.disponivel);
  if(qtd<=3){bar.classList.add('alert');}
  bar.querySelector('.qtd').textContent = qtd;
});

// === Toast de Notificação (UI) ===
function showToast(msg){
  let toast = document.createElement('div');
  toast.className='custom-toast';
  toast.textContent=msg;
  document.body.appendChild(toast);
  setTimeout(()=>toast.classList.add('visible'),20);
  setTimeout(()=>{toast.classList.remove('visible');setTimeout(()=>toast.remove(),400)},2800);
}

// === Animação de Confete simples ===
function confeteAnimacao(){
  let c=document.createElement('canvas'); c.className="confete"; document.body.appendChild(c);
  c.width=window.innerWidth; c.height=window.innerHeight;
  let ctx=c.getContext('2d'),part=[];
  for(let i=0;i<150;i++)part.push({x:Math.random()*c.width,y:Math.random()*-c.height,r:4+Math.random()*8,c:`hsl(${Math.random()*360},90%,55%)`});
  let t=0; function anim(){ctx.clearRect(0,0,c.width,c.height);part.forEach(p=>{p.y+=2+p.r/2;if(p.y>c.height)p.y=0;p.x+=Math.sin((t+p.y/10)/9);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle=p.c;ctx.fill();});t+=0.09;if(t<350)requestAnimationFrame(anim);else c.remove();}
  anim();
}
// Exemplo de uso: ativar em dias especiais
// confeteAnimacao();

// === Botão de Acessibilidade ===
const accessBtn=document.getElementById('accessibility-btn');
accessBtn.onclick=()=>{
  document.body.classList.toggle('high-contrast');
  accessBtn.textContent=document.body.classList.contains('high-contrast')?"A-":"A+";
};
