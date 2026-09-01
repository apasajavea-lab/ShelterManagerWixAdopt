(function () {
  "use strict";
  window.apasa_homepage_mode = true;
  const path = window.location.pathname.toLowerCase();
  const lang = path === "/de" || path.startsWith("/de/") ? "de" : path === "/es" || path.startsWith("/es/") ? "es" : "en";
  const featuredId = window.apasa_featured_div_id || "comp-mtiqkkz2";
  const seniorId = window.apasa_senior_div_id || "comp-mtiqlr7b";

  function isoWeekIndex(date) {
    const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = utc.getUTCDay() || 7;
    utc.setUTCDate(utc.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
    return utc.getUTCFullYear() * 53 + Math.ceil((((utc - yearStart) / 86400000) + 1) / 7);
  }

  function weeklySelection(items, count, groupOffset) {
    if (!items.length) return [];
    const ordered = items.slice().sort((a, b) => {
      const aid = Number(new URL(a.querySelector(".asm3-adoptable-link").href).searchParams.get("animalid") || 0);
      const bid = Number(new URL(b.querySelector(".asm3-adoptable-link").href).searchParams.get("animalid") || 0);
      return aid - bid;
    });
    const start = ((isoWeekIndex(new Date()) * count) + groupOffset) % ordered.length;
    return Array.from({ length: Math.min(count, ordered.length) }, (_, index) => ordered[(start + index) % ordered.length]);
  }

  function grid(items) {
    const element = document.createElement("div");
    element.className = "apasa-home-grid";
    items.forEach(item => { item.removeAttribute("style"); element.appendChild(item); });
    return element;
  }

  function openProfile(item) {
    const source = item?.querySelector(".asm3-adoptable-link");
    if (!source) return;
    const sourceUrl = new URL(source.href, window.location.href);
    const profile = new URL(`${lang === "en" ? "" : `/${lang}`}/dogprofile`, window.location.origin);
    profile.searchParams.set("animalid", sourceUrl.searchParams.get("animalid") || "");
    profile.searchParams.set("lang", lang);
    const colour = item.querySelector(".apasa-extra")?.dataset.colour;
    if (colour) profile.searchParams.set("colour", colour);
    window.location.assign(profile.toString());
  }

  window.apasaHomepageReady = function (list) {
    const all = Array.from(list.querySelectorAll(".asm3-adoptable-item")).filter(item => {
      const src = item.querySelector(".asm3-adoptable-thumbnail")?.getAttribute("src") || "";
      return src && !/[?&]d=null(?:&|$)/i.test(src);
    });
    const seniors = all.filter(item => Number(item.querySelector(".apasa-extra")?.dataset.ageMonths || 0) >= 120);
    const featured = all.filter(item => Number(item.querySelector(".apasa-extra")?.dataset.ageMonths || 0) < 120);
    const markup = (items, groupOffset) => {
      const selected = weeklySelection(items, 3, groupOffset);
      const holder = grid(selected.map(item => item.cloneNode(true)));
      return { html: holder.outerHTML, count: selected.length };
    };
    const sections = { [featuredId]: markup(featured, 0), [seniorId]: markup(seniors, 1) };
    const ensure = () => Object.entries(sections).forEach(([id, section]) => {
      const container = document.getElementById(id);
      if (container && container.querySelectorAll(":scope > .apasa-home-grid > .asm3-adoptable-item").length !== section.count) container.innerHTML = section.html;
    });
    ensure();
    window.setInterval(ensure, 1000);
  };

  document.addEventListener("click", event => {
    const trigger = event.target.closest(".apasa-button, .asm3-adoptable-link");
    const item = trigger?.closest(".asm3-adoptable-item");
    if (!item || (!item.closest(`#${featuredId}`) && !item.closest(`#${seniorId}`))) return;
    event.preventDefault();
    openProfile(item);
  });
}());
