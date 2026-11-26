/* =========================================================
   CONFIGURACIÓN (editar aquí para futuras campañas)
   ========================================================= */
const CONFIG = {
  endDate: "2026-11-29T23:59:59-04:00",   // Fin de promoción, hora de Bolivia (UTC-4)
  countryCode: "591",
  phones: ["69425211", "62352438", "68537298", "68522288"],
  message: "Hola, estoy interesado/a en conocer más sobre la promoción Black Friday de los diplomados 2027. Quisiera recibir información."
};
const CATS = {ing:"Ingeniería y Tecnología",der:"Derecho",edu:"Educación",adm:"Administración y Negocios",seg:"Seguridad y Salud",mkt:"Marketing y Datos"};

/* [nombre, categoría, ruta de la imagen]  → cambia aquí la imagen de cada diplomado */
const DIPLOMADOS = [
["INGENIERÍA DE DISEÑO ELECTROMECÁNICO ASISTIDO POR COMPUTADORA CAD-CAM","ing","img/diplomado1.jfif"],
["DERECHO ADMINISTRATIVO Y DEFENSA LEGAL DEL ESTADO","der","img/diplomado2.jfif"],
["SEGURIDAD Y SALUD OCUPACIONAL EN TRABAJOS DE ALTO RIESGO","seg","img/diplomado3.jfif"],
["EDUCACIÓN SUPERIOR BASADO EN COMPETENCIAS DIGITALES E INTELIGENCIA ARTIFICIAL","edu","img/diplomado4.webp"],
["COMERCIO EXTERIOR Y ADMINISTRACIÓN ADUANERA","adm","img/diplomado5.jfif"],
["DERECHO LABORAL, PROCESAL LABORAL Y SEGURIDAD SOCIAL","der","img/diplomado6.jfif"],
["INGENIERÍA DE DISEÑO EN INSTALACIONES ELÉCTRICAS DOMICILIARIAS E INDUSTRIALES","ing","img/diplomado7.jfif"],
["ADMINISTRACIÓN Y GESTIÓN DE RECURSOS HUMANOS","adm","img/diplomado8.jfif"],
["DERECHO CONSTITUCIONAL, CONTROL DE CONVENCIONALIDAD Y ACCIONES DE DEFENSA","der","img/diplomado9.jfif"],
["CIBERSEGURIDAD Y ETHICAL HACKING CON INTELIGENCIA ARTIFICIAL","ing","img/diplomado10.jfif"],
["GESTIÓN, REGLAMENTACIÓN Y EVALUACIÓN AMBIENTAL","seg","img/diplomado11.jfif"],
["DERECHO DE FAMILIA, PROCESAL FAMILIAR E INTERPRETACIÓN JURISPRUDENCIAL","der","img/diplomado12.jfif"],
["GESTIÓN DE LA CADENA DE SUMINISTRO Y LOGÍSTICA APLICADA","adm","img/diplomado13.jfif"],
["INGENIERÍA DE MANTENIMIENTO INDUSTRIAL Y CONFIABILIDAD OPERACIONAL","ing","img/diplomado14.jfif"],
["FULLSTACK DEVELOPER BACKEND Y FRONTEND","ing","img/diplomado15.jfif"],
["MARKETING DIGITAL Y DISEÑO MULTIMEDIA CON INTELIGENCIA ARTIFICIAL","mkt","img/diplomado16.jfif"],
["DERECHO CIVIL, PROCESAL CIVIL, MENCIÓN EN ARGUMENTACIÓN JURÍDICA Y LITIGACIÓN","der","img/diplomado17.jfif"],
["AUTOMATIZACIÓN, CONTROL Y OPTIMIZACIÓN DE PROCESOS INDUSTRIALES","ing","img/diplomado18.jfif"],
["EXCEL Y POWER BI: NEGOCIOS INTELIGENTES Y ANÁLISIS DE DATOS","mkt","img/diplomado19.jfif"],
["DERECHO PENAL Y PROCESAL PENAL","der","img/diplomado20.jfif"],
["DERECHO NOTARIAL CON MENCIÓN EN INTELIGENCIA ARTIFICIAL Y TECNOLOGÍAS DIGITALES","der","img/diplomado21.jfif"],
["GESTIÓN DE LA SEGURIDAD Y SALUD EN EL TRABAJO","seg","img/diplomado22.jfif"],
["ARBITRAJE Y CONCILIACIÓN JUDICIAL, MENCIÓN EN JUSTICIA RESTAURATIVA","der","img/diplomado23.jfif"],
["ADMINISTRACIÓN Y GESTIÓN DE EMPRESAS","adm","img/diplomado24.jfif"],
["DERECHO ADMINISTRATIVO, MENCIÓN EN RESPONSABILIDAD POR LA FUNCIÓN PÚBLICA Y LEY 1178","der","img/diplomado25.jfif"],
["EXCEL Y POWER BI, MENCIÓN EN DATA ANALYTICS Y BUSINESS INTELLIGENCE","mkt","img/diplomado26.jfif"],
["EDUCACIÓN SUPERIOR BASADO EN COMPETENCIAS, MENCIÓN EN HERRAMIENTAS DIGITALES E INTELIGENCIA ARTIFICIAL","edu","img/diplomado27.jfif"]
];

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- WhatsApp: asesor al azar ---------- */
const waLink = (num, text = CONFIG.message) => `https://wa.me/${CONFIG.countryCode}${num}?text=${encodeURIComponent(text)}`;
const waBtns = (text) => CONFIG.phones.map(n => `<a class="btn btn-wa promo" target="_blank" rel="noopener" href="${waLink(n, text)}">💬 +${CONFIG.countryCode} ${n}</a>`).join("");
const rnd = () => CONFIG.phones[Math.floor(Math.random() * CONFIG.phones.length)];
/* Cada clic en un botón [data-wa] abre WhatsApp con uno de los 4 números elegido al azar */
$$("[data-wa]").forEach(a => a.href = waLink(rnd()));
document.addEventListener("click", e => { const a = e.target.closest("[data-wa]"); if (a) a.href = waLink(rnd(), a.dataset.msg || CONFIG.message); }, true);
const waRand = (label, msg, cls = "btn-wa") => `<a class="btn ${cls} promo" data-wa data-msg="${msg}" target="_blank" rel="noopener" href="#">${label}</a>`;
const msgFor = n => `${CONFIG.message} Diplomado de interés: ${n}.`;
$$("[data-phones]").forEach(el => el.innerHTML = waBtns());

