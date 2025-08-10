import { useJobsStore, type Job } from "@/lib/store";
import { formatDate } from "@/lib/dateUtils";
import Tag from "./Tag";
import { Card, CardContent } from "@/components/ui/card";

/**
 * JobCard
 * Purpose: Compact, glassy card to display job info.
 * Props: { job: Job; onClick?: (job: Job) => void }
 * Usage: <JobCard job={job} onClick={() => ...} />
 * Accessibility: Card is a button-like element with role and keyboard handlers.
 */
const JobCard = ({ job, onClick }: { job: Job; onClick?: (job: Job) => void }) => {
  return (
    <button
      role="button"
      onClick={() => onClick?.(job)}
      className="w-full text-left"
      aria-label={`Open details for ${job.role} at ${job.company}`}
    >
      <Card className="transition-all hover:translate-y-[-1px] hover:shadow-md bg-[hsl(var(--glass-surface))] border-[color:var(--glass-border)]">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm md:text-base font-semibold leading-tight">
                  {job.role}
                </h3>
                <span className="text-sm text-muted-foreground">@ {job.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>Applied: {formatDate(job.applied_at)}</span>
                <span>•</span>
                <span>Updated: {formatDate(job.updated_at)}</span>
                <span>•</span>
                <span className="truncate max-w-[14rem]">{job.url}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Tag>{job.status}</Tag>
              <Tag className="bg-muted text-foreground/80">{job.platform === "Other" && job.platform_other ? job.platform_other : job.platform}</Tag>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default JobCard;
