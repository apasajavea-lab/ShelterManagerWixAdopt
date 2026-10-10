# APASA ShelterManager adoption page

Shared CSS and JavaScript used to style APASA's ShelterManager adoptable-dog listing inside Wix.

## Wix installation

Add this as Wix Custom Code on the adoption page and place it in the **head**.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@6b753cba505205b332c7523f8a17937733248490/css/apasa-theme.css">
<script>
  window.asm3_adoptable_div_id = "comp-mp2i6zi2";
  window.asm3_adoptable_delay = 2000;
</script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@6b753cba505205b332c7523f8a17937733248490/js/apasa-breeds.js"></script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@6b753cba505205b332c7523f8a17937733248490/js/apasa-theme.js"></script>
<script src="https://service.sheltermanager.com/asmservice?method=animal_view_adoptable_js&account=zz1727"></script>
```

The breed dictionary must load before the theme, and the theme must load before ShelterManager.

The script selects English by default, Spanish for `/es/` paths, and German for `/de/` paths. Translated short descriptions fall back to `WEBSHORTDESC` when necessary.

The `@main` CDN URLs can be cached. For controlled releases, use a Git tag such as `@v2.0.0` in both URLs.

## Friendly dog profile URLs

The optional Wix Velo router in `wix/routers.js` provides automatic profile links such as `/adopt/kylie` and `/adopt/lady-jane`. It resolves the dog name against the live public ShelterManager adoption feed, so staff continue managing dogs only in ShelterManager. See `INSTALLATION.md` for the Wix router setup and required deployment order.

## Dog profile template

The files in `templates/animalview-*.html` are the three blocks for a ShelterManager
publishing template named `apasaanimalview`. Create it under **Publishing → Edit HTML
Publishing Templates** and paste the files as the header, body and footer respectively.
Keeping the original `animalview` unchanged provides an immediate fallback. The listing
script selects `apasaanimalview` automatically.

Profile language is passed from the Wix listing as `?lang=en`, `?lang=es` or
`?lang=de`. The translated custom fields are `DescSpanish`, `DescGerman`,
`WebSpecNote`, `WebSpecNoteS` and `WebSpecNoteG`.

## Events template

Create a ShelterManager HTML publishing template named `apasaevents` under
**Publishing → Edit HTML Publishing Templates**. Paste the contents of
`templates/events-head.html`, `templates/events-body.html` and
`templates/events-foot.html` into the corresponding template blocks.

On the Wix events page, add an empty container and use its Wix HTML ID below:

```html
<script>
  window.apasa_events_div_id = "YOUR_WIX_CONTAINER_ID";
  window.apasa_events_count = 20;
</script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@6be95cdcc5fa4ad4b350237deeeaf8857f657768/js/apasa-events-frame.js"></script>
```

The frame calls ShelterManager's public `html_events` service with the
`apasaevents` template. It selects English, Spanish or German from the Wix URL,
automatically resizes to its content, hides empty links and locations, and shows
a translated message when there are no events.

## Online contact form

Form 48 remains a single English form in ShelterManager. Add the contents of
`templates/online-form-contact-header.html` and
`templates/online-form-contact-footer.html` to the form's Header and Footer.
The footer script translates the visitor-facing labels and options while
preserving the English option values submitted to ShelterManager.

On the Wix Contact APASA page, add an empty container and use its Wix HTML ID:

```html
<script>
  window.apasa_online_form_div_id = "YOUR_WIX_CONTAINER_ID";
  window.apasa_online_form_account = "apasa";
  window.apasa_online_form_id = 48;
</script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@48e6c6b4ca6ab00181836c2475edd6470d0294b6/js/apasa-online-form-frame.js"></script>
```

The loader passes the Wix page language to ShelterManager and automatically
resizes the iframe when validation messages or conditional fields change.

Form 51 uses the same header and footer assets through
`templates/online-form-waitlist-header.html` and
`templates/online-form-waitlist-footer.html`. On the Wix Waiting List page use
the same loader block, set the page's container ID, and change
`window.apasa_online_form_id` to `51`.