/* ---------- Tarjetas, búsqueda y filtros ---------- */
const grid = $("#grid"), q = $("#q"), chips = $("#chips");
let cat = "all";
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
chips.innerHTML = `<button class="chip on" data-c="all">Todos</button>` + Object.entries(CATS).map(([k, v]) => `<button class="chip" data-c="${k}">${v}</button>`).join("");

/* La imagen sale de la tercera posición de cada elemento del arreglo */
grid.innerHTML = DIPLOMADOS.map(([n, c, img], idx) => `
 <article class="card" data-cat="${c}" data-name="${norm(n)}">
  <div class="thumb">
    <b>DIPLOMADO<br>2027</b>
    <img loading="lazy" src="${img}" alt="Diplomado en ${n}" onerror="this.remove()">
  </div>
  <span class="bf">BLACK FRIDAY 2027</span>
  <h3>Diplomado en ${n}.</h3>
  <span class="open">✔ INSCRIPCIONES ABIERTAS</span>
  <button class="btn btn-gold promo more" data-i="${idx}">Más información</button>
  ${waRand("Consultar por WhatsApp", msgFor(n))}
 </article>`).join("");

const cards = $$(".card");
function filter() {
  const t = norm(q.value.trim()); let n = 0;
  cards.forEach(c => { const ok = (cat === "all" || c.dataset.cat === cat) && c.dataset.name.includes(t); c.hidden = !ok; if (ok) n++; });
  $("#count").textContent = `${n} diplomado${n === 1 ? "" : "s"} disponible${n === 1 ? "" : "s"}`;
  $("#none").hidden = n > 0;
}
q.addEventListener("input", filter);
chips.addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  cat = b.dataset.c; $$(".chip", chips).forEach(x => x.classList.toggle("on", x === b)); filter();
});
filter();

