/* 67879.com — site shell, forms, monetization hooks */
(function () {
  "use strict";
  // ================= CONFIG (edit here) =================
  var CFG = {
    adsenseClient: "",            // e.g. "ca-pub-1234567890123456" — ads load only after this is set AND consent given
    adSlots: { top: "", mid: "", bottom: "" },
    buyMeACoffee: "",             // optional e.g. "https://www.buymeacoffee.com/yourname"
    youtubeChannel: "https://www.youtube.com/results?search_query=chinese+lucky+numbers",
    videos: [
      { id: "pT52hREAf18", t: "Chinese Lucky Numbers — the maths & culture behind them" },
      { id: "OAtBLAL2qZQ", t: "Why is 8 lucky, 4 unlucky and 9 romantic?" },
      { id: "p1aXXPVPqIA", t: "Why the number 8 is considered lucky in Chinese culture" },
      { id: "rn9GN7QeSfM", t: "Number culture 数字文化 — learn Chinese number slang" }
    ],
    interestUrl: "https://web.works/contact"
  };
  // Owner inbox is never written in plain text anywhere on the site.
  var _k = [116, 118, 106, 53, 115, 112, 104, 116, 110, 71, 56, 104, 122, 114, 121, 118, 126, 105, 108, 126];
  function inbox() { return _k.slice().reverse().map(function (c) { return String.fromCharCode(c - 7); }).join(""); }

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var PAGE = document.documentElement.getAttribute("data-page") || "";

  // ================= THEME =================
  try { var t = localStorage.getItem("theme"); if (t) document.documentElement.setAttribute("data-theme", t); } catch (e) {}

  // ================= HEADER / FOOTER =================
  var NAV = [["index.html", "Home", "home"], ["number.html", "Lookup", "number"], ["tools.html", "Tools", "tools"], ["meanings.html", "Meanings", "meanings"],
    ["zodiac.html", "Zodiac", "zodiac"], ["domains.html", "Domains", "domains"], ["videos.html", "Videos", "videos"], ["blog.html", "Guides", "blog"], ["community.html", "Contests", "community"]];
  function header() {
    var h = document.createElement("header"); h.className = "site-header";
    h.innerHTML = '<div class="container nav"><a class="brand" href="' + ROOT + 'index.html" aria-label="67879.com home"><span class="brand-mark">678<br>79</span><span>67879.com<small>Lucky Number Lab · 吉祥数字</small></span></a>' +
      '<ul class="menu" id="menu">' + NAV.map(function (n) { return '<li><a href="' + ROOT + n[0] + '"' + (PAGE === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a></li>"; }).join("") + "</ul>" +
      '<div class="nav-actions"><a class="btn btn-gold btn-sm" href="' + ROOT + 'consult.html">Get a Reading</a><button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">🌓</button><button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false">☰</button></div></div>';
    var tb = $(".topbar"); tb ? tb.after(h) : document.body.prepend(h);
    $("#burger").onclick = function () { var m = $("#menu"); m.classList.toggle("open"); this.setAttribute("aria-expanded", m.classList.contains("open")); };
    $("#themeBtn").onclick = function () {
      var cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var nx = cur === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-theme", nx); try { localStorage.setItem("theme", nx); } catch (e) {}
    };
  }
  function footer() {
    var f = document.createElement("footer"); f.className = "site-footer"; var y = new Date().getFullYear();
    f.innerHTML = '<div class="container"><div class="footer-grid"><div><h3 style="color:#fff">67879.com</h3><p>The Lucky Number Lab: decode any number with Chinese numerology (Mandarin &amp; Cantonese homophones), pick lucky phone numbers, plates, dates and 5N domains.</p>' +
      '<form class="newsletter-form" data-form="Newsletter" novalidate><label for="nlf" style="color:#fff">Daily lucky number by email</label><div class="flex"><input id="nlf" name="email" type="email" required placeholder="you@example.com" style="flex:1;min-width:180px"><button class="btn btn-gold btn-sm">Subscribe</button></div><input class="hp" name="_honey" tabindex="-1" autocomplete="off"><div class="form-msg" role="status"></div></form></div>' +
      '<div><h4 style="color:#fff">Tools</h4><ul><li><a href="' + ROOT + 'number.html">Number lookup</a></li><li><a href="' + ROOT + 'tools.html#phone">Phone number checker</a></li><li><a href="' + ROOT + 'tools.html#plate">License plate checker</a></li><li><a href="' + ROOT + 'tools.html#dates">Lucky date picker</a></li><li><a href="' + ROOT + 'tools.html#domain">5N domain checker</a></li><li><a href="' + ROOT + 'tools.html#generator">Lucky number generator</a></li></ul></div>' +
      '<div><h4 style="color:#fff">Explore</h4><ul><li><a href="' + ROOT + 'meanings.html">Number meanings</a></li><li><a href="' + ROOT + 'zodiac.html">Chinese zodiac</a></li><li><a href="' + ROOT + 'blog.html">Guides</a></li><li><a href="' + ROOT + 'videos.html">Videos</a></li><li><a href="' + ROOT + 'community.html">Contests &amp; careers</a></li></ul></div>' +
      '<div><h4 style="color:#fff">Work with us</h4><ul><li><a href="' + ROOT + 'consult.html">Book a reading</a></li><li><a href="' + ROOT + 'support.html">Donate / Support</a></li><li><a href="' + ROOT + 'support.html#advertise">Advertise &amp; sponsor</a></li><li><a href="' + ROOT + 'contact.html">Contact</a></li><li><a href="' + CFG.interestUrl + '" rel="noopener">Buy / partner on this domain</a></li></ul></div></div>' +
      '<div class="legal-note">© ' + y + ' 67879.com · Content by Webworks Media. All rights reserved. “67879” is used here as a number, not as a trademark; this site is independent and not affiliated with any company, product or brand that uses the same digits. Readings are for cultural education and entertainment only. ' +
      '<a href="' + ROOT + 'legal.html">Privacy</a> · <a href="' + ROOT + 'legal.html#terms">Terms</a> · <a href="' + ROOT + 'legal.html#disclaimer">Disclaimer</a> · <a href="' + ROOT + 'legal.html#ip">Trademark &amp; copyright</a> · <a href="#" data-mail>Email us</a></div></div>';
    document.body.appendChild(f);
  }

  // ================= TOAST =================
  function toast(msg) { var t = $(".toast") || document.body.appendChild(Object.assign(document.createElement("div"), { className: "toast" })); t.textContent = msg; t.style.display = "block"; clearTimeout(t._t); t._t = setTimeout(function () { t.style.display = "none"; }, 3200); }

  // ================= MAIL LINKS (hidden address) =================
  function bindMail() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-mail]"); if (!a) return; e.preventDefault();
      var subj = a.getAttribute("data-mail") || "Inquiry from 67879.com";
      window.location.href = "mai" + "lto:" + inbox() + "?subject=" + encodeURIComponent(subj);
    });
  }

  // ================= FORMS → FormSubmit (AJAX) =================
  function bindForms() {
    document.addEventListener("submit", function (e) {
      var f = e.target; if (!f.matches("form[data-form]")) return; e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var data = {}; new FormData(f).forEach(function (v, k) { data[k] = data[k] ? data[k] + ", " + v : v; });
      if (data._honey) return; delete data._honey;
      var kind = f.getAttribute("data-form");
      data._subject = "67879.com — " + kind + (data.name ? " from " + data.name : "");
      data._template = "table"; data._captcha = "false"; data.form_type = kind; data.page = location.href;
      var msg = $(".form-msg", f), btn = $("button[type=submit],button:not([type])", f);
      if (btn) { btn.disabled = true; btn._t = btn.textContent; btn.textContent = "Sending…"; }
      fetch("https://formsubmit.co/ajax/" + inbox(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function () { if (msg) msg.textContent = "✅ Thank you! We received your " + kind.toLowerCase() + " and will reply within 24–48 hours."; f.reset(); toast("Submitted — thank you!"); if (window.gtag) gtag("event", "generate_lead", { form: kind }); })
        .catch(function () { if (msg) msg.innerHTML = 'Network issue — please <a href="#" data-mail="' + kind + '">email us instead</a>.'; })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn._t; } });
    });
  }

  // ================= CONSENT + ADSENSE =================
  function consent() {
    var c; try { c = localStorage.getItem("consent"); } catch (e) {}
    if (c === "yes") return loadAds();
    if (c === "no") return;
    var b = document.createElement("div"); b.className = "cookie show"; b.setAttribute("role", "dialog");
    b.innerHTML = '<strong>Cookies & ads</strong><p class="muted" style="margin:.4em 0">We use cookies for analytics and to show ads (Google AdSense) that keep 67879.com free. <a href="' + ROOT + 'legal.html#cookies">Learn more</a>.</p><div class="flex"><button class="btn btn-primary btn-sm" id="cAccept">Accept</button><button class="btn btn-ghost btn-sm" id="cReject">Only essential</button></div>';
    document.body.appendChild(b);
    $("#cAccept").onclick = function () { try { localStorage.setItem("consent", "yes"); } catch (e) {} b.remove(); loadAds(); };
    $("#cReject").onclick = function () { try { localStorage.setItem("consent", "no"); } catch (e) {} b.remove(); };
  }
  function loadAds() {
    if (!CFG.adsenseClient) return; // house ads stay visible until AdSense is approved
    var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + CFG.adsenseClient; document.head.appendChild(s);
    $$(".ad-slot").forEach(function (slot) {
      slot.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + CFG.adsenseClient + '" data-ad-slot="' + (CFG.adSlots[slot.dataset.slot] || "") + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
  function houseAds() {
    var house = [["📣 Your brand here — reach lucky-number seekers worldwide", "support.html#advertise", "Advertise"], ["🔮 Personal lucky-number reading — 24h turnaround", "consult.html", "Book now"], ["🐉 Interested in this premium 5N domain?", CFG.interestUrl, "Make an offer"]];
    $$(".ad-slot").forEach(function (s, i) { if (s.children.length) return; var h = house[i % house.length]; s.innerHTML += '<p style="margin:.4em 0;font-weight:700">' + h[0] + '</p><a class="btn btn-sm btn-primary" href="' + (h[1].indexOf("http") === 0 ? h[1] : ROOT + h[1]) + '">' + h[2] + "</a>"; });
  }

  // ================= YOUTUBE (lite embeds) =================
  function videos() {
    $$("[data-videos]").forEach(function (box) {
      var n = +box.getAttribute("data-videos") || CFG.videos.length;
      box.innerHTML = CFG.videos.slice(0, n).map(function (v) {
        return '<div><div class="video" data-yt="' + v.id + '" role="button" tabindex="0" aria-label="Play: ' + v.t + '"><img loading="lazy" src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="' + v.t + '"><span class="play">▶</span></div><p style="font-weight:700;margin:.5em 0">' + v.t + "</p></div>";
      }).join("");
    });
    document.addEventListener("click", function (e) {
      var v = e.target.closest("[data-yt]"); if (!v || v.querySelector("iframe")) return;
      v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.dataset.yt + '?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    });
    $$("[data-yt-channel]").forEach(function (a) { a.href = CFG.youtubeChannel; });
  }

  // ================= DONATIONS =================
  function donations() {
    var box = $("#donate"); if (!box) return; var amount = 25, freq = "once";
    $$(".amt", box).forEach(function (b) { b.onclick = function () { $$(".amt", box).forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); amount = +b.dataset.v; $("#customAmt").value = ""; }; });
    $("#customAmt").oninput = function () { $$(".amt", box).forEach(function (x) { x.classList.remove("on"); }); amount = +this.value || 0; };
    $$("input[name=freq]", box).forEach(function (r) { r.onchange = function () { freq = this.value; }; });
    $("#donateBtn").onclick = function () {
      if (amount < 1) return toast("Please choose an amount");
      var purpose = $("#donPurpose").value;
      var url = "https://www.paypal.com/donate/?business=" + encodeURIComponent(inbox()) + "&amount=" + amount + "&currency_code=USD&no_recurring=" + (freq === "monthly" ? "0" : "1") + "&item_name=" + encodeURIComponent("67879.com support — " + purpose);
      window.open(url, "_blank", "noopener");
    };
    if (CFG.buyMeACoffee) { var bm = $("#bmc"); if (bm) { bm.href = CFG.buyMeACoffee; bm.hidden = false; } }
  }

  // ================= EXIT-INTENT LEAD MAGNET =================
  function exitIntent() {
    if (PAGE === "consult") return; var shown; try { shown = sessionStorage.getItem("xi"); } catch (e) {}
    if (shown) return;
    var m = document.createElement("div"); m.className = "modal"; m.innerHTML = '<div class="card"><button class="close" aria-label="Close">×</button><span class="eyebrow">Free · 免费</span><h3>Get your personal lucky numbers</h3><p class="muted">Enter your birth year and email — we send your 5 luckiest numbers, colours and dates for the year.</p><form data-form="Lead magnet" novalidate><input name="birth_year" type="number" min="1920" max="2026" placeholder="Birth year e.g. 1988" required><label>Email</label><input name="email" type="email" required placeholder="you@example.com"><input class="hp" name="_honey" tabindex="-1" autocomplete="off"><button class="btn btn-primary mt" style="width:100%">Send my lucky numbers</button><div class="form-msg" role="status"></div></form></div>';
    document.body.appendChild(m);
    function open() { m.classList.add("show"); try { sessionStorage.setItem("xi", 1); } catch (e) {} document.removeEventListener("mouseout", out); }
    function out(e) { if (!e.relatedTarget && e.clientY < 10) open(); }
    document.addEventListener("mouseout", out);
    setTimeout(function () { if (!m.classList.contains("show") && !(function () { try { return sessionStorage.getItem("xi"); } catch (e) { return 1; } })()) open(); }, 45000);
    m.addEventListener("click", function (e) { if (e.target === m || e.target.classList.contains("close")) m.classList.remove("show"); });
  }

  // ================= NUMBER RESULT RENDERER =================
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function render(r, opts) {
    opts = opts || {}; if (!r) return '<p class="muted">Please enter at least one digit.</p>';
    var col = r.cls === "lucky" ? "var(--lucky)" : r.cls === "mixed" ? "var(--mixed)" : "var(--unlucky)";
    var h = '<div class="card result"><div class="result-top"><div class="score-ring" style="--p:' + r.score + ";--c:" + col + '"><div>' + r.score + '<small>/ 100</small></div></div><div style="flex:1;min-width:220px">' +
      '<span class="pill ' + r.cls + '">' + r.verdict + "</span><h3 style=\"margin:.3em 0;font-size:1.8rem\">" + esc(r.n) + ' <span class="muted" style="font-size:1rem">' + r.hanzi + "</span></h3>" +
      '<p style="margin:0"><b>Mandarin:</b> ' + r.reading + "</p><p style=\"margin:0\"><b>Sounds like:</b> " + r.chain + "</p></div></div>";
    h += '<div class="breakdown">' + r.digits.map(function (d) { return '<div class="bd ' + (d.s > 0 ? "s-pos" : d.s < 0 ? "s-neg" : "") + '"><b>' + d.d + '</b><span class="hz">' + d.hz + " " + d.py + "</span><small>" + d.hom + "</small></div>"; }).join("") + "</div>";
    if (r.combos.length) h += "<h4>Known combinations</h4><ul>" + r.combos.map(function (c) { return "<li><b>" + c[0] + "</b> — " + c[1] + " · " + c[2] + ' <span class="pill ' + (c[3] > 0 ? "lucky" : c[3] < 0 ? "unlucky" : "mixed") + '">' + (c[3] > 0 ? "+" : "") + c[3] + "</span></li>"; }).join("") + "</ul>";
    if (r.patterns.length) h += "<h4>Patterns</h4><ul>" + r.patterns.map(function (p) { return "<li>" + p[0] + " <span class=\"muted\">(" + (p[1] > 0 ? "+" : "") + p[1] + ")</span></li>"; }).join("") + "</ul>";
    h += '<div class="table-wrap"><table><tr><th>Use</th><th>Verdict</th></tr><tr><td>💰 Wealth</td><td>' + r.contexts.wealth + "</td></tr><tr><td>❤️ Love</td><td>" + r.contexts.love + "</td></tr><tr><td>🏪 Business</td><td>" + r.contexts.business + "</td></tr><tr><td>🚗 Plate</td><td>" + r.contexts.plate + "</td></tr><tr><td>🏠 Address / floor</td><td>" + r.contexts.address + "</td></tr><tr><td>🔢 Digit sum</td><td>" + r.sum + " → root " + r.root + " (" + r.rootMeaning + ")</td></tr>" +
      (r.n.length >= 2 && r.n.length <= 6 ? "<tr><td>🌐 " + r.n + ".com profile</td><td>" + r.domain.tier + " · indicative band " + r.domain.range + "<br><small class=\"muted\">" + r.domain.note + "</small></td></tr>" : "") + "</table></div>";
    if (!opts.noCta) h += '<div class="flex mt"><a class="btn btn-primary btn-sm" href="' + ROOT + "consult.html?n=" + r.n + '">Get a full expert reading</a><a class="btn btn-ghost btn-sm" href="' + ROOT + "number.html?n=" + r.n + '">Open full page</a><button class="btn btn-ghost btn-sm" data-share="' + r.n + '">Share</button></div>';
    return h + "</div>";
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-share]"); if (!b) return;
    var url = location.origin + location.pathname.replace(/[^/]*$/, "") + "number.html?n=" + b.dataset.share;
    if (navigator.share) navigator.share({ title: "Lucky number " + b.dataset.share, url: url }).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast("Link copied"); });
  });
  // generic quick analyzers: <form data-analyze="#target">
  function analyzers() {
    $$("form[data-analyze]").forEach(function (f) {
      f.addEventListener("submit", function (e) { e.preventDefault(); var v = $("input", f).value; var t = $(f.getAttribute("data-analyze")); t.innerHTML = render(LN.analyze(v)); t.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
    });
  }

  window.Site = { render: render, toast: toast, inbox: null, cfg: CFG, esc: esc, root: ROOT };
  document.addEventListener("DOMContentLoaded", function () {
    header(); footer(); bindMail(); bindForms(); videos(); donations(); analyzers(); houseAds(); consent(); exitIntent();
    // prefill ?n= into forms
    var n = new URLSearchParams(location.search).get("n"); if (n) $$("[data-prefill]").forEach(function (i) { i.value = LN.clean(n); });
    // tabs
    $$("[role=tablist]").forEach(function (tl) {
      var tabs = $$("[role=tab]", tl);
      function show(id) { tabs.forEach(function (t) { var on = t.getAttribute("aria-controls") === id; t.setAttribute("aria-selected", on); $("#" + t.getAttribute("aria-controls")).hidden = !on; }); }
      tabs.forEach(function (t) { t.onclick = function () { show(t.getAttribute("aria-controls")); history.replaceState(null, "", "#" + t.getAttribute("aria-controls")); }; });
      var h = location.hash.slice(1); if (h && $("#" + h)) show(h);
    });
    if (window.pageInit) window.pageInit();
  });
})();
