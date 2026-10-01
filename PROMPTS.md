# 67879.com — Phase-wise Build Prompts

Use these prompts with any capable AI coding assistant, in order, to rebuild or extend the site.

Global constraints apply to every phase:
- Static HTML/CSS/JS only, so it runs on GitHub Pages' free plan.
- No plaintext owner email anywhere. It lives only as an obfuscated char-code array in `assets/js/app.js` (`_k`).
- The required top bar goes on every page.
- No claim of trademark rights in "67879".

---

## Phase 0 — Strategy & research
> Research the cultural meaning of the number 67879 in Chinese (Mandarin and Cantonese homophones per digit, combinations such as 678 and 79, ascending-run symbolism). Research the economics of lucky numbers: phone-number and plate auctions, flight numbers, and numeric .com domains (2N–6N, "no-4 no-0", pattern premiums). Review at least 25 leading sites in Chinese astrology, numerology, angel numbers, lucky-number calculators, feng shui, Chinese-language learning and numeric-domain marketplaces. For each, record its tools, forms, content types, monetisation and design patterns. Output a ranked list of three website concepts, scored on traffic potential, domain fit, ad RPM, lead-gen value and competition, then pick one. Save the findings to RESEARCH.md.

## Phase 1 — Design system & shell
> Create `assets/css/style.css` with design tokens:
> - **Palette:** Chinese red #c8102e and gold #d4a017, lucky/mixed/unlucky colours green/amber/red.
> - **Themes:** light and dark via `prefers-color-scheme` and a `[data-theme]` override.
> - **Shape:** 16px radius cards, fluid typography with `clamp()`.
> - **Components:** buttons, cards, pills, tabs, tables, forms, lead boxes, ad slots, video facades, modal, cookie banner, toast, footer.
> - **Layout:** mobile-first; no horizontal scroll at 360px; honour `prefers-reduced-motion`.
>
> Create `assets/js/app.js` to inject a sticky header (logo, 9 nav links, a "Get a Reading" CTA, theme toggle, burger menu) and a 4-column footer. The footer holds a newsletter form, link lists and a legal line with a trademark notice.
>
> Every HTML page starts with this static top bar:
> "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership — web.works/contact", linked to https://web.works/contact.

## Phase 2 — Lucky Number Engine
> Write `assets/js/engine.js`, a dependency-free, UMD-style module exposing `window.LN`.
> 1. **Digit data:** digits 0–9 with Hanzi, pinyin, jyutping, homophones, English meaning and a score from −3 to +3.
> 2. **Combination dictionary:** about 45 combos (168, 518, 520, 1314, 666, 888, 999, 678, 789, 250, 14, 748, 514…) with a weight each. Remove sub-combos that sit inside a longer combo already found.
> 3. **Pattern detector:**
>    - repdigit (negative if the repeated digit is 4)
>    - ascending or descending run
>    - palindrome
>    - repeating block, ABAB, AABB
>    - lucky or 4 ending
>    - no-4, no-0
> 4. **`analyze(n)`** returns:
>    - a 1–99 score and verdict (Very Lucky ≥80, Lucky ≥65, Mixed ≥45, else Unlucky)
>    - the pinyin reading and homophone chain
>    - digit sum and digital root
>    - verdicts for wealth, love, business, plate and address
>    - a numeric-domain profile (tier and indicative price band, clearly labelled "not an appraisal")
> 5. **Other functions:**
>    - `zodiacOf(year)` and `compat(a, b)`, using trines, six harmonies and six clashes
>    - `dateScore(iso)`, with special dates such as 5/20 and 8/8, a flag for days containing 4, and a Ghost Month warning
>    - `generate(len, {prefix, avoid4, min})`
>
> Unit-test it in Node: 67879 ≈ 85, 168 ≈ 87, 88888 = 99, 44444 is the minimum.

## Phase 3 — Core pages & tools
> Build:
> - **index.html:** hero with animated 6-7-8-7-9 digit tiles and a live analyzer, an 8-tool grid, an economics section with real sales, a colour-coded 1–100 grid, a lead box, 2 videos, contest/donate/advertise cards, an FAQ with FAQPage schema, and 3 ad slots.
> - **number.html:** a dynamic `?n=` page. It rewrites the title, description and H1 per number, shows neighbour links, and links popular lookups.
> - **tools.html:** an accessible tablist with 8 tools — phone (whole number plus last 4 and last 8 digits), plate, address/floor, zodiac lucky numbers, compatibility, date picker (single date plus top 5 in a month), generator, and 5N domain profiler. Deep-link with `#hash`.
> - **meanings.html, zodiac.html, domains.html:** reference tables and FAQs. domains.html also gets a broker form.

