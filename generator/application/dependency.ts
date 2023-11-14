import { Config, D } from "@models";
import { DependencyContainer } from "tsyringe";
import { AssetBuilder, AssetExtractor, AssetIdentifier, AssetLocator } from "./behaviours/asset";
import { CollectionExtractor, CollectionIdentifier } from "./behaviours/collection";
import { IBuilder, IExtractor, IIdentifier, ILocator } from "./behaviours/interfaces";
import { PageBuilder, PageExtractor, PageIdentifier, PageLocator } from "./behaviours/page";
import { PostBuilder, PostExtractor, PostIdentifier, PostLocator } from "./behaviours/post";
import { GeneratePipelineFactory } from "./pipeline/factories/IGeneratePipeline";
import { UpdateConfigPipelineFactory } from "./pipeline/factories/IUpdateConfigPipeline";
import { DefaultConfigPopulator } from "./services/DefaultConfigPopulator";
import { GetResourceName } from "./services/GetResourceName";
import { GetUrl } from "./services/GetUrl";
import { PugRenderer } from "./services/renderer/PugRenderer";
import { IConfigPopulator, IGetResourceName, IGetUrl, IIO, ILogger, IRenderer } from "./services/interfaces";
import { IResourceStore } from "./stores/interfaces";

class ApplicationDependencies {
  private constructor(private readonly c: DependencyContainer) {}

  static create(container: DependencyContainer) {
    return new ApplicationDependencies(container);
  }

  registerServices() {
    this.c.register<IConfigPopulator>(D.configPopulator, {
      useFactory: (c) => new DefaultConfigPopulator(c.resolve<IIO>(D.io)),
    });

    this.c.register<IGetResourceName>(D.getResourceName, {
      useFactory: (c) => {
        const identifiers = c.resolveAll<IIdentifier>(D.identifier);

        return new GetResourceName(identifiers);
      },
    });

    this.c.register<IGetUrl>(D.getUrl, {
      useFactory: (c) => {
        const resourceStore = c.resolve<IResourceStore>(D.resourceStore);
        const locators = c.resolveAll<ILocator>(D.locator);

        return new GetUrl(resourceStore, locators);
      },
    });

    this.c.register<PugRenderer>(D.pugRenderer, {
      useFactory: (c) => {
        const resourceStore = c.resolve<IResourceStore>(D.resourceStore);
        const getUrl = c.resolve<IGetUrl>(D.getUrl);
        const config = c.resolve<Config>(D.config);

        return new PugRenderer(resourceStore, getUrl, config);
      },
    });

    return this;
  }

  registerPipelines() {
    this.c.register<UpdateConfigPipelineFactory>(D.updateConfigPipelineFactory, {
      useFactory: (c) => {
        const config = c.resolve<Config>(D.config);
        const configPopulators = c.resolveAll<IConfigPopulator>(D.configPopulator);

        return new UpdateConfigPipelineFactory(config, configPopulators);
      },
    });

    this.c.register<GeneratePipelineFactory>(D.generatePipelineFactory, {
      useFactory: (c) => {
        const io = c.resolve<IIO>(D.io);
        const log = c.resolve<ILogger>(D.log);
        const config = c.resolve<Config>(D.config);
        const resourceStore = c.resolve<IResourceStore>(D.resourceStore);
        const getResourceName = c.resolve<IGetResourceName>(D.getResourceName);
        const builders = c.resolveAll<IBuilder>(D.builder);
        const locators = c.resolveAll<ILocator>(D.locator);
        const extractors = c.resolveAll<IExtractor>(D.extractor);

        return new GeneratePipelineFactory(
          io,
          log,
          config,
          resourceStore,
          getResourceName,
          builders,
          locators,
          extractors
        );
      },
    });

    return this;
  }

  registerBehaviours() {
    this.c.register<IIdentifier<"asset">>(D.assetIdentifier, {
      useFactory: (c) => new AssetIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<"asset">>(D.identifier, {
      useFactory: (c) => new AssetIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IIdentifier<"collection">>(D.collectionIdentifier, {
      useFactory: (c) => new CollectionIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<"collection">>(D.identifier, {
      useFactory: (c) => new CollectionIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IIdentifier<"page">>(D.pageIdentifier, {
      useFactory: (c) => new PageIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<"page">>(D.identifier, {
      useFactory: (c) => new PageIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IIdentifier<"post">>(D.postIdentifier, {
      useFactory: (c) => new PostIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<"post">>(D.identifier, {
      useFactory: (c) => new PostIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IExtractor<"asset">>(D.extractor, {
      useFactory: () => new AssetExtractor(),
    });
    this.c.register<IExtractor<"collection">>(D.extractor, {
      useFactory: (c) => new CollectionExtractor(c.resolve<PugRenderer>(D.pugRenderer)),
    });
    this.c.register<IExtractor<"page">>(D.extractor, {
      useFactory: () => new PageExtractor(),
    });
    this.c.register<IExtractor<"post">>(D.extractor, {
      useFactory: () => new PostExtractor(),
    });

    this.c.register<ILocator<"asset">>(D.locator, {
      useFactory: (c) => new AssetLocator(c.resolve<Config>(D.config)),
    });
    this.c.register<ILocator<"page">>(D.locator, {
      useFactory: () => new PageLocator(),
    });
    this.c.register<ILocator<"post">>(D.locator, {
      useFactory: () => new PostLocator(),
    });

    this.c.register<IBuilder<"asset">>(D.builder, { useFactory: () => new AssetBuilder() });
    this.c.register<IBuilder<"page">>(D.builder, {
      useFactory: (c) => new PageBuilder(c.resolve<PugRenderer>(D.pugRenderer)),
    });
    this.c.register<IBuilder<"post">>(D.builder, {
      useFactory: (c) => new PostBuilder(c.resolve<PugRenderer>(D.pugRenderer)),
    });

    return this;
  }
}

export { ApplicationDependencies };
