import { Config } from "@models/config";
import { IIdentifier } from "@application/behaviours/types";
import { Collection } from "@models";
import { File } from "@models/io";

class CollectionIdentifier implements IIdentifier<Collection> {
  constructor(private readonly config: Config) {}

  readonly name = "collection";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.postDir && dir.segments.length === 2 && name.full == ".yml";
  }
}

export { CollectionIdentifier };
