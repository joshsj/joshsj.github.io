import { Config } from "@models/config";
import { IIdentifier } from "@application/behaviours/types";
import { Collection } from "@models";
import { File } from "@models/io";

class CollectionIdentifier implements IIdentifier<Collection> {
  constructor(private readonly config: Config) {}

  readonly name = "collection";

  test({ name, extension, segments }: File): boolean {
    return segments.at(0) === this.config.postDir && segments.length === 2 && !name && extension === ".yml";
  }
}

export { CollectionIdentifier };
