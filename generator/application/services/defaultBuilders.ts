import { DefaultBuilders } from "@application/services/types";
import csso from "csso";
import terser from "terser"

type Minifier = ((content: string) => Promise<string>);
type Minifiers = { [extension: string]: Minifier | undefined };

const minifiers: Minifiers = {
  css: async (s) => csso.minify(s).css,
  js: async (s) => (await terser.minify(s)).code!
};

const none: Minifier = async s => s;

const defaultBuilders: DefaultBuilders = {
  minify: async ({ file: { content, extension } }) => (minifiers[extension.slice(1)] ?? none)(content)
}

export { defaultBuilders }