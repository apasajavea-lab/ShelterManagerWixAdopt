(function () {
  "use strict";
  const query = new URLSearchParams(location.search);
  const path = location.pathname.toLowerCase();
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : path === "/de" || path.startsWith("/de/") ? "de" : path === "/es" || path.startsWith("/es/") ? "es" : "en";
  const containerId = window.apasa_online_form_div_id || "apasa-online-form";
  const account = window.apasa_online_form_account || "apasa";
  const formId = Math.max(1, Number(window.apasa_online_form_id || 48));
  const delay = Number(window.apasa_online_form_delay || 1000);
  const successMessages = {
    en: "Thank you for contacting us and we'll be in touch shortly.",
    es: "Gracias por contactar con nosotros. Nos pondremos en contacto contigo en breve.",
    de: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen."
  };
  const homePages = { en: "https://www.apasa.eu/", es: "https://www.apasa.eu/es", de: "https://www.apasa.eu/de" };

  function mount() {
    const container = document.getElementById(containerId);
    if (!container) return false;
    const url = new URL("https://service.sheltermanager.com/asmservice");
    url.searchParams.set("account", account);
    url.searchParams.set("method", "online_form_html");
    url.searchParams.set("formid", String(formId));
    url.searchParams.set("lang", lang);
    const iframe = document.createElement("iframe");
    iframe.className = "apasa-online-form-frame";
    iframe.title = { en: "Contact APASA", es: "Contacta con APASA", de: "APASA kontaktieren" }[lang];
    iframe.src = url.toString();
    iframe.style.cssText = "display:block;width:100%;height:1050px;border:0;background:#f3f4ed";
    iframe.setAttribute("scrolling", "no");
    container.replaceChildren(iframe);
    addEventListener("message", event => {
      if (!/^https:\/\/(?:service\.sheltermanager\.com|[^.]+\.sheltermanager\.com)$/.test(event.origin)) return;
      if (event.data?.type === "apasa-online-form-height") {
        const height = Math.max(500, Math.min(10000, Number(event.data.height) || 1050));
        iframe.style.height = `${Math.ceil(height)}px`;
      }
      if (event.data?.type === "apasa-online-form-success") {
        alert(successMessages[lang]);
        location.assign(homePages[lang]);
      }
    });
    return true;
  }

  setTimeout(() => {
    if (mount()) return;
    let attempts = 0;
    const timer = setInterval(() => {
      if (mount() || ++attempts > 40) clearInterval(timer);
    }, 250);
  }, delay);
}());
