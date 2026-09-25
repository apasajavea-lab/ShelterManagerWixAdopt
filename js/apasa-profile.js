(function () {
  "use strict";
  const scriptUrl = document.currentScript && document.currentScript.src;
  const query = new URLSearchParams(location.search), referrer = (document.referrer || "").toLowerCase();
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : referrer.includes("/de/") ? "de" : referrer.includes("/es/") ? "es" : "en";
  const index = lang === "en" ? 0 : lang === "es" ? 1 : 2;
  const escapeHtml = value => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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
  function configureFacts() {
    const facts = document.querySelector(".apasa-facts");
    if (!facts) return;
    const dateOfBirthFact = facts.firstElementChild;
    const sexFact = document.querySelector(".apasa-sex")?.closest(".apasa-fact");
    const colourFact = document.querySelector(".apasa-colour")?.closest(".apasa-fact");
    const shelterFact = document.querySelector(".apasa-duration")?.closest(".apasa-fact");
    const sizeFact = document.querySelector(".apasa-size");
    const rawDate = String(dateOfBirthFact?.querySelector("dd")?.textContent || "").trim();
    const parts = rawDate.split(/[./-]/).map(Number);
    const isoDate = /^\d{4}-\d{1,2}-\d{1,2}$/.test(rawDate);
    const birthDate = parts.length === 3
      ? new Date(isoDate ? parts[0] : parts[2], parts[1] - 1, isoDate ? parts[2] : parts[0])
      : null;
    let ageText = "";
    if (birthDate && !Number.isNaN(birthDate.getTime())) {
      const now = new Date();
      let months = (now.getFullYear() - birthDate.getFullYear()) * 12 + now.getMonth() - birthDate.getMonth();
      if (now.getDate() < birthDate.getDate()) months -= 1;
      months = Math.max(0, months);
      const years = Math.floor(months / 12), remainingMonths = months % 12;
      if (years) {
        const yearWords = [["year", "years"], ["año", "años"], ["Jahr", "Jahre"]][index];
        const monthWords = [["month", "months"], ["mes", "meses"], ["Monat", "Monate"]][index];
        ageText = `${years} ${yearWords[years === 1 ? 0 : 1]}${remainingMonths ? ` ${remainingMonths} ${monthWords[remainingMonths === 1 ? 0 : 1]}` : ""}`;
      } else if (months) {
        const monthWords = [["month", "months"], ["mes", "meses"], ["Monat", "Monate"]][index];
        ageText = `${months} ${monthWords[months === 1 ? 0 : 1]}`;
      } else {
        const days = Math.max(0, Math.floor((now - birthDate) / 86400000));
        const weeks = Math.floor(days / 7);
        const words = weeks ? [["week", "weeks"], ["semana", "semanas"], ["Woche", "Wochen"]][index] : [["day", "days"], ["día", "días"], ["Tag", "Tage"]][index];
        const amount = weeks || days;
        ageText = `${amount} ${words[amount === 1 ? 0 : 1]}`;
      }
    }
    const ageFact = document.createElement("div");
    ageFact.className = "apasa-fact apasa-age";
    ageFact.innerHTML = `<dt>${["Age", "Edad", "Alter"][index]}</dt><dd>${escapeHtml(ageText || ["Unknown", "Desconocida", "Unbekannt"][index])}</dd>`;
    [shelterFact, ageFact, dateOfBirthFact, sexFact, sizeFact, colourFact].filter(Boolean).forEach(fact => facts.appendChild(fact));
  }
  function handleOptionalContent() {
    const hasContent = element => {
      const value = String(element?.textContent || "").replace(/\u00a0/g, " ").trim();
      return Boolean(value) && !/^\$\$[^$]+\$\$$/.test(value);
    };
    const specialNote = document.querySelector(`.apasa-note[data-language="${lang}"]`);
    if (!hasContent(specialNote)) specialNote?.closest(".apasa-section")?.remove();

    const description = document.querySelector(`.apasa-description [data-language="${lang}"]`);
    if (hasContent(description)) return;
    const dogName = String(document.querySelector(".apasa-name")?.textContent || "").trim();
    const safeName = escapeHtml(dogName);
    const female = /female|hembra|hündin/i.test(document.querySelector(".apasa-sex")?.textContent || "");
    const messages = {
      en: `${safeName} has only just arrived with us and we are still getting to know ${female ? "her" : "him"}. Check back soon for further details or contact our Dog Caring team on WhatsApp <a href="https://wa.me/34618754635" target="_blank" rel="noopener">+34 618 754 635</a> for more details.`,
      es: `${safeName} acaba de llegar con nosotros y todavía estamos ${female ? "conociéndola" : "conociéndolo"}. Vuelve pronto para consultar más información o contacta con nuestro equipo de cuidado canino por WhatsApp en el <a href="https://wa.me/34618754635" target="_blank" rel="noopener">+34 618 754 635</a> para obtener más detalles.`,
      de: `${safeName} ist gerade erst bei uns angekommen und wir lernen ${female ? "sie" : "ihn"} noch kennen. Schauen Sie bald wieder vorbei oder kontaktieren Sie unser Hundebetreuungsteam per WhatsApp unter <a href="https://wa.me/34618754635" target="_blank" rel="noopener">+34 618 754 635</a>, um weitere Informationen zu erhalten.`
    };
    if (description) description.innerHTML = `<p>${messages[lang]}</p>`;
  }
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-language]").forEach(element => { element.style.display = element.dataset.language === lang ? "block" : "none"; });
  document.querySelectorAll("[data-i18n]").forEach(element => { const value = element.dataset[lang]; if (value) element.textContent = value; });
  loadBreedTranslations();
  addSizeFact();
  configureFacts();
  document.querySelectorAll(".apasa-trait strong").forEach(element => { element.textContent = lookup(element.textContent); });
  set(".apasa-sex", sex(document.querySelector(".apasa-sex")?.textContent || "")); set(".apasa-duration", duration(document.querySelector(".apasa-duration")?.textContent || "")); set(".apasa-colour", colour(query.get("colour") || document.querySelector(".apasa-colour")?.textContent || ""));
  handleOptionalContent();
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
    style.textContent += ".apasa-senior-rosette{top:16px;right:auto;left:16px;width:90px;height:90px;padding:8px 7px 7px;transform:rotate(-9deg);border-width:4px;font-size:8.5px;line-height:1.02;pointer-events:auto;cursor:help}.apasa-senior-rosette:before{margin-bottom:2px;font-size:18px}.apasa-senior-rosette:after{content:none}.apasa-senior-rosette:focus-visible{outline:3px solid #fff;outline-offset:2px}@media(max-width:430px){.apasa-senior-rosette{top:11px;right:auto;left:11px;width:80px;height:80px;padding:7px 5px 5px;border-width:3px;font-size:7.5px}.apasa-senior-rosette:before{font-size:14px}}";
    style.textContent += ".apasa-profile-reserved{display:inline-block;margin:-10px 0 20px;padding:7px 14px;color:#fff;background:#f5a300;border-radius:20px;font-size:13px;font-weight:900;line-height:1;text-transform:uppercase;letter-spacing:.4px}";
    style.textContent += ".apasa-description a{color:#f5a300;font-weight:800;text-decoration:none}.apasa-description a:hover,.apasa-description a:focus-visible{text-decoration:underline}";
    style.textContent += ".apasa-profile-footer{padding:34px 28px;color:#222;background:#fff;border-top:1px solid #eee}.apasa-profile-footer h2{margin:0 0 10px;color:#111;font-family:'Comic Sans MS','Chalkboard SE','Comic Neue',cursive;font-size:28px;line-height:1.2}.apasa-profile-footer h3{margin:28px 0 10px;color:#111;font-size:22px}.apasa-profile-footer p{margin:5px 0;line-height:1.5}.apasa-profile-footer .apasa-contact-title{margin-top:8px;font-weight:800}.apasa-profile-footer a{color:#f5a300;font-weight:800;text-decoration:none}.apasa-profile-footer a:hover,.apasa-profile-footer a:focus-visible{text-decoration:underline}.apasa-profile-share-title{margin-top:20px!important;font-weight:800}.apasa-profile-share{display:flex;flex-wrap:wrap;gap:12px;margin:10px 0 30px}.apasa-share-link,.apasa-copy-link{min-width:90px;padding:10px 14px;border:0;border-radius:22px;color:#fff!important;background:#5c8d42;font:inherit;font-weight:800!important;text-align:center;cursor:pointer}.apasa-share-link:hover,.apasa-copy-link:hover{background:#4c7537;text-decoration:none!important}.apasa-back-button{display:inline-block;min-width:190px;padding:12px 20px;color:#fff!important;background:#f5a300;border-radius:24px;text-align:center}.apasa-back-button:hover{background:#df9200;text-decoration:none!important}@media(max-width:600px){.apasa-profile-footer{padding:26px 18px}.apasa-profile-footer h2{font-size:25px}.apasa-profile-footer h3{font-size:20px}.apasa-profile-share{gap:8px}.apasa-share-link,.apasa-copy-link{min-width:auto;flex:1;padding:10px 8px;font-size:13px}}";
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
    const description = [
      "This dog is part of our Senior Foster Program, whereby APASA will cover veterinary costs via the designated vet.",
      "Este perro forma parte de nuestro Programa de Acogida Sénior, mediante el cual APASA cubrirá los gastos veterinarios a través del veterinario designado.",
      "Dieser Hund nimmt an unserem Senioren-Pflegeprogramm teil. APASA übernimmt die Tierarztkosten bei der dafür vorgesehenen Tierarztpraxis."
    ][index];
    rosette.setAttribute("aria-label", description);
    rosette.title = description;
    rosette.tabIndex = 0;
    stage.appendChild(rosette);
  }
  function addReservedStatus() {
    if (query.get("reserved") !== "1") return;
    const subtitle = document.querySelector(".apasa-subtitle");
    if (!subtitle || document.querySelector(".apasa-profile-reserved")) return;
    const status = document.createElement("span");
    status.className = "apasa-profile-reserved";
    const female = /female|hembra|hündin/i.test(document.querySelector(".apasa-sex")?.textContent || "");
    status.textContent = lang === "es" ? (female ? "Reservada" : "Reservado") : lang === "de" ? "Reserviert" : "Reserved";
    subtitle.insertAdjacentElement("afterend", status);
  }
  function addProfileFooter() {
    const actions = document.querySelector(".apasa-actions");
    const card = document.querySelector(".apasa-profile-card");
    if (!card || document.querySelector(".apasa-profile-footer")) return;
    const dogName = String(document.querySelector(".apasa-name")?.textContent || "").trim();
    const displayName = dogName.toLocaleUpperCase(lang);
    const prefix = lang === "en" ? "" : `/${lang}`;
    const canonicalProfile = new URL(`${prefix}/dogprofile`, "https://www.apasa.eu");
    ["animalid", "lang", "colour", "size", "senior", "reserved"].forEach(key => { if (query.get(key)) canonicalProfile.searchParams.set(key, query.get(key)); });
    const shareUrl = canonicalProfile.toString();
    const copyLabels = { en: ["Copy link", "Copied!"], es: ["Copiar enlace", "¡Copiado!"], de: ["Link kopieren", "Kopiert!"] }[lang];
    const words = {
      en: { title: "Meet Your Match?", intro: `If you think ${displayName} could be the one for you, we’d love for you to meet in person. Just drop by the shelter in Jávea – no appointment needed. For opening hours, please check the footer of our homepage.`, contactTitle: "💌 Arrange a meeting or got questions?", reach: "Reach out through our", form: "ADOPTION FORM", email: "email us at", or: "or WhatsApp us at", noMatch: "Did Not Find Your Match?", wait: "JOIN OUR WAITLIST", waitText: "We will let you know when a suitable companion becomes available.", share: "Want to help this dog get adopted? Share this profile.", facebook: "Facebook", whatsapp: "WhatsApp", back: "Back to all dogs →" },
      es: { title: "¿Has encontrado a tu compañero ideal?", intro: `Si crees que ${displayName} podría ser para ti, nos encantaría que vinieras a conocerlo en persona. Acércate al refugio en Jávea, sin cita previa. Consulta los horarios en el pie de nuestra página de inicio.`, contactTitle: "💌 ¿Concertar una visita o hacer una pregunta?", reach: "Ponte en contacto mediante nuestro", form: "FORMULARIO DE ADOPCIÓN", email: "escríbenos a", or: "o envíanos un WhatsApp al", noMatch: "¿No has encontrado a tu compañero ideal?", wait: "ÚNETE A NUESTRA LISTA DE ESPERA", waitText: "Te avisaremos cuando haya un compañero adecuado disponible.", share: "¿Quieres ayudar a este perro a encontrar hogar? Comparte este perfil.", facebook: "Facebook", whatsapp: "WhatsApp", back: "Volver a todos los perros →" },
      de: { title: "Den passenden Hund gefunden?", intro: `Wenn Sie glauben, dass ${displayName} zu Ihnen passen könnte, würden wir uns freuen, wenn Sie den Hund persönlich kennenlernen. Besuchen Sie uns einfach im Tierheim in Jávea – ein Termin ist nicht nötig. Die Öffnungszeiten finden Sie in der Fußzeile unserer Homepage.`, contactTitle: "💌 Treffen vereinbaren oder Fragen?", reach: "Kontaktieren Sie uns über unser", form: "ADOPTIONSFORMULAR", email: "per E-Mail an", or: "oder per WhatsApp unter", noMatch: "Noch nicht den passenden Hund gefunden?", wait: "IN UNSERE WARTELISTE EINTRAGEN", waitText: "Wir informieren Sie, sobald ein passender Begleiter verfügbar ist.", share: "Möchten Sie diesem Hund bei der Adoption helfen? Teilen Sie dieses Profil.", facebook: "Facebook", whatsapp: "WhatsApp", back: "Zurück zu allen Hunden →" }
    }[lang];
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${dogName} – ${shareUrl}`)}`;
    const section = document.createElement("section");
    section.className = "apasa-profile-footer";
    section.innerHTML = `<h2>${escapeHtml(words.title)}</h2><p>${escapeHtml(words.intro)}</p><p class="apasa-contact-title">${escapeHtml(words.contactTitle)}</p><p>${escapeHtml(words.reach)} <a href="https://www.apasa.eu${prefix}/adoption-form" target="_top">${escapeHtml(words.form)}</a>, ${escapeHtml(words.email)} <a href="mailto:apasa.javea@gmail.com">apasa.javea@gmail.com</a>, ${escapeHtml(words.or)} <a href="https://wa.me/34618754635" target="_blank" rel="noopener">+34 618 754 635</a>.</p><h3>${escapeHtml(words.noMatch)}</h3><p><a href="https://www.apasa.eu${prefix}/wait-list" target="_top">${escapeHtml(words.wait)}</a></p><p>${escapeHtml(words.waitText)}</p><p class="apasa-profile-share-title">${escapeHtml(words.share)}</p><div class="apasa-profile-share"><a class="apasa-share-link" href="${facebookUrl}" target="_blank" rel="noopener">● ${escapeHtml(words.facebook)}</a><a class="apasa-share-link" href="${whatsappShareUrl}" target="_blank" rel="noopener">● ${escapeHtml(words.whatsapp)}</a><button class="apasa-copy-link" type="button">🔗 ${escapeHtml(copyLabels[0])}</button></div><a class="apasa-back-button" href="https://www.apasa.eu${prefix}/smview" target="_top">${escapeHtml(words.back)}</a>`;
    const copyButton = section.querySelector(".apasa-copy-link");
    copyButton.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(shareUrl); }
      catch (_) { const field = document.createElement("textarea"); field.value = shareUrl; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
      copyButton.textContent = `✓ ${copyLabels[1]}`;
      window.setTimeout(() => { copyButton.textContent = `🔗 ${copyLabels[0]}`; }, 1800);
    });
    if (actions) actions.replaceWith(section); else card.appendChild(section);
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
  addReservedStatus();
  addProfileFooter();
  loadExtraPhoto(7);
  if (main) { main.style.objectFit = "contain"; main.style.background = "#f3f4ed"; }
  main?.addEventListener("error", () => { main.closest(".apasa-gallery").hidden = true; });
  function reportHeight() { if (window.parent !== window) window.parent.postMessage({ type: "apasa-profile-height", height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) }, "https://www.apasa.eu"); }
  window.addEventListener("load", reportHeight); window.setTimeout(reportHeight, 300); window.setTimeout(reportHeight, 1200);
  if (window.ResizeObserver) new ResizeObserver(reportHeight).observe(document.body);
}());
