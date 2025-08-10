import { Job } from "@/lib/store";
import JobCard from "./JobCard";

/**
 * JobList
 * Purpose: Renders a vertical list of JobCard items.
 * Props: { jobs: Job[]; onSelect?: (job: Job) => void }
 * Usage: <JobList jobs={jobs} onSelect={(j)=>...} />
 */
const JobList = ({ jobs, onSelect }: { jobs: Job[]; onSelect?: (job: Job) => void }) => {
  return (
    <div className="grid gap-3">
      {jobs.map((j) => (
        <JobCard key={j.id} job={j} onClick={onSelect} />
      ))}
    </div>
  );
};

export default JobList;
