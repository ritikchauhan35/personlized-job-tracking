import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import JobList from "@/components/JobList";
import JobForm from "@/components/JobForm";
import { useJobsStore, type Job, type Platform, type Status } from "@/lib/store";

const Index = () => {
  const { jobs, addJob, updateJob } = useJobsStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | Status>("All");
  const [platform, setPlatform] = useState<"All" | Platform>("All");
  const [sort, setSort] = useState<"applied_desc" | "applied_asc">("applied_desc");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);

  // SEO: keep title fresh
  document.title = "Personalized Job Tracker";

  const filtered = useMemo(() => {
    let list = [...jobs];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((j) => j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q));
    }
    if (status !== "All") list = list.filter((j) => j.status === status);
    if (platform !== "All") list = list.filter((j) => j.platform === platform);
    list.sort((a, b) =>
      sort === "applied_desc"
        ? b.applied_at.localeCompare(a.applied_at)
        : a.applied_at.localeCompare(b.applied_at)
    );
    return list;
  }, [jobs, query, status, platform, sort]);

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSave = (data: Parameters<typeof addJob>[0] & { id?: string }) => {
    if (editing) {
      updateJob(editing.id, data);
      toast.success("Job updated");
    } else {
      const created = addJob(data);
      toast.success(`Job added: ${created.company}`);
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-primary)]/[0.08]">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/70 border-b">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent">Personalized Job Tracker</h1>
              <p className="text-muted-foreground">Add, search, and manage your job applications.</p>
            </div>
            <Button onClick={handleCreate} className="md:self-end">
              <Plus className="mr-2 h-4 w-4" /> Add Job
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <Card className="bg-[hsl(var(--glass-surface))] border-[color:var(--glass-border)] shadow-[var(--shadow-soft)]">
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-4">
              <div className="col-span-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by company or role"
                  aria-label="Search jobs"
                />
              </div>
              <div className="flex gap-2">
                <select
                  aria-label="Filter by status"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  {(["All", "Applied", "Interviewing", "Offer", "Rejected", "Ghosted"] as const).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Filter by platform"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                >
                  {(["All", "LinkedIn", "Indeed", "AngelList", "Cold Email", "Other"] as const).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select
                  aria-label="Sort jobs"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                >
                  <option value="applied_desc">Newest applied</option>
                  <option value="applied_asc">Oldest applied</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <section aria-label="Job list" className="space-y-2">
          <JobList jobs={filtered} onSelect={(job) => { setEditing(job); setOpen(true); }} />
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No jobs found. Add your first application!</p>
          )}
        </section>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Job" : "Add Job"}</DialogTitle>
          </DialogHeader>
          <Separator className="my-2" />
          <JobForm initialJob={editing ?? undefined} onSave={handleSave} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
