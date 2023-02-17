import { Renderers } from "@application/renderers/types";
import { Builder } from "@application/behaviours/types";

const makePageBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePageBuilder };
