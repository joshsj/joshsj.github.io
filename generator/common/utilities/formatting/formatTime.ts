import { z } from "./zeros";

type FormatTime = (date: Date, ms?: boolean) => string;

const formatTime: FormatTime = (d, ms = false) => {
  const sep = ":";
  let base = z(d.getHours()) + sep + z(d.getMinutes()) + sep + z(d.getSeconds());
  return base + (ms ? "." + z(d.getMilliseconds(), 3) : "");
};

export { FormatTime, formatTime };
