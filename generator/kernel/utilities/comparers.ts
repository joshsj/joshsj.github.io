type Comparer<T> = (a: T, b: T) => number;

const dateComparer: Comparer<Date> = (a: Date, b: Date) => a.getTime() - b.getTime();

export { Comparer, dateComparer };
