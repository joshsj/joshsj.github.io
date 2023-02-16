import { Renderers } from "@application/types/services";
import { Builder } from "@application/types/behaviours";

const makePageBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePageBuilder };
