import { Asset, Collection, Config, D, Page, Post } from "@models";
import { DependencyContainer } from "tsyringe";
import { AssetBuilder, AssetExtractor, AssetIdentifier, AssetLocator } from "./behaviours/asset";
import { CollectionExtractor, CollectionIdentifier } from "./behaviours/collection";
import { PageBuilder, PageExtractor, PageIdentifier, PageLocator } from "./behaviours/page";
import { PostBuilder, PostExtractor, PostIdentifier, PostLocator } from "./behaviours/post";
import { IBuilder, IExtractor, IIdentifier, ILocator } from "./behaviours/types";
import { GeneratePipelineFactory } from "./pipeline/factories/generatePipeline";
import { UpdateConfigPipelineFactory } from "./pipeline/factories/updateConfigPipeline";
import { DefaultConfigPopulator } from "./services/defaultConfigPopulator";
import { GetEntityName } from "./services/getEntityName";
import { GetUrl } from "./services/getUrl";
import { PugRenderer } from "./services/renderer/pug";
import { IConfigPopulator, IGetEntityName, IGetUrl, IO, IRenderer, Log } from "./services/types";
import { IEntityStore } from "./stores/types";

class ApplicationDependencies {
  private constructor(private readonly c: DependencyContainer) {}

  static create(container: DependencyContainer) {
    return new ApplicationDependencies(container);
  }

  registerServices() {
    this.c.register<IConfigPopulator>(D.configPopulator, {
      useFactory: (c) => new DefaultConfigPopulator(c.resolve<IO>(D.io)),
    });

    this.c.register<IGetEntityName>(D.getEntityName, {
      useFactory: (c) => {
        const identifiers = c.resolveAll<IIdentifier>(D.identifier);

        return new GetEntityName(identifiers);
      },
    });

    this.c.register<IGetUrl>(D.getUrl, {
      useFactory: (c) => {
        const entityStore = c.resolve<IEntityStore>(D.entityStore);
        const locators = c.resolveAll<ILocator>(D.locator);

        return new GetUrl(entityStore, locators);
      },
    });

    this.c.register<IRenderer<"pug">>(D.pugRenderer, {
      useFactory: (c) => {
        const entityStore = c.resolve<IEntityStore>(D.entityStore);
        const getUrl = c.resolve<IGetUrl>(D.getUrl);
        const config = c.resolve<Config>(D.config);

        return new PugRenderer(entityStore, getUrl, config);
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
        const io = c.resolve<IO>(D.io);
        const log = c.resolve<Log>(D.log);
        const config = c.resolve<Config>(D.config);
        const entityStore = c.resolve<IEntityStore>(D.entityStore);
        const getEntityName = c.resolve<IGetEntityName>(D.getEntityName);
        const builders = c.resolveAll<IBuilder>(D.builder);
        const locators = c.resolveAll<ILocator>(D.locator);
        const extractors = c.resolveAll<IExtractor>(D.extractor);

        return new GeneratePipelineFactory(io, log, config, entityStore, getEntityName, builders, locators, extractors);
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
      useFactory: (c) => new CollectionExtractor(c.resolve<IRenderer<"pug">>(D.pugRenderer)),
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
      useFactory: (c) => new PageBuilder(c.resolve<IRenderer<"pug">>(D.pugRenderer)),
    });
    this.c.register<IBuilder<"post">>(D.builder, {
      useFactory: (c) => new PostBuilder(c.resolve<IRenderer<"pug">>(D.pugRenderer)),
    });

    return this;
  }
}

export { ApplicationDependencies };
