(function () {
  "use strict";
  const query = new URLSearchParams(location.search);
  const formId = Number(query.get("formid") || 0);
  const requestedLang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : "en";
  const sponsorshipLanguages = { 53: "en", 54: "de", 55: "es" };
  const isSponsorshipForm = Object.prototype.hasOwnProperty.call(sponsorshipLanguages, formId);
  const lang = sponsorshipLanguages[formId] || (formId === 52 && requestedLang === "de" ? "en" : requestedLang);
  document.documentElement.lang = lang;
  const translations = {
    en: {
      title: "Get in Touch",
      intro: "We’d love to hear from you – whether you’re ready to volunteer, or just have questions. Fill out the form below and we’ll get back to you as soon as possible. If you are interested in adopting, please fill out the <a href=\"https://www.apasa.eu/adoption-form\" target=\"_top\">adoption form</a>.",
      submit: "Submit", phoneSearch: "Search countries", emailMismatch: "The email addresses do not match. Please check them and try again.",
      vacancyClosed: { title: "No current job vacancies", message: "We currently have no job vacancies. Please check back again in the future." },
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
        intro: "Thank you for your interest in working with APASA. Please <a href=\"https://service.sheltermanager.com/asmservice?account=apasa&amp;method=document_repository&amp;mediaid=2983\" target=\"_blank\" rel=\"noopener\">view the full job description</a> before completing the application below. You may optionally attach your CV in PDF format. Fields marked with an asterisk are required.",
        submit: "Submit Application",
        labels: { position: "Position applied for", townlive: "Town where you live", legalwork: "Are you legally entitled to work in Spain?", drivinglicense: "Do you have a valid driving licence?", owntransport: "Do you have your own transport?", languages: "Languages spoken", relevantexperience: "Relevant employment or animal-care experience", whywork: "Why would you like to work for APASA?", additionalinfo: "Additional information", available: "When would you be available to start?", pdfupload: "Attach your CV in PDF format" },
        tooltips: { languages: "Please select the languages you speak.", relevantexperience: "Please describe the relevant experience that you believe makes you suitable for this role.", additionalinfo: "Please include any additional information you believe is relevant to your application." },
        positions: ["Dog Care Assistant – Part Time"],
        languages: ["English", "Spanish", "German", "Dutch", "French"],
        yesNo: ["No", "Yes"],
        pdfHelp: "You may optionally attach your CV in PDF format.",
        successTitle: "Thank you for your application",
        successMessage: "We’ll review your application and contact you if you are selected for the next stage.",
        homeLabel: "Visit the APASA website", chooseFile: "Choose PDF", noFile: "No file selected",
        ineligible: "APASA can only employ applicants who are legally entitled to work in Spain and who can provide valid documentation confirming their right to work. Unfortunately, we cannot proceed with your application."
      },
      sponsorship: {
        title: "Sponsor a Dog",
        backLabel: "Back",
        backUrl: "https://www.apasa.eu/get-involved",
        intro: "Your sponsorship helps towards the care of our dogs. Complete the form below and start helping today! If your chosen dog gets adopted in the future, we will contact you for you to choose another dog to help.",
        submit: "Submit Sponsorship",
        contactHeading: "Your contact details",
        agreementHeading: "Sponsorship agreement",
        agreement: "By signing below, I agree to sponsor the dog I have selected and contribute the amount shown at the frequency and for the duration I have chosen. If the dog is adopted, APASA will let me know, and I agree for my sponsorship to transfer to another dog in need.",
        labels: { animalname: "Dog you’d like to sponsor", frequency: "Sponsorship contribution", duration: "Sponsorship duration", paymethod: "Payment method", firstname: "First name", lastname: "Last name", address: "Street address", city: "Town or city", state: "Province, state or region", zipcode: "Postcode", country: "Country", emailaddress: "Email address", celltelephone: "Mobile phone number", gdprcontactoptin: "Please sign me up to your newsletter", signature: "Your signature" },
        frequencies: ["€15 monthly", "€45 quarterly", "€180 yearly"],
        durations: ["1 month", "3 months", "6 months", "1 year", "Ongoing"],
        paymentMethods: ["PayPal", "Bank transfer"],
        yesNo: ["No", "Yes"],
        clearSignature: "Clear signature",
        chooseDog: "Choose a dog",
        dogLoading: "Loading available dogs…",
        dogLoadError: "The available dogs could not be loaded. Please refresh the page.",
        viewProfile: "View profile",
        selectedDog: "Selected",
        sexNames: { 0: "Female", 1: "Male" },
        age: { year: "year old", years: "years old", underOne: "Under 1 year old" },
        apasaTime: { lessOne: "At APASA less than 1 year", over: "At APASA over", nearly: "At APASA nearly", year: "year", years: "years" },
        nonEuroBank: "Bank transfers from countries that do not use the euro may incur substantial charges for APASA. Monthly bank transfers are therefore unavailable. Please choose PayPal for monthly sponsorship, or make a yearly bank transfer and ensure that all transfer charges are paid by the sender.",
        successTitle: "Thank you for sponsoring an APASA dog",
        paypalSuccess: "Your sponsorship form has been submitted. Complete the final step securely with PayPal.",
        bankSuccess: "Your sponsorship form has been submitted. APASA will contact you with the bank-transfer instructions.",
        paypalMonthly: "Continue to PayPal – €15 monthly",
        paypalYearly: "Continue to PayPal – €180 yearly"
      }
    },
    es: {
      title: "Contacta con nosotros",
      intro: "Nos encantaría saber de ti, tanto si quieres ser voluntario/a como si solo tienes alguna pregunta. Completa el formulario y te responderemos lo antes posible. Si estás interesado/a en adoptar, completa el <a href=\"https://www.apasa.eu/es/adoption-form\" target=\"_top\">formulario de adopción</a>.",
      submit: "Enviar", phoneSearch: "Buscar países", emailMismatch: "Las direcciones de correo electrónico no coinciden. Compruébalas e inténtalo de nuevo.",
      vacancyClosed: { title: "No hay vacantes actualmente", message: "Actualmente no tenemos ofertas de empleo. Vuelve a consultar esta página más adelante." },
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
        intro: "Gracias por tu interés en trabajar con APASA. Consulta la <a href=\"https://service.sheltermanager.com/asmservice?account=apasa&amp;method=document_repository&amp;mediaid=2984\" target=\"_blank\" rel=\"noopener\">descripción completa del puesto</a> antes de completar la solicitud. Puedes adjuntar opcionalmente tu currículum en formato PDF. Los campos marcados con un asterisco son obligatorios.",
        submit: "Enviar solicitud",
        labels: { position: "Puesto solicitado", townlive: "Localidad donde resides", legalwork: "¿Tienes derecho legal a trabajar en España?", drivinglicense: "¿Tienes un permiso de conducir válido?", owntransport: "¿Dispones de transporte propio?", languages: "Idiomas que hablas", relevantexperience: "Experiencia laboral o en el cuidado de animales", whywork: "¿Por qué te gustaría trabajar para APASA?", additionalinfo: "Información adicional", available: "¿Cuándo podrías empezar?", pdfupload: "Adjunta tu currículum en formato PDF" },
        tooltips: { languages: "Selecciona los idiomas que hablas.", relevantexperience: "Describe la experiencia relevante que consideres que te hace adecuado/a para este puesto.", additionalinfo: "Incluye cualquier información adicional que consideres relevante para tu solicitud." },
        positions: ["Cuidador/a de perros – Jornada parcial"],
        languages: ["Inglés", "Español", "Alemán", "Neerlandés", "Francés"],
        yesNo: ["No", "Sí"],
        pdfHelp: "Puedes adjuntar opcionalmente tu currículum en formato PDF.",
        successTitle: "Gracias por tu solicitud",
        successMessage: "Revisaremos tu solicitud y nos pondremos en contacto contigo si pasas a la siguiente fase.",
        homeLabel: "Visitar el sitio web de APASA", chooseFile: "Seleccionar PDF", noFile: "Ningún archivo seleccionado",
        ineligible: "APASA solo puede contratar a personas que tengan derecho legal a trabajar en España y que puedan aportar documentación válida que lo acredite. Lamentablemente, no podemos continuar con tu solicitud."
      },
      sponsorship: {
        title: "Apadrina a un perro",
        backLabel: "Volver",
        backUrl: "https://www.apasa.eu/es/get-involved",
        intro: "Tu apadrinamiento contribuye al cuidado de nuestros perros. Completa el formulario y empieza a ayudar hoy mismo. Si el perro que has elegido es adoptado en el futuro, nos pondremos en contacto contigo para que elijas otro perro al que ayudar.",
        submit: "Enviar apadrinamiento",
        contactHeading: "Tus datos de contacto",
        agreementHeading: "Acuerdo de apadrinamiento",
        agreement: "Al firmar, me comprometo a apadrinar al perro que he elegido y a aportar el importe indicado con la frecuencia y durante el periodo seleccionados. Si el perro es adoptado, APASA me avisará y acepto que mi apadrinamiento se transfiera a otro perro que lo necesite.",
        labels: { animalname: "Perro que quieres apadrinar", frequency: "Aportación del apadrinamiento", duration: "Duración del apadrinamiento", paymethod: "Forma de pago", firstname: "Nombre", lastname: "Apellidos", address: "Calle y número", city: "Localidad", state: "Provincia, estado o región", zipcode: "Código postal", country: "País", emailaddress: "Correo electrónico", celltelephone: "Número de móvil", gdprcontactoptin: "Quiero suscribirme a vuestro boletín informativo", signature: "Tu firma" },
        frequencies: ["15 € al mes", "45 € al trimestre", "180 € al año"],
        durations: ["1 mes", "3 meses", "6 meses", "1 año", "Continuado"],
        paymentMethods: ["PayPal", "Transferencia bancaria"],
        yesNo: ["No", "Sí"],
        clearSignature: "Borrar firma",
        chooseDog: "Elige un perro",
        dogLoading: "Cargando perros disponibles…",
        dogLoadError: "No se ha podido cargar la lista de perros disponibles. Actualiza la página.",
        viewProfile: "Ver perfil",
        selectedDog: "Seleccionado",
        sexNames: { 0: "Hembra", 1: "Macho" },
        age: { year: "año", years: "años", underOne: "Menos de 1 año" },
        apasaTime: { lessOne: "En APASA menos de 1 año", over: "En APASA más de", nearly: "En APASA casi", year: "año", years: "años" },
        nonEuroBank: "Las transferencias bancarias desde países que no utilizan el euro pueden generar comisiones importantes para APASA. Por ello, no están disponibles las transferencias bancarias mensuales. Para el apadrinamiento mensual, utiliza PayPal; como alternativa, realiza una transferencia bancaria anual y asegúrate de que todos los gastos sean abonados por el ordenante.",
        successTitle: "Gracias por apadrinar a un perro de APASA",
        paypalSuccess: "Tu formulario de apadrinamiento se ha enviado. Completa el último paso de forma segura con PayPal.",
        bankSuccess: "Tu formulario de apadrinamiento se ha enviado. APASA se pondrá en contacto contigo con las instrucciones para la transferencia bancaria.",
        paypalMonthly: "Continuar a PayPal – 15 € al mes",
        paypalYearly: "Continuar a PayPal – 180 € al año"
      }
    },
    de: {
      title: "Kontakt aufnehmen",
      intro: "Wir freuen uns, von Ihnen zu hören – egal, ob Sie ehrenamtlich helfen möchten oder Fragen haben. Füllen Sie das Formular aus und wir melden uns so bald wie möglich. Wenn Sie einen Hund adoptieren möchten, füllen Sie bitte das <a href=\"https://www.apasa.eu/de/adoption-form\" target=\"_top\">Adoptionsformular</a> aus.",
      submit: "Absenden", phoneSearch: "Länder suchen", emailMismatch: "Die E-Mail-Adressen stimmen nicht überein. Bitte überprüfen Sie Ihre Eingaben.",
      vacancyClosed: { title: "Derzeit keine offenen Stellen", message: "Derzeit haben wir keine offenen Stellen. Bitte schauen Sie zu einem späteren Zeitpunkt wieder vorbei." },
      labels: { firstname: "Vorname", lastname: "Nachname", emailaddress: "E-Mail-Adresse", emailverify: "E-Mail-Adresse bestätigen", mobiletelephone: "Telefon", reason: "Grund der Kontaktaufnahme", message: "Nachricht", Howhear: "Wie haben Sie von uns erfahren?" },
      reasons: ["Ich möchte adoptieren", "Ich möchte eine Pflegestelle anbieten", "Ich möchte spenden", "Ich interessiere mich für ehrenamtliche Mitarbeit", "Ich habe eine Frage zu einer Veranstaltung", "Ich habe eine allgemeine Frage", "Sonstiges"],
      heard: ["Facebook", "Instagram", "Webseite", "Ehrenamtliche", "Sonstiges"],
      waitList: {
        title: "In unsere Warteliste eintragen",
        intro: "Noch nicht den passenden Hund gefunden? Tragen Sie sich in unsere Warteliste ein. Wir kontaktieren Sie, sobald ein Hund verfügbar ist, der zu Ihrem Lebensstil und Ihren Wünschen passt. Wir senden keine unerwünschten Nachrichten und geben Ihre Daten nicht weiter — Sie erhalten nur relevante Informationen.",
        submit: "In die Warteliste eintragen",
        labels: { town: "Ort", country: "Land", lookingforsex: "Geschlecht", size: "Größe", lookingforolderthan: "Älter als (Jahre)", lookingforyoungerthan: "Jünger als (Jahre)", commentsperson: "Was für einen Hund suchen Sie?" },
        sexes: ["Beliebig", "Rüde", "Hündin"], sizes: ["Beliebig", "Klein", "Mittel", "Groß", "Sehr groß"]
      },
      sponsorship: {
        title: "Eine Patenschaft übernehmen",
        backLabel: "Zurück",
        backUrl: "https://www.apasa.eu/de/get-involved",
        intro: "Mit Ihrer Patenschaft tragen Sie zur Versorgung unserer Hunde bei. Füllen Sie das folgende Formular aus und helfen Sie noch heute! Sollte der von Ihnen ausgewählte Hund künftig vermittelt werden, setzen wir uns mit Ihnen in Verbindung, damit Sie einen anderen Hund auswählen können, den Sie unterstützen möchten.",
        submit: "Patenschaft absenden",
        contactHeading: "Ihre Kontaktdaten",
        agreementHeading: "Patenschaftsvereinbarung",
        agreement: "Mit meiner Unterschrift übernehme ich die Patenschaft für den ausgewählten Hund. Ich zahle den angegebenen Betrag im gewählten Rhythmus für die angegebene Dauer. Sollte der Hund vermittelt werden, informiert mich APASA. Ich bin damit einverstanden, dass meine Patenschaft in diesem Fall auf einen anderen Hund in Not übertragen wird.",
        labels: { animalname: "Hund, für den Sie eine Patenschaft übernehmen möchten", frequency: "Patenschaftsbeitrag", duration: "Dauer der Patenschaft", paymethod: "Zahlungsart", firstname: "Vorname", lastname: "Nachname", address: "Straße und Hausnummer", city: "Ort", state: "Provinz, Bundesland oder Region", zipcode: "Postleitzahl", country: "Land", emailaddress: "E-Mail-Adresse", celltelephone: "Mobiltelefonnummer", gdprcontactoptin: "Bitte melden Sie mich für Ihren Newsletter an", signature: "Ihre Unterschrift" },
        frequencies: ["15 € monatlich", "45 € vierteljährlich", "180 € jährlich"],
        durations: ["1 Monat", "3 Monate", "6 Monate", "1 Jahr", "Fortlaufend"],
        paymentMethods: ["PayPal", "Banküberweisung"],
        yesNo: ["Nein", "Ja"],
        clearSignature: "Unterschrift löschen",
        chooseDog: "Hund auswählen",
        dogLoading: "Verfügbare Hunde werden geladen…",
        dogLoadError: "Die verfügbaren Hunde konnten nicht geladen werden. Bitte laden Sie die Seite neu.",
        viewProfile: "Profil ansehen",
        selectedDog: "Ausgewählt",
        sexNames: { 0: "Hündin", 1: "Rüde" },
        age: { year: "Jahr alt", years: "Jahre alt", underOne: "Unter 1 Jahr alt" },
        apasaTime: { lessOne: "Seit weniger als 1 Jahr bei APASA", over: "Seit über", nearly: "Seit fast", year: "Jahr bei APASA", years: "Jahren bei APASA" },
        nonEuroBank: "Banküberweisungen aus Ländern, die den Euro nicht verwenden, können für APASA erhebliche Gebühren verursachen. Monatliche Banküberweisungen sind daher nicht möglich. Bitte nutzen Sie für eine monatliche Patenschaft PayPal oder tätigen Sie eine jährliche Banküberweisung und stellen Sie sicher, dass sämtliche Überweisungsgebühren vom Auftraggeber getragen werden.",
        successTitle: "Vielen Dank für Ihre Hundepatenschaft bei APASA",
        paypalSuccess: "Ihr Patenschaftsformular wurde übermittelt. Schließen Sie den letzten Schritt sicher über PayPal ab.",
        bankSuccess: "Ihr Patenschaftsformular wurde übermittelt. APASA wird Ihnen die Anweisungen für die Banküberweisung zusenden.",
        paypalMonthly: "Weiter zu PayPal – 15 € monatlich",
        paypalYearly: "Weiter zu PayPal – 180 € jährlich"
      }
    }
  };
  const baseWords = translations[lang];
  const formWords = formId === 51 ? baseWords.waitList : formId === 52 ? baseWords.jobApplication : isSponsorshipForm ? baseWords.sponsorship : null;
  const words = formWords ? { ...baseWords, ...formWords, labels: { ...baseWords.labels, ...formWords.labels } } : baseWords;
  if (isSponsorshipForm) {
    const languageField = document.querySelector('[name^="additionalLanguage_" i]');
    if (languageField) {
      const personLanguage = { en: "English", es: "Spanish", de: "German" }[lang];
      if (languageField.matches("select")) {
        const option = Array.from(languageField.options).find(item =>
          item.value.trim().toLowerCase() === personLanguage.toLowerCase() ||
          item.textContent.trim().toLowerCase() === personLanguage.toLowerCase()
        );
        if (option) languageField.value = option.value;
      } else {
        languageField.value = personLanguage;
      }
      const languageContainer = languageField.closest(".asm-onlineform-tr, .form-floating") || languageField.parentElement;
      if (languageContainer) languageContainer.hidden = true;
    }
  }
  if (formId === 52) {
    const position = document.querySelector('select[name^="Position_"]');
    const hasVacancy = position && Array.from(position.options).some(option => option.value.trim() || option.textContent.trim());
    if (!hasVacancy) {
      const vacancyWords = translations[requestedLang].vacancyClosed;
      const page = document.querySelector("#page");
      document.documentElement.lang = requestedLang;
      document.title = vacancyWords.title;
      if (page) page.innerHTML = `<section class="apasa-no-vacancies" role="status"><div class="apasa-no-vacancies-paw" aria-hidden="true">🐾</div><h2>${vacancyWords.title}</h2><p>${vacancyWords.message}</p></section>`;
      requestAnimationFrame(() => parent.postMessage({ type: "apasa-online-form-height", height: document.documentElement.scrollHeight }, "*"));
      return;
    }
  }
  const title = document.querySelector(".asm-onlineform-title");
  if (title) {
    title.textContent = words.title;
    if (!document.querySelector(".apasa-form-intro")) title.insertAdjacentHTML("afterend", `<p class="apasa-form-intro">${words.intro}</p>`);
    if (isSponsorshipForm) {
      const header = document.createElement("header");
      header.className = "apasa-form-header";
      title.insertAdjacentElement("beforebegin", header);
      const logo = document.createElement("img");
      logo.className = "apasa-form-logo";
      logo.src = "https://service.sheltermanager.com/asmservice?account=apasa&method=extra_image&title=logotipo%20APASA%20transparente.PNG";
      logo.alt = "APASA";
      logo.addEventListener("error", () => {
        if (!logo.dataset.fallback) {
          logo.dataset.fallback = "true";
          logo.src = "https://service.sheltermanager.com/asmservice?account=apasa&method=extra_image&title=logotipo%20APASA.png";
        }
      });
      const back = document.createElement("a");
      back.className = "apasa-form-back";
      back.href = words.backUrl;
      back.target = "_top";
      back.setAttribute("aria-label", words.backLabel);
      back.innerHTML = `<span aria-hidden="true">←</span><span class="apasa-form-back-text">${words.backLabel}</span>`;
      header.append(logo, title, back);
    }
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
  const sponsorshipFrequency = document.querySelector('select[name^="Frequency_"]');
  if (isSponsorshipForm && sponsorshipFrequency) {
    Array.from(sponsorshipFrequency.options).forEach(option => {
      const original = option.textContent.trim();
      if (!option.hasAttribute("value")) option.value = original;
      if (/month|mes|monat/i.test(original)) option.textContent = words.frequencies[0];
      else if (/quarter|trimestre|viertel/i.test(original)) option.textContent = words.frequencies[1];
      else if (/year|annual|año|jähr/i.test(original)) option.textContent = words.frequencies[2];
    });
  }
  translateOptions('select[name^="Duration_"]', words.durations || []);
  translateOptions('select[name^="PayMethod_"]', words.paymentMethods || []);
  translateOptions('select[name^="gdprcontactoptin_"]', words.yesNo || []);
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
  if (isSponsorshipForm) {
    const contributionSelect = document.querySelector('select[name^="Frequency_"]');
    Array.from(contributionSelect?.options || []).forEach(option => {
      if (/quarter|trimestre|viertel/i.test(`${option.value} ${option.textContent}`)) option.remove();
    });
    const addSectionBefore = (selector, className, heading, body = "") => {
      const field = document.querySelector(selector);
      const target = field?.closest(".asm-onlineform-tr, .form-floating") ||
        (selector.includes("Signature_") ? document.querySelector(".asm-onlineform-signature") : field);
      if (!target || document.querySelector(`.${className}`)) return;
      const sectionHtml = `<section><h3>${heading}</h3>${body ? `<p>${body}</p>` : ""}</section>`;
      const wrapper = document.createElement(target.matches("tr") ? "tr" : "div");
      wrapper.className = className;
      wrapper.innerHTML = target.matches("tr") ? `<td colspan="2">${sectionHtml}</td>` : sectionHtml;
      target.insertAdjacentElement("beforebegin", wrapper);
    };
    addSectionBefore('input[name^="firstname_"]', "apasa-form-section-heading", words.contactHeading);
    addSectionBefore('[name^="Signature_"]', "apasa-sponsorship-agreement", words.agreementHeading, words.agreement);
    document.querySelectorAll(".asm-onlineform-signature-clear").forEach(button => { button.textContent = words.clearSignature; });

    const country = document.querySelector('select[name^="country_"]');
    if (country) {
      const displayNames = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames([lang], { type: "region" }) : null;
      const englishNames = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["en"], { type: "region" }) : null;
      const countryCodes = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
      const countries = countryCodes.map(code => ({
        code,
        canonical: englishNames?.of(code) || code,
        label: displayNames?.of(code) || englishNames?.of(code) || code
      }));
      const preferredCountries = ["ES", "BE", "DE", "NL", "CH", "GB"];
      countries.sort((a, b) => {
        const aPreferred = preferredCountries.indexOf(a.code), bPreferred = preferredCountries.indexOf(b.code);
        if (aPreferred !== -1 || bPreferred !== -1) {
          if (aPreferred === -1) return 1;
          if (bPreferred === -1) return -1;
          return aPreferred - bPreferred;
        }
        return a.label.localeCompare(b.label, lang);
      });
      const blank = document.createElement("option");
      blank.value = "";
      country.replaceChildren(blank);
      countries.forEach(item => {
        const option = document.createElement("option");
        option.value = item.canonical;
        option.dataset.code = item.code;
        option.textContent = item.label;
        country.appendChild(option);
      });

      const payment = document.querySelector('select[name^="PayMethod_"]');
      const contribution = document.querySelector('select[name^="Frequency_"]');
      const fieldContainer = field => field?.closest(".form-floating") || field?.closest(".asm-onlineform-tr");
      const countryContainer = fieldContainer(country), paymentContainer = fieldContainer(payment), contributionContainer = fieldContainer(contribution);
      if (countryContainer && paymentContainer && contributionContainer) {
        contributionContainer.parentElement.insertBefore(countryContainer, contributionContainer);
        countryContainer.insertAdjacentElement("afterend", paymentContainer);
        paymentContainer.insertAdjacentElement("afterend", contributionContainer);
      }
      if (payment && contribution && contributionContainer) {
        const notice = document.createElement("div");
        notice.className = "apasa-bank-charge-notice";
        notice.setAttribute("role", "status");
        notice.hidden = true;
        notice.textContent = words.nonEuroBank;
        contributionContainer.insertAdjacentElement("afterend", notice);
        const euroCountries = new Set(["AD", "AT", "BE", "BG", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "XK", "LV", "LT", "LU", "MT", "MC", "ME", "NL", "PT", "SM", "SK", "SI", "ES", "VA"]);
        const updatePaymentChoices = () => {
          const selectedCountry = country.selectedOptions[0]?.dataset.code || "";
          const bankTransfer = /bank|transfer|transferencia|überweisung/i.test(payment.value);
          const restricted = Boolean(selectedCountry) && !euroCountries.has(selectedCountry) && bankTransfer;
          let yearlyOption = null;
          Array.from(contribution.options).forEach(option => {
            if (!option.value.trim() && !option.textContent.trim()) return;
            const yearly = /year|annual|año|jähr/i.test(`${option.value} ${option.textContent}`);
            if (yearly) yearlyOption = option;
            option.hidden = restricted && !yearly;
            option.disabled = restricted && !yearly;
          });
          if (restricted && contribution.selectedOptions[0]?.disabled && yearlyOption) contribution.value = yearlyOption.value;
          notice.hidden = !restricted;
          contribution.dispatchEvent(new Event("change", { bubbles: true }));
        };
        country.addEventListener("change", updatePaymentChoices);
        payment.addEventListener("change", updatePaymentChoices);
        updatePaymentChoices();
      }
    }

    const dogSelect = document.querySelector('select[name^="animalname_"]');
    if (dogSelect) {
      const loading = document.createElement("option");
      loading.value = "";
      loading.textContent = words.dogLoading;
      dogSelect.replaceChildren(loading);
      dogSelect.disabled = true;
      const ageText = dateOfBirth => {
        const born = new Date(dateOfBirth);
        if (Number.isNaN(born.getTime())) return "";
        const now = new Date();
        let months = (now.getFullYear() - born.getFullYear()) * 12 + now.getMonth() - born.getMonth();
        if (now.getDate() < born.getDate()) months -= 1;
        months = Math.max(0, months);
        const years = Math.floor(months / 12);
        const puppyMonths = Math.max(1, months);
        if (years) return `${years} ${years === 1 ? words.age.year : words.age.years}`;
        if (lang === "es") return `${puppyMonths} ${puppyMonths === 1 ? "mes" : "meses"}`;
        if (lang === "de") return `${puppyMonths} ${puppyMonths === 1 ? "Monat alt" : "Monate alt"}`;
        return `${puppyMonths} ${puppyMonths === 1 ? "month old" : "months old"}`;
      };
      const breedText = dog => {
        const breedRecord = id => window.APASA_BREEDS?.[String(id)]?.[lang] || "";
        const primary = breedRecord(dog.BREEDID) || (lang === "es" ? dog.BREEDNAME1 || dog.BREEDNAME : dog.PETFINDERBREED || dog.BREEDNAME1 || dog.BREEDNAME) || "";
        const secondary = breedRecord(dog.BREED2ID) || (lang === "es" ? dog.BREEDNAME2 : dog.PETFINDERBREED2 || dog.BREEDNAME2) || "";
        if (Number(dog.CROSSBREED) !== 1) return primary;
        if (String(dog.BREED2ID || "") === "442") {
          if (lang === "es") return `Cruce de ${primary}`;
          if (lang === "de") return `${primary}-Mischling`;
          return `${primary} Mix`;
        }
        const different = secondary && (String(dog.BREED2ID || "") !== String(dog.BREEDID || "") || secondary.toLowerCase() !== primary.toLowerCase());
        if (different) return lang === "es" ? `Cruce de ${primary} y ${secondary}` : `${primary} / ${secondary}`;
        if (lang === "es") return `Cruce de ${primary}`;
        if (lang === "de") return `${primary}-Mischling`;
        return `${primary} Cross`;
      };
      const daysAtApasa = dog => {
        const entered = new Date(String(dog.DATEBROUGHTIN || "").slice(0, 10));
        if (Number.isNaN(entered.getTime())) return -1;
        return Math.max(0, Math.floor((Date.now() - entered.getTime()) / 86400000));
      };
      const apasaTimeText = dog => {
        const days = daysAtApasa(dog);
        if (days < 0) return "";
        if (days < 365) {
          const months = Math.max(1, Math.floor(days / 30.4369));
          if (lang === "es") return `En APASA ${months} ${months === 1 ? "mes" : "meses"}`;
          if (lang === "de") return `Seit ${months} ${months === 1 ? "Monat" : "Monaten"} bei APASA`;
          return `At APASA ${months} ${months === 1 ? "month" : "months"}`;
        }
        const completeYears = Math.max(1, Math.floor(days / 365.2425));
        const remainderMonths = (days / 30.4369) - completeYears * 12;
        const nearly = remainderMonths > 6;
        const years = nearly ? completeYears + 1 : completeYears;
        const unit = years === 1 ? words.apasaTime.year : words.apasaTime.years;
        return `${nearly ? words.apasaTime.nearly : words.apasaTime.over} ${years} ${unit}`;
      };
      fetch("https://service.sheltermanager.com/asmservice?method=animal_view_adoptable_js&account=zz1727")
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(source => {
          const match = source.match(/var adoptables = (\[.*?\]);/s);
          if (!match) throw new Error("Adoptable data not found");
          const allDogs = JSON.parse(match[1]);
          const slugGroups = new Map();
          const dogSlug = value => String(value || "dog").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "dog";
          allDogs.forEach(dog => {
            const base = dogSlug(dog.ANIMALNAME);
            if (!slugGroups.has(base)) slugGroups.set(base, []);
            slugGroups.get(base).push(dog);
          });
          slugGroups.forEach((group, base) => group.sort((a, b) => Number(a.ID) - Number(b.ID)).forEach((dog, index) => { dog.profileSlug = index ? `${base}-${index + 1}` : base; }));
          const dogs = allDogs.filter(dog =>
            Number(dog.SPECIESID) === 1 &&
            Number(dog.WEBSITEIMAGECOUNT) > 0 &&
            Number(dog.WEBSITEMEDIAID) > 0 &&
            String(dog.WEBSITEMEDIADATE || "").trim() !== "" &&
            Number(dog.HASACTIVERESERVE) !== 1 &&
            Number(dog.HASTRIALADOPTION) !== 1 &&
            Number(dog.HASPERMANENTFOSTER) !== 1 &&
            daysAtApasa(dog) >= 365 &&
            String(dog.DISPLAYLOCATION || "").toLowerCase() === "shelter"
          ).sort((a, b) => String(a.ANIMALNAME).localeCompare(String(b.ANIMALNAME), lang));
          const blank = document.createElement("option");
          blank.value = "";
          blank.textContent = words.chooseDog;
          dogSelect.replaceChildren(blank);
          const picker = document.createElement("div");
          picker.className = "apasa-dog-picker";
          picker.setAttribute("role", "list");
          dogSelect.classList.add("apasa-native-dog-select");
          dogSelect.insertAdjacentElement("afterend", picker);
          const requestedAnimalId = Number(query.get("animalid") || 0);
          dogs.forEach(dog => {
            const option = document.createElement("option");
            const details = [breedText(dog), ageText(dog.DATEOFBIRTH)].filter(Boolean).join(" · ");
            const apasaTime = apasaTimeText(dog);
            option.value = `${dog.ANIMALNAME}::${dog.CODE || dog.SHELTERCODE || ""}`;
            option.dataset.id = dog.ID;
            option.textContent = `${dog.ANIMALNAME}${details ? ` — ${details}` : ""}`;
            dogSelect.appendChild(option);
            const profilePrefix = lang === "en" ? "" : `/${lang}`;
            const profileUrl = `https://www.apasa.eu${profilePrefix}/adopt/${dog.profileSlug}`;
            const imageUrl = `https://service.sheltermanager.com/asmservice?account=zz1727&method=animal_image&animalid=${encodeURIComponent(dog.ID)}&seq=0`;
            const card = document.createElement("div");
            card.className = "apasa-dog-picker-item";
            card.setAttribute("role", "listitem");
            card.innerHTML = `<button type="button" class="apasa-dog-choice" aria-pressed="false"><img src="${imageUrl}" alt="" loading="lazy"><span class="apasa-dog-choice-copy"><strong>${String(dog.ANIMALNAME).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</strong><span>${details}</span><span class="apasa-dog-waiting">${apasaTime}</span><small>${words.selectedDog}</small></span></button><a class="apasa-dog-profile-link" href="${profileUrl}" target="_blank" rel="noopener">${words.viewProfile}<span aria-hidden="true"> ↗</span></a>`;
            const choice = card.querySelector(".apasa-dog-choice");
            const chooseDog = () => {
              dogSelect.value = option.value;
              dogSelect.dispatchEvent(new Event("change", { bubbles: true }));
              picker.querySelectorAll(".apasa-dog-choice").forEach(button => button.setAttribute("aria-pressed", "false"));
              choice.setAttribute("aria-pressed", "true");
            };
            choice.addEventListener("click", chooseDog);
            picker.appendChild(card);
            if (requestedAnimalId === Number(dog.ID)) chooseDog();
          });
          dogSelect.disabled = false;
        })
        .catch(error => {
          console.error("APASA sponsorship dog list:", error);
          loading.textContent = words.dogLoadError;
        });
    }
  }
  const phone = document.querySelector('input[name^="mobiletelephone_"], input[name^="celltelephone_"]');
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
      } else if (isSponsorshipForm) {
        const paymentValue = document.querySelector('select[name^="PayMethod_"]')?.value || "";
        const contributionValue = document.querySelector('select[name^="Frequency_"]')?.value || "";
        const paypal = /paypal/i.test(paymentValue);
        const yearly = /year|annual|año|jähr/i.test(contributionValue);
        const locale = { en: ["en_GB", "GB"], es: ["es_ES", "ES"], de: ["de_DE", "DE"] }[lang];
        const paypalBase = yearly
          ? "https://www.paypal.com/donate/?hosted_button_id=JLQ756PPE8A3E"
          : "https://www.paypal.com/donate/?hosted_button_id=R4QMMUTXSJWCN";
        const paypalUrl = `${paypalBase}&locale.x=${locale[0]}&country.x=${locale[1]}`;
        const page = document.querySelector("#page");
        if (page) {
          page.innerHTML = `<section class="apasa-form-success" role="status"><h2 class="asm-onlineform-title">${words.successTitle}</h2><p>${paypal ? words.paypalSuccess : words.bankSuccess}</p>${paypal ? `<a href="${paypalUrl}" target="_top">${yearly ? words.paypalYearly : words.paypalMonthly}</a>` : ""}</section>`;
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
