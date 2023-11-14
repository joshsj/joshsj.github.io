import { Collection, Entity, EntityFor, EntityName } from "@models";
import { IEntityStore } from "@application/stores/interfaces";

const readOut = (values: { [K: string]: unknown }) =>
  Object.entries(values)
    .map(([k, v]) => k + "=" + v)
    .join(", ");

class InMemoryEntityStore implements IEntityStore {
  private readonly items: Entity[] = [];

  private indexOf = (arg: Entity | string) => {
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

  findBy(entityName: EntityName, title: string) {
    const item = this.allBy(entityName).find((f) => "title" in f && f.title === title);

    if (!item) {
      throw new Error(`Item does not exist with ${readOut({ entityName, title })}`);
    }

    return item;
  }

  all() {
    return [...this.items];
  }

  allBy<T extends EntityName>(name: T) {
    return [...this.items.filter((x): x is EntityFor<T> => x.name === name)];
  }

  allIn(collection: Collection) {
    return [...this.items.filter((x) => x.name === "post" && x.collection === collection.file.dir.segments[1])];
  }

  count() {
    return this.items.length;
  }

  insert(item: Entity) {
    const index = this.indexOf(item);

    if (index !== -1) {
      throw new Error(`Item already exists at ${readOut({ path: item.file.full })}`);
    }

    this.items.push(item);
  }

  update(item: Entity) {
    const index = this.indexOf(item);

    if (index == -1) {
      throw new Error(`Item not not exist with ${readOut({ path: item.file.full })}`);
    }

    this.items[index] = item;
  }

  upsert(item: Entity) {
    const index = this.indexOf(item);

    if (index === -1) {
      this.items.push(item);
    } else {
      this.items[index] = item;
    }
  }
}

export { InMemoryEntityStore };
