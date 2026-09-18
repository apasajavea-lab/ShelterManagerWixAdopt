(function () {
  "use strict";
  const scriptUrl = document.currentScript && document.currentScript.src;
  const query = new URLSearchParams(location.search), referrer = (document.referrer || "").toLowerCase();
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : referrer.includes("/de/") ? "de" : referrer.includes("/es/") ? "es" : "en";
  const index = lang === "en" ? 0 : lang === "es" ? 1 : 2;
  const set = (selector, value) => { const element = document.querySelector(selector); if (element && value) element.textContent = value; };
  const sex = value => /female|hembra|hündin/i.test(value) ? ["Female", "Hembra", "Hündin"][index] : /male|macho|rüde/i.test(value) ? ["Male", "Macho", "Rüde"][index] : value;
  function lookup(value) {
    const key = value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const map = { yes: ["Yes", "Sí", "Ja"], si: ["Yes", "Sí", "Ja"], ja: ["Yes", "Sí", "Ja"], no: ["No", "No", "Nein"], nein: ["No", "No", "Nein"], unknown: ["Unknown", "Desconocido", "Unbekannt"], desconocido: ["Unknown", "Desconocido", "Unbekannt"], unbekannt: ["Unknown", "Desconocido", "Unbekannt"], selective: ["Selective", "Selectivo", "Selektiv"], selectivo: ["Selective", "Selectivo", "Selektiv"], selektiv: ["Selective", "Selectivo", "Selektiv"] };
    return map[key] ? map[key][index] : value;
  }
  function duration(value) {
    const y = Number((value.match(/(\d+)\s*(?:years?|años?|jahre?)/i) || [])[1] || 0), m = Number((value.match(/(\d+)\s*(?:months?|mes(?:es)?|monate?)/i) || [])[1] || 0), w = Number((value.match(/(\d+)\s*(?:weeks?|semanas?|wochen?)/i) || [])[1] || 0), d = Number((value.match(/(\d+)\s*(?:days?|días?|tage?)/i) || [])[1] || 0);
    if (!y && !m && !w && !d) return value;
    const words = { en: [["year", "years"], ["month", "months"], ["week", "weeks"], ["day", "days"]], es: [["año", "años"], ["mes", "meses"], ["semana", "semanas"], ["día", "días"]], de: [["Jahr", "Jahre"], ["Monat", "Monate"], ["Woche", "Wochen"], ["Tag", "Tage"]] }[lang];
    return [[y, words[0]], [m, words[1]], [w, words[2]], [d, words[3]]].filter(item => item[0]).map(item => `${item[0]} ${item[1][item[0] === 1 ? 0 : 1]}`).join(" ");
  }
  function colour(value) {
    const map = { marron: ["Brown", "Marrón", "Braun"], brown: ["Brown", "Marrón", "Braun"], negro: ["Black", "Negro", "Schwarz"], black: ["Black", "Negro", "Schwarz"], blanco: ["White", "Blanco", "Weiß"], white: ["White", "Blanco", "Weiß"], gris: ["Grey", "Gris", "Grau"], grey: ["Grey", "Gris", "Grau"], gray: ["Grey", "Gris", "Grau"], canela: ["Tan", "Canela", "Zimtfarben"], dorado: ["Golden", "Dorado", "Goldfarben"], atigrado: ["Brindle", "Atigrado", "Gestromt"], tricolor: ["Tricolour", "Tricolor", "Dreifarbig"] };
    return value.split(/\s*(?:-\s*(?:with|con|mit)?|\/|,|\b(?:and|with|y|con|und|mit)\b)\s*/i).filter(Boolean).map(part => { const key = part.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); return map[key] ? map[key][index] : part.trim(); }).join({ en: " and ", es: " y ", de: " und " }[lang]);
  }
  function translateBreed() {
    const element = document.querySelector(".apasa-subtitle");
    if (!element || !window.APASA_BREEDS) return;
    const raw = element.textContent.trim().toLocaleLowerCase("es");
    const record = Object.values(window.APASA_BREEDS).find(item => Object.values(item).some(value => String(value).trim().toLocaleLowerCase("es") === raw));
    if (record && record[lang]) element.textContent = record[lang];
  }
  function loadBreedTranslations() {
    if (window.APASA_BREEDS) { translateBreed(); return; }
    if (!scriptUrl) return;
    const script = document.createElement("script");
    script.src = scriptUrl.replace(/apasa-profile(?:\.min)?\.js(?:\?.*)?$/, "apasa-breeds.js");
    script.addEventListener("load", translateBreed);
    document.head.appendChild(script);
  }
  function addSizeFact() {
    const key = query.get("size");
    const values = { small: ["Small", "Pequeño", "Klein"], medium: ["Medium", "Mediano", "Mittel"], large: ["Large", "Grande", "Groß"] };
    if (!values[key]) return;
    const facts = document.querySelector(".apasa-facts");
    if (!facts || facts.querySelector(".apasa-size")) return;
    const fact = document.createElement("div");
    fact.className = "apasa-fact apasa-size";
    const label = document.createElement("dt");
    label.textContent = ["Size", "Tamaño", "Größe"][index];
    const value = document.createElement("dd");
    value.textContent = values[key][index];
    fact.append(label, value);
    facts.appendChild(fact);
  }
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-language]").forEach(element => { element.style.display = element.dataset.language === lang ? "block" : "none"; });
  document.querySelectorAll("[data-i18n]").forEach(element => { const value = element.dataset[lang]; if (value) element.textContent = value; });
  loadBreedTranslations();
  addSizeFact();
  document.querySelectorAll(".apasa-trait strong").forEach(element => { element.textContent = lookup(element.textContent); });
  set(".apasa-sex", sex(document.querySelector(".apasa-sex")?.textContent || "")); set(".apasa-duration", duration(document.querySelector(".apasa-duration")?.textContent || "")); set(".apasa-colour", colour(query.get("colour") || document.querySelector(".apasa-colour")?.textContent || ""));
  const back = document.querySelector(".apasa-back"), backUrls = { en: "https://www.apasa.eu/smview", es: "https://www.apasa.eu/es/smview", de: "https://www.apasa.eu/de/smview" };
  if (back) { back.href = backUrls[lang]; back.target = "_top"; back.textContent = back.dataset[lang] || back.textContent; }
  const main = document.querySelector(".apasa-main-photo");
  const thumbs = document.querySelector(".apasa-thumbs");
  function updateArrowVisibility() {
    const hidden = document.querySelectorAll(".apasa-thumb").length < 2;
    document.querySelectorAll(".apasa-gallery-arrow").forEach(button => { button.hidden = hidden; });
  }
  function setupGalleryNavigation() {
    if (!main || !main.parentNode) return;
    const style = document.createElement("style");
    style.textContent = ".apasa-photo-stage{position:relative;width:100%;aspect-ratio:1/1;overflow:hidden;border-radius:18px;background:#f3f4ed}.apasa-photo-stage .apasa-main-photo{width:100%;height:100%!important;aspect-ratio:auto;object-fit:contain;border-radius:0}.apasa-gallery-arrow{position:absolute;top:50%;z-index:2;width:48px;height:48px;padding:0;transform:translateY(-50%);border:0;border-radius:50%;color:#333;background:rgba(255,255,255,.9);box-shadow:0 2px 10px rgba(0,0,0,.22);font-size:34px;line-height:1;cursor:pointer}.apasa-gallery-arrow:hover{background:#fff}.apasa-gallery-arrow:focus-visible{outline:3px solid #f5a300}.apasa-gallery-prev{left:14px}.apasa-gallery-next{right:14px}.apasa-senior-rosette{position:absolute;top:18px;right:18px;z-index:3;width:105px;height:105px;padding:14px 9px 9px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;background:#a0001d;border:5px solid #f7c84b;border-radius:50%;box-shadow:0 3px 12px rgba(0,0,0,.32),inset 0 0 0 2px rgba(255,255,255,.35);font-size:11px;font-weight:900;line-height:1.05;letter-spacing:.2px;text-align:center;text-transform:uppercase;pointer-events:none}.apasa-senior-rosette:before{content:'★';margin-bottom:4px;color:#f7c84b;font-size:25px;line-height:1}.apasa-senior-rosette:after{content:'';position:absolute;right:9px;bottom:-20px;left:9px;height:29px;z-index:-1;background:linear-gradient(135deg,#7d0016 0 42%,transparent 43%),linear-gradient(225deg,#7d0016 0 42%,transparent 43%);background-position:left top,right top;background-size:50% 100%;background-repeat:no-repeat}@media(max-width:430px){.apasa-gallery-arrow{width:42px;height:42px;font-size:30px}.apasa-gallery-prev{left:9px}.apasa-gallery-next{right:9px}.apasa-senior-rosette{top:12px;right:12px;width:88px;height:88px;font-size:9px;border-width:4px}}";
    document.head.appendChild(style);
    const stage = document.createElement("div");
    stage.className = "apasa-photo-stage";
    main.parentNode.insertBefore(stage, main);
    stage.appendChild(main);
    [["prev", "‹", -1], ["next", "›", 1]].forEach(([name, symbol, direction]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `apasa-gallery-arrow apasa-gallery-${name}`;
      button.textContent = symbol;
      button.setAttribute("aria-label", direction < 0 ? ["Previous photo", "Foto anterior", "Vorheriges Foto"][index] : ["Next photo", "Foto siguiente", "Nächstes Foto"][index]);
      button.addEventListener("click", () => {
        const photos = Array.from(document.querySelectorAll(".apasa-thumb"));
        if (!photos.length) return;
        const current = Math.max(0, photos.findIndex(photo => photo.getAttribute("aria-current") === "true"));
        photos[(current + direction + photos.length) % photos.length].click();
      });
      stage.appendChild(button);
    });
    updateArrowVisibility();
  }
  function addSeniorRosette() {
    const birthParts = String(document.querySelector(".apasa-fact dd")?.textContent || "").trim().split(/[./-]/).map(Number);
    const birthDate = birthParts.length === 3 ? new Date(birthParts[2], birthParts[1] - 1, birthParts[0]) : null;
    const tenthBirthday = birthDate && !Number.isNaN(birthDate.getTime()) ? new Date(birthDate.getFullYear() + 10, birthDate.getMonth(), birthDate.getDate()) : null;
    if (query.get("senior") !== "1" && (!tenthBirthday || tenthBirthday > new Date())) return;
    const stage = document.querySelector(".apasa-photo-stage");
    if (!stage || stage.querySelector(".apasa-senior-rosette")) return;
    const rosette = document.createElement("span");
    rosette.className = "apasa-senior-rosette";
    rosette.textContent = ["Senior Foster Program", "Programa de Acogida Sénior", "Senioren-Pflegeprogramm"][index];
    stage.appendChild(rosette);
  }
  function bindThumb(button) {
    const image = button.querySelector("img");
    image.style.objectFit = "contain";
    image.style.background = "#f3f4ed";
    const removeBroken = () => { button.remove(); updateArrowVisibility(); reportHeight(); };
    image.addEventListener("error", removeBroken);
    if (image.complete && image.naturalWidth === 0) removeBroken();
    button.addEventListener("click", () => { main.src = image.src; document.querySelectorAll(".apasa-thumb").forEach(item => item.removeAttribute("aria-current")); button.setAttribute("aria-current", "true"); });
  }
  document.querySelectorAll(".apasa-thumb").forEach(bindThumb);
  function loadExtraPhoto(sequence) {
    if (!thumbs || sequence > 30 || !query.get("animalid")) return;
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("account", query.get("account") || "zz1727");
    url.searchParams.set("method", "animal_image");
    url.searchParams.set("animalid", query.get("animalid"));
    url.searchParams.set("seq", sequence);
    const image = new Image();
    image.alt = "";
    image.addEventListener("load", () => {
      const button = document.createElement("button");
      button.className = "apasa-thumb";
      button.type = "button";
      button.appendChild(image);
      thumbs.appendChild(button);
      bindThumb(button);
      updateArrowVisibility();
      reportHeight();
      loadExtraPhoto(sequence + 1);
    });
    image.addEventListener("error", reportHeight);
    image.src = url.href;
  }
  setupGalleryNavigation();
  addSeniorRosette();
  loadExtraPhoto(7);
  if (main) { main.style.objectFit = "contain"; main.style.background = "#f3f4ed"; }
  main?.addEventListener("error", () => { main.closest(".apasa-gallery").hidden = true; });
  function reportHeight() { if (window.parent !== window) window.parent.postMessage({ type: "apasa-profile-height", height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }, "https://www.apasa.eu"); }
  window.addEventListener("load", reportHeight); window.setTimeout(reportHeight, 300); window.setTimeout(reportHeight, 1200);
  if (window.ResizeObserver) new ResizeObserver(reportHeight).observe(document.body);
}());
