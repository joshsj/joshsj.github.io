import path from "path";
import { Env } from "@domain";
import { SetDefaultConfigResult } from "./setDefaultConfig";
import { Step } from "@lib/step";

type LoadConfigResult = SetDefaultConfigResult;

const loadConfig: Step<SetDefaultConfigResult, LoadConfigResult> =
  (next) =>
  async ({ config: _default }) => {
    const base = process.cwd();
    const env = process.env as Env;

    const config = Object.assign(_default, {
      sourceDir: env.SOURCE_DIR ? path.resolve(base, env.SOURCE_DIR) : _default.sourceDir,

      buildDir: env.BUILD_DIR ? path.resolve(base, env.BUILD_DIR) : _default.buildDir,

      assetDir: env.ASSET_DIR || _default.assetDir,
      pageDir: env.PAGE_DIR || _default.pageDir,
    });

    const result = { config };

    await next?.(result);

    return result;
  };

export { LoadConfigResult, loadConfig };
