type Map<T extends string> = {
  [K in T]: string;
};

type Env = Partial<Map<"SOURCE_DIR" | "BUILD_DIR" | "ASSET_DIR" | "PAGE_DIR">>;

type Config = Map<"sourceDir" | "buildDir" | "assetDir" | "pageDir">;

export { Env, Config };
