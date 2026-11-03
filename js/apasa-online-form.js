(function () {
  "use strict";
  const query = new URLSearchParams(location.search);
  const formId = Number(query.get("formid") || 0);
  const requestedLang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : "en";
  const lang = formId === 52 && requestedLang === "de" ? "en" : requestedLang;
  document.documentElement.lang = lang;
  const translations = {
    en: {
      title: "Get in Touch",
      intro: "We’d love to hear from you – whether you’re ready to volunteer, or just have questions. Fill out the form below and we’ll get back to you as soon as possible. If you are interested in adopting, please fill out the <a href=\"https://www.apasa.eu/adoption-form\" target=\"_top\">adoption form</a>.",
      submit: "Submit", phoneSearch: "Search countries", emailMismatch: "The email addresses do not match. Please check them and try again.",
      labels: { firstname: "First name", lastname: "Last name", emailaddress: "Email", emailverify: "Please confirm email address", mobiletelephone: "Phone", reason: "Reason for Contact", message: "Message", Howhear: "How Did You Hear About Us?" },
      reasons: ["I want to adopt", "I want to foster", "I'd like to donate", "I'm interested in volunteering", "I have a question about an event", "I have a general question", "Other"],
      heard: ["Facebook", "Instagram", "Website", "Volunteer", "Other"],
      waitList: {
        title: "Join Our Waiting List",
        intro: "Didn't find your perfect match yet? Join our waiting list and we'll contact you when a dog that fits your lifestyle and preferences becomes available. We’ll never spam you or share your details — only relevant updates.",
        submit: "Join the Waiting List",
        labels: { town: "Town", country: "Country", lookingforsex: "Sex", size: "Size", lookingforolderthan: "Older than (years)", lookingforyoungerthan: "Younger than (years)", commentsperson: "What are you hoping to find?" },
        sexes: ["Any", "Male", "Female"], sizes: ["Any", "Small", "Medium", "Large", "Giant"]
      },
      jobApplication: {
        title: "Apply to Join the APASA Team",
        intro: "Thank you for your interest in working with APASA. Please <a href=\"https://service.sheltermanager.com/asmservice?account=apasa&amp;method=document_repository&amp;mediaid=2983\" target=\"_blank\" rel=\"noopener\">view the full job description</a> before completing the application below. Please attach your CV in PDF format. Fields marked with an asterisk are required.",
        submit: "Submit Application",
        labels: { position: "Position applied for", townlive: "Town where you live", legalwork: "Are you legally entitled to work in Spain?", drivinglicense: "Do you have a valid driving licence?", owntransport: "Do you have your own transport?", languages: "Languages spoken", relevantexperience: "Relevant employment or animal-care experience", whywork: "Why would you like to work for APASA?", additionalinfo: "Additional information", available: "When would you be available to start?", pdfupload: "Attach your CV in PDF format" },
        tooltips: { languages: "Please select the languages you speak.", relevantexperience: "Please describe the relevant experience that you believe makes you suitable for this role.", additionalinfo: "Please include any additional information you believe is relevant to your application." },
        positions: ["Dog Care Assistant – Part Time"],
        languages: ["English", "Spanish", "German", "Dutch", "French"],
        yesNo: ["No", "Yes"],
        pdfHelp: "Please attach your CV as a PDF document.",
        successTitle: "Thank you for your application",
        successMessage: "We’ll review your application and contact you if you are selected for the next stage.",
        homeLabel: "Visit the APASA website", chooseFile: "Choose PDF", noFile: "No file selected",
        ineligible: "APASA can only employ applicants who are legally entitled to work in Spain and who can provide valid documentation confirming their right to work. Unfortunately, we cannot proceed with your application."
      }
    },
    es: {
      title: "Contacta con nosotros",
      intro: "Nos encantaría saber de ti, tanto si quieres ser voluntario/a como si solo tienes alguna pregunta. Completa el formulario y te responderemos lo antes posible. Si estás interesado/a en adoptar, completa el <a href=\"https://www.apasa.eu/es/adoption-form\" target=\"_top\">formulario de adopción</a>.",
      submit: "Enviar", phoneSearch: "Buscar países", emailMismatch: "Las direcciones de correo electrónico no coinciden. Compruébalas e inténtalo de nuevo.",
      labels: { firstname: "Nombre", lastname: "Apellidos", emailaddress: "Correo electrónico", emailverify: "Confirma tu correo electrónico", mobiletelephone: "Teléfono", reason: "Motivo del contacto", message: "Mensaje", Howhear: "¿Cómo nos conociste?" },
      reasons: ["Quiero adoptar", "Quiero acoger", "Me gustaría donar", "Me interesa ser voluntario/a", "Tengo una pregunta sobre un evento", "Tengo una pregunta general", "Otro"],
      heard: ["Facebook", "Instagram", "Sitio web", "Voluntariado", "Otro"],
      waitList: {
        title: "Únete a nuestra Lista de Espera",
        intro: "¿Todavía no has encontrado a tu compañero ideal? Únete a nuestra lista de espera y te contactaremos cuando haya un perro que se adapte a tu estilo de vida y preferencias. Nunca te enviaremos mensajes no deseados ni compartiremos tus datos; solo recibirás información relevante.",
        submit: "Unirme a la Lista de Espera",
        labels: { town: "Localidad", country: "País", lookingforsex: "Sexo", size: "Tamaño", lookingforolderthan: "Mayor de (años)", lookingforyoungerthan: "Menor de (años)", commentsperson: "¿Qué tipo de perro estás buscando?" },
        sexes: ["Cualquiera", "Macho", "Hembra"], sizes: ["Cualquiera", "Pequeño", "Mediano", "Grande", "Gigante"]
      },
      jobApplication: {
        title: "Solicitud de empleo",
        intro: "Gracias por tu interés en trabajar con APASA. Consulta la <a href=\"https://service.sheltermanager.com/asmservice?account=apasa&amp;method=document_repository&amp;mediaid=2984\" target=\"_blank\" rel=\"noopener\">descripción completa del puesto</a> antes de completar la solicitud. Adjunta tu currículum en formato PDF. Los campos marcados con un asterisco son obligatorios.",
        submit: "Enviar solicitud",
        labels: { position: "Puesto solicitado", townlive: "Localidad donde resides", legalwork: "¿Tienes derecho legal a trabajar en España?", drivinglicense: "¿Tienes un permiso de conducir válido?", owntransport: "¿Dispones de transporte propio?", languages: "Idiomas que hablas", relevantexperience: "Experiencia laboral o en el cuidado de animales", whywork: "¿Por qué te gustaría trabajar para APASA?", additionalinfo: "Información adicional", available: "¿Cuándo podrías empezar?", pdfupload: "Adjunta tu currículum en formato PDF" },
        tooltips: { languages: "Selecciona los idiomas que hablas.", relevantexperience: "Describe la experiencia relevante que consideres que te hace adecuado/a para este puesto.", additionalinfo: "Incluye cualquier información adicional que consideres relevante para tu solicitud." },
        positions: ["Cuidador/a de perros – Jornada parcial"],
        languages: ["Inglés", "Español", "Alemán", "Neerlandés", "Francés"],
        yesNo: ["No", "Sí"],
        pdfHelp: "Adjunta tu currículum como documento PDF.",
        successTitle: "Gracias por tu solicitud",
        successMessage: "Revisaremos tu solicitud y nos pondremos en contacto contigo si pasas a la siguiente fase.",
        homeLabel: "Visitar el sitio web de APASA", chooseFile: "Seleccionar PDF", noFile: "Ningún archivo seleccionado",
        ineligible: "APASA solo puede contratar a personas que tengan derecho legal a trabajar en España y que puedan aportar documentación válida que lo acredite. Lamentablemente, no podemos continuar con tu solicitud."
      }
    },
    de: {
      title: "Kontakt aufnehmen",
      intro: "Wir freuen uns, von Ihnen zu hören – egal, ob Sie ehrenamtlich helfen möchten oder Fragen haben. Füllen Sie das Formular aus und wir melden uns so bald wie möglich. Wenn Sie einen Hund adoptieren möchten, füllen Sie bitte das <a href=\"https://www.apasa.eu/de/adoption-form\" target=\"_top\">Adoptionsformular</a> aus.",
      submit: "Absenden", phoneSearch: "Länder suchen", emailMismatch: "Die E-Mail-Adressen stimmen nicht überein. Bitte überprüfen Sie Ihre Eingaben.",
      labels: { firstname: "Vorname", lastname: "Nachname", emailaddress: "E-Mail-Adresse", emailverify: "E-Mail-Adresse bestätigen", mobiletelephone: "Telefon", reason: "Grund der Kontaktaufnahme", message: "Nachricht", Howhear: "Wie haben Sie von uns erfahren?" },
      reasons: ["Ich möchte adoptieren", "Ich möchte eine Pflegestelle anbieten", "Ich möchte spenden", "Ich interessiere mich für ehrenamtliche Mitarbeit", "Ich habe eine Frage zu einer Veranstaltung", "Ich habe eine allgemeine Frage", "Sonstiges"],
      heard: ["Facebook", "Instagram", "Webseite", "Ehrenamtliche", "Sonstiges"],
      waitList: {
        title: "In unsere Warteliste eintragen",
        intro: "Noch nicht den passenden Hund gefunden? Tragen Sie sich in unsere Warteliste ein. Wir kontaktieren Sie, sobald ein Hund verfügbar ist, der zu Ihrem Lebensstil und Ihren Wünschen passt. Wir senden keine unerwünschten Nachrichten und geben Ihre Daten nicht weiter — Sie erhalten nur relevante Informationen.",
        submit: "In die Warteliste eintragen",
        labels: { town: "Ort", country: "Land", lookingforsex: "Geschlecht", size: "Größe", lookingforolderthan: "Älter als (Jahre)", lookingforyoungerthan: "Jünger als (Jahre)", commentsperson: "Was für einen Hund suchen Sie?" },
        sexes: ["Beliebig", "Rüde", "Hündin"], sizes: ["Beliebig", "Klein", "Mittel", "Groß", "Sehr groß"]
      }
    }
  };
  const baseWords = translations[lang];
  const formWords = formId === 51 ? baseWords.waitList : formId === 52 ? baseWords.jobApplication : null;
  const words = formWords ? { ...baseWords, ...formWords, labels: { ...baseWords.labels, ...formWords.labels } } : baseWords;
  const title = document.querySelector(".asm-onlineform-title");
  if (title) {
    title.textContent = words.title;
    if (!document.querySelector(".apasa-form-intro")) title.insertAdjacentHTML("afterend", `<p class="apasa-form-intro">${words.intro}</p>`);
  }
  const fieldBaseName = element => String(element?.name || "").replace(/_\d+$/, "");
  document.querySelectorAll("input,select,textarea").forEach(field => {
    const base = field.id?.endsWith("verify") ? "emailverify" : fieldBaseName(field);
    const label = (field.id && document.querySelector(`label[for="${CSS.escape(field.id)}"]`)) || field.closest(".asm-onlineform-tr")?.querySelector("label");
    const translatedLabel = words.labels[base] || words.labels[base.toLowerCase()];
    if (label && translatedLabel) {
      const required = label.querySelector(".asm-onlineform-required")?.outerHTML || "";
      label.innerHTML = `${translatedLabel}${required ? ` ${required}` : ""}`;
      field.placeholder = formId === 52 ? "" : translatedLabel;
    }
  });
  const translateOptions = (selector, visibleLabels) => {
    const select = document.querySelector(selector);
    if (!select) return;
    const choices = Array.from(select.options).filter(option => option.value.trim() || option.textContent.trim());
    choices.forEach((option, index) => {
      if (visibleLabels[index]) {
        if (!option.hasAttribute("value")) option.value = option.textContent.trim();
        option.textContent = visibleLabels[index];
      }
    });
    return select;
  };
  translateOptions('select[name^="reason_"]', words.reasons);
  translateOptions('select[name^="lookingforsex_"]', words.sexes || []);
  translateOptions('select[name^="size_"]', words.sizes || []);
  translateOptions('select[name^="Position_"]', words.positions || []);
  translateOptions('select[data-name^="Languages_"]', words.languages || []);
  document.querySelectorAll("select.asm-onlineform-yesno").forEach(select => {
    const choices = Array.from(select.options).filter(option => option.value.trim() || option.textContent.trim());
    choices.forEach((option, optionIndex) => {
      if (!words.yesNo?.[optionIndex]) return;
      if (!option.hasAttribute("value")) option.value = option.textContent.trim();
      option.textContent = words.yesNo[optionIndex];
    });
  });
  const pdfTooltip = document.querySelector('input[data-name^="PDFUpload_"]')?.closest(".asm-onlineform-tr")?.querySelector(".asm-onlineform-tooltip");
  if (pdfTooltip && words.pdfHelp) pdfTooltip.textContent = words.pdfHelp;
  if (formId === 52) {
    document.querySelectorAll(".asm-onlineform-tr").forEach(row => {
      const field = row.querySelector("[name], [data-name]");
      const base = String(field?.name || field?.dataset?.name || "").replace(/_\d+$/, "").toLowerCase();
      const tooltip = row.querySelector(".asm-onlineform-tooltip");
      if (tooltip && words.tooltips?.[base]) tooltip.textContent = words.tooltips[base];
    });
    const pdfInput = document.querySelector("input.asm-onlineform-pdf");
    if (pdfInput) {
      pdfInput.classList.add("apasa-native-file");
      const fileControl = document.createElement("div");
      fileControl.className = "apasa-file-control";
      fileControl.innerHTML = `<button type="button">${words.chooseFile}</button><span>${words.noFile}</span>`;
      const fileName = fileControl.querySelector("span");
      fileControl.querySelector("button").addEventListener("click", () => pdfInput.click());
      pdfInput.addEventListener("change", () => { fileName.textContent = pdfInput.files?.[0]?.name || words.noFile; });
      pdfInput.insertAdjacentElement("afterend", fileControl);
    }
  }
  if (formId === 52) {
    const legalWork = document.querySelector('select[name^="LegalWork_"]');
    const legalWorkRow = legalWork?.closest(".asm-onlineform-tr");
    const submitRow = document.querySelector('input[type="submit"]')?.closest("p");
    if (legalWork && legalWorkRow) {
      const messageRow = document.createElement("tr");
      messageRow.className = "apasa-eligibility-message";
      messageRow.hidden = true;
      messageRow.innerHTML = `<td colspan="2"><div role="alert">${words.ineligible}</div></td>`;
      legalWorkRow.insertAdjacentElement("afterend", messageRow);
      const laterRows = Array.from(legalWorkRow.parentElement.children).filter(row =>
        row.matches?.(".asm-onlineform-tr") && Array.from(legalWorkRow.parentElement.children).indexOf(row) > Array.from(legalWorkRow.parentElement.children).indexOf(messageRow)
      );
      const updateEligibility = () => {
        const ineligible = legalWork.value.trim().toLowerCase() === "no";
        messageRow.hidden = !ineligible;
        laterRows.forEach(row => {
          row.hidden = ineligible;
          row.querySelectorAll("input, select, textarea").forEach(field => { field.disabled = ineligible; });
        });
        if (submitRow) submitRow.hidden = ineligible;
      };
      legalWork.addEventListener("change", updateEligibility);
      updateEligibility();
    }
  }
  const heardSelect = translateOptions('select[name^="Howhear_"]', words.heard);
  if (heardSelect) {
    let blankOption = Array.from(heardSelect.options).find(option => !option.value.trim());
    if (!blankOption) {
      blankOption = document.createElement("option");
      blankOption.value = "";
      heardSelect.prepend(blankOption);
    }
    blankOption.textContent = "";
    blankOption.selected = true;
    heardSelect.value = "";
  }
  const submit = document.querySelector('input[type="submit"]');
  if (submit) submit.value = words.submit;
  const phone = document.querySelector('input[name^="mobiletelephone_"]');
  let telephoneControl = null;
  if (phone && window.intlTelInput) {
    telephoneControl = window.intlTelInput(phone, {
      initialCountry: "es",
      countryOrder: ["es", "gb", "de", "fr", "nl", "be"],
      autoPlaceholder: "off",
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
    if (phone && telephoneControl && phone.value.trim()) {
      const internationalNumber = telephoneControl.getNumber();
      if (internationalNumber) phone.value = internationalNumber;
    }
  };
  const form = document.querySelector("form");
  const email = document.querySelector('input[name^="emailaddress_"]');
  const emailVerify = document.querySelector('input[id$="verify"]');
  let emailError = null;
  const clearEmailError = () => {
    emailVerify?.removeAttribute("aria-invalid");
    emailError?.remove();
    emailError = null;
  };
  const validateEmails = () => {
    if (!email || !emailVerify || email.value.trim().toLowerCase() === emailVerify.value.trim().toLowerCase()) {
      clearEmailError();
      return true;
    }
    clearEmailError();
    emailVerify.setAttribute("aria-invalid", "true");
    const verifyRow = emailVerify.closest(".asm-onlineform-tr");
    emailError = document.createElement("tr");
    emailError.className = "apasa-email-error";
    emailError.innerHTML = `<td colspan="2"><div role="alert">${words.emailMismatch}</div></td>`;
    verifyRow?.insertAdjacentElement("afterend", emailError);
    emailVerify.focus();
    return false;
  };
  [email, emailVerify].filter(Boolean).forEach(field => field.addEventListener("input", () => {
    if (emailError && email.value.trim().toLowerCase() === emailVerify.value.trim().toLowerCase()) clearEmailError();
  }));
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
      if (parent !== window) {
        parent.postMessage({ type: "apasa-online-form-success", lang, formId }, "*");
        return;
      }
      if (formId === 52) {
        const homePages = { en: "https://www.apasa.eu/", es: "https://www.apasa.eu/es", de: "https://www.apasa.eu/de" };
        const page = document.querySelector("#page");
        if (page) {
          page.innerHTML = `<section class="apasa-form-success" role="status"><h2 class="asm-onlineform-title">${words.successTitle}</h2><p>${words.successMessage}</p><a href="${homePages[lang]}">${words.homeLabel}</a></section>`;
          document.title = words.successTitle;
          scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  }
  const existingSubmitHook = window.asm3_onlineform_submit;
  window.asm3_onlineform_submit = function () {
    if (!validateEmails()) {
      completionPending = false;
      return false;
    }
    prepareForSubmit();
    completionPending = true;
    if (typeof existingSubmitHook === "function") return existingSubmitHook.apply(this, arguments);
  };
  form?.addEventListener("submit", event => {
    if (!validateEmails()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    prepareForSubmit();
  }, true);
  const reportHeight = () => parent.postMessage({ type: "apasa-online-form-height", height: document.documentElement.scrollHeight }, "*");
  addEventListener("load", reportHeight);
  addEventListener("resize", reportHeight);
  form?.addEventListener("input", reportHeight);
  form?.addEventListener("change", reportHeight);
  if ("ResizeObserver" in window) new ResizeObserver(reportHeight).observe(document.body);
  reportHeight();
}());
