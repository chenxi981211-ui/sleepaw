// Shows Sleepaw Pro prices for the visitor's region: the US, the euro area
// or mainland China, guessed from the browser's time zone and language (no
// location lookup). Anywhere else shows euro prices with a note that the app
// shows the local price. The visitor can switch with the €/$/¥ buttons.
(function () {
  var PRICES = {
    us: { monthly: "$5.99", yearly: "$39.99", perMonth: "$3.33", lifetime: "$79.99", en: "the United States", zh: "美国" },
    eu: { monthly: "€4.99", yearly: "€34.99", perMonth: "€2.92", lifetime: "€69.99", en: "the euro area", zh: "欧元区" },
    cn: { monthly: "¥8", yearly: "¥58", perMonth: "¥4.83", lifetime: "¥128", en: "mainland China (coming soon)", zh: "中国大陆（即将上线）" },
  };
  var EURO = ["AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", "BG", "ME", "XK", "AD", "MC", "SM", "VA"];

  function guess() {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ""];
    var region = "";
    for (var i = 0; i < langs.length && !region; i++) {
      var m = /[-_]([A-Za-z]{2})$/.exec(langs[i] || "");
      if (m) region = m[1].toUpperCase();
    }
    if (/^(Asia\/(Shanghai|Chongqing|Harbin|Urumqi))$/.test(tz)) return "cn";
    if (/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Indiana|Kentucky|Boise|Juneau|Adak|Menominee|Nome|Sitka|Yakutat|North_Dakota)/.test(tz) || tz === "Pacific/Honolulu") return "us";
    if (/^Europe\//.test(tz)) return "eu";
    if (region === "US") return "us";
    if (region === "CN") return "cn";
    if (EURO.indexOf(region) >= 0) return "eu";
    return "eu";
  }

  var root = document.querySelector("[data-prices]");
  if (!root) return;
  var current = guess();

  function show(key) {
    current = PRICES[key] ? key : "eu";
    var p = PRICES[current];
    document.querySelectorAll("[data-p]").forEach(function (el) {
      var k = el.getAttribute("data-p");
      if (k === "region") {
        el.textContent = document.documentElement.getAttribute("data-lang") === "zh" ? p.zh : p.en;
      } else if (p[k]) {
        el.textContent = p[k];
      }
    });
    document.querySelectorAll(".region-pick button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-r") === current));
    });
  }

  show(current);
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".region-pick button");
    if (b) show(b.getAttribute("data-r"));
    // The region name follows a language switch.
    if (e.target.closest(".lang button")) setTimeout(function () { show(current); }, 0);
  });
})();
