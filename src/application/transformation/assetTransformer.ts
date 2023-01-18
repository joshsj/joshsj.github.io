import { Transformer } from "./types";

const assetTransformer: Transformer<"asset"> = async ({ file }) => file.with({ segments: file.segments.slice(1) });

export { assetTransformer };
