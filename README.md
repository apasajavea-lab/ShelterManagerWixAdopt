# APASA ShelterManager adoption page

Shared CSS and JavaScript used to style APASA's ShelterManager adoptable-dog listing inside Wix.

## Wix installation

Add this as Wix Custom Code on the adoption page. Place it in the **head** and replace `ACCOUNT` with the APASA ShelterManager account number.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@main/css/apasa-theme.css">
<script>
  window.asm3_adoptable_div_id = "asm3-adoptables";
  window.asm3_adoptable_delay = 2000;
</script>
<script src="https://cdn.jsdelivr.net/gh/apasajavea-lab/ShelterManagerWixAdopt@main/js/apasa-theme.js"></script>
<script src="https://service.sheltermanager.com/asmservice?method=animal_view_adoptable_js&account=ACCOUNT"></script>
```

The theme script must load before the ShelterManager script. If the Wix container has a generated ID, replace `asm3-adoptables` with that ID.

The script selects English by default, Spanish for `/es/` paths, and German for `/de/` paths. Translated short descriptions fall back to `WEBSHORTDESC` when necessary.

The `@main` CDN URLs can be cached. For controlled releases, use a Git tag such as `@v2.0.0` in both URLs.
