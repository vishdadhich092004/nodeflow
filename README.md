## Identity Reconciliation – Frontend (React)

🔗 [**Live Link**](https://nodeflow-zeta.vercel.app/) — update when deployed

A lightweight React + TypeScript + Vite UI for building and testing identity reconciliation flows. It provides a visual node-based canvas to compose pipelines (inputs, API/LLM/conditions, filters, aggregations) and inspect or tweak settings for each node.

### Tech stack
- **Runtime**: Node.js, TypeScript
- **Web**: React 19, Vite
- **State**: Zustand
- **Graph UI**: `@xyflow/react`
- **Styling**: Tailwind CSS v4
- **UI Primitives**: Radix UI + custom components
- **Icons & Toasts**: Lucide, Sonner

### Architecture diagram
```mermaid
flowchart LR

 subgraph App_Shell["App Shell"]
   A[App.tsx] --> B[PipelineUI]
   A --> C["SettingsPanel / Toolbar"]
 end

 subgraph Canvas_XYFlow["Canvas (XYFlow)"]
   B --> D{{Nodes}}
   D --> D1[Input Node]
   D --> D2[API Node]
   D --> D3[LLM Node]
   D --> D4[Condition Node]
   D --> D5[Filter Node]
   D --> D6[Aggregate Node]
   D --> D7[Data/Text/Output Nodes]
   D -.-> E[Custom Edge]
 end

 subgraph Store
   S[Zustand store.tsx]
 end

E --> S
D --> S
C --> S

%% --------- Dark Mode Minimalist Styles ----------
classDef main stroke:#ffffff,stroke-width:2px,color:#ffffff,fill:none
classDef node stroke:#aaaaaa,stroke-width:1.5px,color:#ffffff,fill:none
classDef accent stroke:#ffffff,stroke-width:1.5px,color:#ffffff,fill:none,stroke-dasharray:4

%% Apply styles
class App_Shell,Canvas_XYFlow,Store main
class A,B,C,D,E,S node
class D1,D2,D3,D4,D5,D6,D7 node


```

### Getting started
1. Install dependencies:
```bash
npm install
```
2. Start the dev server:
```bash
npm run dev
```
   The app runs via Vite; it will print a local URL to open in your browser.
3. Build for production:
```bash
npm run build
```
4. Preview the production build locally:
```bash
npm run preview
```

### Project structure
```text
src/
  App.tsx                 # App shell: canvas + settings/toolbar pane
  main.tsx                # React entry
  index.css               # Tailwind base + app styles
  ui.tsx                  # Shared UI wrappers
  store.tsx               # Zustand store for selection, nodes, etc.
  components/
    toolbar.tsx           # Node palette / actions
    SettingsPanel.tsx     # Per-node settings editor
    custom-edge.tsx       # Edge rendering
    ui/                   # Button, Input, Select, Label, Card, Badge, Toast
  nodes/                  # Node implementations used on the canvas
    baseNode.tsx          # Shared node frame
    inputNode.tsx         # Input node
    apiNode.tsx           # API request node
    llmNode.tsx           # LLM call node
    conditionNode.tsx     # Branching logic
    filterNode.tsx        # Filtering logic
    aggregateNode.tsx     # Aggregation logic
    dataNode.tsx          # Data holder
    textNode.tsx          # Text holder
    outputNode.tsx        # Output node
    nodeUtils.ts          # Helpers for node behavior
  draggableNode.tsx       # Drag-and-drop creation
assets/                   # Static assets
```

### Key concepts
- **Canvas and Nodes**: Built with `@xyflow/react`; nodes are React components under `src/nodes/*` with a shared frame from `baseNode.tsx`.
- **Edges**: Custom edge rendering in `components/custom-edge.tsx`.
- **State**: `src/store.tsx` tracks selected node, pipeline graph, and UI state.
- **Settings vs Toolbar**: `App.tsx` shows `SettingsPanel` when a node is selected; otherwise `PipelineToolbar`.

### Environment
No required env vars for local development. If this UI needs to talk to a backend, add your API base URL via Vite env (e.g., create `.env` with `VITE_API_BASE_URL=...`) and consume via `import.meta.env.VITE_API_BASE_URL`.

### Scripts
- **dev**: `vite`
- **build**: `tsc -b && vite build`
- **preview**: `vite preview`
- **lint**: `eslint .`

### Deployment
- Any static host that serves the Vite build works (e.g., Vercel, Netlify, GitHub Pages).
- Run `npm run build` and deploy the contents of `dist/`.

### Health check
- App root (`/`) renders the canvas UI; successful load verifies the build is healthy.

### Notes
- Tailwind v4 is configured via the Vite plugin. Ensure your editor has Tailwind IntelliSense enabled for best DX.


