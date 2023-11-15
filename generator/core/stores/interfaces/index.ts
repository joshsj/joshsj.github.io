import { Collection, Resource, ResourceFor, ResourceName } from "@core/models";

interface IStore<T> {
  all: () => T[];
  count: () => number;
  insert: (item: T) => void;
  update: (item: T) => void;
  upsert: (item: T) => void;
}

interface IResourceStore extends IStore<Resource> {
  find: (path: string) => Resource;
  // TODO narrow type
  findBy: (name: ResourceName, title: string) => Resource;
  allBy: <T extends ResourceName>(name: T) => ResourceFor<T>[];
  allIn: (collection: Collection) => Resource[];
}

export { IStore, IResourceStore };
