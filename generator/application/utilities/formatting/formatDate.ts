import { z } from "./zeros";

type FormatDate = (date: Date, sep?: string) => string;

const formatDate: FormatDate = (d, sep = "/") =>
  z(d.getFullYear(), 4) + sep + z(d.getMonth() + 1) + sep + z(d.getDate());

export { FormatDate, formatDate };
