(function () {
  "use strict";
  const current = document.currentScript?.src || "";
  const base = current.slice(0, current.lastIndexOf("/") + 1);

  function load(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Unable to load ${src}`));
      document.head.appendChild(script);
    });
  }

  function message(text) {
    [window.apasa_featured_div_id, window.apasa_senior_div_id].forEach(id => {
      const container = id && document.getElementById(id);
      if (container && !container.textContent.trim()) container.innerHTML = `<div class="apasa-home-loading">${text}</div>`;
    });
  }

  async function start() {
    message("Loading dogs…");
    await load(`${base}apasa-breeds.js`);
    await load(`${base}apasa-homepage.js`);
    await load(`${base}apasa-theme.js`);
    await load("https://service.sheltermanager.com/asmservice?method=animal_view_adoptable_js&account=zz1727");
  }

  start().catch(error => { console.error("APASA homepage dogs:", error); message("The dogs could not be loaded. Please refresh the page."); });
}());
