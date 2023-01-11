import path from "path";

type Map<T extends string> = {
  [K in T]: string;
};

type IEnv = Partial<Map<"SOURCE_DIR" | "BUILD_DIR" | "ASSET_DIR" | "PAGE_DIR">>;

type IConfig = Map<"sourceDir" | "buildDir" | "assetDir" | "pageDir">;

export { IEnv, IConfig };
