import { GetRenderContext, Renderers } from "@application/types/services";
import { Config } from "@models";
import { makePugRenderer } from "./pug";

const makeRenderers = (getRenderContext: GetRenderContext, config: Config): Renderers => ({
  pug: makePugRenderer(getRenderContext, config),
});

export { makeRenderers }