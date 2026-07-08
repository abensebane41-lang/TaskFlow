(function() {
  const html = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    html.setAttribute("data-theme", "light");
    if (btn) btn.textContent = "☀️";
  }
  if (btn) {
    btn.addEventListener("click", function() {
      const isLight = html.getAttribute("data-theme") === "light";
      if (isLight) {
        html.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
        btn.textContent = "🌙";
      } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        btn.textContent = "☀️";
      }
    });
  }
})();
