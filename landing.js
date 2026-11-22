// Landing page motion: sections fade in as they scroll into view, and the
// Lock Screen countdown ticks down once it's visible.
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
      var count = e.target.querySelector("[data-countdown]");
      if (count) tick(count);
    });
  }, { threshold: 0.2 });
  items.forEach(function (el) { io.observe(el); });

  function tick(el) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var secs = Number(el.getAttribute("data-countdown")) || 0;
    setInterval(function () {
      secs = Math.max(0, secs - 60);
      var h = Math.floor(secs / 3600);
      var m = Math.floor((secs % 3600) / 60);
      el.textContent = h + "h " + String(m).padStart(2, "0") + "m";
    }, 1500);
  }
})();
