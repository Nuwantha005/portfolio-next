AGENT BRIEFING FOR THIS REPO
1) Purpose: Next.js 16 (App Router) portfolio with MDX blog, Tailwind styling, animated UI (Framer Motion), static export.
2) Primary stacks: TypeScript (strict), React 19, Next.js 16, MDX via @next/mdx, Tailwind + tailwindcss-animate, d3/chrono for visuals.
3) Output: static export (`next export`) with unoptimized images; dist folder `out`.

FAST COMMANDS
4) Install deps: `npm install` (lockfile present). Use npm to avoid drift.
5) Dev server: `npm run dev` (localhost:3000).
6) Build: `npm run build` (writes to `out`).
7) Start built app: `npm run start` (serves `.next` when not exporting).
8) Lint all: `npm run lint` (Next.js + TypeScript rules). Fix issues before commits.
9) Tests: no test script or harness configured. If you add one, document and wire `npm test`.
10) Single-test guidance: once a runner exists (e.g., Vitest/Jest), prefer `npx vitest run path.spec.ts` or `npx jest path.spec.ts --runTestsByPath`; not currently available.
11) Typecheck: relies on `npm run build` and IDE tsserver; no standalone typecheck script.

REPO LAYOUT
12) App routes in `src/app` (App Router). `(main)` segment holds primary pages; project-specific routes under `src/app/projects/*`.
13) Shared UI in `src/components` grouped by feature (blog, home, layout, navbar, projects, ui).
14) Data/helpers in `src/lib` (blog parsing, skills graph data, utilities) and `src/types` for domain types.
15) Global styles: `src/app/globals.css`; Tailwind config `tailwind.config.ts`; PostCSS config in root.
16) MDX content lives under `public/blog/<slug>/index.mdx|md` with static assets beside.
17) Static assets in `public`; exported site in `out` (ignored by lint).

RUNTIME & BUILD NOTES
18) Static export enabled (`output: "export"`, `distDir: "out"`). Avoid server-only APIs.
19) Images unoptimized (`images.unoptimized: true`); use `<img>` or `next/image` with care.
20) Page extensions include `.mdx`; MDX loader configured via `@next/mdx`.
21) Path alias: `@/*` -> `./src/*` (see `tsconfig.json`). Prefer alias imports over long relatives.
22) TypeScript strict mode on; `noEmit`, bundler resolution.
23) Client components must start with `"use client"` when using hooks, state, or browser APIs.
24) Server components default; keep them pure and async-ready.
25) Metadata defined per route via exported `metadata`; preserve for SEO.

IMPORTS & MODULE STYLE
26) Use absolute alias imports for in-repo modules; relative only for sibling files.
27) Place React/Next/framework imports first, third-party next, then internal `@/` modules, then styles/assets.
28) Prefer `type` modifiers on type-only imports (`import type { Metadata } from "next"`).
29) Keep default exports for page components; named exports for helpers and shared utilities.
30) Avoid barrel files unless already present; current code imports directly from concrete paths.

FORMATTING
31) Formatting generally follows Next/Prettier defaults: double quotes, trailing semicolons optional (match file); two-space indent.
32) Use multiline JSX with sensible wrapping; keep props on new lines when long.
33) Keep className strings readable; break across lines if lengthy.
34) Comments only for non-obvious logic (e.g., parsing transforms). Favor descriptive names instead.
35) MDX files: frontmatter supported; Obsidian syntax is auto-transformed (images/videos and wiki links) in `src/lib/blog.ts`.

TYPES & INTERFACES
36) Prefer `interface` for exported shapes (e.g., `BlogPost`).
37) Add explicit return types for exported functions; allow inference for local helpers if clear.
38) Narrow types with guards before use; avoid `any`.
39) Favor immutable patterns: `const` for bindings, avoid mutating props/state directly.
40) Use literal unions/enums for variant fields when adding new UI variants.

STATE & REACT PATTERNS
41) Client components declare `"use client"` at top before imports.
42) Use functional components; avoid class components.
43) Props typing via interfaces; default values handled in destructuring where practical.
44) Derive values instead of duplicating state; memoize only if measurable benefit.
45) Prefer `useEffect` cleanup for event listeners/timeouts (see `BackgroundWrapper`).

DATA & CONTENT HANDLING
46) Blog data read from filesystem at build time (`src/lib/blog.ts`); keep functions pure and sync-friendly.
47) Frontmatter parsing supports Obsidian fields (`Article Title`, `Publish Date`, `Thumbnail`, etc.). Preserve compatibility when extending.
48) `transformObsidianSyntax` converts `![[file|caption]]` into `BlogImage`/`BlogVideo`; ensure new syntax keeps backward compatibility.
49) Tag handling filters Obsidian tags like `blog`; keep normalization when adding tags.
50) Blog posts sorted by date desc; maintain when altering sort behavior.

STYLING
51) Tailwind is primary. Custom palette via CSS variables (`--background`, `--primary`, etc.) referenced in `tailwind.config.ts`.
52) Use `cn` helper from `src/lib/utils.ts` to merge class names safely.
53) Animations lean on `framer-motion` and `tailwindcss-animate`; respect prefers-reduced-motion when adding heavy effects.
54) Keep layout wrappers like `FloatingSection` and `BackgroundWrapper` for consistent depth/glow effects.
55) Dark mode toggled via class; ensure colors use semantic tokens (`text-muted-foreground`, etc.).

ACCESSIBILITY & UX
56) Provide `alt` text for images; titles for videos if applicable.
57) Use `time` elements with `dateTime` (see Blog cards); continue practice.
58) Maintain keyboard and focus states; Tailwind focus classes encouraged.
59) Avoid motion jank; staggered animations already used—extend thoughtfully.

