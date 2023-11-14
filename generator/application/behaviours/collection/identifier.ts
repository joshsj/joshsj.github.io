import { IIdentifier } from "@application/behaviours/interfaces";
import { Config } from "@models/config";
import { File } from "@models/io";

class CollectionIdentifier implements IIdentifier<"collection"> {
  readonly for = "collection";

  constructor(private readonly config: Config) {}

  readonly name = "collection";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.postDir && dir.segments.length === 2 && name.full == ".yml";
  }
}

export { CollectionIdentifier };
