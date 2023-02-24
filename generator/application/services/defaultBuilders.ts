import { DefaultBuilders } from "@application/services/types";
import csso from "csso";

type Minifier = ((content: string) => Promise<string>);
type Minifiers = { [extension: string]: Minifier | undefined };

const minifiers: Minifiers = {
  css: async (s) => csso.minify(s).css
};

const none: Minifier = async s => s;

const defaultBuilders: DefaultBuilders = {
  minify: async ({ file: { content, extension } }) => (minifiers[extension.slice(1)] ?? none)(content)
}

export { defaultBuilders }