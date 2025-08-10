import { useState } from "react";
import { useJobsStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Checklist
 * Purpose: Simple checklist editor per job.
 * Props: { jobId: string }
 * Usage: <Checklist jobId={job.id} />
 * A11y: checkboxes are labeled; input has label via aria-label.
 */
const Checklist = ({ jobId }: { jobId: string }) => {
  const { jobs, toggleChecklist, addChecklistItem } = useJobsStore();
  const job = jobs.find((j) => j.id === jobId);
  const [text, setText] = useState("");
  if (!job) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Checklist</h4>
      <div className="grid gap-2">
        {job.checklist.map((item) => (
          <label key={item.id} className="flex items-center gap-2">
            <Checkbox checked={item.done} onCheckedChange={() => toggleChecklist(jobId, item.id)} />
            <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.text}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add checklist item"
          aria-label="Add checklist item"
        />
        <Button
          type="button"
          onClick={() => {
            if (!text.trim()) return;
            addChecklistItem(jobId, text.trim());
            setText("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Checklist;
