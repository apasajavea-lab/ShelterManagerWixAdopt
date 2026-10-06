(function () {
  "use strict";
  const query = new URLSearchParams(location.search);
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : "en";
  document.documentElement.lang = lang;
  const translations = {
    en: {
      title: "Get in Touch",
      intro: "We’d love to hear from you – whether you’re ready to volunteer, or just have questions. Fill out the form below and we’ll get back to you as soon as possible. If you are interested in adopting, please fill out the <a href=\"https://www.apasa.eu/adoption-form\" target=\"_top\">adoption form</a>.",
      submit: "Submit", phoneSearch: "Search countries",
      labels: { firstname: "First name", lastname: "Last name", emailaddress: "Email", emailverify: "Please confirm email address", mobiletelephone: "Phone", reason: "Reason for Contact", message: "Message", Howhear: "How Did You Hear About Us?" },
      reasons: ["I want to adopt", "I want to foster", "I'd like to donate", "I'm interested in volunteering", "I have a question about an event", "I have a general question", "Other"],
      heard: ["Facebook", "Instagram", "Website", "Volunteer", "Other"]
    },
    es: {
      title: "Contacta con nosotros",
      intro: "Nos encantaría saber de ti, tanto si quieres ser voluntario/a como si solo tienes alguna pregunta. Completa el formulario y te responderemos lo antes posible. Si estás interesado/a en adoptar, completa el <a href=\"https://www.apasa.eu/es/adoption-form\" target=\"_top\">formulario de adopción</a>.",
      submit: "Enviar", phoneSearch: "Buscar países",
      labels: { firstname: "Nombre", lastname: "Apellidos", emailaddress: "Correo electrónico", emailverify: "Confirma tu correo electrónico", mobiletelephone: "Teléfono", reason: "Motivo del contacto", message: "Mensaje", Howhear: "¿Cómo nos conociste?" },
      reasons: ["Quiero adoptar", "Quiero acoger", "Me gustaría donar", "Me interesa ser voluntario/a", "Tengo una pregunta sobre un evento", "Tengo una pregunta general", "Otro"],
      heard: ["Facebook", "Instagram", "Sitio web", "Voluntariado", "Otro"]
    },
    de: {
      title: "Kontakt aufnehmen",
      intro: "Wir freuen uns, von Ihnen zu hören – egal, ob Sie ehrenamtlich helfen möchten oder Fragen haben. Füllen Sie das Formular aus und wir melden uns so bald wie möglich. Wenn Sie einen Hund adoptieren möchten, füllen Sie bitte das <a href=\"https://www.apasa.eu/de/adoption-form\" target=\"_top\">Adoptionsformular</a> aus.",
      submit: "Absenden", phoneSearch: "Länder suchen",
      labels: { firstname: "Vorname", lastname: "Nachname", emailaddress: "E-Mail-Adresse", emailverify: "E-Mail-Adresse bestätigen", mobiletelephone: "Telefon", reason: "Grund der Kontaktaufnahme", message: "Nachricht", Howhear: "Wie haben Sie von uns erfahren?" },
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
  const email = document.querySelector('input[name^="emailaddress_"]:not([id$="verify"])');
  const emailVerify = document.querySelector('input[id$="verify"]');
  if (email && emailVerify) {
    emailVerify.closest(".form-floating")?.classList.add("apasa-email-verify");
    emailVerify.required = false;
    const copyEmail = () => { emailVerify.value = email.value; };
    email.addEventListener("input", copyEmail);
    copyEmail();
  }
  const phone = document.querySelector('input[name^="mobiletelephone_"]');
  let telephoneControl = null;
  if (phone && window.intlTelInput) {
    telephoneControl = window.intlTelInput(phone, {
      initialCountry: "es",
      countryOrder: ["es", "gb", "de", "fr", "nl", "be"],
      separateDialCode: true,
      strictMode: true,
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.3/dist/js/utils.js")
    });
    const localisePhoneSearch = () => {
      const search = document.querySelector(".iti__search-input");
      if (search) search.placeholder = words.phoneSearch;
    };
    phone.addEventListener("open:countrydropdown", localisePhoneSearch);
    localisePhoneSearch();
  }
  const prepareForSubmit = () => {
    if (email && emailVerify) emailVerify.value = email.value;
    if (phone && telephoneControl && phone.value.trim()) {
      const internationalNumber = telephoneControl.getNumber();
      if (internationalNumber) phone.value = internationalNumber;
    }
  };
  const form = document.querySelector("form");
  let completionPending = false;
  if (form) {
    const responseFrame = document.createElement("iframe");
    responseFrame.name = `apasa-form-response-${Date.now()}`;
    responseFrame.hidden = true;
    responseFrame.setAttribute("aria-hidden", "true");
    document.body.appendChild(responseFrame);
    form.target = responseFrame.name;
    responseFrame.addEventListener("load", () => {
      if (!completionPending) return;
      completionPending = false;
      parent.postMessage({ type: "apasa-online-form-success", lang }, "*");
    });
  }
  const existingSubmitHook = window.asm3_onlineform_submit;
  window.asm3_onlineform_submit = function () {
    prepareForSubmit();
    completionPending = true;
    if (typeof existingSubmitHook === "function") return existingSubmitHook.apply(this, arguments);
  };
  form?.addEventListener("submit", prepareForSubmit);
  const reportHeight = () => parent.postMessage({ type: "apasa-online-form-height", height: document.documentElement.scrollHeight }, "*");
  addEventListener("load", reportHeight);
  addEventListener("resize", reportHeight);
  form?.addEventListener("input", reportHeight);
  form?.addEventListener("change", reportHeight);
  if ("ResizeObserver" in window) new ResizeObserver(reportHeight).observe(document.body);
  reportHeight();
}());
