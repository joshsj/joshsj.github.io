import { Feature, FeatureFor, FeatureName } from "@models";
import { FeatureStore } from "@application/stores/types";

const makeFeatureStore = (): FeatureStore => {
  const items: Feature[] = [];

  const indexOf = (arg: Feature | string) => {
    const path = typeof arg === "object" ? arg.file.full : arg;

    return items.findIndex((x) => x.file.full === path);
  };

  const allBy = <T extends FeatureName>(name: T) => items.filter((x): x is FeatureFor<T> => x.name === name);

  return {
    find: (path) => {
      const index = indexOf(path);

      if (index === -1) {
        throw new Error(`Item does not exist with path ${path}`);
      }

      return items[index];
    },

    findBy: (name, title) => {
      const item = allBy(name).find((x) => "title" in x && x.title === title);

      if (!item) {
        throw new Error(`Item does not exist with name ${name}, title ${title}`);
      }

      return item;
    },

    all: () => [...items],
    allBy,

    count: () => items.length,

    insert: (item) => {
      const index = indexOf(item);

      if (index !== -1) {
        throw new Error(`Item already exists with path ${item.file.full}`);
      }

      items.push(item);
    },

    update: (item) => {
      const index = indexOf(item);

      if (index == -1) {
        throw new Error(`Item not not exist with path ${item.file.full}`);
      }

      items[index] = item;
    },

    upsert: (item) => {
      const index = indexOf(item);

      if (index === -1) {
        items.push(item);
      } else {
        items[index] = item;
      }
    },
  };
};

export { makeFeatureStore };