/* ---------- Diálogo "Más información" ---------- */
const dlg = $("#dlg");
grid.addEventListener("click", e => {
  const b = e.target.closest(".more"); if (!b) return;
  const name = DIPLOMADOS[b.dataset.i][0];
  $("#dlgT").textContent = "Diplomado en " + name;
  $("#dlgP").innerHTML = waRand("Hablar con un asesor", msgFor(name), "btn-gold") + '<p style="width:100%">o elige un número:</p>' + waBtns(msgFor(name));
  dlg.showModal ? dlg.showModal() : dlg.setAttribute("open", "");
});

/* ---------- Menú móvil ---------- */
const burger = $("#burger"), menu = $("#menu");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

/* ---------- Contador regresivo ---------- */
const end = new Date(CONFIG.endDate).getTime();
const pad = n => String(n).padStart(2, "0");
let timer;
function tick() {
  let diff = end - Date.now();
  if (diff <= 0) { diff = 0; document.body.classList.add("ended"); $("#endMsg").hidden = false; clearInterval(timer); }
  const s = Math.floor(diff / 1000);
  $("#d").textContent = pad(Math.floor(s / 86400)); $("#h").textContent = pad(Math.floor(s % 86400 / 3600));
  $("#m").textContent = pad(Math.floor(s % 3600 / 60)); $("#s").textContent = pad(s % 60);
}
timer = setInterval(tick, 1000); tick();

/* ---------- Luces navideñas ---------- */
const cols = ["#ff3b3b", "#ffd54a", "#3bff8a", "#4aa8ff"], L = $("#lights");
for (let i = 0; i < 40; i++) { const e = document.createElement("i"); e.style.color = cols[i % 4]; e.style.animationDelay = (i % 7) * .22 + "s"; L.appendChild(e); }

/* ---------- Aparición al hacer scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
$$(".card, .reveal").forEach(el => io.observe(el));

/* ---------- Interacción: encuentra tu diplomado ---------- */
const pick = $("#pick"), recs = $("#recs");
pick.innerHTML = Object.entries(CATS).map(([k, v]) => `<button class="chip" data-c="${k}">${v}</button>`).join("");
pick.addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  $$(".chip", pick).forEach(x => x.classList.toggle("on", x === b));
  const list = DIPLOMADOS.filter(d => d[1] === b.dataset.c).sort(() => Math.random() - .5).slice(0, 3);
  recs.innerHTML = list.map(([n]) => `<div class="rec"><span class="bf">BLACK FRIDAY 2027</span><h3>Diplomado en ${n}.</h3>${waRand("Lo quiero · WhatsApp", msgFor(n))}</div>`).join("");
});

/* ---------- Nieve (canvas, optimizada) ---------- */
if (!reduce) {
  const cv = $("#snow"), ctx = cv.getContext("2d"); let W, H; const flakes = [];
  const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  size(); addEventListener("resize", size);
  const mk = y => ({ x: Math.random() * W, y: y ?? Math.random() * H, r: Math.random() * 3 + 1, v: Math.random() * 1.2 + .4, p: Math.random() * 6.28 });
  for (let i = 0; i < (innerWidth < 640 ? 45 : 110); i++) flakes.push(mk());
  (function loop() {
    if (!document.hidden) {
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.beginPath();
      flakes.forEach(f => {
        f.y += f.v; f.p += .01; f.x += Math.sin(f.p) * .5;
        if (f.y > H + 5) Object.assign(f, mk(-5));
        ctx.moveTo(f.x + f.r, f.y); ctx.arc(f.x, f.y, f.r, 0, 6.28);
      });
      ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
}