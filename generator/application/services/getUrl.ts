import { ILocatorProvider } from "@application/behaviours/types";
import { IEntityStore } from "@application/stores/types";
import { Entity, EntityName } from "@models";
import { IGetUrl } from "./types";

class GetUrl implements IGetUrl {
  private readonly cache: Map<Entity, string>;

  constructor(private readonly store: IEntityStore, private readonly locatorProvider: ILocatorProvider) {
    this.cache = new Map<Entity, string>();
  }

  for(name: EntityName, filename: string): string;
  for(entity: Entity): string;
  for(arg: Entity | EntityName, filename?: string): string {
    const entity = typeof arg === "object" ? arg : this.store.allBy(arg).find((x) => x.file.name.base === filename);

    if (!entity) {
      throw new Error(`urlFor failed with: ${arg}, ${filename}`);
    }

    if (this.cache.has(entity)) {
      return this.cache.get(entity)!;
    }

    const locator = this.locatorProvider.get(entity.name);

    if (!locator) {
      throw new Error(`urlFor failed with: ${arg}, ${filename}`);
    }

    let {
      full: url,
      dir: { sep },
    } = locator.locate(entity);

    // Ensure starts at root
    if (url.at(0) !== sep) {
      url = sep + url;
    }

    // Remove more ugly
    url = url.replace("index.html", "");

    return this.cache.set(entity, url).get(entity)!;
  }
}

export { GetUrl };
