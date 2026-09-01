(function () {
  "use strict";
  const query = new URLSearchParams(window.location.search);
  const animalid = String(query.get("animalid") || "").replace(/\D/g, "");
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : location.pathname.startsWith("/de/") ? "de" : location.pathname.startsWith("/es/") ? "es" : "en";
  const containerId = window.apasa_profile_div_id || "comp-mtiovjo5";
  const delay = Number(window.apasa_profile_delay || 1000);

  function mount() {
    const container = document.getElementById(containerId);
    if (!container || !animalid) return false;
    const profileUrl = new URL("https://eur02e.sheltermanager.com/service");
    profileUrl.searchParams.set("account", "zz1727");
    profileUrl.searchParams.set("method", "animal_view");
    profileUrl.searchParams.set("animalid", animalid);
    profileUrl.searchParams.set("template", "apasaanimalview");
    profileUrl.searchParams.set("lang", lang);
    if (query.get("colour")) profileUrl.searchParams.set("colour", query.get("colour"));
    const iframe = document.createElement("iframe");
    iframe.className = "apasa-profile-frame";
    iframe.title = lang === "es" ? "Perfil del perro" : lang === "de" ? "Hundeprofil" : "Dog profile";
    iframe.src = profileUrl.toString();
    iframe.style.cssText = "display:block;width:100%;height:1200px;border:0;background:#f3f4ed";
    iframe.setAttribute("scrolling", "no");
    container.replaceChildren(iframe);
    window.addEventListener("message", event => {
      if (event.origin !== "https://eur02e.sheltermanager.com" || event.data?.type !== "apasa-profile-height") return;
      const height = Math.max(600, Math.min(6000, Number(event.data.height) || 1200));
      iframe.style.height = `${Math.ceil(height)}px`;
    });
    return true;
  }

  window.setTimeout(() => {
    if (mount()) return;
    let attempts = 0;
    const timer = window.setInterval(() => { if (mount() || ++attempts > 40) window.clearInterval(timer); }, 250);
  }, delay);
}());
