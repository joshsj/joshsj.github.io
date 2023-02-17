import { GetRenderContext } from "@application/services/types";
import { Config } from "@models";
import { makePugRenderer } from "./pug";
import { Renderers } from "./types";

const makeRenderers = (getRenderContext: GetRenderContext, config: Config): Renderers => ({
  pug: makePugRenderer(getRenderContext, config),
});

export { makeRenderers };
