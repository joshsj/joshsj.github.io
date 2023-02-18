import { ConfigPopulator, IO, Log } from "@application/services/types";
import { FeatureStore } from "@application/stores/types";
import { Config, D } from "@models";
import { DependencyContainer } from "tsyringe";
import { makeArgvConfigProvider } from "./services/argvConfigPopulator";
import { makeConsoleLogger } from "./services/consoleLogger";
import { makeEnvConfigProvider } from "./services/envConfigPopulator";
import { io } from "./services/io";
import { makeFeatureStore } from "./stores";

const registerInfrastructure = (c: DependencyContainer) => {
  c.register<FeatureStore>(D.featureStore, { useValue: makeFeatureStore() });

  c.register<IO>(D.io, { useValue: io });

  c.register<Log>(D.log, {
    useFactory: (c) => (c.resolve<Config>(D.config).debug ? makeConsoleLogger() : () => {}),
  });

  c.register<ConfigPopulator>(D.configPopulator, {
    useValue: makeArgvConfigProvider(),
  });

  c.register<ConfigPopulator>(D.configPopulator, {
    useValue: makeEnvConfigProvider(),
  });
};

export { registerInfrastructure };
