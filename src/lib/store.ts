import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nowIso } from "./dateUtils";

export type Platform = "LinkedIn" | "Indeed" | "AngelList" | "Cold Email" | "Other";
export type Status = "Applied" | "Interviewing" | "Offer" | "Rejected" | "Ghosted";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  platform: Platform;
  platform_other?: string;
  url?: string;
  status: Status;
  notes?: string;
  next_steps?: string;
  checklist: ChecklistItem[];
  applied_at: string; // ISO string
  updated_at: string; // ISO string
}

export type JobInput = Omit<Job, "id" | "applied_at" | "updated_at" | "checklist"> & {
  checklist?: ChecklistItem[];
};

interface JobsState {
  jobs: Job[];
  addJob: (input: JobInput) => Job;
  updateJob: (id: string, patch: Partial<JobInput>) => void;
  toggleChecklist: (jobId: string, itemId: string) => void;
  addChecklistItem: (jobId: string, text: string) => void;
}

const seed: Job[] = [
  {
    id: "seed-1",
    company: "Acme Corp",
    role: "Frontend Engineer",
    platform: "LinkedIn",
    url: "https://linkedin.com/jobs/123",
    status: "Applied",
    notes: "Referred by Jane",
    next_steps: "Follow-up next week",
    checklist: [
      { id: "c1", text: "Research company", done: true },
      { id: "c2", text: "Tailor resume", done: false }
    ],
    applied_at: nowIso(),
    updated_at: nowIso(),
  },
  {
    id: "seed-2",
    company: "Nimbus Labs",
    role: "Full Stack Developer",
    platform: "AngelList",
    url: "https://angel.co/jobs/456",
    status: "Interviewing",
    notes: "Completed take-home",
    next_steps: "Prepare for system design",
    checklist: [
      { id: "c3", text: "Mock interview", done: false }
    ],
    applied_at: nowIso(),
    updated_at: nowIso(),
  },
];

export const useJobsStore = create<JobsState>()(
  persist(
    (set) => ({
      jobs: seed,
      addJob: (input) => {
        const id = crypto.randomUUID();
        const when = nowIso();
        const job: Job = {
          id,
          company: input.company,
          role: input.role,
          platform: input.platform,
          platform_other: input.platform_other,
          url: input.url,
          status: input.status,
          notes: input.notes,
          next_steps: input.next_steps,
          checklist: input.checklist ?? [],
          applied_at: when,
          updated_at: when,
        };
        set((s) => ({ jobs: [job, ...s.jobs] }));
        return job;
      },
      updateJob: (id, patch) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === id
              ? {
                  ...j,
                  ...patch,
                  updated_at: nowIso(),
                }
              : j
          ),
        })),
      toggleChecklist: (jobId, itemId) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === jobId
              ? {
                  ...j,
                  checklist: j.checklist.map((c) =>
                    c.id === itemId ? { ...c, done: !c.done } : c
                  ),
                  updated_at: nowIso(),
                }
              : j
          ),
        })),
      addChecklistItem: (jobId, text) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === jobId
              ? {
                  ...j,
                  checklist: [
                    ...j.checklist,
                    { id: crypto.randomUUID(), text, done: false },
                  ],
                  updated_at: nowIso(),
                }
              : j
          ),
        })),
    }),
    {
      name: "trackspark-jobs",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ jobs: state.jobs }),
    }
  )
);
