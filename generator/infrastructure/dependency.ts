import { IConfigPopulator, IIO, ILogger } from "@application/services/interfaces";
import { IEntityStore } from "@application/stores/interfaces";
import { D } from "@models";
import { DependencyContainer } from "tsyringe";
import { ArgvConfigProvider } from "./services/ArgvConfigPopulator";
import { ConsoleLogger } from "./services/ConsoleLogger";
import { EnvConfigProvider } from "./services/EnvConfigPopulator";
import { IO } from "./services/IO";
import { InMemoryEntityStore } from "./stores";

class InfrastructureDependencies {
  private constructor(private readonly c: DependencyContainer) {}

  static create(container: DependencyContainer) {
    return new InfrastructureDependencies(container);
  }

  registerServices() {
    this.c.register<IIO>(D.io, { useValue: new IO() });

    this.c.register<ILogger>(D.log, { useValue: new ConsoleLogger() });

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
    this.c.register<IEntityStore>(D.entityStore, { useValue: new InMemoryEntityStore() });

    return this;
  }
}

export { InfrastructureDependencies };
