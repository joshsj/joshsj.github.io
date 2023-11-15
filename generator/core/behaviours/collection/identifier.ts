import { IIdentifier } from "@core/behaviours/interfaces";
import { Collection } from "@core/models";
import { Config } from "@core/models/config";
import { File } from "@core/models/io";

class CollectionIdentifier implements IIdentifier<Collection> {
  readonly for = "collection";

  constructor(private readonly config: Config) {}

  readonly name = "collection";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.postDir && dir.segments.length === 2 && name.full == ".yml";
  }
}

export { CollectionIdentifier };
