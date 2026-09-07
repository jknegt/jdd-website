# Prototype assets — not for production

Files in this folder are internal, temporary concept-review assets for the
CRT-TV feature discussion (2026-09-06). They are gitignored (see `.gitignore`)
and must never ship to a real deployment.

- `tv-concept-reference.mp4` — a real, copyrighted third-party reference
  video (Adam Freeland, "We Want Your Soul", 2012), used only as a live
  mood-board reference for the TV-frame/FBI-logo aesthetic. Delete before
  any real deployment of this sample.

## Bezel PNGs -- moved to a permanent location (Layer 29)

`tv-bezel-frame.png` and `tv-bezel-frame-cutout.png` (both still present in
this folder) have been copied to their permanent, production-safe home at
`app/public/crt-tv/`. `CrtTvWidget.tsx`
(`app/components/crt-tv/CrtTvWidget.tsx`) is the only production consumer,
and it references the new `/crt-tv/` path exclusively -- it has zero
reference to this folder.

The copies in THIS folder remain only because `app/prototype/tv-concept/`
(this session's own throwaway concept-review route, still gated behind
`NEXT_PUBLIC_ADMIN_ENABLED`) still references them directly for its own
demo rendering. When that route is eventually deleted (already-logged
future housekeeping, not yet scheduled), these two PNGs become fully
stale and safe to delete along with the rest of this folder -- they are
not a second, still-needed production asset.
