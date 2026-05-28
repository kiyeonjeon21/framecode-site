const manifestUrls = [
  "latest-darwin-arm64.json",
  "https://download.framecode.dev/latest-darwin-arm64.json",
];
const button = document.querySelector("#downloadButton");
const meta = document.querySelector("#downloadMeta");
const fallbackHref = button?.href;
const fallbackMeta = meta?.textContent;

async function hydrateDownload() {
  if (!button || !meta) {
    return;
  }

  try {
    const release = await fetchFirstManifest();
    const dmg = release?.artifacts?.dmg;

    if (!dmg?.url) {
      throw new Error("Manifest has no DMG artifact");
    }

    button.href = dmg.url;
    button.textContent = `Download ${release.version}`;
    meta.textContent = `macOS Apple Silicon, ${formatBytes(dmg.size)}.`;
  } catch {
    button.href = fallbackHref;
    button.textContent = "Download for macOS";
    meta.textContent = fallbackMeta;
  }
}

async function fetchFirstManifest() {
  let lastError;

  for (const url of manifestUrls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Manifest returned ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("No manifest URL configured");
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return "alpha build";
  }

  const mb = bytes / 1024 / 1024;
  return `${Math.round(mb)} MB`;
}

hydrateDownload();
