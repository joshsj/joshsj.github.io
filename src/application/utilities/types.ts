type FormatDate = (date: Date, sep?: string) => string;
type FormatTime = (date: Date, ms?: boolean) => string;
type FormatDateTime = (date: Date, options: { sep?: string; ms?: boolean }) => string;

export { FormatDate, FormatTime, FormatDateTime };
