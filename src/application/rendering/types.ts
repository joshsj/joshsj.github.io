import { RenderContext } from "@application/steps";
import { Something } from "@domain";
import { File } from "@domain/io";

type Renderer = (hmm: Something | File | string) => Promise<string>;

type Renderers = { [K in "pug"]: Renderer };

type GetRenderContext = () => RenderContext;

export { Renderer, Renderers, GetRenderContext };
