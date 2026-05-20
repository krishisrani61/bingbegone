import { getSettings, saveSettings } from "../lib/storage.js";
import { SEARCH_ENGINES } from "../defaults.js";

const enabled = document.getElementById("enabled");
const summary = document.getElementById("summary");
const options = document.getElementById("options");

function render(settings) {
  enabled.checked = settings.enabled;

  const engineLabel =
    SEARCH_ENGINES[settings.targetEngine]?.label || "Google";

  summary.textContent = settings.enabled
    ? `Redirecting to ${engineLabel}.`
    : "Redirecting is disabled.";
}

const settings = await getSettings();
render(settings);

enabled.addEventListener("change", async () => {
  const updated = await saveSettings({
    enabled: enabled.checked
  });

  render(updated);
});

options.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
