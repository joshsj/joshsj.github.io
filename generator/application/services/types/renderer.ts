import { Feature } from "@models";

type RendererOf = "pug";

interface IRenderer<T extends RendererOf> {
  readonly of: T;
  render(feature: Feature): Promise<string>;
}

export { IRenderer, RendererOf };
