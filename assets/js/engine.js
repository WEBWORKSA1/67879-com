/* 67879.com Lucky Number Engine — runs 100% in the browser. Educational & entertainment use. */
(function (root) {
  "use strict";
  // Digit meanings: Mandarin (pinyin), Cantonese (jyutping), homophone, score -3..+3
  var D = [
    { d: 0, hz: "零", py: "líng", jy: "ling4", hom: "灵 (spirit) · 圆 (wholeness)", en: "Wholeness / the beginning", s: 0 },
    { d: 1, hz: "一", py: "yī", jy: "jat1", hom: "一 (unity) · 要 yāo (want)", en: "Unity, leadership, the start", s: 1 },
    { d: 2, hz: "二", py: "èr", jy: "ji6", hom: "易 (easy, Cantonese) · 双 (pair)", en: "Harmony — good things come in pairs", s: 2 },
    { d: 3, hz: "三", py: "sān", jy: "saam1", hom: "生 (life/birth, Cantonese)", en: "Life, growth, vitality", s: 1 },
    { d: 4, hz: "四", py: "sì", jy: "sei3", hom: "死 sǐ (death)", en: "Avoided — sounds like 'death'", s: -3 },
    { d: 5, hz: "五", py: "wǔ", jy: "ng5", hom: "我 (me) · 无 (without) · 五行 (five elements)", en: "Balance of the Five Elements; neutral", s: 0 },
    { d: 6, hz: "六", py: "liù", jy: "luk6", hom: "溜/流 (smooth, flowing) · 禄 (fortune, Cantonese)", en: "Smooth progress — 'everything goes well'", s: 2 },
    { d: 7, hz: "七", py: "qī", jy: "cat1", hom: "起 (rise) · 齐 (together) · 妻 (wife) · 欺 (deceive)", en: "Rising & togetherness; mixed in Ghost Month", s: 0 },
    { d: 8, hz: "八", py: "bā", jy: "baat3", hom: "发 fā (prosper, get rich)", en: "Prosperity & wealth — the luckiest digit", s: 3 },
    { d: 9, hz: "九", py: "jiǔ", jy: "gau2", hom: "久 (long-lasting, eternal)", en: "Longevity, eternity, imperial power", s: 2 }
  ];
  // Short gloss used for the homophone chain
  var G = ["灵 wholeness", "要 want", "易 easy", "生 life", "死 death", "我 me", "溜 smooth", "起 rise", "发 prosper", "久 lasting"];
  // Known combinations (substring match). score adds to total.
  var C = [
    ["5201314", "我爱你一生一世", "I love you for a lifetime", 6], ["1314", "一生一世", "one life, one lifetime — forever", 3],
    ["520", "我爱你", "I love you (internet slang)", 3], ["521", "我爱你", "I love you (variant)", 2], ["530", "我想你", "I miss you", 1],
    ["168", "一路发", "prosperity all the way", 4], ["1688", "一路发发", "rich all the way", 4], ["518", "我要发", "I will prosper", 4],
    ["158", "要我发", "I'm going to prosper", 3], ["198", "要久发", "lasting prosperity", 3], ["918", "就要发", "about to get rich", 3],
    ["818", "发要发", "prosper and prosper", 3], ["58", "我发", "I prosper", 2], ["28", "易发", "easy wealth", 2], ["68", "路发", "smooth road to wealth", 2],
    ["78", "起发", "rise to prosperity", 2], ["89", "发久", "lasting wealth", 2], ["98", "久发", "prosper for long", 2], ["69", "顺久", "smooth for long", 1],
    ["678", "顺起发", "smooth · rise · prosper — a rising staircase", 4], ["789", "起发久", "rise · prosper · last", 4], ["6789", "步步高升", "step-by-step ascent", 3],
    ["79", "起久 / 妻久", "a lasting rise · lasting marriage", 1], ["67", "溜起", "smooth start, rising", 1],
    ["666", "六六大顺", "everything goes smoothly (also 'awesome!')", 4], ["888", "发发发", "triple prosperity", 5], ["8888", "发发发发", "ultimate prosperity", 4],
    ["999", "长长久久", "eternal", 4], ["88", "双发 / 囍", "double prosperity, double happiness", 3], ["66", "顺顺", "doubly smooth", 2], ["99", "久久", "forever", 2],
    ["6688", "顺顺发发", "smooth wealth", 3], ["1919", "一久一久", "long-lasting", 1], ["369", "生顺久", "life, smoothness, longevity", 2],
    ["886", "拜拜了", "bye-bye (slang)", 0], ["250", "二百五", "a fool (insult)", -3], ["38", "三八", "nag / gossip (insult)", -2],
    ["14", "要死", "want to die", -4], ["74", "气死", "furious to death", -3], ["748", "去死吧", "go die (curse)", -5], ["514", "我要死", "I will die", -5],
    ["54", "我死", "I die", -3], ["44", "死死", "double death", -4], ["13", "十三", "unlucky in the West", -1], ["4444", "死死死死", "extremely unlucky", -6]
  ];
  var SYN = { lucky: "lucky", mixed: "mixed", unlucky: "unlucky" };

  function clean(s) { return String(s || "").replace(/\D/g, "").slice(0, 20); }
  function digitalRoot(n) { while (n > 9) { n = String(n).split("").reduce(function (a, b) { return a + +b; }, 0); } return n; }

  function patterns(s) {
    var p = [], L = s.length;
    var rep = L > 1 && /^(\d)\1+$/.test(s);
    if (rep) p.push(["All same (" + "A".repeat(L) + ")", s[0] === "4" ? -6 : 8]);
    var asc = true, desc = true;
    for (var i = 1; i < L; i++) { if (+s[i] !== +s[i - 1] + 1) asc = false; if (+s[i] !== +s[i - 1] - 1) desc = false; }
    if (L > 2 && asc) p.push(["Ascending run — 步步高 'rising step by step'", 6]);
    if (L > 2 && desc) p.push(["Descending run", -2]);
    if (L > 2 && s === s.split("").reverse().join("") && !/^(\d)\1+$/.test(s)) p.push(["Palindrome / mirror number", 3]);
    var m = s.match(/(\d)\1{2,}/); if (m && L > m[0].length) p.push(["Repeating block '" + m[0] + "'", 3]);
    if (!rep && /(\d\d)\1/.test(s)) p.push(["Repeating pair (ABAB)", 2]);
    if (!rep && /(\d)\1(\d)\2/.test(s)) p.push(["Double pairs (AABB)", 2]);
    if (/[689]$/.test(s)) p.push(["Ends on a lucky digit (" + s[L - 1] + ")", 3]);
    if (/4$/.test(s)) p.push(["Ends on 4", -4]);
    if (s.indexOf("4") === -1 && L > 1) p.push(["No 4 — free of 'death' sound", 3]);
    if (/^[1-9]/.test(s) && s.indexOf("0") === -1 && L > 2) p.push(["No 0 (preferred by collectors)", 1]);
    return p;
  }

  function analyze(input) {
    var s = clean(input); if (!s) return null;
    var ds = s.split("").map(Number), base = 50, digitSum = 0, cnt = {};
    var parts = ds.map(function (d) { digitSum += d; cnt[d] = (cnt[d] || 0) + 1; return D[d]; });
    var dScore = ds.reduce(function (a, d) { return a + D[d].s; }, 0);
    var combos = C.filter(function (c) { return s.indexOf(c[0]) > -1; });
    // drop sub-combos fully contained in a longer found combo
    combos = combos.filter(function (c) { return !combos.some(function (o) { return o !== c && o[0].length > c[0].length && o[0].indexOf(c[0]) > -1; }); });
    var pats = patterns(s);
    var raw = base + (dScore / ds.length) * 9 + combos.reduce(function (a, c) { return a + c[3] * 3; }, 0) + pats.reduce(function (a, p) { return a + p[1]; }, 0);
    var score = Math.max(1, Math.min(99, Math.round(raw)));
    var verdict = score >= 80 ? "Very Lucky" : score >= 65 ? "Lucky" : score >= 45 ? "Mixed" : "Unlucky";
    var cls = score >= 65 ? "lucky" : score >= 45 ? "mixed" : "unlucky";
    var root = digitalRoot(digitSum);
    var reading = parts.map(function (p) { return p.py; }).join(" ");
    var chain = ds.map(function (d) { return G[d]; }).join(" · ");
    var ctx = contexts(s, score, cnt);
    return { n: s, digits: parts, combos: combos, patterns: pats, score: score, verdict: verdict, cls: cls, sum: digitSum, root: root,
      rootMeaning: D[root].en, reading: reading, chain: chain, hanzi: parts.map(function (p) { return p.hz; }).join(""), counts: cnt, contexts: ctx, domain: domain(s) };
  }

  function contexts(s, score, cnt) {
    var w = (cnt[8] || 0) * 2 + (cnt[6] || 0) + (cnt[9] || 0) - (cnt[4] || 0) * 2;
    var love = /520|521|1314|99|2|7/.test(s) ? "Romantic signals present (pairs, 7 'togetherness', 520/1314/99)." : "Neutral for love — add 2, 9 or 520/1314 for a romantic tone.";
    return {
      wealth: w >= 3 ? "Strong wealth energy (multiple 8/6/9)." : w >= 1 ? "Moderate wealth energy." : "Weak wealth signal — consider adding an 8.",
      love: love,
      business: score >= 70 ? "Excellent for a business phone, store number or brand." : score >= 50 ? "Usable for business; lead with the lucky part in marketing." : "Not recommended as a business number.",
      plate: s.length <= 8 ? (score >= 70 ? "A desirable plate — collectors pay premiums for this profile." : "Average plate value.") : "Too long for a plate; use the last 4–6 digits.",
      address: cnt[4] ? "Contains 4 — many Chinese buyers avoid such units/floors." : "No 4 — acceptable to most Chinese buyers for unit/floor numbers."
    };
  }

  // Indicative 5N/xN .com profile (heuristic, NOT an appraisal)
  function domain(s) {
    var L = s.length, has4 = s.indexOf("4") > -1, has0 = s.indexOf("0") > -1, lucky = (s.match(/[689]/g) || []).length;
    var tier, range;
    if (L <= 2) { tier = "Ultra-premium (" + L + "N)"; range = "$1M+"; }
    else if (L === 3) { tier = "Premium 3N"; range = has4 ? "$50k–$150k" : "$100k–$500k+"; }
    else if (L === 4) { tier = has4 ? "4N (contains 4)" : "Premium 4N (no 4)"; range = has4 ? "$4k–$15k" : "$15k–$80k+"; }
    else if (L === 5) {
      if (/^(\d)\1+$/.test(s)) { tier = "5N repdigit"; range = "$50k–$250k+"; }
      else if (!has4 && !has0) { tier = "5N 'no-4 no-0' (chip-grade)"; range = lucky >= 3 ? "$4k–$12k" : "$2.5k–$7k"; }
      else if (!has4) { tier = "5N no-4"; range = "$1.5k–$5k"; }
      else { tier = "5N standard"; range = "$600–$2k"; }
    } else if (L === 6) { tier = has4 ? "6N standard" : "6N no-4"; range = has4 ? "$100–$400" : "$300–$1.5k"; }
    else { tier = L + "N long numeric"; range = "Reg fee – low hundreds"; }
    return { length: L, tier: tier, range: range, has4: has4, has0: has0, luckyDigits: lucky,
      note: "Indicative .com band based on public Chinese-market patterns (length, 4/0 presence, lucky-digit density). Not a valuation; check recent comps." };
  }

  // Chinese zodiac
  var Z = [
    { a: "Rat", hz: "鼠", e: "🐀", lucky: [2, 3], un: [5, 9], col: "blue, gold, green" },
    { a: "Ox", hz: "牛", e: "🐂", lucky: [1, 4], un: [5, 6], col: "white, yellow, green" },
    { a: "Tiger", hz: "虎", e: "🐅", lucky: [1, 3, 4], un: [6, 7, 8], col: "blue, grey, orange" },
    { a: "Rabbit", hz: "兔", e: "🐇", lucky: [3, 4, 6], un: [1, 7, 8], col: "red, pink, purple, blue" },
    { a: "Dragon", hz: "龙", e: "🐉", lucky: [1, 6, 7], un: [3, 8], col: "gold, silver, grey" },
    { a: "Snake", hz: "蛇", e: "🐍", lucky: [2, 8, 9], un: [1, 6, 7], col: "black, red, yellow" },
    { a: "Horse", hz: "马", e: "🐎", lucky: [2, 3, 7], un: [1, 5, 6], col: "yellow, green" },
    { a: "Goat", hz: "羊", e: "🐐", lucky: [3, 4, 9], un: [6, 7, 8], col: "brown, red, purple" },
    { a: "Monkey", hz: "猴", e: "🐒", lucky: [4, 9], un: [2, 7], col: "white, blue, gold" },
    { a: "Rooster", hz: "鸡", e: "🐓", lucky: [5, 7, 8], un: [1, 3, 9], col: "gold, brown, yellow" },
    { a: "Dog", hz: "狗", e: "🐕", lucky: [3, 4, 9], un: [1, 6, 7], col: "red, green, purple" },
    { a: "Pig", hz: "猪", e: "🐖", lucky: [2, 5, 8], un: [1, 7], col: "yellow, grey, brown, gold" }
  ];
  var TRINE = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]], CLASH = [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]], HARM = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  function zodiacIndex(year) { return ((year - 4) % 12 + 12) % 12; }
  function zodiacOf(year) { var i = zodiacIndex(year); return Object.assign({ i: i }, Z[i]); }
  function compat(a, b) {
    function inn(list) { return list.some(function (g) { return g.indexOf(a) > -1 && g.indexOf(b) > -1; }); }
    if (a === b) return { s: 70, t: "Same sign — understand each other, may compete." };
    if (inn(HARM)) return { s: 95, t: "Six Harmonies (六合) — a natural, supportive match." };
    if (inn(TRINE)) return { s: 90, t: "Trine (三合) — shared values and strong teamwork." };
    if (inn(CLASH)) return { s: 30, t: "Six Clashes (六冲) — opposite energies; needs effort." };
    return { s: 60, t: "Neutral — compatibility depends on effort and other chart factors." };
  }

  // Date scoring (number-based, not a full almanac)
  function dateScore(iso) {
    var s = clean(iso); if (s.length < 8) return null;
    var a = analyze(s), mmdd = s.slice(4), bonus = 0, notes = [];
    var special = { "0520": "520 Day — 'I love you' (popular wedding date)", "0521": "521 — 'I love you'", "0808": "8/8 — double prosperity", "0909": "9/9 Double Ninth — longevity", "0606": "6/6 — double smoothness", "1314": "", "0214": "Valentine's Day (contains 4)", "0707": "Qixi-style 7/7 (lunar Qixi varies)", "0101": "New beginnings" };
    if (special[mmdd]) { notes.push(special[mmdd]); bonus += 8; }
    if (+s.slice(6) === 4 || +s.slice(6) === 14 || +s.slice(6) === 24) { notes.push("Day number contains 4"); bonus -= 6; }
    var y = +s.slice(0, 4), m = +s.slice(4, 6);
    // 7th lunar month ~ Ghost Month usually falls in Aug/early Sep
    if (m === 8 || (m === 9 && +s.slice(6) < 10)) notes.push("May fall in the lunar 7th 'Ghost Month' — check a lunar calendar");
    var z = zodiacOf(y);
    var sc = Math.max(1, Math.min(99, a.score + bonus));
    return { score: sc, cls: sc >= 65 ? "lucky" : sc >= 45 ? "mixed" : "unlucky", notes: notes, zodiacYear: z, digits: a };
  }

  // Lucky number generator
  function generate(len, opts) {
    opts = opts || {}; var pool = opts.pool || [6, 8, 9, 8, 6, 2, 8, 9, 1, 3, 5, 7, 8], out = [], tries = 0;
    var avoid4 = opts.avoid4 !== false, prefix = clean(opts.prefix || "");
    while (out.length < (opts.count || 6) && tries < 4000) {
      tries++; var s = prefix;
      while (s.length < len) s += pool[Math.floor(Math.random() * pool.length)];
      s = s.slice(0, len);
      if (avoid4 && s.indexOf("4") > -1) continue;
      var r = analyze(s); if (r.score >= (opts.min || 70) && out.every(function (o) { return o.n !== s; })) out.push(r);
    }
    return out.sort(function (a, b) { return b.score - a.score; });
  }

  root.LN = { DIGITS: D, COMBOS: C, ZODIAC: Z, analyze: analyze, domain: domain, zodiacOf: zodiacOf, compat: compat, dateScore: dateScore, generate: generate, clean: clean, SYN: SYN };
})(typeof window !== "undefined" ? window : globalThis);
