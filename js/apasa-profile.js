(function () {
  "use strict";
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
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-language]").forEach(element => { element.style.display = element.dataset.language === lang ? "block" : "none"; });
  document.querySelectorAll("[data-i18n]").forEach(element => { const value = element.dataset[lang]; if (value) element.textContent = value; });
  document.querySelectorAll(".apasa-trait strong").forEach(element => { element.textContent = lookup(element.textContent); });
  set(".apasa-sex", sex(document.querySelector(".apasa-sex")?.textContent || "")); set(".apasa-duration", duration(document.querySelector(".apasa-duration")?.textContent || "")); set(".apasa-colour", colour(query.get("colour") || document.querySelector(".apasa-colour")?.textContent || ""));
  const back = document.querySelector(".apasa-back"), backUrls = { en: "https://www.apasa.eu/smview", es: "https://www.apasa.eu/es/smview", de: "https://www.apasa.eu/de/smview" };
  if (back) { back.href = backUrls[lang]; back.target = "_top"; back.textContent = back.dataset[lang] || back.textContent; }
  const main = document.querySelector(".apasa-main-photo");
  document.querySelectorAll(".apasa-thumb").forEach(button => { const image = button.querySelector("img"); image.addEventListener("error", () => button.remove()); button.addEventListener("click", () => { main.src = image.src; document.querySelectorAll(".apasa-thumb").forEach(item => item.removeAttribute("aria-current")); button.setAttribute("aria-current", "true"); }); });
  main?.addEventListener("error", () => { main.closest(".apasa-gallery").hidden = true; });
  function reportHeight() { if (window.parent !== window) window.parent.postMessage({ type: "apasa-profile-height", height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }, "https://www.apasa.eu"); }
  window.addEventListener("load", reportHeight); window.setTimeout(reportHeight, 300); window.setTimeout(reportHeight, 1200);
  if (window.ResizeObserver) new ResizeObserver(reportHeight).observe(document.body);
}());
