# FRONTEND

Tech
- React + Vite + TypeScript
- TailwindCSS (tokenized theme in src/index.css)
- shadcn/ui primitives
- State: Zustand (src/lib/store.ts)
- Forms: React Hook Form + Zod

Structure
- src/components/JobCard.tsx – compact job tile
- src/components/JobList.tsx – list renderer
- src/components/JobForm.tsx – add/edit form
- src/lib/store.ts – jobs state and actions
- src/lib/dateUtils.ts – date helpers
- src/pages/Index.tsx – Jobs page (search, filters, modal)

Component APIs
- JobCard({ job, onClick })
- JobList({ jobs, onSelect })
- JobForm({ initialJob?, onSave, onCancel? })

Run locally
- npm i
- npm run dev
- npm run build && npm run preview

Deploy
- Vercel: import repo, set build command: npm run build, output: dist

Tests (guidance)
- Use Jest + React Testing Library
- Example (pseudo): render(<JobCard job=... />) expect(screen.getByText(job.company)).toBeInTheDocument()
