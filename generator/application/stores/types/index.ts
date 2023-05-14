import { Collection, Feature, FeatureFor, FeatureName } from "@models";

interface IStore<T> {
  all: () => T[];
  count: () => number;
  insert: (item: T) => void;
  update: (item: T) => void;
  upsert: (item: T) => void;
}

interface IFeatureStore extends IStore<Feature> {
  find: (path: string) => Feature;
  // TODO narrow type
  findBy: (name: FeatureName, title: string) => Feature;
  allBy: <T extends FeatureName>(name: T) => FeatureFor<T>[];
  allIn: (collection: Collection) => Feature[];
}

export { IStore, IFeatureStore };
