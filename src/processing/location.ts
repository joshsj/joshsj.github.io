import { ILocation } from "./types";

class Location implements ILocation {
  constructor(
    public segments: string[],
    public name: string,
    public extension: string,
    public sep: string
  ) {}

  get directory() {
    return this.segments.join(this.sep);
  }

  get base() {
    return `${this.name}${this.extension}`;
  }

  get full() {
    return [this.directory, this.base].join(this.sep);
  }
}

export { Location };
