(function () {
  "use strict";
  const query = new URLSearchParams(location.search);
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : "en";
  document.documentElement.lang = lang;

  const translations = {
    en: {
      title: "Contact Us",
      intro: "Complete the form below and the APASA team will get back to you as soon as possible.",
      submit: "Send message",
      labels: {
        firstname: "First name", lastname: "Last name", emailaddress: "Email",
        emailverify: "Please confirm email address", mobiletelephone: "Phone",
        reason: "Reason for contact", message: "Message", Howhear: "How did you hear about us?"
      },
      reasons: ["I want to adopt", "I want to foster", "I'd like to donate", "I'm interested in volunteering", "I have a question about an event", "I have a general question", "Other"],
      heard: ["Facebook", "Instagram", "Website", "Volunteer", "Other"]
    },
    es: {
      title: "Contacta con nosotros",
      intro: "Completa el formulario y el equipo de APASA se pondrá en contacto contigo lo antes posible.",
      submit: "Enviar mensaje",
      labels: {
        firstname: "Nombre", lastname: "Apellidos", emailaddress: "Correo electrónico",
        emailverify: "Confirma tu correo electrónico", mobiletelephone: "Teléfono",
        reason: "Motivo del contacto", message: "Mensaje", Howhear: "¿Cómo nos conociste?"
      },
      reasons: ["Quiero adoptar", "Quiero acoger", "Me gustaría donar", "Me interesa ser voluntario/a", "Tengo una pregunta sobre un evento", "Tengo una pregunta general", "Otro"],
      heard: ["Facebook", "Instagram", "Sitio web", "Voluntariado", "Otro"]
    },
    de: {
      title: "Kontaktieren Sie uns",
      intro: "Füllen Sie das Formular aus. Das APASA-Team wird sich so bald wie möglich bei Ihnen melden.",
      submit: "Nachricht senden",
      labels: {
        firstname: "Vorname", lastname: "Nachname", emailaddress: "E-Mail-Adresse",
        emailverify: "E-Mail-Adresse bestätigen", mobiletelephone: "Telefon",
        reason: "Grund der Kontaktaufnahme", message: "Nachricht", Howhear: "Wie haben Sie von uns erfahren?"
      },
      reasons: ["Ich möchte adoptieren", "Ich möchte eine Pflegestelle anbieten", "Ich möchte spenden", "Ich interessiere mich für ehrenamtliche Mitarbeit", "Ich habe eine Frage zu einer Veranstaltung", "Ich habe eine allgemeine Frage", "Sonstiges"],
      heard: ["Facebook", "Instagram", "Webseite", "Ehrenamtliche", "Sonstiges"]
    }
  };
  const words = translations[lang];
  const title = document.querySelector(".asm-onlineform-title");
  if (title) {
    title.textContent = words.title;
    if (!document.querySelector(".apasa-form-intro")) title.insertAdjacentHTML("afterend", `<p class="apasa-form-intro">${words.intro}</p>`);
  }

  const fieldBaseName = element => String(element?.name || "").replace(/_\d+$/, "");
  document.querySelectorAll("input,select,textarea").forEach(field => {
    const base = field.id?.endsWith("verify") ? "emailverify" : fieldBaseName(field);
    const label = field.id && document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
    if (label && words.labels[base]) {
      const required = label.querySelector(".asm-onlineform-required")?.outerHTML || "";
      label.innerHTML = `${words.labels[base]}${required ? ` ${required}` : ""}`;
      field.placeholder = words.labels[base];
    }
  });

  const translateOptions = (selector, visibleLabels) => {
    const select = document.querySelector(selector);
    if (!select) return;
    Array.from(select.options).forEach((option, index) => {
      if (!option.hasAttribute("value")) option.setAttribute("value", option.textContent.trim());
      if (visibleLabels[index]) option.textContent = visibleLabels[index];
    });
  };
  translateOptions('select[name^="reason_"]', words.reasons);
  translateOptions('select[name^="Howhear_"]', words.heard);
  const submit = document.querySelector('input[type="submit"]');
  if (submit) submit.value = words.submit;

  const reportHeight = () => parent.postMessage({ type: "apasa-online-form-height", height: document.documentElement.scrollHeight }, "*");
  addEventListener("load", reportHeight);
  addEventListener("resize", reportHeight);
  document.querySelector("form")?.addEventListener("input", reportHeight);
  document.querySelector("form")?.addEventListener("change", reportHeight);
  if ("ResizeObserver" in window) new ResizeObserver(reportHeight).observe(document.body);
  reportHeight();
}());
