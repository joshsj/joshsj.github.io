import { Builder } from "@common/builder";
import { Renderers } from "@common/rendering";

const makePostBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePostBuilder };
