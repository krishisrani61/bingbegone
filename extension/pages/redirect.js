import { getSettings } from "../lib/storage.js";

const params = new URLSearchParams(location.search);
const target = params.get("target");
const original = params.get("original");

const destination = document.getElementById("destination");
const bar = document.getElementById("bar");
const cancel = document.getElementById("cancel");
const goNow = document.getElementById("goNow");

let cancelled = false;

function safeNavigate(url) {
  if (!url) return;
  location.href = url;
}

try {
  const url = new URL(target);
  destination.textContent = `To: ${url.hostname}`;
} catch {
  destination.textContent = "To: selected search engine";
}

cancel.addEventListener("click", () => {
  cancelled = true;
  safeNavigate(original || "https://www.bing.com");
});

goNow.addEventListener("click", () => {
  cancelled = true;
  safeNavigate(target);
});

const settings = await getSettings();
const delay = Math.max(0, Number(settings.redirectDelayMs || 1500));

bar.style.transitionDuration = `${delay}ms`;
requestAnimationFrame(() => {
  bar.style.width = "100%";
});

setTimeout(() => {
  if (!cancelled) {
    safeNavigate(target);
  }
}, delay);
