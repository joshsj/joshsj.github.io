import { Feature } from "@models";
import { File } from "@models/io";

type Renderer = (arg: Feature | File | string) => Promise<string>;

type Renderers = { [K in "pug"]: Renderer };

export { Renderer, Renderers }