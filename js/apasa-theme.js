/* APASA ShelterManager adoption cards, version 2.1.1 */
(function () {
  "use strict";
  const path = window.location.pathname.toLowerCase();
  const lang = path === "/de" || path.startsWith("/de/") ? "de" : path === "/es" || path.startsWith("/es/") ? "es" : "en";
  const text = {
    en: { meet: "Meet", female: "Female", male: "Male", small: "Small", medium: "Medium", large: "Large", atApasa: "At APASA", cross: "cross", senior: "Senior", longstay: "Long-term", newArrival: "New arrival", search: "Search by name", allSexes: "All sexes", allSizes: "All sizes", allAges: "All ages", allSpecial: "All dogs", puppy: "Puppy", young: "Young", adult: "Adult", newDogs: "New arrivals", sortBy: "Sort by", sortName: "Name A–Z", sortLongest: "Longest waiting", sortNewest: "Newest arrivals", sortYoungest: "Youngest", sortOldest: "Oldest", clear: "Clear filters", dogs: "dogs", oneDog: "dog", noResults: "No dogs match these filters." },
    es: { meet: "Conoce a", female: "Hembra", male: "Macho", small: "Pequeño", medium: "Mediano", large: "Grande", atApasa: "En APASA", cross: "cruce", senior: "Senior", longstay: "Larga estancia", newArrival: "Recién llegado", search: "Buscar por nombre", allSexes: "Todos los sexos", allSizes: "Todos los tamaños", allAges: "Todas las edades", allSpecial: "Todos los perros", puppy: "Cachorro", young: "Joven", adult: "Adulto", newDogs: "Recién llegados", sortBy: "Ordenar por", sortName: "Nombre A–Z", sortLongest: "Más tiempo esperando", sortNewest: "Llegadas recientes", sortYoungest: "Más jóvenes", sortOldest: "Mayores", clear: "Borrar filtros", dogs: "perros", oneDog: "perro", noResults: "Ningún perro coincide con estos filtros." },
    de: { meet: "Triff", female: "Hündin", male: "Rüde", small: "Klein", medium: "Mittel", large: "Groß", atApasa: "Bei APASA", cross: "Mischling", senior: "Senior", longstay: "Langzeitgast", newArrival: "Neu angekommen", search: "Nach Namen suchen", allSexes: "Alle Geschlechter", allSizes: "Alle Größen", allAges: "Alle Altersgruppen", allSpecial: "Alle Hunde", puppy: "Welpe", young: "Junghund", adult: "Erwachsen", newDogs: "Neu angekommen", sortBy: "Sortieren nach", sortName: "Name A–Z", sortLongest: "Längste Wartezeit", sortNewest: "Neueste Ankünfte", sortYoungest: "Jüngste", sortOldest: "Älteste", clear: "Filter löschen", dogs: "Hunde", oneDog: "Hund", noResults: "Keine Hunde entsprechen diesen Filtern." }
  }[lang];
  const seniorFosterText = { en: "Senior Foster Program", es: "Programa de Acogida Sénior", de: "Senioren-Pflegeprogramm" }[lang];
  const seniorFosterLabel = { en: "Senior Foster Program", es: "Programa de Acogida Sénior", de: "Senioren-Pflegeprogramm" }[lang];
  const seniorFosterDescription = {
    en: "This dog is part of our Senior Foster Program, whereby APASA will cover veterinary costs via the designated vet.",
    es: "Este perro forma parte de nuestro Programa de Acogida Sénior, mediante el cual APASA cubrirá los gastos veterinarios a través del veterinario designado.",
    de: "Dieser Hund nimmt an unserem Senioren-Pflegeprogramm teil. APASA übernimmt die Tierarztkosten bei der dafür vorgesehenen Tierarztpraxis."
  }[lang];
  const introText = {
    en: {
      heading: "Find Your New Best Friend",
      main: "At APASA, our main goal is to create the perfect match between each dog and their future family. That’s why we take time to understand your lifestyle, offer guidance during the process, and stay by your side even after adoption.",
      interest: "🐾 Interested in Adopting?",
      adoptionBefore: "Fill out this quick ", adoptionLink: "adoption form", adoptionAfter: " and our team will get in touch with you soon.",
      waitBefore: "Did not find your match? Fill out our ", waitLink: "waitlist form", waitAfter: ".",
      callBefore: "💬 Have questions before adopting? ", callLink: "Call us", callAfter: " during operating hours – we’re happy to help!"
    },
    es: {
      heading: "Encuentra a tu nuevo mejor amigo",
      main: "En APASA, nuestro principal objetivo es encontrar la familia ideal para cada perro. Por eso, nos tomamos el tiempo necesario para comprender tu estilo de vida, te brindamos orientación durante el proceso y te acompañamos incluso después de la adopción.",
      interest: "🐾 ¿Te interesa adoptar?",
      adoptionBefore: "Rellena este breve ", adoptionLink: "formulario de adopción", adoptionAfter: " y nuestro equipo se pondrá en contacto contigo pronto.",
      waitBefore: "¿No has encontrado a tu compañero ideal? Rellena nuestro ", waitLink: "formulario de lista de espera", waitAfter: ".",
      callBefore: "💬 ¿Tienes preguntas antes de adoptar? ", callLink: "Llámanos", callAfter: " durante nuestro horario de atención. ¡Estaremos encantados de ayudarte!"
    },
    de: {
      heading: "Finde deinen neuen besten Freund",
      main: "Bei APASA ist es unser oberstes Ziel, für jeden Hund die perfekte Familie zu finden. Deshalb nehmen wir uns Zeit, Ihren Lebensstil zu verstehen, begleiten Sie durch den gesamten Prozess und stehen Ihnen auch nach der Adoption zur Seite.",
      interest: "🐾 Interesse an einer Adoption?",
      adoptionBefore: "Füllen Sie dieses kurze ", adoptionLink: "Adoptionsformular", adoptionAfter: " aus, und unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.",
      waitBefore: "Noch nicht den passenden Hund gefunden? Füllen Sie unser ", waitLink: "Wartelistenformular", waitAfter: " aus.",
      callBefore: "💬 Haben Sie Fragen vor der Adoption? ", callLink: "Rufen Sie uns an", callAfter: " während unserer Öffnungszeiten – wir helfen Ihnen gerne weiter!"
    }
  }[lang];
  const reservedText = { en: "Reserved", es: "Reservado", de: "Reserviert" }[lang];

  function escapeHtml(value) { return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
  function shortDescription(a) {
    const fallback = {
      en: "A very new arrival who we are still getting to know!",
      es: "¡Acaba de llegar y aún estamos conociendo su personalidad!",
      de: "Gerade erst angekommen – wir lernen diesen Hund noch kennen!"
    }[lang];
    if (lang === "es") return String(a.WEBSHORTDESCS || "").trim() || fallback;
    if (lang === "de") return String(a.WEBSHORTDESCG || "").trim() || fallback;
    return String(a.WEBSHORTDESC || "").trim() || fallback;
  }
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
    const weeksMatch = raw.match(/(\d+)\s+weeks?/i);
    const daysMatch = raw.match(/(\d+)\s+days?/i);
    if (!years && !months && weeksMatch) {
      const weeks = Number(weeksMatch[1]);
      if (lang === "es") return `${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
      if (lang === "de") return `${weeks} ${weeks === 1 ? "Woche" : "Wochen"}`;
      return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
    }
    if (!years && !months && !weeksMatch && !daysMatch) return raw;
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
    const weeks = Number((raw.match(/(\d+)\s+weeks?/i) || [])[1] || 0);
    return years || months || weeks ? years * 12 + months + Math.floor(weeks / 4.345) : -1;
  }

  function sexKey(a) {
    const numeric = Number(a.SEX);
    if (!Number.isNaN(numeric)) return numeric === 0 ? "female" : "male";
    return /female|hembra|hündin/i.test(String(a.SEXNAME || "")) ? "female" : "male";
  }

  function sizeKey(a) {
    const value = String(a.SIZENAME || "");
    if (/small|peque|klein/i.test(value)) return "small";
    if (/medium|medio|mittel/i.test(value)) return "medium";
    if (/large|grande|groß|gross/i.test(value)) return "large";
    const numeric = Number(a.SIZE);
    if (!Number.isNaN(numeric)) return numeric === 3 ? "small" : numeric === 2 ? "medium" : numeric === 1 || numeric === 0 ? "large" : "";
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
  function size(a) { const key = sizeKey(a); return key ? text[key] : a.SIZENAME || ""; }
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
  function isReserved(a) {
    const flag = [a.ANIMALISRESERVED, a.HASACTIVERESERVE, a.ISRESERVED, a.RESERVED].some(value => /^(1|true|yes|si|sí|ja)$/i.test(String(value || "").trim()));
    return flag || /reserved|reservad[oa]|reserviert/i.test(String(a.ADOPTIONSTATUS || a.RESERVATIONSTATUS || ""));
  }
  function card(a) {
    const dogName = escapeHtml(a.ANIMALNAME || ""); const dogBadge = badge(a); const details = [age(a), sex(a), size(a)].filter(Boolean).map(escapeHtml).join(" &bull; "); const waiting = escapeHtml(waitingTime(a));
    const months = ageInMonths(a); const days = Math.max(0, Number(a.DAYSONSHELTER || 0)); const specials = [months >= 120 ? "senior" : "", days > 730 ? "longstay" : "", days > 0 && days < 30 ? "new" : ""].filter(Boolean).join(" ");
    return `<div class="apasa-extra" data-name="${dogName.toLowerCase()}" data-sex="${sexKey(a)}" data-size="${sizeKey(a)}" data-age="${ageKey(months)}" data-age-months="${months}" data-days="${days}" data-special="${specials}" data-reserved="${isReserved(a)}" data-colour="${escapeHtml(a.ADOPTAPETCOLOUR || "")}">${dogBadge ? `<div class="apasa-badge ${dogBadge[0]}">${escapeHtml(dogBadge[1])}</div>` : `<div class="apasa-badge apasa-badge-placeholder" aria-hidden="true">Placeholder</div>`}<div class="apasa-breed">${escapeHtml(breed(a))}</div><div class="apasa-summary">${escapeHtml(shortDescription(a))}</div><div class="apasa-details">${details}</div>${waiting ? `<div class="apasa-waiting">❤️ ${escapeHtml(text.atApasa)} ${waiting}</div>` : ""}<button class="apasa-button" type="button">${escapeHtml(text.meet)} ${dogName} →</button></div>`;
  }

  function toolbarHtml() {
    return `<div class="apasa-toolbar" role="search"><div class="apasa-toolbar-controls"><input class="apasa-search" type="search" placeholder="${escapeHtml(text.search)}" aria-label="${escapeHtml(text.search)}"><select class="apasa-filter-sex" aria-label="${escapeHtml(text.allSexes)}"><option value="">${escapeHtml(text.allSexes)}</option><option value="female">${escapeHtml(text.female)}</option><option value="male">${escapeHtml(text.male)}</option></select><select class="apasa-filter-size" aria-label="${escapeHtml(text.allSizes)}"><option value="">${escapeHtml(text.allSizes)}</option><option value="small">${escapeHtml(text.small)}</option><option value="medium">${escapeHtml(text.medium)}</option><option value="large">${escapeHtml(text.large)}</option></select><select class="apasa-filter-age" aria-label="${escapeHtml(text.allAges)}"><option value="">${escapeHtml(text.allAges)}</option><option value="puppy">${escapeHtml(text.puppy)}</option><option value="young">${escapeHtml(text.young)}</option><option value="adult">${escapeHtml(text.adult)}</option><option value="senior">${escapeHtml(text.senior)}</option></select><select class="apasa-filter-special" aria-label="${escapeHtml(text.allSpecial)}"><option value="">${escapeHtml(text.allSpecial)}</option><option value="senior">${escapeHtml(text.senior)}</option><option value="longstay">${escapeHtml(text.longstay)}</option><option value="new">${escapeHtml(text.newDogs)}</option></select><label class="apasa-sort-field"><span class="apasa-sort-label">${escapeHtml(text.sortBy)}</span><select class="apasa-sort" aria-label="${escapeHtml(text.sortBy)}"><option value="name">${escapeHtml(text.sortName)}</option><option value="longest">${escapeHtml(text.sortLongest)}</option><option value="newest">${escapeHtml(text.sortNewest)}</option><option value="youngest">${escapeHtml(text.sortYoungest)}</option><option value="oldest">${escapeHtml(text.sortOldest)}</option></select></label><button class="apasa-clear" type="button">${escapeHtml(text.clear)}</button></div><div class="apasa-results" aria-live="polite"></div><div class="apasa-empty" hidden>${escapeHtml(text.noResults)}</div></div>`;
  }

  function introHtml() {
    const prefix = lang === "en" ? "" : `/${lang}`;
    return `<section class="apasa-intro"><h1>${escapeHtml(introText.heading)}</h1><p class="apasa-intro-main">${escapeHtml(introText.main)}</p><p class="apasa-intro-interest">${escapeHtml(introText.interest)}</p><p>${escapeHtml(introText.adoptionBefore)}<a href="${prefix}/adoption-form">${escapeHtml(introText.adoptionLink)}</a>${escapeHtml(introText.adoptionAfter)}</p><p>${escapeHtml(introText.waitBefore)}<a href="${prefix}/wait-list">${escapeHtml(introText.waitLink)}</a>${escapeHtml(introText.waitAfter)}</p><p>${escapeHtml(introText.callBefore)}<a href="tel:+34618754635">${escapeHtml(introText.callLink)}</a>${escapeHtml(introText.callAfter)}</p></section>`;
  }

  function initialiseToolbar(list) {
    if (document.querySelector(".apasa-toolbar")) return;
    list.insertAdjacentHTML("beforebegin", toolbarHtml());
    const toolbar = list.previousElementSibling;
    toolbar.insertAdjacentHTML("beforebegin", introHtml());
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
        const publisherSize = button.closest(".asm3-adoptable-item")?.querySelector(".apasa-extra")?.dataset.size;
        if (publisherSize) wixProfile.searchParams.set("size", publisherSize);
        const publisherSpecial = button.closest(".asm3-adoptable-item")?.querySelector(".apasa-extra")?.dataset.special || "";
        if (publisherSpecial.split(" ").includes("senior")) wixProfile.searchParams.set("senior", "1");
        const reserved = button.closest(".asm3-adoptable-item")?.querySelector(".apasa-extra")?.dataset.reserved;
        if (reserved === "true" || button.closest(".asm3-adoptable-item")?.querySelector(".asm3-adoptable-reserved")) wixProfile.searchParams.set("reserved", "1");
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
    function positionPhotos(list) {
      const focalPoints = { digby: "center 34%", loba: "center 34%" };
      list.querySelectorAll(".asm3-adoptable-item").forEach(item => {
        const extra = item.querySelector(".apasa-extra");
        const name = String(extra?.dataset.name || "").toLowerCase();
        const image = item.querySelector(".asm3-adoptable-thumbnail");
        if (image && focalPoints[name]) image.style.objectPosition = focalPoints[name];
        if (extra?.dataset.special.split(" ").includes("senior") && !item.querySelector(".apasa-senior-rosette")) {
          const rosette = document.createElement("span");
          rosette.className = "apasa-senior-rosette";
          rosette.textContent = seniorFosterText;
          rosette.setAttribute("aria-label", seniorFosterLabel);
          rosette.title = seniorFosterDescription;
          rosette.tabIndex = 0;
          item.querySelector(".asm3-adoptable-link")?.appendChild(rosette);
        }
        if ((extra?.dataset.reserved === "true" || item.querySelector(".asm3-adoptable-reserved")) && !item.querySelector(".apasa-reserved-ribbon")) {
          const ribbon = document.createElement("span");
          ribbon.className = "apasa-reserved-ribbon";
          ribbon.textContent = extra?.dataset.sex === "female" && lang === "es" ? "Reservada" : reservedText;
          item.querySelector(".asm3-adoptable-link")?.appendChild(ribbon);
        }
      });
    }
    let attempts = 0;
    const timer = window.setInterval(() => {
      const list = document.getElementById("asm3-adoptable-list");
      if (list && list.querySelector(".apasa-extra")) { window.clearInterval(timer); positionPhotos(list); if (window.apasa_homepage_mode && typeof window.apasaHomepageReady === "function") window.apasaHomepageReady(list); else initialiseToolbar(list); }
      if (++attempts > 80) window.clearInterval(timer);
    }, 250);
  }
  window.asm3_adoptable_extra = card;
  window.asm3_adoptable_sort = "ANIMALNAME";
  window.asm3_adoptable_style = "apasaanimalview";
  window.asm3_adoptable_fullsize_images = true;
  waitForList();
}());
