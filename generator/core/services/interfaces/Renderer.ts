import { Resource } from "@core/models";
import { File } from "@core/models/io";

export interface IRenderer {
  render(file: File): Promise<string>;
  render(resource: Resource): Promise<string>;
}
