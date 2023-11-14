import { Collection, Entity, EntityFor, EntityName } from "@models";

interface IStore<T> {
  all: () => T[];
  count: () => number;
  insert: (item: T) => void;
  update: (item: T) => void;
  upsert: (item: T) => void;
}

interface IEntityStore extends IStore<Entity> {
  find: (path: string) => Entity;
  // TODO narrow type
  findBy: (name: EntityName, title: string) => Entity;
  allBy: <T extends EntityName>(name: T) => EntityFor<T>[];
  allIn: (collection: Collection) => Entity[];
}

export { IStore, IEntityStore };
