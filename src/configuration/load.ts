import path from "path";
import { Config, Env } from "./types";

const loadConfig = (): Config => {
  const base = process.cwd();
  const env = process.env as Env;

  const config: Config = {
    sourceDir: path.resolve(base, env.SOURCE_DIR ?? ""),
    buildDir: path.resolve(base, env.BUILD_DIR ?? ""),
    assetDir: env.ASSET_DIR ?? "public",
    pageDir: env.PAGE_DIR ?? "pages",
  };

  console.log("Config");
  console.log(config);

  return config;
};

export { loadConfig };
