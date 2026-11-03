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
    contact: {
      en: "Thank you for contacting us and we'll be in touch shortly.",
      es: "Gracias por contactar con nosotros. Nos pondremos en contacto contigo en breve.",
      de: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen."
    },
    waitList: {
      en: "Thank you for joining our Waiting List. We'll be in touch if a suitable match becomes available.",
      es: "Gracias por unirte a nuestra Lista de Espera. Nos pondremos en contacto contigo cuando haya un compañero adecuado.",
      de: "Vielen Dank für Ihren Eintrag in unsere Warteliste. Wir melden uns, sobald ein passender Hund verfügbar ist."
    },
    jobApplication: {
      en: "Thank you for your application. We’ll review it and contact you if you are selected for the next stage.",
      es: "Gracias por tu solicitud. La revisaremos y nos pondremos en contacto contigo si pasas a la siguiente fase.",
      de: "Vielen Dank für Ihre Bewerbung. Wir prüfen sie und melden uns bei Ihnen, wenn Sie für die nächste Runde ausgewählt werden."
    }
  };
  const homePages = { en: "https://www.apasa.eu/", es: "https://www.apasa.eu/es", de: "https://www.apasa.eu/de" };

  function showSuccess(message) {
    document.querySelector(".apasa-form-success-overlay")?.remove();
    const overlay = document.createElement("div");
    overlay.className = "apasa-form-success-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:22px;background:rgba(17,17,17,.62)";
    const dialog = document.createElement("section");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "apasa-form-success-title");
    dialog.style.cssText = "width:min(520px,100%);padding:30px 28px 26px;color:#111;background:#fff;border:5px solid #f5a300;border-radius:24px;box-shadow:0 18px 55px rgba(0,0,0,.35);text-align:center;font-family:Lato,'Helvetica Neue',Arial,sans-serif";
    dialog.innerHTML = `<div aria-hidden="true" style="font-size:38px;line-height:1">🐾</div><h2 id="apasa-form-success-title" style="margin:10px 0 12px;font-family:'Comic Sans MS','Chalkboard SE','Comic Neue',cursive;font-size:clamp(26px,5vw,34px);font-weight:400">${lang === "es" ? "Solicitud enviada" : "Application submitted"}</h2><p style="margin:0 auto 22px;max-width:430px;font-size:16px;line-height:1.55">${message}</p><button type="button" style="min-width:140px;padding:11px 24px;color:#111;background:#f5a300;border:0;border-radius:24px;font:700 16px Lato,'Helvetica Neue',Arial,sans-serif;cursor:pointer">OK</button>`;
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    const button = dialog.querySelector("button");
    button.addEventListener("click", () => {
      overlay.remove();
      window.close();
      setTimeout(() => {
        if (!window.closed) location.replace(homePages[lang]);
      }, 250);
    });
    button.focus();
  }

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
    const frameTitles = formId === 51
      ? { en: "APASA Waiting List", es: "Lista de Espera de APASA", de: "APASA Warteliste" }
      : formId === 52
        ? { en: "APASA Job Application", es: "Solicitud de empleo de APASA", de: "Bewerbung bei APASA" }
        : { en: "Contact APASA", es: "Contacta con APASA", de: "APASA kontaktieren" };
    iframe.title = frameTitles[lang];
    iframe.src = url.toString();
    iframe.style.cssText = "display:block;width:100%;height:1050px;border:0;background:#f3f4ed";
    iframe.setAttribute("scrolling", "no");
    container.replaceChildren(iframe);
    const hostSection = container.closest("section");
    const resizeHost = height => {
      const pixels = `${Math.ceil(height)}px`;
      container.style.height = pixels;
      container.style.minHeight = pixels;
      if (hostSection) hostSection.style.minHeight = `calc(${pixels} + 32px)`;
    };
    resizeHost(1050);
    addEventListener("message", event => {
      if (!/^https:\/\/(?:service\.sheltermanager\.com|[^.]+\.sheltermanager\.com)$/.test(event.origin)) return;
      if (event.data?.type === "apasa-online-form-height") {
        const height = Math.max(500, Math.min(10000, Number(event.data.height) || 1050));
        iframe.style.height = `${Math.ceil(height)}px`;
        resizeHost(height);
      }
      if (event.data?.type === "apasa-online-form-success") {
        const messageType = formId === 51 ? "waitList" : formId === 52 ? "jobApplication" : "contact";
        showSuccess(successMessages[messageType][lang]);
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
