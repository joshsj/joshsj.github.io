import { Entity } from "@models";
import { File } from "@models/io";

type RendererOf = "pug";

interface IRenderer<T extends RendererOf> {
  readonly of: T;
  render(file: File): Promise<string>;
  render(entity: Entity): Promise<string>;
}

export { IRenderer, RendererOf };
