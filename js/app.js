import { firebaseConfig, storeConfig } from "./firebase-config.js";

const grid = document.querySelector("#product-grid");
const count = document.querySelector("#catalog-count");
const search = document.querySelector("#search-input");
const sort = document.querySelector("#sort-select");

document.querySelectorAll("[data-store-name]").forEach(el => el.textContent = storeConfig.name);
document.querySelector("#current-year").textContent = new Date().getFullYear();

const whatsappUrl = (message = "Olá! Gostaria de conhecer os iPhones disponíveis.") =>
  `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
  link.href = whatsappUrl();
});

// Dados demonstrativos apenas para visualizar o layout.
// Serão substituídos pelos produtos do Firestore na Etapa 2.
const demoProducts = [
  {id:"demo-1",name:"iPhone 13",storage:"128 GB",color:"Meia-noite",battery:87,condition:"Excelente",price:2299,description:"Aparelho seminovo. Consulte os detalhes e a disponibilidade.",image:"https://images.unsplash.com/photo-1632633173522-5cb9a5a8c8d8?auto=format&fit=crop&w=900&q=80",featured:true},
  {id:"demo-2",name:"iPhone 12",storage:"128 GB",color:"Azul",battery:84,condition:"Muito bom",price:1799,description:"Aparelho seminovo. Consulte os detalhes e a disponibilidade.",image:"https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=80",featured:false},
  {id:"demo-3",name:"iPhone 14",storage:"128 GB",color:"Estelar",battery:91,condition:"Excelente",price:2799,description:"Aparelho seminovo. Consulte os detalhes e a disponibilidade.",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80",featured:true}
];

let products = demoProducts;

function money(value) {
  return Number(value).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function renderProducts() {
  const term = search.value.trim().toLowerCase();
  let visible = products.filter(p => `${p.name} ${p.storage} ${p.color}`.toLowerCase().includes(term));
  if (sort.value === "price-asc") visible.sort((a,b)=>a.price-b.price);
  if (sort.value === "price-desc") visible.sort((a,b)=>b.price-a.price);
  if (sort.value === "name") visible.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
  if (sort.value === "featured") visible.sort((a,b)=>Number(b.featured)-Number(a.featured));

  count.textContent = `${visible.length} ${visible.length === 1 ? "aparelho" : "aparelhos"}`;
  if (!visible.length) {
    grid.innerHTML = '<div class="catalog-message">Nenhum aparelho encontrado. Tente outra busca.</div>';
    return;
  }

  grid.innerHTML = visible.map(p => {
    const message = `Olá! Tenho interesse no ${p.name} ${p.storage}${p.color ? `, cor ${p.color}` : ""}, anunciado por ${money(p.price)}. Ainda está disponível?`;
    return `<article class="product-card">
      <div class="product-photo">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : ""}
        ${p.featured ? '<span class="product-tag">DESTAQUE</span>' : ""}
      </div>
      <div class="product-info">
        <div class="product-top"><h3>${escapeHTML(p.name)}</h3><span class="product-price">${money(p.price)}</span></div>
        <div class="product-meta"><span>${escapeHTML(p.storage || "")}</span><span>${escapeHTML(p.color || "")}</span><span>Bateria ${Number(p.battery)}%</span></div>
        <p class="product-description">${escapeHTML(p.description || p.condition || "")}</p>
        <a class="product-cta" href="${whatsappUrl(message)}" target="_blank" rel="noopener"><span>Consultar pelo WhatsApp</span><span>↗</span></a>
      </div>
    </article>`;
  }).join("");
}

function escapeHTML(value="") {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

search.addEventListener("input", renderProducts);
sort.addEventListener("change", renderProducts);
renderProducts();

// Menu mobile
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded","false");
  menuButton.textContent = "☰";
}));

// Firebase será conectado na Etapa 2. Validamos aqui para evitar falsa conexão.
const firebaseConfigured = firebaseConfig.apiKey !== "COLOQUE_SUA_API_KEY"
  && firebaseConfig.projectId !== "SEU_PROJETO";
if (!firebaseConfigured) console.info("Modo de demonstração: configure o Firebase na Etapa 2.");
