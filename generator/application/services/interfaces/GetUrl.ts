import { Entity, EntityName } from "@models";

interface IGetUrl {
  for(name: EntityName, filename: string): string;
  for(entity: Entity): string;
}

export { IGetUrl };
