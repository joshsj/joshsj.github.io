import { Asset, Collection, Config, D, Feature, Page, Post } from "@models";
import { DependencyContainer } from "tsyringe";
import { AssetBuilder, AssetExtractor, AssetIdentifier, AssetLocator } from "./behaviours/asset";
import { CollectionExtractor, CollectionIdentifier } from "./behaviours/collection";
import { PageBuilder, PageExtractor, PageIdentifier, PageLocator } from "./behaviours/page";
import { PostBuilder, PostExtractor, PostIdentifier, PostLocator } from "./behaviours/post";
import { BuilderProvider } from "./behaviours/provider/builderProvider";
import { ExtractorProvider } from "./behaviours/provider/extractorProvider";
import { LocatorProvider } from "./behaviours/provider/locatorProvider";
import {
  IBuilder,
  IBuilderProvider,
  IExtractor,
  IExtractorProvider,
  IIdentifier,
  ILocator,
  ILocatorProvider,
} from "./behaviours/types";
import { GeneratePipelineFactory } from "./pipeline/factories/generatePipeline";
import { UpdateConfigPipelineFactory } from "./pipeline/factories/updateConfigPipeline";
import { DefaultConfigPopulator } from "./services/defaultConfigPopulator";
import { GetFeatureName } from "./services/getFeatureName";
import { GetUrl } from "./services/getUrl";
import { PugRenderer } from "./services/renderer/pug";
import { IConfigPopulator, IGetFeatureName, IGetUrl, IO, IRenderer, Log } from "./services/types";
import { IFeatureStore } from "./stores/types";

class ApplicationDependencies {
  private constructor(private readonly c: DependencyContainer) {}

  static create(container: DependencyContainer) {
    return new ApplicationDependencies(container);
  }

  registerServices() {
    this.c.register<IConfigPopulator>(D.configPopulator, {
      useFactory: (c) => new DefaultConfigPopulator(c.resolve<IO>(D.io)),
    });

    this.c.register<IGetFeatureName>(D.getFeatureName, {
      useFactory: (c) => {
        const identifiers = c.resolveAll<IIdentifier<Feature>>(D.identifier);

        return new GetFeatureName(identifiers);
      },
    });

    this.c.register<IGetUrl>(D.getUrl, {
      useFactory: (c) => {
        const featureStore = c.resolve<IFeatureStore>(D.featureStore);
        const locatorFactory = c.resolve<ILocatorProvider>(D.locatorProvider);

        return new GetUrl(featureStore, locatorFactory);
      },
    });

    this.c.register<IRenderer<"pug">>(D.pugRenderer, {
      useFactory: (c) => {
        const featureStore = c.resolve<IFeatureStore>(D.featureStore);
        const getUrl = c.resolve<IGetUrl>(D.getUrl);
        const config = c.resolve<Config>(D.config);

        return new PugRenderer(featureStore, getUrl, config);
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
        const featureStore = c.resolve<IFeatureStore>(D.featureStore);
        const getFeatureName = c.resolve<IGetFeatureName>(D.getFeatureName);
        const builderProvider = c.resolve<IBuilderProvider>(D.builderProvider);
        const locatorProvider = c.resolve<ILocatorProvider>(D.locatorProvider);
        const extractorProvider = c.resolve<IExtractorProvider>(D.extractorProvider);

        return new GeneratePipelineFactory(
          io,
          log,
          config,
          featureStore,
          getFeatureName,
          builderProvider,
          locatorProvider,
          extractorProvider
        );
      },
    });

    return this;
  }

  registerBehaviours() {
    this.c.register<IIdentifier<Asset>>(D.assetIdentifier, {
      useFactory: (c) => new AssetIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<Asset>>(D.identifier, {
      useFactory: (c) => new AssetIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IIdentifier<Collection>>(D.collectionIdentifier, {
      useFactory: (c) => new CollectionIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<Collection>>(D.identifier, {
      useFactory: (c) => new CollectionIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IIdentifier<Page>>(D.pageIdentifier, {
      useFactory: (c) => new PageIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<Page>>(D.identifier, {
      useFactory: (c) => new PageIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IIdentifier<Post>>(D.postIdentifier, {
      useFactory: (c) => new PostIdentifier(c.resolve<Config>(D.config)),
    });
    this.c.register<IIdentifier<Post>>(D.identifier, {
      useFactory: (c) => new PostIdentifier(c.resolve<Config>(D.config)),
    });

    this.c.register<IExtractor<Asset>>(D.assetExtractor, {
      useFactory: () => new AssetExtractor(),
    });
    this.c.register<IExtractor<Collection>>(D.collectionExtractor, {
      useFactory: () => new CollectionExtractor(),
    });
    this.c.register<IExtractor<Page>>(D.pageExtractor, {
      useFactory: () => new PageExtractor(),
    });
    this.c.register<IExtractor<Post>>(D.postExtractor, {
      useFactory: () => new PostExtractor(),
    });

    this.c.register<ILocator<Asset>>(D.assetLocator, {
      useFactory: (c) => new AssetLocator(c.resolve<Config>(D.config)),
    });
    this.c.register<ILocator<Page>>(D.pageLocator, {
      useFactory: () => new PageLocator(),
    });
    this.c.register<ILocator<Post>>(D.postLocator, {
      useFactory: () => new PostLocator(),
    });

    this.c.register<IBuilder<Asset>>(D.assetBuilder, { useFactory: () => new AssetBuilder() });
    this.c.register<IBuilder<Page>>(D.pageBuilder, {
      useFactory: (c) => new PageBuilder(c.resolve<IRenderer<"pug">>(D.pugRenderer)),
    });
    this.c.register<IBuilder<Post>>(D.postBuilder, {
      useFactory: (c) => new PostBuilder(c.resolve<IRenderer<"pug">>(D.pugRenderer)),
    });

    this.c.register<IBuilderProvider>(D.builderProvider, {
      useFactory: (c) => {
        const asset = c.resolve<IBuilder<Asset>>(D.assetBuilder);
        const page = c.resolve<IBuilder<Page>>(D.pageBuilder);
        const post = c.resolve<IBuilder<Post>>(D.postBuilder);

        return new BuilderProvider(asset, page, post);
      },
    });

    this.c.register<ILocatorProvider>(D.locatorProvider, {
      useFactory: (c) => {
        const asset = c.resolve<ILocator<Asset>>(D.assetLocator);
        const page = c.resolve<ILocator<Page>>(D.pageLocator);
        const post = c.resolve<ILocator<Post>>(D.postLocator);

        return new LocatorProvider(asset, page, post);
      },
    });

    this.c.register<IExtractorProvider>(D.extractorProvider, {
      useFactory: (c) => {
        const asset = c.resolve<IExtractor<Asset>>(D.assetExtractor);
        const collection = c.resolve<IExtractor<Collection>>(D.collectionExtractor);
        const page = c.resolve<IExtractor<Page>>(D.pageExtractor);
        const post = c.resolve<IExtractor<Post>>(D.postExtractor);

        return new ExtractorProvider(asset, collection, page, post);
      },
    });

    return this;
  }
}

export { ApplicationDependencies };
