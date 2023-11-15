import { Resource, ResourceName } from "@core/models";

interface IGetUrl {
  for(name: ResourceName, filename: string): string;
  for(resource: Resource): string;
}

export { IGetUrl };
