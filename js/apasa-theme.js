/* APASA ShelterManager adoption cards, version 2.0.0 */
(function () {
  "use strict";
  const path = window.location.pathname.toLowerCase();
  const lang = path === "/de" || path.startsWith("/de/") ? "de" : path === "/es" || path.startsWith("/es/") ? "es" : "en";
  const text = {
    en: { meet: "Meet", female: "Female", male: "Male", small: "Small", medium: "Medium", large: "Large", atApasa: "At APASA", cross: "cross", senior: "Senior", longstay: "Long-term", newArrival: "New arrival" },
    es: { meet: "Conoce a", female: "Hembra", male: "Macho", small: "Pequeño", medium: "Mediano", large: "Grande", atApasa: "En APASA", cross: "cruce", senior: "Senior", longstay: "Larga estancia", newArrival: "Recién llegado" },
    de: { meet: "Lerne kennen:", female: "Hündin", male: "Rüde", small: "Klein", medium: "Mittel", large: "Groß", atApasa: "Bei APASA", cross: "Mischling", senior: "Senior", longstay: "Langzeitgast", newArrival: "Neu angekommen" }
  }[lang];

  function escapeHtml(value) { return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
  function shortDescription(a) { if (lang === "es") return a.WEBSHORTDESCS || a.WEBSHORTDESC || ""; if (lang === "de") return a.WEBSHORTDESCG || a.WEBSHORTDESC || ""; return a.WEBSHORTDESC || ""; }
  function breed(a) { const name = String(a.BREEDNAME || "").trim(); if (Number(a.CROSSBREED) !== 1) return name; if (lang === "es") return `${text.cross} de ${name}`.trim(); if (lang === "de") return `${name}-${text.cross}`.replace(/^-/, ""); return `${name} ${text.cross}`.trim(); }
  function age(a) {
    if (!a.DATEOFBIRTH) return String(a.ANIMALAGE || "").replace(/\.$/, "");
    const dob = new Date(`${a.DATEOFBIRTH}T00:00:00`); if (Number.isNaN(dob.getTime())) return String(a.ANIMALAGE || "").replace(/\.$/, "");
    const now = new Date(); let months = (now.getFullYear() - dob.getFullYear()) * 12 + now.getMonth() - dob.getMonth(); if (now.getDate() < dob.getDate()) months -= 1; months = Math.max(0, months); const years = Math.floor(months / 12);
    if (years === 0) { if (lang === "es") return `${months} ${months === 1 ? "mes" : "meses"}`; if (lang === "de") return `${months} ${months === 1 ? "Monat" : "Monate"}`; return `${months} ${months === 1 ? "month" : "months"}`; }
    if (lang === "es") return `${years} ${years === 1 ? "año" : "años"}`; if (lang === "de") return `${years} ${years === 1 ? "Jahr" : "Jahre"}`; return `${years} ${years === 1 ? "year" : "years"}`;
  }
  function sex(a) { const numeric = Number(a.SEX); if (!Number.isNaN(numeric)) return numeric === 0 ? text.female : text.male; const value = String(a.SEXNAME || "").toLowerCase(); return /female|hembra|hündin/.test(value) ? text.female : text.male; }
  function size(a) { const numeric = Number(a.SIZE); if (!Number.isNaN(numeric)) { if (numeric === 0) return text.small; if (numeric === 1) return text.medium; if (numeric === 2) return text.large; } const value = String(a.SIZENAME || "").toLowerCase(); if (/small|peque|klein/.test(value)) return text.small; if (/medium|medio|mittel/.test(value)) return text.medium; if (/large|grande|groß|gross/.test(value)) return text.large; return a.SIZENAME || ""; }
  function badge(a) { const days = Number(a.DAYSONSHELTER || 0); const dob = a.DATEOFBIRTH ? new Date(`${a.DATEOFBIRTH}T00:00:00`) : null; const years = dob && !Number.isNaN(dob.getTime()) ? (Date.now() - dob.getTime()) / 31557600000 : 0; if (years >= 10) return ["apasa-badge-senior", `⭐ ${text.senior}`]; if (days > 730) return ["apasa-badge-longstay", `❤️ ${text.longstay}`]; if (days > 0 && days < 30) return ["apasa-badge-new", `● ${text.newArrival}`]; return null; }
  function card(a) {
    const dogName = escapeHtml(a.ANIMALNAME || ""); const dogBadge = badge(a); const details = [age(a), sex(a), size(a)].filter(Boolean).map(escapeHtml).join(" &bull; "); const waiting = escapeHtml(a.TIMEONSHELTER || "");
    return `<div class="apasa-extra">${dogBadge ? `<div class="apasa-badge ${dogBadge[0]}">${escapeHtml(dogBadge[1])}</div>` : ""}<div class="apasa-breed">${escapeHtml(breed(a))}</div><div class="apasa-summary">${escapeHtml(shortDescription(a))}</div><div class="apasa-details">${details}</div>${waiting ? `<div class="apasa-waiting">❤️ ${escapeHtml(text.atApasa)} ${waiting}</div>` : ""}<div class="apasa-button">${escapeHtml(text.meet)} ${dogName} →</div></div>`;
  }
  window.asm3_adoptable_extra = card;
  window.asm3_adoptable_sort = "ANIMALNAME";
  window.asm3_adoptable_fullsize_images = true;
}());
