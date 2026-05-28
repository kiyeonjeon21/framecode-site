# Framecode Site

Static landing page for Framecode.

## Domain

GitHub Pages serves the site at:

```text
https://framecode.dev
```

Configure the apex domain DNS with GitHub Pages `A` records, and optionally
point `www.framecode.dev` to `kiyeonjeon21.github.io`.

## Download Source

The download button defaults to the public GitHub release asset and upgrades
itself from the same-origin manifest:

```text
https://framecode.dev/latest-darwin-arm64.json
```

When Cloudflare R2 is ready, the private Framecode release workflow can mirror
the signed and notarized macOS artifact to R2 and update this manifest URL.

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
