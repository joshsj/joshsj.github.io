import { Renderers } from "@application/rendering/types";
import { DefaultExtractors } from "@application/services/types/defaultExtractors";
import { Config, D } from "@models";
import { DependencyContainer } from "tsyringe";
import { assetBuilder, makeAssetExtractor, makeAssetIdentifier, makeAssetLocator } from "./asset";
import { makeCollectionExtractor, makeCollectionIdentifier } from "./collection";
import { makePageBuilder, makePageExtractor, makePageIdentifier, pageLocator } from "./page";
import { makePostBuilder, makePostExtractor, makePostIdentifier, postLocator } from "./post";
import { Builders, Extractors, Identifiers, Locators } from "./types";

const registerBehaviours = (c: DependencyContainer) => {
  c.register<Builders>(D.builders, {
    useFactory: (c) => {
      const renderers = c.resolve<Renderers>(D.renderers);

      return {
        asset: assetBuilder,
        collection: undefined,
        page: makePageBuilder(renderers),
        post: makePostBuilder(renderers),
      };
    },
  });

  c.register<Extractors>(D.extractors, {
    useFactory: (c) => {
      const defaults = c.resolve<DefaultExtractors>(D.defaultExtractors);
      const renderers = c.resolve<Renderers>(D.renderers);

      return {
        asset: makeAssetExtractor(defaults),
        collection: makeCollectionExtractor(renderers),
        page: makePageExtractor(defaults),
        post: makePostExtractor(defaults),
      };
    },
  });

  c.register<Identifiers>(D.identifiers, {
    useFactory: (c) => {
      const config = c.resolve<Config>(D.config);

      return [makeAssetIdentifier, makePageIdentifier, makePostIdentifier, makeCollectionIdentifier].map((i) =>
        i(config)
      );
    },
  });

  c.register<Locators>(D.locators, {
    useFactory: (c) => {
      const config = c.resolve<Config>(D.config);

      return {
        asset: makeAssetLocator(config),
        collection: undefined,
        page: pageLocator,
        post: postLocator,
      };
    },
  });
};

export { registerBehaviours };
