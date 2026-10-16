// Shared behaviour: theme toggle, back-to-top, gallery filters and lightbox.
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || (mq.matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (err) {}
    });
  }

  var btn = document.getElementById("backToTop");
  if (btn) {
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () {
      btn.style.display = window.scrollY > 500 ? "block" : "none";
    });
  }

  // Gallery: category filters
  var filters = document.querySelectorAll(".filters button");
  var shots = document.querySelectorAll(".shot");
  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      var cat = b.getAttribute("data-filter");
      filters.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      shots.forEach(function (s) {
        s.hidden = !(cat === "all" || s.getAttribute("data-category") === cat);
      });
    });
  });

  // Gallery: click a photo to enlarge it
  var box = document.getElementById("lightbox");
  if (box) {
    var big = box.querySelector("img");
    document.querySelectorAll(".shot img").forEach(function (img) {
      img.addEventListener("click", function () {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        box.classList.add("open");
      });
    });
    var close = function () { box.classList.remove("open"); };
    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }
})();
