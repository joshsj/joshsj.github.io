import { FormatDate, FormatDateTime, FormatTime } from "./types";

const z = (n: number, length = 2) => n.toString().padStart(length, "0");

// TODO date library?

const formatDate: FormatDate = (d, sep = "/") =>
  z(d.getFullYear(), 4) + sep + z(d.getMonth() + 1) + sep + z(d.getDate());

const formatTime: FormatTime = (d, ms = false) => {
  const sep = ":";
  let base = z(d.getHours()) + sep + z(d.getMinutes()) + sep + z(d.getSeconds());
  return base + (ms ? "." + z(d.getMilliseconds(), 3) : "");
};

const formatDateTime: FormatDateTime = (d, { ms, sep }) => `${formatDate(d, sep)} ${formatTime(d, ms)}`;

export { formatDate, formatTime, formatDateTime };
