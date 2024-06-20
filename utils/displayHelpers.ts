import { format } from "date-fns";
export function formatDate(date: Date, formatString = "do MMM yyy") {
  if (!date) return;
  return format(date, formatString);
}
