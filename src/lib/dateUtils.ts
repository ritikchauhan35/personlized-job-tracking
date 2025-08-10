import { format, parseISO } from "date-fns";

export const nowIso = () => new Date().toISOString();

export const formatDate = (iso: string) => {
  try {
    return format(parseISO(iso), "PP");
  } catch {
    return "-";
  }
};
