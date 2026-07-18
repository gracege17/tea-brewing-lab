# Tea Brewing Lab

An interactive MVP showing how time and water change a single cup of tea:
Anxi Tieguanyin (清香型), fixed at 5g leaves / 100ml water / 90°C. Drag the
timeline (0–8min) to see tea color, leaf expansion, aroma, and four other
flavor dimensions change — the first ~2 minutes model a normal steep, the
rest demonstrates over-extraction. Switch between Soft / Balanced / Hard
water to see how mineral content shifts the same brew.

Built with Vite + React + TypeScript + Tailwind CSS. No backend — all
brewing data lives in `src/data/` and is interpolated client-side
(`src/lib/brew.ts`).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
