import { Builder } from "@common/building";
import { Renderers } from "@common/rendering";

const makePageBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePageBuilder };
