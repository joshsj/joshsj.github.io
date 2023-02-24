import { Builder } from "@application/behaviours/types";
import { DefaultBuilders } from "@application/services/types";

const makeAssetBuilder = ({ minify }: DefaultBuilders): Builder => async (f) => await minify(f);

export { makeAssetBuilder };
