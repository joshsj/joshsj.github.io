import { Collection, Feature, FeatureFor, FeatureName } from "@models";
import { IFeatureStore } from "@application/stores/types";

const readOut = (values: { [K: string]: unknown }) =>
  Object.entries(values)
    .map(([k, v]) => k + "=" + v)
    .join(", ");

class InMemoryFeatureStore implements IFeatureStore {
  private readonly items: Feature[] = [];

  private indexOf = (arg: Feature | string) => {
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

  findBy(featureName: FeatureName, title: string) {
    const item = this.allBy(featureName).find((f) => "title" in f && f.title === title);

    if (!item) {
      throw new Error(`Item does not exist with ${readOut({ featureName, title })}`);
    }

    return item;
  }

  all() {
    return [...this.items];
  }

  allBy<T extends FeatureName>(name: T) {
    return [...this.items.filter((x): x is FeatureFor<T> => x.name === name)];
  }

  allIn(collection: Collection) {
    return [...this.items.filter((x) => x.name === "post" && x.collection === collection.file.segments[1])];
  }

  count() {
    return this.items.length;
  }

  insert(item: Feature) {
    const index = this.indexOf(item);

    if (index !== -1) {
      throw new Error(`Item already exists at ${readOut({ path: item.file.full })}`);
    }

    this.items.push(item);
  }

  update(item: Feature) {
    const index = this.indexOf(item);

    if (index == -1) {
      throw new Error(`Item not not exist with ${readOut({ path: item.file.full })}`);
    }

    this.items[index] = item;
  }

  upsert(item: Feature) {
    const index = this.indexOf(item);

    if (index === -1) {
      this.items.push(item);
    } else {
      this.items[index] = item;
    }
  }
}

export { InMemoryFeatureStore };
