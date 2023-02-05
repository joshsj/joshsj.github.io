import { formatDate } from "./formatDate";
import { formatTime } from "./formatTime";

type FormatDateTime = (date: Date, options: { sep?: string; ms?: boolean }) => string;

const formatDateTime: FormatDateTime = (d, { ms, sep }) => `${formatDate(d, sep)} ${formatTime(d, ms)}`;

export { FormatDateTime, formatDateTime };
