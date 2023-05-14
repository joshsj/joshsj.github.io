import { IConfigPopulator, IO, Log } from "@application/services/types";
import { IFeatureStore } from "@application/stores/types";
import { Config, D } from "@models";
import { DependencyContainer } from "tsyringe";
import { ArgvConfigProvider } from "./services/argvConfigPopulator";
import { makeConsoleLogger } from "./services/consoleLogger";
import { EnvConfigProvider } from "./services/envConfigPopulator";
import { io } from "./services/io";
import { InMemoryFeatureStore } from "./stores";

class InfrastructureDependencies {
  private constructor(private readonly c: DependencyContainer) {}

  static create(container: DependencyContainer) {
    return new InfrastructureDependencies(container);
  }

  registerServices() {
    this.c.register<IO>(D.io, { useValue: io });

    this.c.register<Log>(D.log, {
      useFactory: (c) => (c.resolve<Config>(D.config).debug ? makeConsoleLogger() : () => {}),
    });

    // Order is preserved
    this.c.register<IConfigPopulator>(D.configPopulator, {
      useValue: new EnvConfigProvider(),
    });

    this.c.register<IConfigPopulator>(D.configPopulator, {
      useValue: new ArgvConfigProvider(),
    });

    return this;
  }

  registerStores() {
    this.c.register<IFeatureStore>(D.featureStore, { useValue: new InMemoryFeatureStore() });

    return this;
  }
}

export { InfrastructureDependencies };
