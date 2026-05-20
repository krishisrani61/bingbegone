import { DEFAULT_SETTINGS } from "../defaults.js";

function getArea(syncSettings) {
  return syncSettings ? chrome.storage.sync : chrome.storage.local;
}

function chromeStorageGet(area, keys = null) {
  return new Promise((resolve) => {
    area.get(keys, resolve);
  });
}

function chromeStorageSet(area, values) {
  return new Promise((resolve) => {
    area.set(values, resolve);
  });
}

export async function getSettings() {
  const syncProbe = await chromeStorageGet(chrome.storage.local, ["syncSettings"]);
  const syncSettings =
    typeof syncProbe.syncSettings === "boolean"
      ? syncProbe.syncSettings
      : DEFAULT_SETTINGS.syncSettings;

  const area = getArea(syncSettings);
  const saved = await chromeStorageGet(area, null);

  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    syncSettings
  };
}

export async function saveSettings(nextSettings) {
  const oldSettings = await getSettings();
  const syncChanged =
    typeof nextSettings.syncSettings === "boolean" &&
    nextSettings.syncSettings !== oldSettings.syncSettings;

  const merged = {
    ...DEFAULT_SETTINGS,
    ...oldSettings,
    ...nextSettings
  };

  if (syncChanged) {
    const newArea = getArea(merged.syncSettings);
    await chromeStorageSet(newArea, merged);
    await chromeStorageSet(chrome.storage.local, {
      syncSettings: merged.syncSettings
    });
    return merged;
  }

  const area = getArea(merged.syncSettings);
  await chromeStorageSet(area, merged);
  await chromeStorageSet(chrome.storage.local, {
    syncSettings: merged.syncSettings
  });

  return merged;
}

export async function resetSettings() {
  await chrome.storage.sync.clear();
  await chrome.storage.local.clear();
  await saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}
