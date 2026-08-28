# APASA ShelterManager adoption page

Shared CSS and JavaScript used to style APASA's ShelterManager adoptable-dog listing inside Wix.

## Wix installation

Add this as Wix Custom Code on the adoption page and place it in the **head**.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@main/css/apasa-theme.css">
<script>
  window.asm3_adoptable_div_id = "comp-mp2i6zi2";
  window.asm3_adoptable_delay = 2000;
</script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@main/js/apasa-breeds.js"></script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@main/js/apasa-theme.js"></script>
<script src="https://service.sheltermanager.com/asmservice?method=animal_view_adoptable_js&account=zz1727"></script>
```

The breed dictionary must load before the theme, and the theme must load before ShelterManager.

The script selects English by default, Spanish for `/es/` paths, and German for `/de/` paths. Translated short descriptions fall back to `WEBSHORTDESC` when necessary.

The `@main` CDN URLs can be cached. For controlled releases, use a Git tag such as `@v2.0.0` in both URLs.
