import { IO } from "@application/services/types";
import { Config } from "@models";

const makeDefaultConfig = (io: IO): Config => ({
  rootDir: io.cwd(),
  sourceDir: ".",
  buildDir: ".",
  assetDir: "assets",
  pageDir: "pages",
  postDir: "posts",
  debug: false,
  watch: false,
  draft: false,
});

export { makeDefaultConfig };
