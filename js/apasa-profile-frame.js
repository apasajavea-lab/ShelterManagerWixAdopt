(function () {
  "use strict";
  const query = new URLSearchParams(window.location.search);
  const animalid = String(query.get("animalid") || "").replace(/\D/g, "");
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : location.pathname.startsWith("/de/") ? "de" : location.pathname.startsWith("/es/") ? "es" : "en";
  const containerId = window.apasa_profile_div_id || "comp-mtiovjo5";
  const delay = Number(window.apasa_profile_delay || 1000);

  function backUrl() {
    const defaults = {
      en: "https://www.apasa.eu/adopt-a-dog",
      es: "https://www.apasa.eu/es/adopt-a-dog",
      de: "https://www.apasa.eu/de/adopt-a-dog"
    };
    const requested = query.get("return");
    if (!requested) return defaults[lang];
    try {
      const url = new URL(requested, "https://www.apasa.eu");
      return url.protocol === "https:" && ["apasa.eu", "www.apasa.eu"].includes(url.hostname)
        ? url.toString()
        : defaults[lang];
    } catch (_) {
      return defaults[lang];
    }
  }

  function showUnavailable(container) {
    const words = {
      en: { message: "Sorry, this dog is no longer available for adoption.", back: "Back to all dogs" },
      es: { message: "Lo sentimos, este perro ya no está disponible para adopción.", back: "Volver a todos los perros" },
      de: { message: "Es tut uns leid, dieser Hund steht nicht mehr zur Adoption zur Verfügung.", back: "Zurück zu allen Hunden" }
    }[lang];
    const panel = document.createElement("section");
    panel.className = "apasa-profile-unavailable";
    panel.setAttribute("role", "status");
    panel.style.cssText = "max-width:760px;margin:48px auto;padding:52px 28px;text-align:center;color:#444;background:#fff;border-radius:22px;box-shadow:0 8px 28px rgba(0,0,0,.1);font-family:Lato,'Helvetica Neue',Arial,sans-serif";
    const message = document.createElement("h1");
    message.textContent = words.message;
    message.style.cssText = "margin:0 0 28px;color:#5c8d42;font-family:'Comic Sans MS','Chalkboard SE','Comic Neue',cursive;font-size:clamp(27px,5vw,40px);font-weight:400;line-height:1.25";
    const back = document.createElement("a");
    back.href = backUrl();
    back.target = "_top";
    back.textContent = `${words.back} →`;
    back.style.cssText = "display:inline-block;min-width:190px;padding:13px 22px;color:#fff;background:#f5a300;border-radius:30px;font-size:16px;font-weight:800;text-decoration:none";
    panel.append(message, back);
    container.replaceChildren(panel);
  }

  function mount() {
    const container = document.getElementById(containerId);
    if (!container) return false;
    if (!animalid) { showUnavailable(container); return true; }
    const profileUrl = new URL("https://eur02e.sheltermanager.com/service");
    profileUrl.searchParams.set("account", "zz1727");
    profileUrl.searchParams.set("method", "animal_view");
    profileUrl.searchParams.set("animalid", animalid);
    profileUrl.searchParams.set("template", "apasaanimalview");
    profileUrl.searchParams.set("lang", lang);
    if (query.get("colour")) profileUrl.searchParams.set("colour", query.get("colour"));
    if (query.get("size")) profileUrl.searchParams.set("size", query.get("size"));
    if (query.get("senior") === "1") profileUrl.searchParams.set("senior", "1");
    if (query.get("reserved") === "1") profileUrl.searchParams.set("reserved", "1");
    if (query.get("return")) profileUrl.searchParams.set("return", query.get("return"));
    if (query.get("slug")) profileUrl.searchParams.set("slug", query.get("slug"));
    const iframe = document.createElement("iframe");
    iframe.className = "apasa-profile-frame";
    iframe.title = lang === "es" ? "Perfil del perro" : lang === "de" ? "Hundeprofil" : "Dog profile";
    iframe.allow = "web-share";
    iframe.style.cssText = "display:block;width:100%;height:1200px;border:0;background:#f3f4ed";
    iframe.setAttribute("scrolling", "no");
    let profileReady = false;
    const receiveProfileHeight = event => {
      if (event.origin !== "https://eur02e.sheltermanager.com" || event.data?.type !== "apasa-profile-height") return;
      if (event.source !== iframe.contentWindow) return;
      profileReady = true;
      const height = Math.max(600, Math.min(6000, Number(event.data.height) || 1200));
      iframe.style.height = `${Math.ceil(height)}px`;
    };
    window.addEventListener("message", receiveProfileHeight);
    iframe.addEventListener("load", () => {
      window.setTimeout(() => {
        if (profileReady || !iframe.isConnected) return;
        window.removeEventListener("message", receiveProfileHeight);
        showUnavailable(container);
      }, 1000);
    }, { once: true });
    iframe.src = profileUrl.toString();
    container.replaceChildren(iframe);
    return true;
  }

  window.setTimeout(() => {
    if (mount()) return;
    let attempts = 0;
    const timer = window.setInterval(() => { if (mount() || ++attempts > 40) window.clearInterval(timer); }, 250);
  }, delay);
}());
