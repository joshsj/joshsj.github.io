import { Builder } from "@common/building";
import { Renderers } from "@common/rendering";

const makePostBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePostBuilder };
