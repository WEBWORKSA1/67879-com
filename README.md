# 67879.com — Chinese Lucky Number Lab

A static website that decodes any number using Chinese numerology. It covers Mandarin and Cantonese homophones, famous combinations, zodiac signs, lucky dates and 5N domain profiles. It is built to earn from lead generation, AdSense, YouTube, sponsorship and donations.

- **Hosting:** GitHub Pages, free plan. There is no build step and no server.
- **Strategy and benchmark:** [RESEARCH.md](RESEARCH.md)
- **Phase-wise build prompts:** [PROMPTS.md](PROMPTS.md)

## Structure
```
index.html        Home + live analyzer
number.html       Dynamic number meaning page (?n=)
tools.html        8 tools (phone, plate, address, zodiac, compatibility, dates, generator, 5N domain)
meanings.html     Digits, combinations, 1–100 map
zodiac.html       12 animals, lucky numbers, compatibility
domains.html      5N domain guide + domain desk form
consult.html      3-step lead-generation wizard
videos.html       YouTube facades
community.html    Contests, prizes, careers
support.html      Donations + advertising/sponsorship
blog/             Articles
about.html, contact.html, legal.html (privacy, terms, disclaimer, trademark & copyright), 404.html
assets/js/engine.js  Lucky Number Engine
assets/js/app.js     Shell, forms, ads, donations, videos (CONFIG at top)
```

## Configuration (`assets/js/app.js` → `CFG`)
- `adsenseClient`: your `ca-pub-…` ID. Ads load only after it is set and the visitor gives cookie consent.
- `adSlots`: slot IDs for the `top`, `mid` and `bottom` ad positions.
- `videos`: the YouTube video IDs to embed.
- `buyMeACoffee`: an optional Buy Me a Coffee link.

Forms post through FormSubmit to the owner inbox. That address is stored only as an obfuscated array (`_k`). The first submission triggers a one-time activation email.

## Custom domain
1. Add a `CNAME` file containing `67879.com`.
2. At the registrar, point A records to GitHub Pages: 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153.
3. Add a `www` CNAME pointing to `webworksa1.github.io`.

© 2026 67879.com / Webworks Media. "67879" is used here as a number. No trademark is claimed in it, and the site is not affiliated with any other entity that uses these digits.
