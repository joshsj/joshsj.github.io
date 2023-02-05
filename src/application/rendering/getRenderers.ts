import { Config } from "@domain";
import { pug } from "./pug";
import { GetRenderContext, Renderers } from "./types";

const getRenderers = (getRenderContext: GetRenderContext, config: Config): Renderers => ({
  pug: pug(getRenderContext, config),
});

export { getRenderers };
