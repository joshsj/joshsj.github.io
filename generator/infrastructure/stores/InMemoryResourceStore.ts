import { Collection, Resource, ResourceFor, ResourceName } from "@models";
import { IResourceStore } from "@application/stores/interfaces";

const readOut = (values: { [K: string]: unknown }) =>
  Object.entries(values)
    .map(([k, v]) => k + "=" + v)
    .join(", ");

class InMemoryResourceStore implements IResourceStore {
  private readonly items: Resource[] = [];

  private indexOf = (arg: Resource | string) => {
    const path = typeof arg === "object" ? arg.file.full : arg;

    return this.items.findIndex((x) => x.file.full === path);
  };

  find(path: string) {
    const index = this.indexOf(path);

    if (index === -1) {
      throw new Error(`Item does not exist with ${readOut({ path })}`);
    }

    return this.items[index];
  }

  findBy(resourceName: ResourceName, title: string) {
    const item = this.allBy(resourceName).find((f) => "title" in f && f.title === title);

    if (!item) {
      throw new Error(`Item does not exist with ${readOut({ resourceName, title })}`);
    }

    return item;
  }

  all() {
    return [...this.items];
  }

  allBy<T extends ResourceName>(name: T) {
    return [...this.items.filter((x): x is ResourceFor<T> => x.name === name)];
  }

  allIn(collection: Collection) {
    return [...this.items.filter((x) => x.name === "post" && x.collection === collection.file.dir.segments[1])];
  }

  count() {
    return this.items.length;
  }

  insert(item: Resource) {
    const index = this.indexOf(item);

    if (index !== -1) {
      throw new Error(`Item already exists at ${readOut({ path: item.file.full })}`);
    }

    this.items.push(item);
  }

  update(item: Resource) {
    const index = this.indexOf(item);

    if (index == -1) {
      throw new Error(`Item not not exist with ${readOut({ path: item.file.full })}`);
    }

    this.items[index] = item;
  }

  upsert(item: Resource) {
    const index = this.indexOf(item);

    if (index === -1) {
      this.items.push(item);
    } else {
      this.items[index] = item;
    }
  }
}

export { InMemoryResourceStore };
