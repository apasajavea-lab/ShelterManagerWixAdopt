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
  const wallClockValue = (year, month, day, hour = 0, minute = 0, second = 0) =>
    Date.UTC(year, month - 1, day, hour, minute, second);
  const eventDateValue = (value, endOfDay = false) => {
    const text = String(value || "").replace(/\u00a0/g, " ").trim();
    let match = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[T,\s]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
    let year, month, day, hour, minute, second, hasTime;
    if (match) {
      [, year, month, day, hour, minute, second] = match;
      hasTime = hour !== undefined;
    } else {
      match = text.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(?:[T,\s]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
      if (!match) return null;
      [, day, month, year, hour, minute, second] = match;
      hasTime = hour !== undefined;
    }
    const values = [year, month, day, hour || 0, minute || 0, second || 0].map(Number);
    if (values.slice(0, 3).some(Number.isNaN) || values[1] < 1 || values[1] > 12 || values[2] < 1 || values[2] > 31) return null;
    if (endOfDay && !hasTime) values.splice(3, 3, 23, 59, 59);
    else if (endOfDay && second === undefined) values[5] = 59;
    return wallClockValue(...values);
  };
  const madridNowValue = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map(part => [part.type, Number(part.value)]));
    return wallClockValue(values.year, values.month, values.day, values.hour, values.minute, values.second);
  };

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = element.dataset[lang] || element.dataset.en || element.textContent;
  });

  const events = Array.from(document.querySelectorAll(".apasa-event"));
  const now = madridNowValue();
  const currentEvents = events.filter(event => {
    const displayElement = event.querySelector(".apasa-event-display-on-web");
    const displayOnWeb = (displayElement?.textContent || "").trim();
    const displayFieldUnavailable = unresolved(displayOnWeb);
    displayElement?.remove();
    if (!displayFieldUnavailable && displayOnWeb !== "1") {
      event.remove();
      return false;
    }
    const rawStart = cleanText(event.querySelector(".apasa-event-start"));
    const rawEnd = cleanText(event.querySelector(".apasa-event-end"));
    const start = dateTimeParts(rawStart);
    const endsAt = eventDateValue(rawEnd, true) ?? eventDateValue(start.date, true);
    if (endsAt !== null && endsAt < now) {
      event.remove();
      return false;
    }
    return true;
  });
  document.querySelector(".apasa-events-empty").hidden = currentEvents.length > 0;

  currentEvents.forEach(event => {
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
