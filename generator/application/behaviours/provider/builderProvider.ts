import { IBuilder, IBuilderProvider } from "@application/behaviours/types";
import { Asset, Feature, FeatureFor, FeatureName, Page, Post } from "@models";

type Builders = { [K in FeatureName]: IBuilder<FeatureFor<K>> | undefined };

class BuilderProvider implements IBuilderProvider {
  private readonly builders: Builders;

  constructor(asset: IBuilder<Asset>, page: IBuilder<Page>, post: IBuilder<Post>) {
    this.builders = { asset, collection: undefined, page, post };
  }

  get<T extends Feature>(name: T["name"]): IBuilder<T> | undefined {
    return this.builders[name];
  }
}

export { BuilderProvider };
