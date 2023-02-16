import { Builder } from "@application/types/behaviours";

const assetBuilder: Builder = async (something) => something.file.content;

export { assetBuilder };
