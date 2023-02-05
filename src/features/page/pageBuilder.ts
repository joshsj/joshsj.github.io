import { Builder } from "@common/builder";
import { Renderers } from "@common/rendering";

const makePageBuilder =
  ({ pug }: Renderers): Builder =>
  async (f) =>
    await pug(f);

export { makePageBuilder };
