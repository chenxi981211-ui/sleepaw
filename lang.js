// Shows the page in English or Chinese. Starts from the browser's language,
// remembers a choice, and keeps it across the site's pages.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("sleepaw-lang"); } catch (e) {}
  var param = new URLSearchParams(location.search).get("lang");
  var lang = param || saved || ((navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");

  function apply(next) {
    lang = next === "zh" ? "zh" : "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === lang));
    });
    try { localStorage.setItem("sleepaw-lang", lang); } catch (e) {}
  }

  apply(lang);
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang button");
    if (b) apply(b.dataset.set);
  });
})();
