/** Example: January 6th, 2023 */
type PrettyDate = (date: Date) => string;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toOrdinal = (n: number) => (n === 11 || n === 12 || n === 13 ? "th" : ["st", "nd", "rd"][(n % 10) - 1] ?? "th");

const prettyDate: PrettyDate = (d) => {
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate() + toOrdinal(d.getDate());

  return `${month} ${day}, ${year}`;
};

export { PrettyDate, prettyDate };
