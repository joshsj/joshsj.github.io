import path from "path";
import { IConfig, IEnv } from "./types";

const loadConfig = (): IConfig => {
  const base = process.cwd();
  const env = process.env as IEnv;

  const config: IConfig = {
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
