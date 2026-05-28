# Framecode Site

Static landing page for Framecode.

## Download Source

The download button defaults to a versioned Cloudflare R2 DMG URL and upgrades
itself from:

```text
https://download.framecode.dev/latest-darwin-arm64.json
```

That manifest is uploaded by the private Framecode release workflow after the
signed and notarized macOS artifact is mirrored to Cloudflare R2.

If `framecode.dev` fetches a manifest from `download.framecode.dev`, configure
R2 CORS for that origin. The direct DMG link still works without CORS.

## Local Preview

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```
