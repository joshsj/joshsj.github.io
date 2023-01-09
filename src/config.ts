import path from "path";

type Env = Partial<{
  CONTENT_DIR: string;
  BUILD_DIR: string;
}>;

type Config = {
  contentDir: string;
  buildDir: string;
};

const getConfig = (): Config => {
  const base = process.cwd();
  const env = process.env as Env;

  return {
    contentDir: path.resolve(base, env.CONTENT_DIR ?? ""),
    buildDir: path.resolve(base, env.BUILD_DIR ?? ""),
  };
};

export { getConfig, Config, Env };