ERROR HANDLING
60) Use guard clauses and null checks when reading filesystem or optional data.
61) Return `null` from data getters when missing, let callers render not-found UI (e.g., `getPostBySlug`).
62) Prefer user-friendly fallbacks over throwing in runtime pages; keep build-time failures explicit.

ROUTING & METADATA
63) App Router pages export `metadata` and optionally `viewport`; mirror patterns in `src/app/layout.tsx`.
64) Use dynamic segments under `(main)/blog/[slug]` for blog pages; ensure `generateStaticParams` or data fetch stays compatible with static export if added.
65) `not-found.tsx` present—reuse for 404 states instead of custom throw.

ASSET MANAGEMENT
66) Store blog media next to posts under `public/blog/<slug>/`; reference via `/blog/<slug>/<file>`.
67) Avoid importing heavy assets into client bundles; prefer static paths.
68) Images are unoptimized, so mind file sizes; compress before committing.

NAVIGATION & LAYOUT
69) Main layout component `src/components/layout/MainLayout.tsx` wraps pages with navbar/footer/background. Reuse instead of duplicating chrome.
70) Navbar uses stateful client logic; keep navigation items centralized there.
71) Footer and floating sections provide consistent padding and card feel; compose rather than recreating styles.

BLOG UI GUIDELINES
72) Blog cards animate with Framer Motion; maintain layoutId patterns if adding shared element transitions.
73) `MDXComponents` defines custom components for MDX rendering; extend there when adding new MDX elements.
74) Gallery/video support lives in `BlogMediaComponents` and `BlogGalleryProvider`; integrate new media types through those providers.

MDX AUTHORING HINTS
75) Use frontmatter keys already supported: `title`/`Article Title`, `description`, `Publish Date`, `tags`, `Thumbnail`/`cover`, `published` flag.
76) Obsidian embeds: `![[image.png|Caption]]` or `![[video.mp4|640x480]]` become `BlogImage`/`BlogVideo` automatically.
77) Wiki links `[[Some Term]]` become bold text. Avoid linking to missing pages.
78) Keep content lint-friendly: avoid raw HTML unless necessary; prefer Markdown/MDX components.

TYPICAL WORKFLOWS
79) Add a page: create `src/app/(main)/new/page.tsx`, default export component, optional `metadata` export.
80) Add a client component: place in `src/components/...`, start with `"use client"`, type props, import via alias.
81) Add a blog post: create folder in `public/blog/slug`, add `index.mdx`, assets alongside; ensure frontmatter `published: true`.
82) Adjust styles: edit `globals.css` or utility classes; update Tailwind tokens if adding new semantic colors.

LINT EXPECTATIONS
83) ESLint extends `next/core-web-vitals` and `next/typescript`; ignores `out`, `.next`, `node_modules`, and `*.config.[jt]s`.
84) Fix lint issues before commits; prefer code changes over disabling rules. If disabling, scope narrowly.
85) When adding config files, ensure they are ignored if needed to avoid lint noise.

PERF CONSIDERATIONS
86) Static export: avoid dynamic server calls; precompute at build time.
87) Limit client bundle size—keep dependencies lean in client components; move heavy logic to server or static data.
88) Memoize expensive computations only when profiling indicates need; avoid premature use of `useMemo`/`useCallback`.

SECURITY & PRIVACY
89) Do not store secrets in repo; no env usage currently. If adding, prefer build-time env with `NEXT_PUBLIC_` for client exposure only when intended.
90) Sanitize or validate any new user inputs before rendering; current site is mostly static.

TESTING NOTES
91) No tests present. If introducing tests, pick a runner (Vitest/Jest/Playwright), add scripts, and document command usage here.
92) For component tests, consider React Testing Library; for e2e, Playwright fits Next.js exports.
93) Keep tests colocated under `__tests__` or `*.test.tsx`; align with future script patterns.

DEPLOY/EXPORT REMINDERS
94) `npm run build` triggers static export due to config; ensure dynamic routes can pre-render.
95) Avoid runtime-only features (Edge/server actions) unless adapted for static output.
96) Use `next/image` only with static `src` unless custom loader provided; otherwise plain `<img>` is acceptable here.

ACCESS & SECRETS
97) No Copilot or Cursor rule files present. No repo-specific AI constraints beyond this doc.
98) Keep edits ASCII unless file already uses special characters.

CHECKLIST BEFORE SUBMITTING PR/COMMIT
99) Run `npm run lint`.
100) Verify build/export with `npm run build` when touching routing or data loading.
101) Manually sanity-check key pages: home, blog list/detail, projects.
102) Keep `out` directory out of commits unless intentionally exporting artifacts (usually not committed).

AUTHORITATIVE REFERENCES
103) Configs of note: `next.config.ts`, `eslint.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`.
104) Utility helpers: `src/lib/utils.ts` (`cn`), `src/lib/blog.ts` (blog parsing), `src/lib/skills-graph-data.ts` (d3 data), `src/lib/use-view-transition.ts` (view transitions hook).
105) Layout primitives: `src/components/layout/MainLayout.tsx`, `src/components/ui/FloatingSection.tsx`, `src/components/ui/BackgroundWrapper.tsx`.
106) Blog renderers: `src/components/blog/MDXComponents.tsx`, `src/app/(main)/blog/[slug]/BlogPostClient.tsx`.
107) Navbar/Footer: `src/components/navbar/Navbar.tsx`, `src/components/footer/Footer.tsx`.
108) Home sections: `src/components/home/*`.

END OF BRIEF
