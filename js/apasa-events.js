(function () {
  "use strict";
  const query = new URLSearchParams(location.search);
  const lang = /^(en|es|de)$/.test(query.get("lang")) ? query.get("lang") : "en";
  document.documentElement.lang = lang;

  const unresolved = value => !value || /^\s*\$\$[^$]+\$\$\s*$/.test(value);
  const cleanText = element => {
    const value = (element?.textContent || "").trim();
    if (unresolved(value)) {
      element?.remove();
      return "";
    }
    return value;
  };
  const dateTimeParts = value => {
    const match = String(value || "").trim().match(/^(.*?)\s+(\d{1,2}:\d{2})(?::\d{2})?$/);
    return match ? { date: match[1], time: match[2] } : { date: String(value || "").trim(), time: "" };
  };

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = element.dataset[lang] || element.dataset.en || element.textContent;
  });

  const events = Array.from(document.querySelectorAll(".apasa-event"));
  document.querySelector(".apasa-events-empty").hidden = events.length > 0;

  events.forEach(event => {
    const start = dateTimeParts(cleanText(event.querySelector(".apasa-event-start")));
    const end = dateTimeParts(cleanText(event.querySelector(".apasa-event-end")));
    const dateValue = event.querySelector(".apasa-event-date-value");
    const timeValue = event.querySelector(".apasa-event-time-value");
    dateValue.textContent = end.date && end.date !== start.date ? `${start.date} – ${end.date}` : start.date || end.date;
    timeValue.textContent = end.time && end.time !== start.time ? `${start.time} – ${end.time}` : start.time || end.time;
    if (!dateValue.textContent) event.querySelector(".apasa-event-date-row")?.remove();
    if (!timeValue.textContent) event.querySelector(".apasa-event-time-row")?.remove();

    const addressParts = Array.from(event.querySelectorAll(".apasa-event-location span"))
      .map(element => cleanText(element))
      .filter(Boolean);
    const eventLocation = event.querySelector(".apasa-event-location");
    const map = event.querySelector(".apasa-event-map");
    if (addressParts.length) {
      map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressParts.join(", "))}`;
    } else {
      eventLocation?.remove();
      map?.remove();
    }

    const rawLink = cleanText(event.querySelector(".apasa-event-link-value"));
    const more = event.querySelector(".apasa-event-more");
    try {
      const url = new URL(rawLink);
      if (!/^https?:$/.test(url.protocol)) throw new Error("Unsupported event link");
      more.href = url.href;
    } catch (error) {
      more?.remove();
    }

    const description = event.querySelector(".apasa-event-description");
    description?.querySelectorAll("img[src]").forEach(image => {
      try {
        const source = new URL(image.getAttribute("src"), location.href);
        const storedId = source.searchParams.get("id") || "";
        if (source.pathname.endsWith("/image") && source.searchParams.get("mode") === "dbfs" && storedId.startsWith("/reports/")) {
          const publicImage = new URL("https://service.sheltermanager.com/asmservice");
          publicImage.searchParams.set("account", "zz1727");
          publicImage.searchParams.set("method", "extra_image");
          publicImage.searchParams.set("title", storedId.split("/").pop());
          image.src = publicImage.toString();
        }
      } catch (error) {}
    });
    const mediaContainer = event.querySelector(".apasa-event-media");
    description?.querySelectorAll("img,video,iframe,object,embed,svg").forEach(media => mediaContainer.appendChild(media));
    description?.querySelectorAll("p,div,span").forEach(element => {
      if (!element.textContent.trim() && !element.querySelector("img,video,iframe,object,embed,svg")) element.remove();
    });
    if (description && !description.textContent.trim()) description.remove();
    if (mediaContainer && !mediaContainer.children.length) mediaContainer.remove();
  });

  const reportHeight = () => parent.postMessage({ type: "apasa-events-height", height: document.documentElement.scrollHeight }, "*");
  addEventListener("load", reportHeight);
  if ("ResizeObserver" in window) new ResizeObserver(reportHeight).observe(document.body);
  reportHeight();
}());
