# Cell Architecture Studio

An interactive educational web app for exploring 3D biological cell structures.

**Stack:** React · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber · Drei

## Features

- **7 cell types** — Plant, White Blood Cell, Neuron, Epithelial, Bacteria, Animal, Muscle
- **Organelle library** — Click sidebar items or 3D meshes to inspect each organelle
- **3D viewport** — Orbit, zoom, pan; auto-spin, isolate, hide others, cross-section mode
- **Info panel** — Metadata, textbook-style notes, fun facts, occurrence pills
- **Bottom panel** — Microscope view placeholders & cell comparison module
- **Responsive** — Collapsible sidebars on smaller screens

## Getting started

```bash
cd cell-architecture-studio
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Project structure

```
src/
  App.tsx                 # Layout shell
  context/StudioContext.tsx
  data/cells.ts           # Cell & organelle content
  components/
    TopNav.tsx
    LeftSidebar.tsx
    ThreeViewport.tsx
    CellModel.tsx         # R3F placeholder geometry
    InfoPanel.tsx
    BottomPanel.tsx
```

## Replacing placeholders with .glb models

`CellModel.tsx` currently builds cells from spheres, capsules, and toruses. When your Tripo3D `.glb` files are ready:

1. Place them under `public/models/` (e.g. `plant-cell.glb`).
2. Load with Drei’s `useGLTF`:

```tsx
import { useGLTF } from '@react-three/drei'

function PlantCell() {
  const { scene } = useGLTF('/models/plant-cell.glb')
  return <primitive object={scene} scale={1} />
}
```

3. Wire organelle meshes by name/material to selection highlighting.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |

## Design language

Soft cream background (`#fcfbf9`), muted sage greens, lavenders, and Cormorant Garamond + Inter typography for an elegant academic feel.