## Phase 4 — Lead generation (highest priority for revenue)
> - **consult.html:** a 3-step wizard (service → details → contact) with a progress bar and per-step validation.
>   - Service tiers: Free verdict, $19 report, $39 dates, $99 business naming, $29 year report, B2B quote.
>   - Include a trust column and a satisfaction guarantee.
> - **Reusable lead box:** add a "Quick lead" box to every content page.
> - **Exit-intent modal:** a "free personal lucky numbers" lead magnet that fires on desktop mouse-out or after 45 seconds, once per session.
> - **Prefill:** carry `?n=` from tool results into the forms.
> - **Form handling:** every form uses `data-form="<Kind>"` and a honeypot field. app.js posts JSON to `https://formsubmit.co/ajax/<decoded inbox>` with subject, table template and page URL, shows a status message, and fires a `generate_lead` analytics event.
> - **Mail links:** `data-mail` links build a `mailto:` at click time. The address never appears in the HTML.

## Phase 5 — Monetisation
> - **AdSense:** `.ad-slot[data-slot]` placeholders (top, mid, bottom). Load `adsbygoogle.js` only when `CFG.adsenseClient` is set and the user has accepted the cookie banner. Before approval, show rotating house ads (advertise, book a reading, domain inquiry).
> - **YouTube:** lite facades using the thumbnail, swapped to a privacy-enhanced iframe on click. Video list lives in `CFG.videos`.
> - **support.html:**
>   - Donation widget: one-time or monthly; preset amounts $8, $28, $68, $168, $888, plus a custom amount; choose a purpose.
>   - Payment goes through PayPal Donate, with the business parameter built at runtime from the obfuscated inbox.
>   - Show an allocation breakdown and supporter perks.
>   - Advertising and sponsorship packages with a media-kit form.
> - **community.html:**
>   - Monthly contest ($88 / $68 / $28 prizes) with rules and an entry form, plus Event schema.
>   - Careers grid and application form.
>   - Suggestions form.

## Phase 6 — Content & SEO
> - **Articles:** write 4+ articles in /blog/ with Article schema — what 67879 means, the complete lucky-numbers guide, how to choose a lucky phone number, and 2026 Year of the Horse lucky numbers.
> - **Every page:** canonical, OG and Twitter tags, a theme colour, breadcrumbs, and a unique title and description.
> - **Site files:** `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon and OG image, and a 404 page (with a dynamic `<base>` so it works on both github.io and the custom domain).
> - **Schema:** WebSite + SearchAction, WebApplication, Service/Offer, FAQPage, Event.

## Phase 7 — Legal & compliance
> Write **legal.html** with these sections:
> - **Privacy:** local calculation, the form processor, no data sale.
> - **Cookies & advertising:** the Google-required third-party cookie disclosure and opt-out links.
> - **Terms:** contests, services and donations.
> - **Disclaimer:** cultural entertainment, not financial advice; price bands are not appraisals.
> - **Trademark & copyright disclosure:** "67879" is used as a number, no trademark claim, no affiliation with any entity using the digits; third-party marks belong to their owners; copyright notice and an IP-concern contact.

## Phase 8 — QA
> - **Playwright smoke test:** load every page, assert the top bar and header exist, and check for no console errors.
> - **Responsiveness:** confirm `scrollWidth` equals the viewport width at 390px.
> - **Email check:** grep the repo to confirm the owner email never appears in plaintext.
> - **Visual review:** screenshot desktop and mobile.
> - **Lighthouse targets:** 90+ on performance, accessibility, best practices and SEO.

## Phase 9 — Deploy (GitHub Pages, free plan)
> 1. Push to `webworksa1/67879-com` on branch `main`, with `.nojekyll` at the root.
> 2. Enable Pages: Settings → Pages → Deploy from branch → `main` / root.
> 3. For the custom domain, add a `CNAME` file containing `67879.com`. At the registrar, set A records to 185.199.108.153, .109.153, .110.153 and .111.153, plus `www` CNAME → `webworksa1.github.io`. Then tick "Enforce HTTPS".
> 4. Submit the first FormSubmit message and click the activation email it sends to the owner inbox.
> 5. Apply for AdSense, then paste the publisher ID into `CFG.adsenseClient` and the slot IDs into `CFG.adSlots`. Update `ads.txt`.

## Phase 10 — Growth & expansion
> 1. **Programmatic number pages.** A GitHub Action runs a Node script with engine.js to pre-render `/n/{0..99999}.html` (start with 0–9999 plus curated combos), each with unique computed data, FAQ schema and neighbour links. Add a sitemap index.
> 2. **Chinese editions.** zh-Hans and zh-Hant versions with hreflang, plus a Cantonese audio layer.
> 3. **Daily features.** A Daily Lucky Number email automated via RSS-to-email, and a daily almanac page.
> 4. **5N sales report.** A monthly dnjournal-style comps table.
> 5. **Revenue features:**
>    - Stripe/Gumroad checkout for fixed-price reports
>    - an expert marketplace with a 60/40 revenue share
>    - affiliate blocks for vanity numbers, registrars and feng shui products
> 6. **Video.** Launch an own YouTube channel (Shorts: "What does ___ mean in Chinese?") and embed it via `CFG.videos`.
