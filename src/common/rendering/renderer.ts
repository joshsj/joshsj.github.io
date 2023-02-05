import { Feature } from "@entities";
import { Config } from "@entities/config";
import { File } from "@entities/io";
import { makePugRenderer } from "./renderers/pug";
import { GetRenderContext } from "./renderContext";

type Renderer = (arg: Feature | File | string) => Promise<string>;

type Renderers = { [K in "pug"]: Renderer };

const makeRenderers = (getRenderContext: GetRenderContext, config: Config): Renderers => ({
  pug: makePugRenderer(getRenderContext, config),
});

export { Renderer, Renderers, makeRenderers };
