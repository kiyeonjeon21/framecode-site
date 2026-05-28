const manifestUrl = "https://download.framecode.dev/latest-darwin-arm64.json";
const button = document.querySelector("#downloadButton");
const meta = document.querySelector("#downloadMeta");
const fallbackHref = button?.href;
const fallbackMeta = meta?.textContent;

async function hydrateDownload() {
  if (!button || !meta) {
    return;
  }

  try {
    const response = await fetch(manifestUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Manifest returned ${response.status}`);
    }

    const release = await response.json();
    const dmg = release?.artifacts?.dmg;

    if (!dmg?.url) {
      throw new Error("Manifest has no DMG artifact");
    }

    button.href = dmg.url;
    button.textContent = `Download ${release.version}`;
    meta.textContent = `macOS Apple Silicon, ${formatBytes(dmg.size)}. Signed and notarized.`;
  } catch {
    button.href = fallbackHref;
    button.textContent = "Download for macOS";
    meta.textContent = fallbackMeta;
  }
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return "alpha build";
  }

  const mb = bytes / 1024 / 1024;
  return `${Math.round(mb)} MB`;
}

hydrateDownload();
