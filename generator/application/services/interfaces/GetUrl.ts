import { Resource, ResourceName } from "@models";

interface IGetUrl {
  for(name: ResourceName, filename: string): string;
  for(resource: Resource): string;
}

export { IGetUrl };
