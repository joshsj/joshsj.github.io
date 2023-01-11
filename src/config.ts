import path from "path";

type Map<T extends string> = {
  [K in T]: string;
};

type Env = Partial<Map<"SOURCE_DIR" | "BUILD_DIR" | "ASSET_DIR" | "PAGE_DIR">>;

type IConfig = Map<"sourceDir" | "buildDir" | "assetDir" | "pageDir">;

const loadConfig = (): IConfig => {
  const base = process.cwd();
  const env = process.env as Env;

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

export { loadConfig, IConfig };
