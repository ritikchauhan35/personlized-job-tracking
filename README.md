# TrackSpark – Job Tracker

A lightweight, developer-friendly job application tracker with a modern, glassy UI.

Architecture (simplified)

[Client]
  React + Zustand + Tailwind (glass tokens)
    ├─ Jobs Page (search/filters)
    ├─ JobList → JobCard
    └─ JobForm (modal)

Getting Started
- npm i
- npm run dev

Scripts
- dev, build, preview, lint (via ESLint)

Deploy
- Vercel (build: npm run build, output: dist)

Supabase
- Not required for Phase 1. To enable later, connect via Lovable’s Supabase integration and run schema.sql
