import { Resource } from "@models";
import { File } from "@models/io";

export interface IRenderer {
  render(file: File): Promise<string>;
  render(resource: Resource): Promise<string>;
}
