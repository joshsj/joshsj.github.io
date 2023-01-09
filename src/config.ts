import path from "path";

type Env = Partial<{
  SOURCE_DIR: string;
  BUILD_DIR: string;
}>;

type Config = {
  sourceDir: string;
  buildDir: string;
};

const getConfig = (): Config => {
  const base = process.cwd();
  const env = process.env as Env;

  const config: Config = {
    sourceDir: path.resolve(base, env.SOURCE_DIR ?? ""),
    buildDir: path.resolve(base, env.BUILD_DIR ?? ""),
  };

  return config;
};

export { getConfig, Config, Env };
