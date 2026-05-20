import { getSettings, saveSettings, resetSettings } from "../lib/storage.js";

const ids = [
  "enabled",
  "targetEngine",
  "customSearchUrl",
  "redirectMode",
  "redirectDelayMs",
  "syncSettings",
  "preserveOriginalQueryEncoding",
  "showDebugLogs"
];

const elements = Object.fromEntries(
  ids.map((id) => [id, document.getElementById(id)])
);

const status = document.getElementById("status");

function setStatus(message) {
  status.textContent = message;
  setTimeout(() => {
    if (status.textContent === message) {
      status.textContent = "";
    }
  }, 2500);
}

function render(settings) {
  elements.enabled.checked = settings.enabled;
  elements.targetEngine.value = settings.targetEngine;
  elements.customSearchUrl.value = settings.customSearchUrl;
  elements.redirectMode.value = settings.redirectMode;
  elements.redirectDelayMs.value = settings.redirectDelayMs;
  elements.syncSettings.checked = settings.syncSettings;
  elements.preserveOriginalQueryEncoding.checked = settings.preserveOriginalQueryEncoding;
  elements.showDebugLogs.checked = settings.showDebugLogs;
}

function readForm() {
  return {
    enabled: elements.enabled.checked,
    targetEngine: elements.targetEngine.value,
    customSearchUrl: elements.customSearchUrl.value.trim(),
    redirectMode: elements.redirectMode.value,
    redirectDelayMs: Number(elements.redirectDelayMs.value || 1500),
    syncSettings: elements.syncSettings.checked,
    preserveOriginalQueryEncoding: elements.preserveOriginalQueryEncoding.checked,
    showDebugLogs: elements.showDebugLogs.checked
  };
}

document.getElementById("save").addEventListener("click", async () => {
  const settings = readForm();

  if (settings.targetEngine === "custom" && !settings.customSearchUrl.includes("{query}")) {
    setStatus("Custom URL must include {query}.");
    return;
  }

  await saveSettings(settings);
  setStatus("Settings saved.");
});

document.getElementById("reset").addEventListener("click", async () => {
  const settings = await resetSettings();
  render(settings);
  setStatus("Settings reset.");
});

const settings = await getSettings();
render(settings);
