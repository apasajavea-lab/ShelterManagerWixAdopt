# Installation checklist

1. Publish the Wix adoption page and identify the HTML ID of its dog-list container.
2. In Wix, open **Settings → Custom Code → Add Custom Code**.
3. Paste the APASA-specific snippet from `README.md`.
4. Apply the code only to the adoption page, place it in the head, and publish.
5. Open the published English, Spanish, and German pages and check the browser console for errors.

Never commit passwords, API keys, private animal information, or ShelterManager login credentials to this public repository.

## Events page

1. Create a ShelterManager HTML publishing template called `apasaevents`.
2. Copy the three `templates/events-*.html` files into its header, body and footer blocks.
3. Create or select the Wix events page and note the HTML ID of the empty events container.
4. Add the events snippet from `README.md` as page-specific Wix custom code.
5. Publish Wix and verify the English, Spanish and German page URLs on desktop and mobile.

## Contact form

1. Add the two `templates/online-form-contact-*.html` blocks to ShelterManager online form 48.
2. Use ShelterManager's development-mode View Form button while testing to bypass its 30-minute public cache.
3. Add an empty container to the Wix Contact APASA page and publish it.
4. Identify the container's inner Wix HTML ID and add the online-form snippet from `README.md` as page-specific header code.
5. Test field validation, English/Spanish/German labels and a complete test submission before removing the old Wix form.
