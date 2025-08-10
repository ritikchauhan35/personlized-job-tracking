# BACKEND (Supabase plan)

Phase 1 runs client-side only. To enable Supabase:
1) In Lovable, click the green Supabase button (top-right) and connect a project.
2) Apply schema.sql below as a migration.
3) Replace local Zustand logic with Supabase CRUD.

Tables (schema.sql included)
- platforms(id, name)
- jobs(id, company, role, platform_id, url, status, notes, next_steps, applied_at, updated_at)
- checklists(id, job_id, text, done)

Basic queries
- List: select * from jobs order by applied_at desc
- Filter: where status = 'Applied' and platform_id in (...)
- Search: where company ilike '%acme%' or role ilike '%frontend%'
- Update status: update jobs set status = $1, updated_at = now()

Storage (future)
- resumes bucket for uploads

.env.example contains Supabase keys placeholders.
