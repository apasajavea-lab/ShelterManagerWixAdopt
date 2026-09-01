(function () {
  "use strict";
  const query = new URLSearchParams(location.search), referrer = (document.referrer || "").toLowerCase();
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : referrer.includes("/de/") ? "de" : referrer.includes("/es/") ? "es" : "en";
  const index = lang === "en" ? 0 : lang === "es" ? 1 : 2;
  const set = (selector, value) => { const element = document.querySelector(selector); if (element && value) element.textContent = value; };
  const sex = value => /female|hembra|hündin/i.test(value) ? ["Female", "Hembra", "Hündin"][index] : /male|macho|rüde/i.test(value) ? ["Male", "Macho", "Rüde"][index] : value;
  function duration(value) {
    const y = Number((value.match(/(\d+)\s*(?:years?|años?|jahre?)/i) || [])[1] || 0), m = Number((value.match(/(\d+)\s*(?:months?|mes(?:es)?|monate?)/i) || [])[1] || 0), d = Number((value.match(/(\d+)\s*(?:days?|días?|tage?)/i) || [])[1] || 0);
    if (!y && !m && !d) return value;
    const words = { en: [["year", "years"], ["month", "months"], ["day", "days"]], es: [["año", "años"], ["mes", "meses"], ["día", "días"]], de: [["Jahr", "Jahre"], ["Monat", "Monate"], ["Tag", "Tage"]] }[lang];
    return [[y, words[0]], [m, words[1]], [d, words[2]]].filter(item => item[0]).map(item => `${item[0]} ${item[1][item[0] === 1 ? 0 : 1]}`).join(" ");
  }
  function colour(value) {
    const map = { marron: ["Brown", "Marrón", "Braun"], brown: ["Brown", "Marrón", "Braun"], negro: ["Black", "Negro", "Schwarz"], black: ["Black", "Negro", "Schwarz"], blanco: ["White", "Blanco", "Weiß"], white: ["White", "Blanco", "Weiß"], gris: ["Grey", "Gris", "Grau"], grey: ["Grey", "Gris", "Grau"], gray: ["Grey", "Gris", "Grau"], canela: ["Tan", "Canela", "Zimtfarben"], dorado: ["Golden", "Dorado", "Goldfarben"], atigrado: ["Brindle", "Atigrado", "Gestromt"], tricolor: ["Tricolour", "Tricolor", "Dreifarbig"] };
    return value.split(/\s+(?:y|and|und)\s+|\s*[/,]\s*/i).filter(Boolean).map(part => { const key = part.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); return map[key] ? map[key][index] : part.trim(); }).join({ en: " and ", es: " y ", de: " und " }[lang]);
  }
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-language]").forEach(element => { element.style.display = element.dataset.language === lang ? "block" : "none"; });
  document.querySelectorAll("[data-i18n]").forEach(element => { const value = element.dataset[lang]; if (value) element.textContent = value; });
  set(".apasa-sex", sex(document.querySelector(".apasa-sex")?.textContent || "")); set(".apasa-duration", duration(document.querySelector(".apasa-duration")?.textContent || "")); set(".apasa-colour", colour(document.querySelector(".apasa-colour")?.textContent || ""));
  const back = document.querySelector(".apasa-back"), backUrls = { en: "https://www.apasa.eu/smview", es: "https://www.apasa.eu/es/smview", de: "https://www.apasa.eu/de/smview" };
  if (back) { back.href = backUrls[lang]; back.textContent = back.dataset[lang] || back.textContent; }
  const main = document.querySelector(".apasa-main-photo");
  document.querySelectorAll(".apasa-thumb").forEach(button => { const image = button.querySelector("img"); image.addEventListener("error", () => button.remove()); button.addEventListener("click", () => { main.src = image.src; document.querySelectorAll(".apasa-thumb").forEach(item => item.removeAttribute("aria-current")); button.setAttribute("aria-current", "true"); }); });
  main?.addEventListener("error", () => { main.closest(".apasa-gallery").hidden = true; });
}());
