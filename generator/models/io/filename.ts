interface IFilename {
  readonly base: string;
  readonly ext: string;
}

class Filename implements IFilename {
  base: string;
  ext: string;

  private constructor({ base, ext }: IFilename) {
    this.base = base;
    this.ext = ext;
  }

  static from(filename: IFilename) {
    return new Filename(filename);
  }

  with(patch: Partial<IFilename>) {
    return new Filename({ ...this, ...patch });
  }

  get full() {
    return this.base + this.ext;
  }
}

export { IFilename, Filename };
