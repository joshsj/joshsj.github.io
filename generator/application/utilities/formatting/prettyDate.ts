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

const ordinals = ["st", "nd", "rd"] as const;

const prettyDate: PrettyDate = (d) => {
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate() + (ordinals.at((d.getDate() % 10) - 1) ?? "th");

  return `${month} ${day}, ${year}`;
};

export { PrettyDate, prettyDate };
