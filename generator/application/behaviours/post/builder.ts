import { Renderers } from "@application/rendering/types";
import { Builder } from "@application/behaviours/types";

const makePostBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePostBuilder };
