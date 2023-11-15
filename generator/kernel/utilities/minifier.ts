import { File } from "@core/models/io";
import csso from "csso";
import terser from "terser";

type Minify = (content: string) => Promise<string>;

const minifiers: { [extension: string]: Minify | undefined } = {
  css: async (s) => csso.minify(s).css,
  js: async (s) => (await terser.minify(s)).code!,
};

const minifier = async ({ name, content }: File) => (minifiers[name.ext.slice(1)] ?? ((s) => s))(content);

export { minifier };
