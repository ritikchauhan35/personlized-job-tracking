# DESIGN

Visual direction: modern, 2025-friendly. Soft glassmorphism, blurred panels, subtle depth and motion. Token-first theming in CSS variables (HSL only).

- Color tokens: defined in src/index.css. Added gradient tokens and glass variables.
- Spacing: Tailwind spacing scale; container padding 2rem, generous gaps.
- Typography: System UI with clear hierarchy; h1 3xl on desktop, scales down on mobile.
- Dark mode: supported via .dark tokens, glass alpha reduced for contrast.
- Micro-interactions: hover lift on cards, subtle shadows.

Layouts
- Job List: responsive grid list of glass cards
- Job Detail: modal with form fields and notes
- Job Form: compact stacked fields, 3-column section for platform/status/url on md+

Accessibility
- Labels on all inputs, visible focus states, keyboard navigable modal
- AA contrast via token choices; semantics: header/main/section used
