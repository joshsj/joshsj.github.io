import { ILocator } from "@application/behaviours/interfaces";
import { IResourceStore } from "@application/stores/interfaces";
import { Resource, ResourceName } from "@models";
import { IGetUrl } from "./interfaces";

class GetUrl implements IGetUrl {
  private readonly cache: Map<Resource, string>;

  constructor(private readonly store: IResourceStore, private readonly locators: ILocator[]) {
    this.cache = new Map<Resource, string>();
  }

  for(name: ResourceName, filename: string): string;
  for(resource: Resource): string;
  for(arg: Resource | ResourceName, filename?: string): string {
    const resource = typeof arg === "object" ? arg : this.store.allBy(arg).find((x) => x.file.name.base === filename);

    if (!resource) {
      throw new Error(`urlFor failed with: ${arg}, ${filename}`);
    }

    if (this.cache.has(resource)) {
      return this.cache.get(resource)!;
    }

    const locator = this.locators.find((x) => x.for === resource.name);

    if (!locator) {
      throw new Error(`urlFor failed with: ${arg}, ${filename}`);
    }

    let {
      full: url,
      dir: { sep },
    } = locator.locate(resource);

    // Ensure starts at root
    if (url.at(0) !== sep) {
      url = sep + url;
    }

    // Remove more ugly
    url = url.replace("index.html", "");

    return this.cache.set(resource, url).get(resource)!;
  }
}

export { GetUrl };
