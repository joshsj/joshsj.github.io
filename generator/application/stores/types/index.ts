import { Feature, FeatureFor, FeatureName } from "@models";

type Store<T> = {
  all: () => T[];
  count: () => number;
  insert: (item: T) => void;
  update: (item: T) => void;
  upsert: (item: T) => void;
};

type FeatureStore = Store<Feature> & {
  find: (path: string) => Feature;
  allBy: <T extends FeatureName>(name: T) => FeatureFor<T>[];
};

export { Store, FeatureStore };
