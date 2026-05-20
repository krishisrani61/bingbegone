const params = new URLSearchParams(location.search);
const target = params.get("target");
const original = params.get("original");

let cancelled = false;

document.getElementById("cancel").addEventListener("click", () => {
  cancelled = true;
  location.href = original || "https://www.bing.com";
});

document.getElementById("goNow").addEventListener("click", () => {
  location.href = target;
});

setTimeout(() => {
  if (!cancelled && target) {
    location.href = target;
  }
}, 1500);