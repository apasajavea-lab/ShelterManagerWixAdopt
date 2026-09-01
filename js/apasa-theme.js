/* APASA ShelterManager adoption cards, version 2.1.0 */
(function () {
  "use strict";
  const path = window.location.pathname.toLowerCase();
  const lang = path === "/de" || path.startsWith("/de/") ? "de" : path === "/es" || path.startsWith("/es/") ? "es" : "en";
  const text = {
    en: { meet: "Meet", female: "Female", male: "Male", small: "Small", medium: "Medium", large: "Large", atApasa: "At APASA", cross: "cross", senior: "Senior", longstay: "Long-term", newArrival: "New arrival", search: "Search by name", allSexes: "All sexes", allSizes: "All sizes", allAges: "All ages", allSpecial: "All dogs", puppy: "Puppy", young: "Young", adult: "Adult", newDogs: "New arrivals", sortBy: "Sort by", sortName: "Name A–Z", sortLongest: "Longest waiting", sortNewest: "Newest arrivals", sortYoungest: "Youngest", sortOldest: "Oldest", clear: "Clear filters", dogs: "dogs", oneDog: "dog", noResults: "No dogs match these filters." },
    es: { meet: "Conoce a", female: "Hembra", male: "Macho", small: "Pequeño", medium: "Mediano", large: "Grande", atApasa: "En APASA", cross: "cruce", senior: "Senior", longstay: "Larga estancia", newArrival: "Recién llegado", search: "Buscar por nombre", allSexes: "Todos los sexos", allSizes: "Todos los tamaños", allAges: "Todas las edades", allSpecial: "Todos los perros", puppy: "Cachorro", young: "Joven", adult: "Adulto", newDogs: "Recién llegados", sortBy: "Ordenar por", sortName: "Nombre A–Z", sortLongest: "Más tiempo esperando", sortNewest: "Llegadas recientes", sortYoungest: "Más jóvenes", sortOldest: "Mayores", clear: "Borrar filtros", dogs: "perros", oneDog: "perro", noResults: "Ningún perro coincide con estos filtros." },
    de: { meet: "Triff", female: "Hündin", male: "Rüde", small: "Klein", medium: "Mittel", large: "Groß", atApasa: "Bei APASA", cross: "Mischling", senior: "Senior", longstay: "Langzeitgast", newArrival: "Neu angekommen", search: "Nach Namen suchen", allSexes: "Alle Geschlechter", allSizes: "Alle Größen", allAges: "Alle Altersgruppen", allSpecial: "Alle Hunde", puppy: "Welpe", young: "Junghund", adult: "Erwachsen", newDogs: "Neu angekommen", sortBy: "Sortieren nach", sortName: "Name A–Z", sortLongest: "Längste Wartezeit", sortNewest: "Neueste Ankünfte", sortYoungest: "Jüngste", sortOldest: "Älteste", clear: "Filter löschen", dogs: "Hunde", oneDog: "Hund", noResults: "Keine Hunde entsprechen diesen Filtern." }
  }[lang];

  function escapeHtml(value) { return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
  function shortDescription(a) { if (lang === "es") return a.WEBSHORTDESCS || a.WEBSHORTDESC || ""; if (lang === "de") return a.WEBSHORTDESCG || a.WEBSHORTDESC || ""; return a.WEBSHORTDESC || ""; }
  function translatedBreed(id, englishName, spanishName) {
    const record = window.APASA_BREEDS && window.APASA_BREEDS[String(id || "")];
    if (record && record[lang]) return record[lang];
    const english = String(englishName || spanishName || "").trim();
    if (lang === "es") return String(spanishName || englishName || "").trim();
    return english;
  }

  function breed(a) {
    const primary = translatedBreed(a.BREEDID, a.PETFINDERBREED, a.BREEDNAME1 || a.BREEDNAME);
    const secondary = translatedBreed(a.BREED2ID, a.PETFINDERBREED2, a.BREEDNAME2);
    if (Number(a.CROSSBREED) !== 1) return primary;

    const differentBreeds = secondary && (
      String(a.BREED2ID || "") !== String(a.BREEDID || "") ||
      secondary.toLowerCase() !== primary.toLowerCase()
    );

    if (differentBreeds) {
      if (lang === "es") return `Cruce de ${primary} y ${secondary}`;
      return `${primary} × ${secondary}`;
    }

    if (lang === "es") return `Cruce de ${primary}`;
    if (lang === "de") return `${primary}-${text.cross}`;
    return `${primary} Cross`;
  }
  function localizedDuration(years, months, days) {
    const parts = [];
    if (lang === "es") {
      if (years) parts.push(`${years} ${years === 1 ? "año" : "años"}`);
      if (months) parts.push(`${months} ${months === 1 ? "mes" : "meses"}`);
      if (!parts.length && days !== undefined) parts.push(`${days} ${days === 1 ? "día" : "días"}`);
    } else if (lang === "de") {
      if (years) parts.push(`${years} ${years === 1 ? "Jahr" : "Jahre"}`);
      if (months) parts.push(`${months} ${months === 1 ? "Monat" : "Monate"}`);
      if (!parts.length && days !== undefined) parts.push(`${days} ${days === 1 ? "Tag" : "Tage"}`);
    } else {
      if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
      if (months) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
      if (!parts.length && days !== undefined) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
    }
    return parts.join(" ");
  }

  function translatedStoredDuration(value) {
    const raw = String(value || "").replace(/\.$/, "");
    const years = Number((raw.match(/(\d+)\s+years?/i) || [])[1] || 0);
    const months = Number((raw.match(/(\d+)\s+months?/i) || [])[1] || 0);
    const daysMatch = raw.match(/(\d+)\s+days?/i);
    if (!years && !months && !daysMatch) return raw;
    return localizedDuration(years, months, daysMatch ? Number(daysMatch[1]) : undefined);
  }

  function ageInMonths(a) {
    if (a.DATEOFBIRTH) {
      const dob = new Date(`${a.DATEOFBIRTH}T00:00:00`);
      if (!Number.isNaN(dob.getTime())) {
        const now = new Date();
        let months = (now.getFullYear() - dob.getFullYear()) * 12 + now.getMonth() - dob.getMonth();
        if (now.getDate() < dob.getDate()) months -= 1;
        return Math.max(0, months);
      }
    }
    const raw = String(a.ANIMALAGE || "");
    const years = Number((raw.match(/(\d+)\s+years?/i) || [])[1] || 0);
    const months = Number((raw.match(/(\d+)\s+months?/i) || [])[1] || 0);
    return years || months ? years * 12 + months : -1;
  }

  function sexKey(a) {
    const numeric = Number(a.SEX);
    if (!Number.isNaN(numeric)) return numeric === 0 ? "female" : "male";
    return /female|hembra|hündin/i.test(String(a.SEXNAME || "")) ? "female" : "male";
  }

  function sizeKey(a) {
    const numeric = Number(a.SIZE);
    if (!Number.isNaN(numeric)) return numeric === 0 ? "small" : numeric === 1 ? "medium" : numeric === 2 ? "large" : "";
    const value = String(a.SIZENAME || "");
    if (/small|peque|klein/i.test(value)) return "small";
    if (/medium|medio|mittel/i.test(value)) return "medium";
    if (/large|grande|groß|gross/i.test(value)) return "large";
    return "";
  }

  function ageKey(months) {
    if (months < 0) return "";
    if (months < 12) return "puppy";
    if (months < 36) return "young";
    if (months < 96) return "adult";
    return "senior";
  }

  function age(a) {
    if (!a.DATEOFBIRTH) return translatedStoredDuration(a.ANIMALAGE);
    const dob = new Date(`${a.DATEOFBIRTH}T00:00:00`); if (Number.isNaN(dob.getTime())) return translatedStoredDuration(a.ANIMALAGE);
    const now = new Date(); let months = (now.getFullYear() - dob.getFullYear()) * 12 + now.getMonth() - dob.getMonth(); if (now.getDate() < dob.getDate()) months -= 1; months = Math.max(0, months); const years = Math.floor(months / 12);
    return localizedDuration(years, years === 0 ? months : 0, undefined);
  }
  function sex(a) { const numeric = Number(a.SEX); if (!Number.isNaN(numeric)) return numeric === 0 ? text.female : text.male; const value = String(a.SEXNAME || "").toLowerCase(); return /female|hembra|hündin/.test(value) ? text.female : text.male; }
  function size(a) { const numeric = Number(a.SIZE); if (!Number.isNaN(numeric)) { if (numeric === 0) return text.small; if (numeric === 1) return text.medium; if (numeric === 2) return text.large; } const value = String(a.SIZENAME || "").toLowerCase(); if (/small|peque|klein/.test(value)) return text.small; if (/medium|medio|mittel/.test(value)) return text.medium; if (/large|grande|groß|gross/.test(value)) return text.large; return a.SIZENAME || ""; }
  function waitingTime(a) {
    const rawDays = a.DAYSONSHELTER;
    if (rawDays !== undefined && rawDays !== null && rawDays !== "") {
      const days = Math.max(0, Math.floor(Number(rawDays)));
      if (Number.isFinite(days)) {
        const years = Math.floor(days / 365.2425);
        const months = Math.floor((days - Math.floor(years * 365.2425)) / 30.4369);
        return localizedDuration(years, months, days);
      }
    }
    return translatedStoredDuration(a.TIMEONSHELTER);
  }
  function badge(a) { const days = Number(a.DAYSONSHELTER || 0); const dob = a.DATEOFBIRTH ? new Date(`${a.DATEOFBIRTH}T00:00:00`) : null; const years = dob && !Number.isNaN(dob.getTime()) ? (Date.now() - dob.getTime()) / 31557600000 : 0; if (years >= 10) return ["apasa-badge-senior", `⭐ ${text.senior}`]; if (days > 730) return ["apasa-badge-longstay", `❤️ ${text.longstay}`]; if (days > 0 && days < 30) return ["apasa-badge-new", `● ${text.newArrival}`]; return null; }
  function card(a) {
    const dogName = escapeHtml(a.ANIMALNAME || ""); const dogBadge = badge(a); const details = [age(a), sex(a), size(a)].filter(Boolean).map(escapeHtml).join(" &bull; "); const waiting = escapeHtml(waitingTime(a));
    const months = ageInMonths(a); const days = Math.max(0, Number(a.DAYSONSHELTER || 0)); const specials = [months >= 120 ? "senior" : "", days > 730 ? "longstay" : "", days > 0 && days < 30 ? "new" : ""].filter(Boolean).join(" ");
    return `<div class="apasa-extra" data-name="${dogName.toLowerCase()}" data-sex="${sexKey(a)}" data-size="${sizeKey(a)}" data-age="${ageKey(months)}" data-age-months="${months}" data-days="${days}" data-special="${specials}" data-colour="${escapeHtml(a.ADOPTAPETCOLOUR || "")}">${dogBadge ? `<div class="apasa-badge ${dogBadge[0]}">${escapeHtml(dogBadge[1])}</div>` : `<div class="apasa-badge apasa-badge-placeholder" aria-hidden="true">Placeholder</div>`}<div class="apasa-breed">${escapeHtml(breed(a))}</div><div class="apasa-summary">${escapeHtml(shortDescription(a))}</div><div class="apasa-details">${details}</div>${waiting ? `<div class="apasa-waiting">❤️ ${escapeHtml(text.atApasa)} ${waiting}</div>` : ""}<button class="apasa-button" type="button">${escapeHtml(text.meet)} ${dogName} →</button></div>`;
  }

  function toolbarHtml() {
    return `<div class="apasa-toolbar" role="search"><div class="apasa-toolbar-controls"><input class="apasa-search" type="search" placeholder="${escapeHtml(text.search)}" aria-label="${escapeHtml(text.search)}"><select class="apasa-filter-sex" aria-label="${escapeHtml(text.allSexes)}"><option value="">${escapeHtml(text.allSexes)}</option><option value="female">${escapeHtml(text.female)}</option><option value="male">${escapeHtml(text.male)}</option></select><select class="apasa-filter-size" aria-label="${escapeHtml(text.allSizes)}"><option value="">${escapeHtml(text.allSizes)}</option><option value="small">${escapeHtml(text.small)}</option><option value="medium">${escapeHtml(text.medium)}</option><option value="large">${escapeHtml(text.large)}</option></select><select class="apasa-filter-age" aria-label="${escapeHtml(text.allAges)}"><option value="">${escapeHtml(text.allAges)}</option><option value="puppy">${escapeHtml(text.puppy)}</option><option value="young">${escapeHtml(text.young)}</option><option value="adult">${escapeHtml(text.adult)}</option><option value="senior">${escapeHtml(text.senior)}</option></select><select class="apasa-filter-special" aria-label="${escapeHtml(text.allSpecial)}"><option value="">${escapeHtml(text.allSpecial)}</option><option value="senior">${escapeHtml(text.senior)}</option><option value="longstay">${escapeHtml(text.longstay)}</option><option value="new">${escapeHtml(text.newDogs)}</option></select><label class="apasa-sort-field"><span class="apasa-sort-label">${escapeHtml(text.sortBy)}</span><select class="apasa-sort" aria-label="${escapeHtml(text.sortBy)}"><option value="name">${escapeHtml(text.sortName)}</option><option value="longest">${escapeHtml(text.sortLongest)}</option><option value="newest">${escapeHtml(text.sortNewest)}</option><option value="youngest">${escapeHtml(text.sortYoungest)}</option><option value="oldest">${escapeHtml(text.sortOldest)}</option></select></label><button class="apasa-clear" type="button">${escapeHtml(text.clear)}</button></div><div class="apasa-results" aria-live="polite"></div><div class="apasa-empty" hidden>${escapeHtml(text.noResults)}</div></div>`;
  }

  function initialiseToolbar(list) {
    if (document.querySelector(".apasa-toolbar")) return;
    list.insertAdjacentHTML("beforebegin", toolbarHtml());
    const toolbar = list.previousElementSibling;
    const controls = {
      search: toolbar.querySelector(".apasa-search"), sex: toolbar.querySelector(".apasa-filter-sex"), size: toolbar.querySelector(".apasa-filter-size"), age: toolbar.querySelector(".apasa-filter-age"), special: toolbar.querySelector(".apasa-filter-special"), sort: toolbar.querySelector(".apasa-sort")
    };

    list.addEventListener("click", event => {
      const button = event.target.closest(".apasa-button");
      if (!button) return;
      const profileLink = button.closest(".asm3-adoptable-item")?.querySelector(".asm3-adoptable-link");
      if (profileLink) {
        event.preventDefault();
        const profileUrl = new URL(profileLink.href, window.location.href);
        const wixProfile = new URL(`${lang === "en" ? "" : `/${lang}`}/dogprofile`, window.location.origin);
        wixProfile.searchParams.set("animalid", profileUrl.searchParams.get("animalid") || "");
        wixProfile.searchParams.set("lang", lang);
        const publisherColour = button.closest(".asm3-adoptable-item")?.querySelector(".apasa-extra")?.dataset.colour;
        if (publisherColour) wixProfile.searchParams.set("colour", publisherColour);
        window.location.assign(wixProfile.toString());
      }
    });

    function apply() {
      const items = Array.from(list.querySelectorAll(".asm3-adoptable-item"));
      const query = controls.search.value.trim().toLowerCase();
      let visible = 0;
      for (const item of items) {
        const data = item.querySelector(".apasa-extra")?.dataset;
        if (!data) continue;
        const show = (!query || data.name.includes(query)) && (!controls.sex.value || data.sex === controls.sex.value) && (!controls.size.value || data.size === controls.size.value) && (!controls.age.value || data.age === controls.age.value) && (!controls.special.value || data.special.split(" ").includes(controls.special.value));
        item.classList.toggle("apasa-hidden", !show);
        if (show) visible += 1;
      }

      const number = value => Number(value || -1);
      items.sort((left, right) => {
        const a = left.querySelector(".apasa-extra")?.dataset || {}; const b = right.querySelector(".apasa-extra")?.dataset || {};
        if (controls.sort.value === "longest") return number(b.days) - number(a.days);
        if (controls.sort.value === "newest") return number(a.days) - number(b.days);
        if (controls.sort.value === "youngest") return number(a.ageMonths) - number(b.ageMonths);
        if (controls.sort.value === "oldest") return number(b.ageMonths) - number(a.ageMonths);
        return String(a.name).localeCompare(String(b.name), lang);
      }).forEach(item => list.appendChild(item));

      toolbar.querySelector(".apasa-results").textContent = `${visible} ${visible === 1 ? text.oneDog : text.dogs}`;
      toolbar.querySelector(".apasa-empty").hidden = visible !== 0;
    }

    Object.values(controls).forEach(control => control.addEventListener(control === controls.search ? "input" : "change", apply));
    toolbar.querySelector(".apasa-clear").addEventListener("click", () => { Object.values(controls).forEach(control => { control.value = control === controls.sort ? "name" : ""; }); apply(); });
    apply();
  }

  function waitForList() {
    let attempts = 0;
    const timer = window.setInterval(() => {
      const list = document.getElementById("asm3-adoptable-list");
      if (list && list.querySelector(".apasa-extra")) { window.clearInterval(timer); if (window.apasa_homepage_mode && typeof window.apasaHomepageReady === "function") window.apasaHomepageReady(list); else initialiseToolbar(list); }
      if (++attempts > 80) window.clearInterval(timer);
    }, 250);
  }
  window.asm3_adoptable_extra = card;
  window.asm3_adoptable_sort = "ANIMALNAME";
  window.asm3_adoptable_style = "apasaanimalview";
  window.asm3_adoptable_fullsize_images = true;
  waitForList();
}());
