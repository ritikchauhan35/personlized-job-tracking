import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useJobsStore, type Job, type JobInput, type Platform, type Status } from "@/lib/store";

/**
 * JobForm
 * Purpose: Create or edit a job entry.
 * Props:
 * - initialJob?: Job (prefills form when editing)
 * - onSave: (data: JobInput | Partial<Job>) => void
 * - onCancel?: () => void
 * Usage:
 * <JobForm onSave={(data)=>...} />
 * Accessibility: Each field has a label and description; form is keyboard navigable.
 */

const schema = z
  .object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    platform: z.enum(["LinkedIn", "Indeed", "AngelList", "Cold Email", "Other"] as const),
    platform_other: z.string().max(60, "Keep it short").optional(),
    url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    status: z.enum(["Applied", "Interviewing", "Offer", "Rejected", "Ghosted"] as const),
    notes: z.string().optional(),
    next_steps: z.string().optional(),
  })
  .refine(
    (v) => v.platform !== "Other" || !!v.platform_other?.trim(),
    { message: "Please specify the platform", path: ["platform_other"] }
  );

type FormValues = z.infer<typeof schema>;

const JobForm = ({ initialJob, onSave, onCancel }: {
  initialJob?: Job;
  onSave: (data: JobInput) => void;
  onCancel?: () => void;
}) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialJob
      ? {
          company: initialJob.company,
          role: initialJob.role,
          platform: initialJob.platform as Platform,
          platform_other: initialJob.platform_other ?? "",
          url: initialJob.url ?? "",
          status: initialJob.status as Status,
          notes: initialJob.notes ?? "",
          next_steps: initialJob.next_steps ?? "",
        }
      : {
          company: "",
          role: "",
          platform: "LinkedIn",
          platform_other: "",
          url: "",
          status: "Applied",
          notes: "",
          next_steps: "",
        },
  });

  const submit = (values: FormValues) => {
    onSave({
      company: values.company,
      role: values.role,
      platform: values.platform,
      platform_other: values.platform === "Other" ? (values.platform_other?.trim() || undefined) : undefined,
      url: values.url || undefined,
      status: values.status,
      notes: values.notes || undefined,
      next_steps: values.next_steps || undefined,
    });
    if (!initialJob) reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...register("company")} placeholder="Acme Inc" />
        {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Input id="role" {...register("role")} placeholder="Frontend Engineer" />
        {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="grid gap-2">
          <Label htmlFor="platform">Platform</Label>
          <select id="platform" className="rounded-md border bg-background px-3 py-2 text-sm" {...register("platform")}>
            {(["LinkedIn", "Indeed", "AngelList", "Cold Email", "Other"] as const).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <select id="status" className="rounded-md border bg-background px-3 py-2 text-sm" {...register("status")}>
            {(["Applied", "Interviewing", "Offer", "Rejected", "Ghosted"] as const).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="url">Listing URL</Label>
          <Input id="url" {...register("url")} placeholder="https://..." />
          {errors.url && <p className="text-sm text-destructive">{errors.url.message}</p>}
        </div>
      </div>

      {watch("platform") === "Other" && (
        <div className="grid gap-2">
          <Label htmlFor="platform_other">Platform name</Label>
          <Input id="platform_other" {...register("platform_other")} placeholder="e.g., Company Site, Greenhouse, Lever..." />
          {errors.platform_other && <p className="text-sm text-destructive">{errors.platform_other.message}</p>}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" rows={4} {...register("notes")} placeholder="Any notes..." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="next_steps">Next steps</Label>
        <Textarea id="next_steps" rows={3} {...register("next_steps")} placeholder="Follow-up, prep, etc." />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{initialJob ? "Save Changes" : "Add Job"}</Button>
      </div>
    </form>
  );
};

export default JobForm;
